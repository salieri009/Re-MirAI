<template>
  <div class="container-page">
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gradient">The Ritual</h1>
        <p class="text-secondary mt-2">Prepare the vessel for your summoning</p>
      </div>

      <div v-if="!hasActiveRitual" class="card text-center space-y-6">
        <p class="text-xl text-secondary">Your vessel is empty. Let's begin the summoning ritual.</p>
        <Button size="lg" @click="createRitual" :loading="isLoading">
          Prepare the Vessel
        </Button>
      </div>

      <div v-else class="space-y-6">
        <!-- Ritual Progress -->
        <div class="card">
          <h2 class="text-2xl font-bold mb-4">Ritual in Progress</h2>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between mb-2">
                <span class="text-secondary">Crystals Gathered</span>
                <span class="font-bold">
                  {{ currentRitual?.responsesCount }} / {{ currentRitual?.minimumResponses }}
                </span>
              </div>
              <div class="h-4 progress-bg rounded-full overflow-hidden">
                <div
                  class="h-full progress-mystical rounded-full transition-all"
                  :style="{ width: `${responsesProgress}%` }"
                ></div>
              </div>
            </div>

            <div class="mt-6">
              <label class="block text-sm font-medium text-secondary mb-2">
                Invitation Link
              </label>
              <div class="flex gap-2">
                <input
                  :value="currentRitual?.invitationUrl"
                  readonly
                  class="input flex-1"
                />
                <ShareButton :url="currentRitual?.invitationUrl || ''" />
              </div>
            </div>

            <div v-if="canSummon" class="mt-6">
              <Button size="lg" @click="goToSummon">
                Begin Summoning
              </Button>
            </div>
            <div v-else class="mt-6">
              <Button size="lg" disabled>
                Begin Summoning ({{ (currentRitual?.minimumResponses || 3) - (currentRitual?.responsesCount || 0) }} more needed)
              </Button>
            </div>
          </div>
        </div>

        <!-- Practice Summon -->
        <div class="card">
          <h2 class="text-2xl font-bold mb-4">Impatient? Perform a Practice Summon</h2>
          <p class="text-secondary mb-6">
            Complete a short self-reflection survey to get a low-rarity Proto-Persona while waiting for your friends.
          </p>
          <Button variant="secondary" @click="startPracticeSummon">
            Start Practice Summon
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRitualStore } from '@/stores/ritual'
import Button from '@/components/common/Button.vue'
import ShareButton from '@/components/common/ShareButton.vue'

const router = useRouter()
const ritualStore = useRitualStore()

const isLoading = computed(() => ritualStore.isLoading)
const hasActiveRitual = computed(() => ritualStore.hasActiveRitual)
const currentRitual = computed(() => ritualStore.currentRitual)
const canSummon = computed(() => ritualStore.canSummon)
const responsesProgress = computed(() => ritualStore.responsesProgress)

onMounted(async () => {
  await ritualStore.fetchMyRitual()
})

const createRitual = async () => {
  try {
    await ritualStore.createRitual()
  } catch (err) {
    console.error('Failed to create ritual:', err)
  }
}

const goToSummon = () => {
  router.push('/summon')
}

const startPracticeSummon = () => {
  // TODO: Navigate to practice summon page or show modal
  alert('Practice summon feature coming soon!')
}
</script>