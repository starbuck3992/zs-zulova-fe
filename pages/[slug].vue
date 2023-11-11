<template>
  <div>
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-7-xl lg:mx-0 pt-10">
        <h2 v-if="page && page[0]?.title" class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ page[0]?.title }}</h2>
        <div class="mt-5" v-html="page[0]?.content"></div>
      </div>
      <!-- Gallery -->
      <div v-if="page[0]?.gallery && page[0]?.gallery?.length > 0" class="flex justify-content-center mt-10 w-full">
        <Galleria v-model:activeIndex="activeIndex" v-model:visible="displayCustom" :value="page[0].gallery"
          :responsiveOptions="responsiveOptions" :numVisible="7" containerStyle="max-width: 850px" :circular="true"
          :fullScreen="true" :showItemNavigators="true" :showThumbnails="false">
          <template #item="slotProps">
            <img :src="'https://lobster-app-mv2hv.ondigitalocean.app/assets/' + slotProps.item.directus_files_id"
              :alt="'image'" style="width: 100%; max-height: 600px; display: block" />
          </template>
          <template #thumbnail="slotProps">
            <img :src="'https://lobster-app-mv2hv.ondigitalocean.app/assets/' + slotProps.item.directus_files_id"
              :alt="'image'" style="display: block" />
          </template>
        </Galleria>

        <ul v-if="page[0].gallery" role="list" class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <li v-for="(image, index) of page[0].gallery" :key="index" class="relative">
            <div @click="imageClick(index)"
              class="group flex justify-center w-auto h-30 overflow-hidden rounded-lg bg-gray-white focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
              <img :src="'https://lobster-app-mv2hv.ondigitalocean.app/assets/' + image.directus_files_id" alt="" class="pointer-events-none object-cover w-fit h-44 group-hover:opacity-75 p-1 rounded-xl" />
              <button type="button" class="absolute inset-0 focus:outline-none">
                <span class="sr-only">View details</span>
              </button>
            </div>
          </li>
        </ul>
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
import Galleria from 'primevue/galleria';
const route = useRoute();

const { data: page } = await useAsyncData('pages', () => {
  return $directus.request($readItems('pages', {
    filter: { slug: { _eq: route.params.slug }
    },
    fields: [
      'id, title, content, gallery.*', 
      'articles.articles_id.*',
      'articles.articles_id.gallery.*',
      'articles.articles_id.user_created.*'
    ]
  }))
})

const activeIndex = ref(0);
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

const displayCustom = ref(false);
const imageClick = (index) => {
  activeIndex.value = index;
  displayCustom.value = true;
};
</script>
