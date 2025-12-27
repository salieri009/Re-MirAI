import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Req,
    UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { PersonaService } from './persona.service';
import { SynthesizePersonaDto } from './dto/persona.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface AuthenticatedRequest extends Request {
    user: { id: string };
}

/**
 * Persona Controller
 * 
 * Handles persona synthesis and retrieval.
 * All endpoints require authentication.
 */
@Controller('personas')
@UseGuards(JwtAuthGuard)
export class PersonaController {
    constructor(private readonly personaService: PersonaService) { }

    /**
     * POST /personas/synthesize
     * Create a new persona from survey data
     */
    @Post('synthesize')
    async synthesize(
        @Req() req: AuthenticatedRequest,
        @Body() dto: SynthesizePersonaDto,
    ) {
        return this.personaService.synthesize(req.user.id, dto);
    }

    /**
     * GET /personas
     * Get all personas for the current user
     */
    @Get()
    async findAll(@Req() req: AuthenticatedRequest) {
        return this.personaService.findAll(req.user.id);
    }

    /**
     * GET /personas/:id
     * Get a specific persona by ID
     */
    @Get(':id')
    async findOne(
        @Param('id') id: string,
        @Req() req: AuthenticatedRequest,
    ) {
        return this.personaService.findOne(id, req.user.id);
    }
}
