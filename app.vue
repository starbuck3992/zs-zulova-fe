<template>
  <Dialog />
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import Dialog from "./components/Dialog.vue";
useHead({
  link: [{ rel: "icon", type: "image/png", href: "logo.png" }],
});
</script>
