import { useConfig } from '~/composables/use-config'

const $fetch = (endpoint: string, init?: RequestInit | undefined) => {
  const baseUrl = 'http://localhost:5000'
  const config = useConfig()

  if (config.botId.value) {
    init = {
      headers: {
        [config.botKey]: config.botId.value,
      },
      ...init,
    }
  }

  return fetch(baseUrl + endpoint, init)
}

export default $fetch
