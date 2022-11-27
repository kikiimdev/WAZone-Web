<script setup lang="ts">
import { useBotStore } from '~/stores/bot-store'

defineProps({
  chat: {
    type: Object,
    default: () => {
      return {}
    },
  },
})

const botStore = useBotStore()

const selectChat = async (_chat: any) => {
  let chat = { ..._chat }
  if (chat.isFromContact) {
    const fetchChat = await botStore.fetchBotChat(chat.senderId)
    if (fetchChat?.data)
      chat = fetchChat.data
  }
  botStore.selectedChat = chat
}
</script>

<template>
  <VListItem link :title="chat.senderName" :subtitle="chat.senderId" @click="selectChat(chat)">
    <template #prepend>
      <VAvatar color="grey-lighten-1">
        <VIcon color="white">
          mdi-account
        </VIcon>
      </VAvatar>
    </template>

    <!-- <template #append>
      <v-btn
        color="grey-lighten-1"
        icon="mdi-information"
        variant="text"
      />
    </template> -->
  </VListItem>
</template>

<style>

</style>
