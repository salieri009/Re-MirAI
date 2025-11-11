<template>
  <div class="flex gap-2">
      <Button
        v-for="platform in platforms"
        :key="platform.name"
        variant="secondary"
        size="sm"
        @click="shareToPlatform(platform)"
      >
        {{ platform.name }}
      </Button>
    <Button variant="ghost" size="sm" @click="copyLink">
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      Copy Link
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from './Button.vue'

interface Props {
  url: string
  title?: string
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Check out my Persona!',
  text: 'My friends think I\'m a... See yours!',
})

const copied = ref(false)

const platforms = [
  {
    name: 'Instagram',
    share: (url: string, text: string) => {
      // Instagram doesn't support direct sharing, so copy to clipboard
      copyToClipboard(url)
    },
  },
  {
    name: 'Twitter',
    share: (url: string, text: string) => {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
    },
  },
  {
    name: 'WhatsApp',
    share: (url: string, text: string) => {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank')
    },
  },
]

const shareToPlatform = (platform: { share: (url: string, text: string) => void }) => {
  platform.share(props.url, props.text)
}

const copyLink = async () => {
  await copyToClipboard(props.url)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }
}
</script>

