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
const { data: page } = await useAsyncData('pages', () => {
  return $directus.request($readItems('pages', {
    filter: { slug: { _eq: $route.params.slug }
    }
  }))
})
</script>
