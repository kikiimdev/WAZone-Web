<script setup lang="ts">
import { useUiStore } from '~/stores/ui-store'
const ui = useUiStore()
</script>

<template>
  <VNavigationDrawer
    v-model="ui.showDrawer"
    width="400"
    mobile-break="1000"
  >
    <slot />
    <template #append>
      <slot name="append" />
    </template>
  </VNavigationDrawer>
</template>

<style>

</style>
