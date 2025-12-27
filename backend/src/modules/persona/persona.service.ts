import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OpenAIService } from '../openai/openai.service';
import { SynthesizePersonaDto, PersonaResponseDto, PersonaDetailDto, SynthesisMode } from './dto/persona.dto';

/**
 * Persona Service
 * 
 * Handles persona synthesis and management.
 * Uses OpenAI for generating persona characteristics.
 */
@Injectable()
export class PersonaService {
    constructor(
        private prisma: PrismaService,
        private openai: OpenAIService,
    ) { }

    /**
     * Synthesize a new persona from survey responses (F-002)
     */
    async synthesize(userId: string, dto: SynthesizePersonaDto): Promise<PersonaResponseDto> {
        // Get survey with responses
        const survey = await this.prisma.survey.findFirst({
            where: {
                id: dto.surveyId,
                userId, // Owner only
            },
            include: { responses: true },
        });

        if (!survey) {
            throw new NotFoundException('Survey not found');
        }

        // Check minimum responses
        if (survey.responses.length < survey.minResponses) {
            throw new BadRequestException(
                `Insufficient responses. Need ${survey.minResponses}, have ${survey.responses.length}`,
            );
        }

        // Check if survey is ready
        if (survey.status !== 'READY' && survey.status !== 'COLLECTING') {
            throw new BadRequestException('Survey is not in a valid state for synthesis');
        }

        // Prepare survey data for AI
        const surveyData = {
            responses: survey.responses.map((r) => ({
                question: 'Survey response',
                answer: r.answers,
            })),
            mode: dto.mode,
            archetype: dto.modifiers?.archetype,
        };

        // Generate persona using AI
        const generated = await this.openai.generatePersona(surveyData);

        // Create persona in database
        const persona = await this.prisma.persona.create({
            data: {
                userId,
                surveyId: dto.surveyId,
                name: generated.name,
                archetype: generated.archetype,
                statCharisma: generated.stats.charisma,
                statIntellect: generated.stats.intellect,
                statKindness: generated.stats.kindness,
                statEnergy: generated.stats.energy,
                systemPrompt: generated.systemPrompt,
                greetingMessage: generated.greeting,
                rarity: generated.rarity,
                bondLevel: 0,
            },
        });

        // Update survey status
        await this.prisma.survey.update({
            where: { id: dto.surveyId },
            data: { status: 'COMPLETED' },
        });

        return this.mapToResponseDto(persona, generated.greeting);
    }

    /**
     * Get all personas for a user
     */
    async findAll(userId: string): Promise<PersonaResponseDto[]> {
        const personas = await this.prisma.persona.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });

        return personas.map((p) => this.mapToResponseDto(p));
    }

    /**
     * Get a single persona by ID
     */
    async findOne(id: string, userId: string): Promise<PersonaDetailDto> {
        const persona = await this.prisma.persona.findFirst({
            where: { id, userId },
        });

        if (!persona) {
            throw new NotFoundException('Persona not found');
        }

        return {
            id: persona.id,
            name: persona.name,
            archetype: persona.archetype,
            rarity: persona.rarity,
            stats: {
                charisma: persona.statCharisma,
                intellect: persona.statIntellect,
                kindness: persona.statKindness,
                energy: persona.statEnergy,
            },
            greeting: persona.greetingMessage ?? undefined,
            bondLevel: persona.bondLevel,
            systemPrompt: persona.systemPrompt,
            surveyId: persona.surveyId ?? undefined,
            createdAt: persona.createdAt,
        };
    }

    /**
     * Map Prisma persona to response DTO
     */
    private mapToResponseDto(persona: any, greeting?: string): PersonaResponseDto {
        return {
            id: persona.id,
            name: persona.name,
            archetype: persona.archetype,
            rarity: persona.rarity,
            stats: {
                charisma: persona.statCharisma,
                intellect: persona.statIntellect,
                kindness: persona.statKindness,
                energy: persona.statEnergy,
            },
            greeting: greeting ?? persona.greetingMessage,
            bondLevel: persona.bondLevel,
            createdAt: persona.createdAt,
        };
    }
}
