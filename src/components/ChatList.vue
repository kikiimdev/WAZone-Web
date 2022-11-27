<script setup lang="ts">
import { useSleep } from '~/composables/use-sleep'
import { useBotStore } from '~/stores/bot-store'

const search = ref('')
const debouncedSearch = useDebounce(search, 500)

const botStore = useBotStore()
const { pickedData: chats, refetch } = useQuery({
  queryFn: () => botStore.fetchBotChats(),
  queryKey: [
    'chats',
    // computed(() => botStore.bot),
    computed(() => botStore.refetchCounter),
  ],
  pickOne: 'data',
  initialPickedData: [] as any[],
  fetchOnMount: true,
})

const autoRefetch = async () => {
  await useSleep(10_000)
  await refetch()
  await autoRefetch()
}

onMounted(async () => {
  await autoRefetch()
})

const filterChats = (chats: any[]) => chats
  .filter(chat => JSON.stringify(chat).toLowerCase().includes(debouncedSearch.value.toLowerCase()))
</script>

<template>
  <div>
    <VRow no-gutters align="center">
      <VCol cols="auto">
        <div class="text-h6 pa-4">
          Chats
        </div>
      </VCol>
      <VCol
        v-if="botStore.bot" class="pr-4"
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
        <VCol cols="auto">
          <div>
            <span class="text-medium-emphasis">Sync Chats</span>
            <VProgressCircular indeterminate size="20" color="primary" class="ml-3" />
          </div>
        </VCol>
      </template>
    </VRow>

    <VDivider />
    <VSheet class="overflow-auto">
      <VList>
        <ChatItem v-for="chat in filterChats(chats!)" :key="chat.id" :chat="chat" />
      </VList>
    </VSheet>
  </div>
</template>

<style>

</style>
