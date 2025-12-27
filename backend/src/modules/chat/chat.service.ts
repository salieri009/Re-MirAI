import {
    Injectable,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OpenAIService } from '../openai/openai.service';
import { ChatMessageDto, ChatHistoryDto, ChatSessionDto } from './dto/chat.dto';

/**
 * Chat Service
 * 
 * Handles chat sessions and message generation.
 * Uses OpenAI for AI responses while maintaining persona character.
 */
@Injectable()
export class ChatService {
    constructor(
        private prisma: PrismaService,
        private openai: OpenAIService,
    ) { }

    /**
     * Start or get existing chat session with persona
     */
    async getOrCreateSession(userId: string, personaId: string): Promise<ChatSessionDto> {
        // Check persona ownership
        const persona = await this.prisma.persona.findFirst({
            where: { id: personaId, userId },
        });

        if (!persona) {
            throw new NotFoundException('Persona not found');
        }

        // Find existing session or create new
        let session = await this.prisma.chatSession.findFirst({
            where: { userId, personaId },
            orderBy: { lastMsgAt: 'desc' },
        });

        if (!session) {
            session = await this.prisma.chatSession.create({
                data: { userId, personaId },
            });
        }

        return {
            id: session.id,
            personaId: session.personaId,
            personaName: persona.name,
            startedAt: session.startedAt,
            lastMsgAt: session.lastMsgAt,
        };
    }

    /**
     * Send a message and get AI response
     */
    async sendMessage(
        userId: string,
        sessionId: string,
        content: string,
    ): Promise<{ userMessage: ChatMessageDto; aiMessage: ChatMessageDto }> {
        // Verify session ownership
        const session = await this.prisma.chatSession.findFirst({
            where: { id: sessionId, userId },
            include: {
                persona: true,
                messages: {
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                },
            },
        });

        if (!session) {
            throw new NotFoundException('Chat session not found');
        }

        // Moderate user content
        const moderation = await this.openai.moderateContent(content);
        if (!moderation.safe) {
            throw new ForbiddenException(`Message rejected: ${moderation.reason}`);
        }

        // Save user message
        const userMessage = await this.prisma.chatMessage.create({
            data: {
                sessionId,
                sender: 'USER',
                content,
            },
        });

        // Prepare context for AI
        const chatHistory = session.messages.reverse().map((m) => ({
            role: m.sender === 'USER' ? 'user' : 'assistant' as 'user' | 'assistant',
            content: m.content,
        }));

        // Generate AI response
        const aiContent = await this.openai.generateChatResponse({
            systemPrompt: session.persona.systemPrompt,
            personaName: session.persona.name,
            messages: chatHistory,
            userMessage: content,
        });

        // Save AI message
        const aiMessage = await this.prisma.chatMessage.create({
            data: {
                sessionId,
                sender: 'AI',
                content: aiContent,
            },
        });

        // Update session last message time
        await this.prisma.chatSession.update({
            where: { id: sessionId },
            data: { lastMsgAt: new Date() },
        });

        // Update bond level
        await this.prisma.persona.update({
            where: { id: session.personaId },
            data: { bondLevel: { increment: 1 } },
        });

        return {
            userMessage: {
                id: userMessage.id,
                sender: 'USER',
                content: userMessage.content,
                createdAt: userMessage.createdAt,
            },
            aiMessage: {
                id: aiMessage.id,
                sender: 'AI',
                content: aiMessage.content,
                createdAt: aiMessage.createdAt,
            },
        };
    }

    /**
     * Get chat history for a session
     */
    async getHistory(
        userId: string,
        sessionId: string,
        limit = 20,
    ): Promise<ChatHistoryDto> {
        const session = await this.prisma.chatSession.findFirst({
            where: { id: sessionId, userId },
            include: {
                messages: {
                    orderBy: { createdAt: 'asc' },
                    take: limit,
                },
            },
        });

        if (!session) {
            throw new NotFoundException('Chat session not found');
        }

        return {
            sessionId: session.id,
            messages: session.messages.map((m) => ({
                id: m.id,
                sender: m.sender as 'USER' | 'AI',
                content: m.content,
                createdAt: m.createdAt,
            })),
        };
    }

    /**
     * Get all sessions for a user
     */
    async getSessions(userId: string): Promise<ChatSessionDto[]> {
        const sessions = await this.prisma.chatSession.findMany({
            where: { userId },
            include: { persona: true },
            orderBy: { lastMsgAt: 'desc' },
        });

        return sessions.map((s) => ({
            id: s.id,
            personaId: s.personaId,
            personaName: s.persona.name,
            startedAt: s.startedAt,
            lastMsgAt: s.lastMsgAt,
        }));
    }
}
