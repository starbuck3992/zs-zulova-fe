<template>
  <div>
    <div>
      Dynamic Slug page
      <pre>{{ $route.params }}</pre>
      <pre>
        {{ article }}
      </pre>
    </div>
    <NuxtLink to="/">Back to Home page</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp()
import { useRoute } from 'vue-router';
const route = useRoute();

console.log('ARTICLES page',route.params.slug)
const { data: article } = await useAsyncData('articles', () => {
  return $directus.request($readItems('articles', {
    filter: { slug: { _eq: route.params.slug }
    },
    fields: [
      'id, title, content',
    ]
  }))
})
</script>
