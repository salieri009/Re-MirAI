import { defineStore } from 'pinia'
import { questService } from '@/services/api'
import type { Quest } from '@/mocks/data'

export const useQuestStore = defineStore('quest', {
  state: () => ({
    quests: [] as Quest[],
    isLoading: false,
    error: null as string | null,
  }),

  getters: {
    activeQuests: (state) => state.quests.filter((q) => q.status === 'not-started'),
    completedQuests: (state) => state.quests.filter((q) => q.status === 'completed'),
  },

  actions: {
    async fetchQuests() {
      this.isLoading = true
      this.error = null

      try {
        const response = await questService.getMyQuests()
        this.quests = response.quests
      } catch (error) {
        const err = error as { response?: { data?: { message?: string } } }
        this.error = err.response?.data?.message || 'Failed to fetch quests'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async completeQuest(questId: string) {
      this.isLoading = true
      this.error = null

      try {
        const response = await questService.completeQuest(questId)
        // Update quest status locally
        const quest = this.quests.find((q) => q.id === questId)
        if (quest) {
          quest.status = 'completed'
        }
        return response
      } catch (error) {
        const err = error as { response?: { data?: { message?: string } } }
        this.error = err.response?.data?.message || 'Failed to complete quest'
        throw error
      } finally {
        this.isLoading = false
      }
    },
  },
})

