import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { SurveyService } from './survey.service';
import { CreateSurveyDto, SubmitResponseDto } from './dto/survey.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) { }

  // Create new survey (ritual)
  @Post()
  @UseGuards(JwtAuthGuard)
  async createSurvey(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateSurveyDto,
  ) {
    return this.surveyService.createSurvey(req.user.id, dto);
  }

  // Get my surveys
  @Get('my')
  @UseGuards(JwtAuthGuard)
  async getMySurveys(@Req() req: AuthenticatedRequest) {
    return this.surveyService.getMySurveys(req.user.id);
  }

  // Get public survey (for respondents) - no auth required
  @Get(':linkOrId/public')
  async getPublicSurvey(@Param('linkOrId') linkOrId: string) {
    return this.surveyService.getPublicSurvey(linkOrId);
  }

  // Submit survey response - no auth required (anonymous)
  @Post(':id/responses')
  async submitResponse(
    @Param('id') surveyId: string,
    @Body() dto: SubmitResponseDto,
  ) {
    await this.surveyService.submitResponse(surveyId, dto);
    return { message: 'Response submitted successfully' };
  }
}
