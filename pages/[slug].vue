<template>
  <div>
    <div>
      Dynamic Slug page
      <pre>{{ $route.params }}</pre>
      <pre>
        {{ page }}
      </pre>
    </div>
    <NuxtLink to="/">Back to Home page</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp()
import { useRoute } from 'vue-router';
const route = useRoute();

console.log('slug page',route.params.slug)
const { data: page } = await useAsyncData('pages', () => {
  return $directus.request($readItems('pages', {
    filter: { slug: { _eq: route.params.slug }
    },
    fields: [
      'id, title, content',
    ]
  }))
})
</script>
