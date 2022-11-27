import { defineStore } from 'pinia'
import { useSleep } from '~/composables/use-sleep'
import $fetch from '~/plugins/$fetch'

interface BotSendMessageOpts {
  text: string
}

// const toPhoneNumber = (senderId: string) => {
//   const isSenderId = senderId.includes('@')
//   if (!isSenderId)
//     return senderId

//   const [_phoneNumber] = senderId.split('@')
//   const phoneNumber = _phoneNumber.replace(/62/, '0')

//   return phoneNumber
// }

export const useBotStore = defineStore('bot', () => {
  const router = useRouter()
  const config = useConfig()
  const bot = ref<any>(null)
  const botId = config.botId
  const checkContactCount = ref(0)

  const selectedChat = ref<any>(null)

  const refetchCounter = ref(0)
  const stopAutoFetch = ref(true)
  const runAutoFetch = async () => {
    if (stopAutoFetch.value)
      return

    await useSleep(30_000)
    refetchCounter.value++
    await runAutoFetch()
  }

  const fetchBot = () => $fetch('/bots').then(async res => await res.json())
  const startBot = () => {
    stopAutoFetch.value = false
    return $fetch('/bots/up', { method: 'POST' })
  }
  const stopBot = () => $fetch('/bots/down', { method: 'POST' }).then(async res => await res.json())
  const fetchBotChats = () => $fetch('/chats').then(async res => await res.json())
  const fetchBotMessages = () => $fetch(`/messages/${unref(selectedChat).id}`).then(async res => await res.json())
  const fetchBotContacts = () => $fetch('/contacts').then(async res => await res.json())

  const fetchBotChat = (phoneNumber: string) => $fetch(`/chats/${(phoneNumber)}`).then(async res => await res.json())

  const botSendMessage = ({ text }: BotSendMessageOpts) => {
    const content = { text }
    const phoneNumber = selectedChat.value.senderId
    const body = JSON.stringify({ content, phoneNumber })
    const headers = {
      'Content-Type': 'application/json',
      [config.botKey]: botId.value,
    }

    return $fetch('/messages', { method: 'POST', headers, body }).then(async res => await res.json())
  }

  const logoutBot = async () => {
    await stopBot()
    await useSleep(1000)
    botId.value = ''
    bot.value = null
    stopAutoFetch.value = true
    router.push('/onboarding')
    await useSleep(100)
    location.reload()
  }

  return {
    bot,
    botId,
    fetchBot,
    startBot,
    stopBot,
    fetchBotChats,
    fetchBotMessages,
    fetchBotContacts,
    selectedChat,
    refetchCounter,
    runAutoFetch,
    logoutBot,
    botSendMessage,
    fetchBotChat,
    checkContactCount,
  }
})
