import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
    MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';

/**
 * Chat Gateway (WebSocket)
 * 
 * Handles real-time chat events (F-003).
 * Events:
 * - chat:join - Join a chat session
 * - chat:message - Send a message
 * - chat:response - Receive AI response
 */
@WebSocketGateway({
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
    },
    namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private userSockets: Map<string, string> = new Map(); // socketId -> userId

    constructor(private chatService: ChatService) { }

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.userSockets.delete(client.id);
        console.log(`Client disconnected: ${client.id}`);
    }

    /**
     * Authenticate and register user with socket
     */
    @SubscribeMessage('chat:auth')
    handleAuth(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { userId: string },
    ) {
        this.userSockets.set(client.id, data.userId);
        return { success: true };
    }

    /**
     * Join a chat session room
     */
    @SubscribeMessage('chat:join')
    async handleJoin(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { personaId: string },
    ) {
        const userId = this.userSockets.get(client.id);
        if (!userId) {
            return { error: 'Not authenticated' };
        }

        try {
            const session = await this.chatService.getOrCreateSession(userId, data.personaId);
            client.join(`session:${session.id}`);
            return { success: true, session };
        } catch (error) {
            return { error: error.message };
        }
    }

    /**
     * Handle incoming chat message
     */
    @SubscribeMessage('chat:message')
    async handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { sessionId: string; content: string },
    ) {
        const userId = this.userSockets.get(client.id);
        if (!userId) {
            return { error: 'Not authenticated' };
        }

        try {
            const result = await this.chatService.sendMessage(
                userId,
                data.sessionId,
                data.content,
            );

            // Emit AI response to the session room
            this.server
                .to(`session:${data.sessionId}`)
                .emit('chat:response', result.aiMessage);

            return { success: true, userMessage: result.userMessage };
        } catch (error) {
            return { error: error.message };
        }
    }
}
