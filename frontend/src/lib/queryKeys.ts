export const queryKeys = {
  auth: {
    session: ['auth', 'session'] as const,
  },
  rituals: {
    all: ['rituals'] as const,
    mine: ['rituals', 'mine'] as const,
    status: (surveyId: string | null) => ['rituals', 'status', surveyId] as const,
  },
  surveys: {
    detail: (surveyId: string | null) => ['surveys', 'detail', surveyId] as const,
    public: (surveyId: string | null) => ['surveys', 'public', surveyId] as const,
  },
  summons: {
    detail: (surveyId: string | null) => ['summons', 'detail', surveyId] as const,
  },
  personas: {
    all: ['personas'] as const,
    detail: (id: string | null) => ['personas', 'detail', id] as const,
    list: ['personas', 'list'] as const,
  },
  quests: {
    all: ['quests'] as const,
    active: ['quests', 'active'] as const,
  },
  chat: {
    sessions: ['chat', 'sessions'] as const,
    history: (sessionId: string | null) => ['chat', 'history', sessionId] as const,
    bond: (personaId: string | null) => ['chat', 'bond', personaId] as const,
  },
  social: {
    compatibility: (personaId: string | null) => ['social', 'compatibility', personaId] as const,
    rooms: (userId: string | null) => ['social', 'rooms', userId] as const,
  },
} as const;
