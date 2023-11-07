<template>
  <NuxtLink to="/">Zpět na domovskou stránku</NuxtLink>
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl pt-10">
      <h2 v-if="article[0].title" class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ article[0].title
      }}</h2>
      <div class="mt-5" v-html="article[0].content">

      </div>
      <div v-if="article[0].gallery && article[0].gallery.length > 0" class="flex justify-center w-full mt-10">
        <Galleria :value="article[0].gallery" :responsiveOptions="responsiveOptions" :numVisible="3" :circular="true"
          :showItemNavigators="true" :showItemNavigatorsOnHover="true" :autoPlay="true" :transitionInterval="4000"
          containerStyle="max-width: 100%">
          <template #item="slotProps">
            <img :src="'https://lobster-app-mv2hv.ondigitalocean.app/assets/' + slotProps.item.directus_files_id"
              alt="ZS Zulova image" style="width: auto; height: 300px; display: block" />
          </template>
          <template #thumbnail="slotProps">
            <img :src="'https://lobster-app-mv2hv.ondigitalocean.app/assets/' + slotProps.item.directus_files_id"
              alt="ZS Zulova image" style="width: auto; height: 100px; display: block" />
          </template>
        </Galleria>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp()
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import Galleria from 'primevue/galleria';
const route = useRoute();

console.log('ARTICLES page', route.params.slug)
const { data: article } = await useAsyncData('articles', () => {
  return $directus.request($readItems('articles', {
    filter: {
      slug: { _eq: route.params.slug }
    },
    fields: [
      'id, title, content, gallery.*',
    ]
  }))
})

const responsiveOptions = ref([
  {
    breakpoint: '1300px',
    numVisible: 4
  },
  {
    breakpoint: '575px',
    numVisible: 1
  }
]);
</script>
