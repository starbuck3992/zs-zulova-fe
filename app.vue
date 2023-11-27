<template>
  <Dialog />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import Dialog from "./components/Dialog.vue";
useHead({
  link: [{ rel: "icon", type: "image/png", href: "logo.png" }],
});
</script>
