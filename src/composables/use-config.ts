const botKey = import.meta.env.VITE_HEADERS_KEY || 'x-bot-id'
const botId = useLocalStorage(botKey, '')

export const useConfig = () => {
  return {
    botId,
    botKey,
  }
}
