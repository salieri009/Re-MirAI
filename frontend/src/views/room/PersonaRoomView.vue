<template>
  <div class="min-h-screen bg-akashic" style="padding: var(--container-padding);">
    <!-- Loading State (Nielsen: System Status Visibility) -->
    <div 
      v-if="isLoading" 
      class="min-h-screen flex items-center justify-center"
      role="status" 
      aria-live="polite" 
      aria-label="Loading persona room"
    >
      <div style="display: flex; flex-direction: column; gap: var(--subsection-spacing);">
        <LoadingSkeleton type="header" />
        <LoadingSkeleton type="persona" />
        <LoadingSkeleton type="card" />
        <div class="sr-only">Loading {{ persona?.name || 'persona' }}'s room...</div>
      </div>
    </div>

    <!-- Error State (Nielsen: Error Recovery) -->
    <div v-else-if="error" class="card border-red-500/50 bg-red-500/10" role="alert" aria-live="assertive">
      <div class="flex items-center" style="gap: var(--element-spacing);">
        <div class="flex-shrink-0 text-red-400 text-xl" role="img" aria-label="Error">⚠️</div>
        <div class="flex-1">
          <h3 class="font-semibold text-red-300 mb-1">Unable to load persona room</h3>
          <p class="text-red-400 text-sm">{{ error }}</p>
          <button 
            @click="handleRetry" 
            class="mt-3 text-sm text-red-300 hover:text-red-200 underline focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Try again
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="persona" style="display: flex; flex-direction: column; gap: var(--section-spacing);">
      <!-- Header with Breadcrumb (Nielsen: User Control & Freedom) -->
      <header role="banner" style="display: flex; flex-direction: column; gap: var(--element-spacing);">
        <!-- Breadcrumb Navigation -->
        <nav aria-label="Breadcrumb" class="text-sm">
          <ol class="flex items-center" style="gap: var(--text-spacing);">
            <li>
              <button 
                @click="goToDashboard" 
                class="text-indigo-400 hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                aria-label="Return to dashboard"
              >
                Dashboard
              </button>
            </li>
            <li class="text-muted" aria-hidden="true">→</li>
            <li class="text-white font-medium" aria-current="page">{{ persona.name }}'s Room</li>
          </ol>
        </nav>
        
        <!-- Page Title -->
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gradient" style="margin-bottom: var(--micro-spacing);">
              {{ persona.name }}'s Room
            </h1>
            <p class="text-secondary text-sm">
              Interact with your AI persona and complete quests
            </p>
          </div>
          
          <!-- Quick Actions -->
          <div class="flex items-center" style="gap: var(--tight-spacing);">
            <Button 
              variant="ghost" 
              size="sm" 
              @click="goToDashboard"
              aria-label="Return to main dashboard"
            >
              <svg class="w-4 h-4" style="margin-right: var(--micro-spacing);" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Back
            </Button>
          </div>
        </div>
      </header>

      <!-- Main Content Grid (4-Point Grid Applied) -->
      <main 
        class="grid lg:grid-cols-3" 
        style="gap: var(--card-spacing);"
        role="main"
        aria-label="Persona room content"
      >
        <!-- Persona Display (Nielsen: Recognition rather than recall) -->
        <section 
          class="lg:col-span-2" 
          role="region"
          aria-labelledby="persona-display-heading"
        >
          <div 
            class="card hover:shadow-xl transition-shadow duration-300" 
            style="padding: var(--card-padding);"
          >
            <div class="sr-only">
              <h2 id="persona-display-heading">{{ persona.name }} character information</h2>
            </div>
            <PersonaCard :persona="persona" size="full" />
            
            <!-- Persona Status Indicator -->
            <div 
              class="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between"
              style="margin-top: var(--element-spacing); padding-top: var(--element-spacing);"
            >
              <div class="flex items-center" style="gap: var(--tight-spacing);">
                <div 
                  class="w-3 h-3 bg-green-400 rounded-full animate-pulse" 
                  role="img" 
                  aria-label="Online status"
                ></div>
                <span class="text-sm text-secondary">{{ persona.name }} is ready to chat</span>
              </div>
              <div class="text-xs text-muted">
                Last interaction: {{ formatLastInteraction() }}
              </div>
            </div>
          </div>
        </section>

        <!-- Sidebar: Actions & Quests (Nielsen: Aesthetic & Minimalist Design) -->
        <aside 
          class="space-y-4" 
          style="display: flex; flex-direction: column; gap: var(--card-spacing);"
          role="complementary"
          aria-label="Persona actions and quests"
        >
          <!-- Primary Actions -->
          <section 
            class="card" 
            style="padding: var(--card-padding);"
            role="region"
            aria-labelledby="actions-heading"
          >
            <h2 id="actions-heading" class="text-xl font-semibold text-white" style="margin-bottom: var(--element-spacing);">
              Interact with {{ persona.name }}
            </h2>
            <div style="display: flex; flex-direction: column; gap: var(--tight-spacing);">
              <Button 
                class="w-full" 
                @click="goToChat"
                aria-describedby="chat-description"
              >
                <svg class="w-4 h-4" style="margin-right: var(--tight-spacing);" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                Start Conversation
              </Button>
              
              <Button 
                variant="secondary" 
                class="w-full" 
                @click="sharePersona"
                :disabled="isSharing"
                :loading="isSharing"
                aria-describedby="share-description"
              >
                <svg class="w-4 h-4" style="margin-right: var(--tight-spacing);" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                </svg>
                Share Profile
              </Button>
            </div>
            
            <!-- Action Descriptions (Nielsen: Help and Documentation) -->
            <div class="sr-only">
              <div id="chat-description">Start a conversation with {{ persona.name }} in a dedicated chat interface</div>
              <div id="share-description">Share {{ persona.name }}'s profile card with friends</div>
            </div>
            
            <!-- Success/Error Feedback -->
            <div 
              v-if="shareMessage" 
              class="mt-4 p-3 rounded-lg"
              :class="shareMessage.type === 'success' ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'"
              role="status"
              aria-live="polite"
            >
              <div class="flex items-center" style="gap: var(--tight-spacing);">
                <div 
                  class="text-sm"
                  :class="shareMessage.type === 'success' ? 'text-green-300' : 'text-red-300'"
                >
                  {{ shareMessage.text }}
                </div>
                <button 
                  @click="dismissMessage"
                  class="text-xs opacity-60 hover:opacity-100"
                  aria-label="Dismiss message"
                >
                  ✕
                </button>
              </div>
            </div>
          </section>

          <!-- Quests Section (Nielsen: System Status Visibility) -->
          <section 
            class="card" 
            style="padding: var(--card-padding);"
            role="region"
            aria-labelledby="quests-heading"
          >
            <div class="flex items-center justify-between" style="margin-bottom: var(--element-spacing);">
              <h2 id="quests-heading" class="text-xl font-semibold text-white">
                First Steps
              </h2>
              <div class="text-sm text-secondary">
                {{ completedQuests }}/{{ totalQuests }} completed
              </div>
            </div>
            
            <!-- Quest Loading State -->
            <div v-if="questsLoading" class="text-center" style="padding: var(--element-spacing);">
              <LoadingSkeleton type="card" />
              <div class="sr-only">Loading available quests...</div>
            </div>
            
            <!-- Quest List -->
            <div v-else-if="activeQuests.length > 0" style="display: flex; flex-direction: column; gap: var(--tight-spacing);">
              <div
                v-for="quest in activeQuests"
                :key="quest.id"
                class="quest-item rounded-lg border transition-colors duration-200"
                :class="quest.status === 'completed' ? 'bg-green-500/10 border-green-500/30' : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50'"
                style="padding: var(--tight-spacing);"
                role="article"
                :aria-labelledby="`quest-${quest.id}-title`"
                :tabindex="quest.status === 'completed' ? -1 : 0"
              >
                <div class="flex items-start justify-between" style="margin-bottom: var(--micro-spacing);">
                  <h3 
                    :id="`quest-${quest.id}-title`" 
                    class="font-semibold text-sm"
                    :class="quest.status === 'completed' ? 'text-green-300' : 'text-white'"
                  >
                    {{ quest.title }}
                  </h3>
                  <div 
                    v-if="quest.status === 'completed'" 
                    class="text-green-400 text-xs font-medium"
                    role="img"
                    aria-label="Completed"
                  >
                    ✓
                  </div>
                </div>
                
                <p 
                  class="text-xs text-secondary" 
                  style="margin-bottom: var(--tight-spacing);"
                >
                  {{ quest.description }}
                </p>
                
                <div class="flex items-center justify-between">
                  <div class="text-xs text-indigo-400">
                    <span role="img" aria-label="Reward">🎁</span>
                    {{ quest.reward.amount }} {{ quest.reward.type }}
                  </div>
                  
                  <Button 
                    v-if="quest.status !== 'completed'"
                    size="sm" 
                    variant="ghost" 
                    @click="completeQuest(quest.id)"
                    :loading="completingQuest === quest.id"
                    :aria-label="`Complete quest: ${quest.title}`"
                  >
                    Complete
                  </Button>
                  <span v-else class="text-xs text-green-300">Completed</span>
                </div>
              </div>
            </div>
            
            <!-- Empty State -->
            <div v-else class="text-center text-secondary" style="padding: var(--subsection-spacing);">
              <div class="text-4xl mb-2">🎯</div>
              <p>All quests completed!</p>
              <p class="text-xs mt-1">Check back later for new challenges</p>
            </div>
          </section>
        </aside>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePersonaStore } from '@/stores/persona'
