// Mock data for Survey System (F-001)
// TODO: Replace with actual API calls when backend is ready

export interface Survey {
  id: string;
  url: string;
  status: 'ACTIVE' | 'COMPLETED';
  createdAt: string;
  expiresAt: string;
}

export interface SurveyStatus {
  id: string;
  status: 'ACTIVE' | 'COMPLETED';
  responsesCount: number;
  canCreatePersona: boolean;
  threshold: number;
}

export interface SurveyQuestion {
  id: number;
  type: 'likert';
  text: string;
  scale: {
    min: number;
    max: number;
  };
}

export interface SurveyDetail {
  id: string;
  questions: SurveyQuestion[];
  totalResponses: null | number;
}

// Mock Survey Questions (10-15 questions as per FR-001.2)
export const MOCK_SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: 1,
    type: 'likert',
    text: 'Is this person sociable?',
    scale: { min: 1, max: 5 }
  },
  {
    id: 2,
    type: 'likert',
    text: 'Is this person trustworthy?',
    scale: { min: 1, max: 5 }
  },
  {
    id: 3,
    type: 'likert',
    text: 'Is this person creative?',
    scale: { min: 1, max: 5 }
  },
  {
    id: 4,
    type: 'likert',
    text: 'Does this person have leadership qualities?',
    scale: { min: 1, max: 5 }
  },
  {
    id: 5,
    type: 'likert',
    text: 'Is this person empathetic?',
    scale: { min: 1, max: 5 }
  },
  {
    id: 6,
    type: 'likert',
    text: 'Does this person have a good sense of humor?',
    scale: { min: 1, max: 5 }
  },
  {
    id: 7,
    type: 'likert',
    text: 'Is this person responsible?',
    scale: { min: 1, max: 5 }
  },
  {
    id: 8,
    type: 'likert',
    text: 'Is this person proactive?',
    scale: { min: 1, max: 5 }
  },
  {
    id: 9,
    type: 'likert',
    text: 'Is this person considerate?',
    scale: { min: 1, max: 5 }
  },
  {
    id: 10,
    type: 'likert',
    text: 'Is this person passionate?',
    scale: { min: 1, max: 5 }
  },
  {
    id: 11,
    type: 'likert',
    text: 'Is this person calm?',
    scale: { min: 1, max: 5 }
  },
  {
    id: 12,
    type: 'likert',
    text: 'Is this person honest?',
    scale: { min: 1, max: 5 }
  }
];

// Mock Survey Status - State 1: Awaiting Responses
export const MOCK_SURVEY_STATUS_AWAITING: SurveyStatus = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  status: 'ACTIVE',
  responsesCount: 2,
  canCreatePersona: false,
  threshold: 3
};

// Mock Survey Status - State 2: Ready for Synthesis
export const MOCK_SURVEY_STATUS_READY: SurveyStatus = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  status: 'ACTIVE',
  responsesCount: 3,
  canCreatePersona: true,
  threshold: 3
};

// Mock Survey Status - State 3: Completed
export const MOCK_SURVEY_STATUS_COMPLETED: SurveyStatus = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  status: 'COMPLETED',
  responsesCount: 5,
  canCreatePersona: true,
  threshold: 3
};

// Mock Survey Creation Response
export const MOCK_SURVEY_CREATED: Survey = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  url: 'https://remirai.app/s/550e8400-e29b-41d4-a716-446655440000',
  status: 'ACTIVE',
  createdAt: '2025-11-24T12:00:00Z',
  expiresAt: '2025-12-24T12:00:00Z'
};

// Mock Survey Detail
export const MOCK_SURVEY_DETAIL: SurveyDetail = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  questions: MOCK_SURVEY_QUESTIONS,
  totalResponses: null
};




