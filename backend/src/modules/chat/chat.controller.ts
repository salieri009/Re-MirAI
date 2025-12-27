import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { ChatService } from './chat.service';
import { StartSessionDto, SendMessageDto } from './dto/chat.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface AuthenticatedRequest extends Request {
    user: { id: string };
}

/**
 * Chat Controller (REST API)
 * 
 * Provides REST endpoints for chat history and sessions.
 * Real-time messaging is handled via WebSocket gateway.
 */
@Controller('chats')
@UseGuards(JwtAuthGuard)
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    /**
     * GET /chats/sessions
     * Get all chat sessions for the user
     */
    @Get('sessions')
    async getSessions(@Req() req: AuthenticatedRequest) {
        return this.chatService.getSessions(req.user.id);
    }

    /**
     * POST /chats/sessions
     * Start a new chat session with a persona
     */
    @Post('sessions')
    async startSession(
        @Req() req: AuthenticatedRequest,
        @Body() dto: StartSessionDto,
    ) {
        return this.chatService.getOrCreateSession(req.user.id, dto.personaId);
    }

    /**
     * GET /chats/:sessionId/history
     * Get chat history for a session
     */
    @Get(':sessionId/history')
    async getHistory(
        @Req() req: AuthenticatedRequest,
        @Param('sessionId') sessionId: string,
        @Query('limit') limit?: string,
    ) {
        return this.chatService.getHistory(
            req.user.id,
            sessionId,
            limit ? parseInt(limit, 10) : 20,
        );
    }

    /**
     * POST /chats/:sessionId/messages
     * Send a message (REST alternative to WebSocket)
     */
    @Post(':sessionId/messages')
    async sendMessage(
        @Req() req: AuthenticatedRequest,
        @Param('sessionId') sessionId: string,
        @Body() dto: SendMessageDto,
    ) {
        return this.chatService.sendMessage(req.user.id, sessionId, dto.content);
    }
}
