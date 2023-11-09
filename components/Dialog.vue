<template>
    <Dialog v-model:visible="dialog.is_open_modal" modal :header="dialog.title" :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <p v-html="dialog.content"></p>
    </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { ref } from 'vue';

const { $directus, $readItems } = useNuxtApp()
const { data: dialog } = await useAsyncData('modal', () => {
  return $directus.request($readItems('modal', {}))
})

</script>