import { useQuestStore } from '@/stores/quest'
import Button from '@/components/common/Button.vue'
import PersonaCard from '@/components/common/PersonaCard.vue'
import LoadingSkeleton from '@/components/common/LoadingSkeleton.vue'

// Stores and router
const router = useRouter()
const personaStore = usePersonaStore()
const questStore = useQuestStore()

// Reactive state for UI feedback (Nielsen: System Status Visibility)
const isSharing = ref(false)
const completingQuest = ref<string | null>(null)
const shareMessage = ref<{ type: 'success' | 'error', text: string } | null>(null)
const error = ref<string | null>(null)

// Computed properties
const isLoading = computed(() => personaStore.isLoading || questStore.isLoading)
const persona = computed(() => {
  if (personaStore.persona && 'status' in personaStore.persona && personaStore.persona.status === 'ready') {
    return personaStore.persona
  }
  return null
})
const activeQuests = computed(() => questStore.activeQuests || [])
const questsLoading = computed(() => questStore.isLoading)

// Quest progress tracking (Nielsen: System Status Visibility)
const completedQuests = computed(() => 
  activeQuests.value.filter(quest => quest.status === 'completed').length
)
const totalQuests = computed(() => activeQuests.value.length)

// Initialize data
onMounted(async () => {
  try {
    error.value = null
    await Promise.all([
      personaStore.fetchPersona(),
      questStore.fetchQuests(),
    ])
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load persona room'
    console.error('Error loading persona room:', err)
  }
})

