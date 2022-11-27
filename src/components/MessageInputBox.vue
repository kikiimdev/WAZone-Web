<script setup lang="ts">
import { useBotStore } from '~/stores/bot-store'

const botStore = useBotStore()
const messageText = ref('')
const sendMessage = async () => {
  await botStore.botSendMessage({ text: messageText.value })
  await useSleep(250)
  const senderId = botStore.selectedChat.senderId
  botStore.selectedChat = null
  await useSleep(750)
  const chat = await botStore.fetchBotChat(senderId)
  if (chat.data)
    botStore.selectedChat = chat.data

  botStore.refetchCounter++
  messageText.value = ''
}
</script>

<template>
  <VFooter v-if="botStore.selectedChat" app>
    <VRow no-gutters>
      <VCol cols="12" class="py-2">
        <VTextarea
          v-model="messageText"
          auto-grow
          no-resize
          max-rows="5"
          rows="1"
          placeholder="Type a message"
          hide-details
          variant="filled"
          density="compact"
          append-inner-icon="mdi-send"
          @click:append-inner="sendMessage()"
        />
      </VCol>
    </VRow>
  </VFooter>
</template>

<style>

</style>
