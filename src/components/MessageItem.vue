<script setup lang="ts">
defineProps({
  message: {
    type: null,
    default: () => {
      return {
      }
    },
  },
})
</script>

<template>
  <VRow no-gutters :justify="message.isFromMe ? 'end' : 'start'">
    <VCol cols="auto">
      <VCard class="pa-2 px-4 ma-2" :class="{ 'bg-primary': message.isFromMe }">
        <div style="white-space: pre-wrap">
          {{ message.messageText }}
        </div>
      </VCard>
    </VCol>
  </VRow>
</template>

<style>

</style>
