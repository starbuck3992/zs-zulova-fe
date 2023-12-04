<template>
    <Dialog v-if="dialog" v-model:visible="dialog.is_open_modal" modal :header="dialog.title" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <p v-html="dialog.content"></p>
    </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import {onMounted} from "vue";

const { $directus, $readItems } = useNuxtApp()

const dialog = ref();

onMounted(async () => {
  dialog.value = await $directus.request($readItems('modal', {
    fields: ['id, title, content, is_open_modal']
  }))
})

</script>
