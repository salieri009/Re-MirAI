import { Module, Global } from '@nestjs/common';
import { OpenAIService } from './openai.service';

/**
 * OpenAI Module
 * 
 * Provides AI capabilities for persona synthesis and chat.
 * Global module - available throughout the application.
 */
@Global()
@Module({
    providers: [OpenAIService],
    exports: [OpenAIService],
})
export class OpenAIModule { }
