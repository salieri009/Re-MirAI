import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

/**
 * Chat Module
 * 
 * Handles real-time chat with personas (F-003).
 * Includes WebSocket gateway and REST endpoints.
 */
@Module({
    controllers: [ChatController],
    providers: [ChatService, ChatGateway],
    exports: [ChatService],
})
export class ChatModule { }
