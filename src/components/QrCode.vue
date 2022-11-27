<script setup lang="ts">
import QRCodeVue3 from 'qrcode-vue3'

defineProps({
  value: {
    type: String,
    required: true,
  },
})

defineComponent({
  QRCodeVue3,
})
</script>

<template>
  <div class="d-flex justify-center">
    <QRCodeVue3 :value="value!" :width="240" :height="240" />
  </div>
</template>

<style>

</style>