// Navigation functions (Nielsen: User Control & Freedom)
const goToChat = () => {
  if (persona.value) {
    router.push(`/chat/${persona.value.id}`)
  }
}

const goToDashboard = () => {
  router.push('/dashboard')
}

// Share functionality with proper feedback (Nielsen: Error Prevention & Recovery)
const sharePersona = async () => {
  if (!persona.value) return
  
  isSharing.value = true
  shareMessage.value = null
  
  try {
    // Create shareable URL
    const shareUrl = `${window.location.origin}/profile/${persona.value.id}`
    const shareText = `Check out my AI Persona: ${persona.value.name}!`
    
    // Try native Web Share API first
    if (navigator.share) {
      await navigator.share({
        title: `${persona.value.name} - AI Persona`,
        text: shareText,
        url: shareUrl,
      })
      shareMessage.value = {
        type: 'success',
        text: 'Profile shared successfully!'
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
      shareMessage.value = {
        type: 'success',
        text: 'Link copied to clipboard!'
      }
    }
  } catch (err) {
    // Handle user cancellation or errors gracefully
    if (err instanceof Error && err.name !== 'AbortError') {
      shareMessage.value = {
        type: 'error',
        text: 'Failed to share. Please try again.'
      }
    }
  } finally {
    isSharing.value = false
    
    // Auto-dismiss success messages after 3 seconds
    if (shareMessage.value?.type === 'success') {
      setTimeout(() => {
        shareMessage.value = null
      }, 3000)
    }
  }
}

// Quest completion with loading state (Nielsen: System Status Visibility)
const completeQuest = async (questId: string) => {
  completingQuest.value = questId
  
  try {
    await questStore.completeQuest(questId)
    
    // Show success feedback
    shareMessage.value = {
      type: 'success',
      text: 'Quest completed! Reward earned.'
    }
    
    // Auto-dismiss after 2 seconds
    setTimeout(() => {
      shareMessage.value = null
    }, 2000)
    
  } catch (err) {
    console.error('Failed to complete quest:', err)
    shareMessage.value = {
      type: 'error',
      text: 'Failed to complete quest. Please try again.'
    }
  } finally {
    completingQuest.value = null
  }
}

// Utility functions
const formatLastInteraction = (): string => {
  // Mock implementation - in real app, this would use actual data
  return 'Just now'
}

// Error recovery (Nielsen: Help users recover from errors)
const handleRetry = async () => {
  try {
    error.value = null
    await Promise.all([
      personaStore.fetchPersona(),
      questStore.fetchQuests(),
    ])
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to reload persona room'
    console.error('Retry failed:', err)
  }
}

// Message management
const dismissMessage = () => {
  shareMessage.value = null
}
</script>

<style scoped>
/* Quest item animations (Nielsen: Aesthetic & Minimalist Design) */
.quest-item {
  transition: all 0.2s ease-out;
}

.quest-item:hover:not(.completed) {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}

.quest-item:focus {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* Status indicator animation */
@keyframes statusPulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: statusPulse 2s ease-in-out infinite;
}
</style>