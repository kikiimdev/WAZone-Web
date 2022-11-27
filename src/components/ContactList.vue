<script setup lang="ts">
import { useBotStore } from '~/stores/bot-store'

const botStore = useBotStore()
const { pickedData: contacts } = useQuery({
  queryFn: () => botStore.fetchBotContacts(),
  queryKey: [
    'contacts',
    computed(() => botStore.botId),
  ],
  pickOne: 'data',
  initialPickedData: [] as any[],
  fetchOnMount: true,
})

const search = ref('')
const debouncedSearch = useDebounce(search, 500)

const contactToChat = (contact: any) => {
  return {
    senderId: contact.waId,
    senderName: contact.name,
    isFromContact: true,
  }
}

const filterContacts = (contacts: any[]) => contacts
  .filter(contact => JSON.stringify(contact).toLowerCase().includes(debouncedSearch.value.toLowerCase()))
</script>

<template>
  <VDivider />
  <VRow no-gutters align="center">
    <VCol cols="auto">
      <div class="text-h6 pa-4">
        Contacts
      </div>
    </VCol>
    <VCol
      v-if="botStore.bot?.isContactSynced" class="pr-4"
    >
      <VTextField
        v-model="search"
        placeholder="Search..."
        variant="outlined"
        density="compact"
        prepend-inner-icon="mdi-magnify"
        clearable
        hide-details
        @click:clear="search = ''"
      />
    </VCol>
    <template v-else>
      <VSpacer />
      <VCol>
        <div>
          <span class="text-medium-emphasis">Sync Contacts</span>
          <VProgressCircular indeterminate size="20" color="primary" class="ml-3" />
        </div>
      </VCol>
    </template>
  </VRow>

  <VDivider />

  <p v-if="(botStore.checkContactCount > 4)" class="bg-error pa-4">
    Failed syncing contacts. Please logout then create new Bot.
  </p>
  <VSheet height="240" class="overflow-auto">
    <VList>
      <VListItem>
        <ChatItem v-for="contact in filterContacts(contacts!)" :key="contact.id" :chat="contactToChat(contact)" />
      </VListItem>
    </VList>
  </VSheet>
</template>

<style>

</style>
