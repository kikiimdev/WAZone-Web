<script setup lang="ts">
import { useBotStore } from '~/stores/bot-store'

const botStore = useBotStore()
const scrollBottom = ref()

const { pickedData: messages } = useQuery({
  queryFn: () => botStore.fetchBotMessages(),
  queryKey: [
    'bot',
    computed(() => botStore.selectedChat),
    computed(() => botStore.refetchCounter),
  ],
  pickOne: 'data',
  initialPickedData: [] as any[],
  fetchOnMount: false,
  onSuccess: (_) => {
    scrollBottom.value.scrollIntoView({ behavior: 'smooth' })
  },
})

const height = computed(() => unref(botStore.selectedChat) ? '90vh' : '100vh')
</script>

<template>
  <VContainer class="bg-grey-lighten-2">
    <VRow v-if="messages?.length" ref="scrollBottom" align="end" :style="`min-height: ${height}`">
      <VCol cols="12">
        <MessageList :messages="messages" />
        <div />
      </VCol>
    </VRow>

    <VRow v-else align="center" justify="center" style="min-height: 100vh">
      <VCol>
        <p class="text-center text-medium-emphasis px-8">
          Select chat/contact on the left side to start conversation~
        </p>
      </VCol>
    </VRow>
    <MessageInputBox />
  </VContainer>
</template>

<style>

</style>
