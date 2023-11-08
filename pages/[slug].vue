<template>
  <div>
    <NuxtLink to="/">Back to Home page</NuxtLink>
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-7-xl lg:mx-0 pt-10">
        <h2 v-if="page && page[0]?.title" class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ page[0]?.title }}</h2>
      </div>

      <!-- Articles -->
      <ArticlePreview v-if="page[0]?.articles && page[0]?.articles?.length > 0" :posts="page[0].articles"></ArticlePreview>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp()
import { useRoute } from 'vue-router';
import ArticlePreview from '~/components/ArticlePreview.vue';
const route = useRoute();

const { data: page } = await useAsyncData('pages', () => {
  return $directus.request($readItems('pages', {
    filter: { slug: { _eq: route.params.slug }
    },
    fields: [
      'id, title, content', 
      'articles.articles_id.*',
      'articles.articles_id.gallery.*',
      'articles.articles_id.user_created.*'
    ]
  }))
})
</script>
