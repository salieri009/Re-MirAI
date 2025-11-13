<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="closeModal"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black bg-opacity-50" />
        
        <!-- Modal Content -->
        <div class="relative bg-surface-card rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <!-- Header -->
          <div v-if="$slots.header" class="px-6 py-4 border-b border-surface-border">
            <slot name="header" />
          </div>
          
          <!-- Body -->
          <div class="px-6 py-4">
            <slot name="body" />
          </div>
          
          <!-- Footer -->
          <div v-if="$slots.footer" class="px-6 py-4 border-t border-surface-border">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function closeModal(): void {
  emit('update:modelValue', false)
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>

