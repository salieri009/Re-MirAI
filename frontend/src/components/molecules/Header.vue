<template>
  <header
    class="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm transition-all duration-200"
    :class="{ 'shadow-md': scrolled }"
  >
    <nav class="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
      <!-- Logo -->
      <Logo :clickable="true" @click="$emit('logo-click')" />

      <!-- Navigation Links (Desktop) -->
      <div v-if="showNavigation" class="hidden gap-6 md:flex">
        <a
          v-for="link in navigationLinks"
          :key="link.id"
          :href="link.href"
          class="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
          :aria-current="link.active ? 'page' : undefined"
        >
          {{ link.label }}
        </a>
      </div>

      <!-- Auth Actions -->
      <div class="flex items-center gap-3">
        <Button
          v-if="!isAuthenticated"
          size="sm"
          variant="secondary"
          @click="$emit('login-click')"
        >
          Sign In
        </Button>
        <Button
          v-if="!isAuthenticated"
          size="sm"
          @click="$emit('signup-click')"
        >
          Sign Up
        </Button>

        <!-- User Menu (when authenticated) -->
        <button
          v-if="isAuthenticated"
          class="flex items-center gap-2 rounded-full transition-colors hover:bg-slate-100"
          @click="toggleUserMenu"
          aria-label="User menu"
        >
          <div
            v-if="userAvatar"
            class="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600"
          />
          <IconUser v-else size="md" />
        </button>

        <!-- Mobile Menu Toggle -->
        <button
          class="md:hidden"
          @click="$emit('mobile-menu-toggle')"
          aria-label="Toggle mobile menu"
        >
          <IconMenu size="md" />
        </button>
      </div>
    </nav>

    <!-- User Menu Dropdown -->
    <div
      v-if="isAuthenticated && showUserMenu"
      class="border-t border-slate-200 bg-slate-50 px-4 py-2 sm:px-6"
    >
      <button
        class="block w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-200 rounded"
        @click="$emit('profile-click')"
      >
        Profile
      </button>
      <button
        class="block w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-200 rounded"
        @click="$emit('settings-click')"
      >
        Settings
      </button>
      <button
        class="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-slate-200 rounded"
        @click="$emit('logout-click')"
      >
        Logout
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { Logo, Button, IconUser, IconMenu } from '../atoms'

interface NavigationLink {
  id: string
  label: string
  href: string
  active?: boolean
}

interface Props {
  isAuthenticated?: boolean
  userAvatar?: string
  navigationLinks?: NavigationLink[]
  showNavigation?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isAuthenticated: false,
  userAvatar: '',
  navigationLinks: () => [
    { id: 'home', label: 'Home', href: '/', active: true },
    { id: 'features', label: 'Features', href: '/features' },
    { id: 'about', label: 'About', href: '/about' },
  ],
  showNavigation: true,
})

defineEmits<{
  'logo-click': []
  'login-click': []
  'signup-click': []
  'mobile-menu-toggle': []
  'profile-click': []
  'settings-click': []
  'logout-click': []
}>()

const showUserMenu = ref(false)
const scrolled = ref(false)

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(
  () => props.isAuthenticated,
  () => {
    showUserMenu.value = false
  }
)
</script>
