import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

/**
 * OpenAI Service
 * 
 * Wrapper for OpenAI API providing:
 * - Persona synthesis (archetype, stats, system prompt)
 * - Chat response generation
 * - Content moderation
 */
@Injectable()
export class OpenAIService {
    private client: OpenAI;
    private model: string;

    constructor(private configService: ConfigService) {
        this.client = new OpenAI({
            apiKey: this.configService.get<string>('app.openai.apiKey'),
        });
        this.model = this.configService.get<string>('app.openai.model') ?? 'gpt-4o-mini';
    }

    /**
     * Generate persona from survey responses
     */
    async generatePersona(surveyData: {
        responses: Array<{ question: string; answer: any }>;
        mode: 'FATED' | 'ALCHEMIC';
        archetype?: string;
    }): Promise<{
        name: string;
        archetype: string;
        stats: { charisma: number; intellect: number; kindness: number; energy: number };
        systemPrompt: string;
        greeting: string;
        rarity: string;
    }> {
        const archetypes = ['PROTECTOR', 'SAGE', 'REBEL', 'ARTIST', 'CAREGIVER', 'MYSTIC', 'LEADER', 'TRICKSTER'];

        const prompt = `Analyze these survey responses about a person and create a persona profile.

Survey Responses:
${surveyData.responses.map(r => `Q: ${r.question}\nA: ${JSON.stringify(r.answer)}`).join('\n\n')}

Mode: ${surveyData.mode}
${surveyData.archetype ? `Selected Archetype: ${surveyData.archetype}` : ''}

Generate a JSON response with:
1. name: A unique name for this persona (creative, memorable)
2. archetype: One of [${archetypes.join(', ')}]
3. stats: Object with charisma, intellect, kindness, energy (0-100 each)
4. systemPrompt: A detailed personality description for AI roleplay (2-3 sentences)
5. greeting: A first message this persona would say (1 sentence, in character)
6. rarity: Based on uniqueness - COMMON, RARE, EPIC, or LEGENDARY

Respond ONLY with valid JSON, no markdown.`;

        try {
            const response = await this.client.chat.completions.create({
                model: this.model,
                messages: [
                    { role: 'system', content: 'You are a persona creation AI. Always respond with valid JSON only.' },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.8,
                max_tokens: 500,
            });

            const content = response.choices[0].message.content ?? '{}';
            return JSON.parse(content);
        } catch (error) {
            // Fallback persona if OpenAI fails
            return {
                name: 'Mysterious Stranger',
                archetype: 'MYSTIC',
                stats: { charisma: 50, intellect: 50, kindness: 50, energy: 50 },
                systemPrompt: 'You are a mysterious and thoughtful individual who speaks with wisdom.',
                greeting: 'We meet at last... I have been expecting you.',
                rarity: 'COMMON',
            };
        }
    }

    /**
     * Generate chat response from persona
     */
    async generateChatResponse(params: {
        systemPrompt: string;
        personaName: string;
        messages: Array<{ role: 'user' | 'assistant'; content: string }>;
        userMessage: string;
    }): Promise<string> {
        const systemMessage = `You are ${params.personaName}. ${params.systemPrompt}

Rules:
- Stay in character at all times
- Keep responses conversational (1-3 sentences)
- Never break character or mention you're an AI
- Be engaging and show personality`;

        try {
            const response = await this.client.chat.completions.create({
                model: this.model,
                messages: [
                    { role: 'system', content: systemMessage },
                    ...params.messages.slice(-10), // Last 10 messages for context
                    { role: 'user', content: params.userMessage }
                ],
                temperature: 0.7,
                max_tokens: 200,
            });

            return response.choices[0].message.content ?? 'Hmm... I seem to have lost my train of thought.';
        } catch (error) {
            return 'I need a moment to gather my thoughts...';
        }
    }

    /**
     * Check if content is safe
     */
    async moderateContent(text: string): Promise<{ safe: boolean; reason?: string }> {
        try {
            const response = await this.client.moderations.create({
                input: text,
            });

            const result = response.results[0];
            if (result.flagged) {
                const categories = Object.entries(result.categories)
                    .filter(([_, flagged]) => flagged)
                    .map(([category]) => category);
                return { safe: false, reason: `Flagged: ${categories.join(', ')}` };
            }

            return { safe: true };
        } catch (error) {
            return { safe: true }; // Default to safe if moderation fails
        }
    }
}
