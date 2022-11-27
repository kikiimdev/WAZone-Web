<script setup lang="ts">
import { useSleep } from '~/composables/use-sleep'
import { useBotStore } from '~/stores/bot-store'

const router = useRouter()
const botStore = useBotStore()
const webTitle = useTitle('WAZONE')

const { pickedData: bot, refetch } = useQuery({
  queryFn: () => botStore.fetchBot(),
  queryKey: ['bot', botStore.botId],
  pickOne: 'data',
  initialPickedData: {
    id: null,
    isContactSynced: false,
    qrCode: '',
  },
  onSuccess: async (result: any) => {
    const data = unref(result).data
    botStore.bot = data
    if (data?.qrCode || !data)
      await botStore.logoutBot()

    if (data)
      webTitle.value = `${data.name} | WAZONE`
  },
  onError: _ => router.push('/onboarding'),
})

const checkIfContactSynced = async () => {
  botStore.checkContactCount++
  if (!bot.value?.isContactSynced && botStore.checkContactCount < 5) {
    await useSleep(7_000)
    await refetch()
    await checkIfContactSynced()
  }
}

onMounted(async () => {
  if (!unref(bot)?.id || !unref(bot)?.qrCode) {
    await botStore.startBot()
    await checkIfContactSynced()
    await botStore.runAutoFetch()
  }
})
</script>

<template>
  <AppDrawer>
    <ChatList />
    <template #append>
      <ContactList />
      <LogoutButton />
    </template>
  </AppDrawer>
  <VMain>
    <MessageContainer />
  </VMain>
</template>

<style>

</style>
