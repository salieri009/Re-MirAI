import { Injectable } from '@nestjs/common';
import { Survey, SurveyResponse, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseRepository } from './base.repository';

export type SurveyWithResponses = Survey & { responses: SurveyResponse[] };

/**
 * Survey Repository
 * 
 * Handles all database operations for Survey model.
 */
@Injectable()
export class SurveyRepository extends BaseRepository<Survey, Prisma.SurveyWhereUniqueInput> {
    constructor(prisma: PrismaService) {
        super(prisma, 'survey');
    }

    /**
     * Find survey by shareable link
     */
    async findByShareableLink(shareableLink: string): Promise<SurveyWithResponses | null> {
        return this.model.findUnique({
            where: { shareableLink },
            include: { responses: true },
        });
    }

    /**
     * Find all surveys for a user
     */
    async findByUserId(userId: string): Promise<SurveyWithResponses[]> {
        return this.model.findMany({
            where: { userId },
            include: { responses: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    /**
     * Create survey with generated shareable link
     */
    async createWithLink(
        userId: string,
        data: { title?: string; minResponses?: number },
    ): Promise<SurveyWithResponses> {
        const shareableLink = this.generateShareableLink();
        return this.model.create({
            data: {
                userId,
                shareableLink,
                ...data,
            },
            include: { responses: true },
        });
    }

    /**
     * Add response to survey
     */
    async addResponse(
        surveyId: string,
        response: { answers: any; fingerprintHash: string },
    ): Promise<SurveyResponse> {
        return this.prisma.surveyResponse.create({
            data: {
                surveyId,
                ...response,
            },
        });
    }

    /**
     * Update survey status
     */
    async updateStatus(surveyId: string, status: string): Promise<Survey> {
        return this.model.update({
            where: { id: surveyId },
            data: { status },
        });
    }

    /**
     * Generate unique shareable link
     */
    private generateShareableLink(): string {
        return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
    }
}
