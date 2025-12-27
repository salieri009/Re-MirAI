import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateSurveyDto,
  PublicSurveyDto,
  SubmitResponseDto,
  SurveyQuestion,
  SurveyResponseDto,
} from './dto/survey.dto';

type SurveyWithResponses = Prisma.SurveyGetPayload<{
  include: { responses: true };
}>;

@Injectable()
export class SurveyService {
  constructor(private prisma: PrismaService) { }

  // Default survey questions (hardcoded for MVP)
  private readonly defaultQuestions: SurveyQuestion[] = [
    {
      id: 'q1',
      type: 'text',
      question: 'What is one word that describes this person?',
    },
    {
      id: 'q2',
      type: 'choice',
      question: 'If this person were a character archetype, they would be:',
      options: [
        'The Leader',
        'The Artist',
        'The Sage',
        'The Rebel',
        'The Caregiver',
      ],
    },
    {
      id: 'q3',
      type: 'scale',
      question: 'Rate their charisma (1-10)',
    },
    {
      id: 'q4',
      type: 'text',
      question: 'What is their most memorable quality?',
    },
    {
      id: 'q5',
      type: 'text',
      question: 'How would you describe their energy?',
    },
  ];

  async createSurvey(
    userId: string,
    dto: CreateSurveyDto,
  ): Promise<SurveyResponseDto> {
    const shareableLink = nanoid(10);

    const survey: SurveyWithResponses = await this.prisma.survey.create({
      data: {
        userId,
        title: dto.title ?? null,
        minResponses: dto.minResponses ?? 3,
        shareableLink,
        status: 'COLLECTING',
      },
      include: { responses: true },
    });

    return this.mapToResponseDto(survey);
  }

  async getMySurveys(userId: string): Promise<SurveyResponseDto[]> {
    const surveys: SurveyWithResponses[] = await this.prisma.survey.findMany({
      where: { userId },
      include: { responses: true },
      orderBy: { createdAt: 'desc' },
    });

    return surveys.map((survey) => this.mapToResponseDto(survey));
  }

  async getPublicSurvey(linkOrId: string): Promise<PublicSurveyDto> {
    const survey = await this.prisma.survey.findFirst({
      where: {
        OR: [{ id: linkOrId }, { shareableLink: linkOrId }],
        status: 'COLLECTING',
      },
    });

    if (!survey) {
      throw new NotFoundException(
        'Survey not found or no longer accepting responses',
      );
    }

    return {
      id: survey.id,
      title: survey.title ?? undefined,
      expiresAt: survey.expiresAt,
      questions: this.defaultQuestions,
    };
  }

  async submitResponse(
    surveyId: string,
    dto: SubmitResponseDto,
  ): Promise<void> {
    const survey = await this.prisma.survey.findUnique({
      where: { id: surveyId },
      include: { responses: true },
    });

    if (!survey) {
      throw new NotFoundException('Survey not found');
    }

    if (survey.status !== 'COLLECTING') {
      throw new BadRequestException(
        'This survey is no longer accepting responses',
      );
    }

    // Check if this fingerprint already submitted
    const existingResponse = survey.responses.find(
      (response) => response.fingerprintHash === dto.fingerprintHash,
    );

    if (existingResponse) {
      throw new BadRequestException('You have already submitted a response');
    }

    // Create response
    await this.prisma.surveyResponse.create({
      data: {
        surveyId,
        answers: dto.answers as Prisma.InputJsonValue,
        fingerprintHash: dto.fingerprintHash,
      },
    });

    // Check if we've reached the minimum responses
    const totalResponses = survey.responses.length + 1;
    if (
      totalResponses >= survey.minResponses &&
      survey.status === 'COLLECTING'
    ) {
      await this.prisma.survey.update({
        where: { id: surveyId },
        data: { status: 'READY' },
      });
    }
  }

  private mapToResponseDto(survey: SurveyWithResponses): SurveyResponseDto {
    const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';
    const shareable = survey.shareableLink ?? survey.id;

    return {
      id: survey.id,
      userId: survey.userId,
      status: survey.status,
      title: survey.title ?? undefined,
      shareableLink: `${frontendUrl}/ritual/${shareable}`,
      minResponses: survey.minResponses,
      responseCount: survey.responses.length,
      createdAt: survey.createdAt,
      expiresAt: survey.expiresAt,
    };
  }

  /**
   * Get survey status for owner (matches API spec)
   */
  async getSurveyStatus(surveyId: string, userId: string) {
    const survey = await this.prisma.survey.findFirst({
      where: {
        id: surveyId,
        userId, // Owner only
      },
      include: { responses: true },
    });

    if (!survey) {
      throw new NotFoundException('Survey not found or access denied');
    }

    return {
      id: survey.id,
      status: survey.status,
      responsesCount: survey.responses.length,
      canCreatePersona: survey.responses.length >= survey.minResponses,
      threshold: survey.minResponses,
    };
  }
}
