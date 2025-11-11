import { defineStore } from 'pinia';
import { ritualService } from '@/services/api';
export const useRitualStore = defineStore('ritual', {
    state: () => ({
        currentRitual: null,
        surveyQuestions: [],
        isLoading: false,
        error: null,
    }),
    getters: {
        hasActiveRitual: (state) => !!state.currentRitual,
        canSummon: (state) => state.currentRitual?.isSummonable || false,
        responsesProgress: (state) => {
            if (!state.currentRitual)
                return 0;
            return (state.currentRitual.responsesCount / state.currentRitual.minimumResponses) * 100;
        },
    },
    actions: {
        async createRitual() {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await ritualService.createRitual();
                await this.fetchMyRitual();
                return response;
            }
            catch (error) {
                const err = error;
                this.error = err.response?.data?.message || 'Failed to create ritual';
                throw error;
            }
            finally {
                this.isLoading = false;
            }
        },
        async fetchMyRitual() {
            this.isLoading = true;
            this.error = null;
            try {
                const ritual = await ritualService.getMyRitual();
                this.currentRitual = ritual;
            }
            catch (error) {
                const err = error;
                this.error = err.response?.data?.message || 'Failed to fetch ritual';
                throw error;
            }
            finally {
                this.isLoading = false;
            }
        },
        async fetchRitual(ritualId) {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await ritualService.getRitual(ritualId);
                this.surveyQuestions = response.questions;
                return response;
            }
            catch (error) {
                const err = error;
                this.error = err.response?.data?.message || 'Failed to fetch ritual';
                throw error;
            }
            finally {
                this.isLoading = false;
            }
        },
        async submitResponse(ritualId, answers) {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await ritualService.submitRitualResponse(ritualId, answers);
                return response;
            }
            catch (error) {
                const err = error;
                this.error = err.response?.data?.message || 'Failed to submit response';
                throw error;
            }
            finally {
                this.isLoading = false;
            }
        },
        async practiceSummon(answers) {
            this.isLoading = true;
            this.error = null;
            try {
                const persona = await ritualService.practiceSummon(answers);
                return persona;
            }
            catch (error) {
                const err = error;
                this.error = err.response?.data?.message || 'Failed to perform practice summon';
                throw error;
            }
            finally {
                this.isLoading = false;
            }
        },
    },
});
