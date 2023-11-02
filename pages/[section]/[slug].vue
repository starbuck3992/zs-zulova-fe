<template>
  <div>
    <h1>{{ params }}</h1>
    <!-- Další obsah stránky -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const params = ref(route.params);

</script>