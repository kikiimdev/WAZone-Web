<!-- eslint-disable no-console -->
<script setup lang="ts">
import $fetch from '~/plugins/$fetch'
import { useConfig } from '~/composables/use-config'

const botName = ref('')
const isLoading = ref(false)
const router = useRouter()
const config = useConfig()

const createBot = async () => {
  isLoading.value = true
  try {
    const body = { name: botName.value }
    const res = await $fetch('/bots', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })
    const result = await res.json()

    botName.value = ''
    if (result?.data) {
      router.push('/scan-qr')
      config.botId.value = result.data.id
    }
  }
  catch (err) {
    //
  }
  finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (config.botId.value)
    router.push('/scan-qr')
})
</script>

<template>
  <VContainer fluid class="bg-grey-lighten-2">
    <VRow style="height: 100vh" justify="center" align="center">
      <VCol cols="10" md="6" lg="5">
        <VCard class="pa-4">
          <VCardTitle>
            <p class="text-center">
              WAZONE
            </p>
          </VCardTitle>
          <VCardText class="mt-8">
            <VTextField v-model="botName" density="compact" placeholder="Enter bot name" />
            <VBtn :loading="isLoading" :disabled="!botName" block color="primary" @click="createBot">
              Create Bot
            </VBtn>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style>

</style>
