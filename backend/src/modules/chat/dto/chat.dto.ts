import { IsString, IsOptional, IsUUID } from 'class-validator';

/**
 * DTO for sending a chat message
 */
export class SendMessageDto {
    @IsString()
    content: string;
}

/**
 * DTO for starting a new chat session
 */
export class StartSessionDto {
    @IsUUID()
    personaId: string;
}

/**
 * Chat message response
 */
export interface ChatMessageDto {
    id: string;
    sender: 'USER' | 'AI';
    content: string;
    createdAt: Date;
}

/**
 * Chat session info
 */
export interface ChatSessionDto {
    id: string;
    personaId: string;
    personaName: string;
    startedAt: Date;
    lastMsgAt: Date;
}

/**
 * Chat history response
 */
export interface ChatHistoryDto {
    sessionId: string;
    messages: ChatMessageDto[];
}
