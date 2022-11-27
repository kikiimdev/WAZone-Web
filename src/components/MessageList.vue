<script setup lang="ts">
defineProps({
  messages: {
    type: Array,
    default: () => {
      return []
    },
  },
})
</script>

<template>
  <MessageItem v-for="(message, index) in messages" :key="index" :message="message" />
</template>

<style>

</style>
