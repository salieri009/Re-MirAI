import { IsString, IsOptional, IsEnum, IsObject } from 'class-validator';

/**
 * Synthesis mode for persona creation
 */
export enum SynthesisMode {
    FATED = 'FATED',     // Auto-determined archetype
    ALCHEMIC = 'ALCHEMIC', // User-selected archetype
}

/**
 * Request DTO for persona synthesis
 */
export class SynthesizePersonaDto {
    @IsString()
    surveyId: string;

    @IsEnum(SynthesisMode)
    mode: SynthesisMode = SynthesisMode.FATED;

    @IsOptional()
    @IsObject()
    modifiers?: {
        archetype?: string;
    };
}

/**
 * Stats structure
 */
export interface PersonaStats {
    charisma: number;
    intellect: number;
    kindness: number;
    energy: number;
}

/**
 * Response DTO for persona
 */
export class PersonaResponseDto {
    id: string;
    name: string;
    archetype: string;
    rarity: string;
    stats: PersonaStats;
    greeting?: string;
    bondLevel?: number;
    createdAt: Date;
}

/**
 * Detailed persona response (for GET /personas/:id)
 */
export class PersonaDetailDto extends PersonaResponseDto {
    systemPrompt: string;
    surveyId?: string;
}
