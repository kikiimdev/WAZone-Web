<script setup lang="ts">
import { useBotStore } from '~/stores/bot-store'

const isLoading = ref(false)
const botStore = useBotStore()
const onLogout = async () => {
  try {
    isLoading.value = true

    return await botStore.logoutBot()
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <VFooter>
    <VRow no-gutters>
      <VCol cols="12" class="py-2">
        <VBtn :loading="isLoading" block color="error" @click="onLogout()">
          Logout
        </VBtn>
      </VCol>
    </VRow>
  </VFooter>
</template>

<style>

</style>
