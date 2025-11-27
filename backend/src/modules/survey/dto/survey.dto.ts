// DTOs for Survey API
export class CreateSurveyDto {
  title?: string;
  minResponses?: number;
}

export class SurveyResponseDto {
  id: string;
  userId: string;
  status: string;
  title?: string;
  shareableLink: string;
  minResponses: number;
  responseCount: number;
  createdAt: Date;
  expiresAt: Date;
}

export class SubmitResponseDto {
  answers: Record<string, any>; // Flexible JSON structure
  fingerprintHash: string;
}

export class PublicSurveyDto {
  id: string;
  title?: string;
  expiresAt: Date;
  questions: SurveyQuestion[];
}

export interface SurveyQuestion {
  id: string;
  type: 'text' | 'choice' | 'scale';
  question: string;
  options?: string[];
}
