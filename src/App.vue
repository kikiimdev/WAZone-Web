<script setup lang="ts">
import { useUiStore } from './stores/ui-store'

const ui = useUiStore()
</script>

<template>
  <VApp :theme="ui.usedTheme">
    <RouterView />
  </VApp>
</template>

<style>

</style>
