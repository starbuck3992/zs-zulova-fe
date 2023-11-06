<template>
  <div>
    <NuxtLink to="/">Back to Home page</NuxtLink>
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0 pt-10">
        <h2 v-if="page[0].title" class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ page[0].title }}</h2>
        <h1>{{ page[0].articles[0].articles_id.thumbnail }}</h1>
      </div>
      <img class="w-10" :src="'https://lobster-app-mv2hv.ondigitalocean.app/assets/'+page[0].articles[0].articles_id.thumbnail"/>
      <pre>{{ $route.params }}</pre>
      <pre>
        {{ page }}
      </pre>

      <!-- Articles -->
      <div class="border-t border-gray-200"></div>
      <!--<ArticlePreview :posts="page[0].article"></ArticlePreview>-->
    </div>
  </div>
</template>

<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp()
import { useRoute } from 'vue-router';
import ArticlePreview from '~/components/ArticlePreview.vue';
const route = useRoute();

console.log('pages page',route.params.slug)
const { data: page } = await useAsyncData('pages', () => {
  return $directus.request($readItems('pages', {
    filter: { slug: { _eq: route.params.slug }
    },
    fields: [
      'id, title, content', 
      'articles.articles_id.*',
      'articles.articles_id.gallery.*',
    ]
  }))
})
</script>
