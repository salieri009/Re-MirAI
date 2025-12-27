import { Module } from '@nestjs/common';
import { PersonaController } from './persona.controller';
import { PersonaService } from './persona.service';

/**
 * Persona Module
 * 
 * Handles persona synthesis and management (F-002).
 */
@Module({
    controllers: [PersonaController],
    providers: [PersonaService],
    exports: [PersonaService],
})
export class PersonaModule { }
