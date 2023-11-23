<template>
  <div>
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-7-xl lg:mx-0 pt-10">
        <h2 v-if="pageData && pageData[0]?.title" class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ pageData[0]?.title }}</h2>
        <div class="mt-5" v-html="pageData[0]?.content"></div>
      </div>
      <!-- Gallery -->
      <div v-if="pageData && pageData[0]?.gallery && pageData[0]?.gallery?.length > 0" class="flex justify-content-center mt-10 w-full">
        <Galleria v-model:activeIndex="activeIndex" v-model:visible="displayCustom" :value="pageData[0].gallery"
                  :responsiveOptions="responsiveOptions" :numVisible="7" containerStyle="max-width: 850px" :circular="true"
                  :fullScreen="true" :showItemNavigators="true" :showThumbnails="false">
          <template #item="slotProps">
            <img :src="config.public.apiBase + 'assets/' + slotProps.item.directus_files_id"
                 :alt="'image'" style="width: 100%; max-height: 600px; display: block" />
          </template>
          <template #thumbnail="slotProps">
            <img :src="config.public.apiBase + 'assets/' + slotProps.item.directus_files_id"
                 :alt="'image'" style="display: block" />
          </template>
        </Galleria>

        <ul v-if="pageData && pageData[0].gallery" role="list" class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <li v-for="(image, index) of pageData[0].gallery" :key="image.id" class="relative">
            <div @click="imageClick(index)"
                 class="group flex justify-center w-auto h-30 overflow-hidden rounded-lg bg-gray-white focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
              <img :src="config.public.apiBase + 'assets/' + image.directus_files_id" alt="" class="pointer-events-none object-cover w-fit h-44 group-hover:opacity-75 p-1 rounded-xl" />
              <button type="button" class="absolute inset-0 focus:outline-none">
                <span class="sr-only">View details</span>
              </button>
            </div>
          </li>
        </ul>
      </div>

      <!-- Articles -->
      <ArticlePreview v-if="articles && articles.length > 0" :posts="articles"></ArticlePreview>

      <!-- Paginator -->
      <div v-if="Number(articlesCount[0].count) > 0" class="mt-6">
        <Paginator @page="onChangePage" :rows="pageRows" :totalRecords="Number(articlesCount[0].count)"></Paginator>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $directus, $readItems, $aggregate } = useNuxtApp();
import { useRoute } from 'vue-router';
import Paginator from 'primevue/paginator';
import ArticlePreview from '~/components/ArticlePreview.vue';
import Galleria from 'primevue/galleria';

const config = useRuntimeConfig();
const route = useRoute();

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

const page = ref(0);
const pageRows = ref(10);

const {data: articlesCount} = await useAsyncData('articlesCount', async () => {
  return $directus.request($aggregate('articles', {
    aggregate: {
      count: '*'
    },
    query: {
      filter: {
        pages: {
          pages_id: {
            slug: {
              _eq: route.params.slug
            }
          }
        },
      },
    },
  }));
});


const {data: pageData} = await useAsyncData('pages', async () => {
  return $directus.request($readItems('pages', {
    filter: {
      slug: {
        _eq: route.params.slug
      },
    },
      fields: [
        'id, title, content, thumbnail',
        'gallery.directus_files_id, gallery.id',
      ],
  }));
});


const {data: articles, refresh} = await useAsyncData('articles', async () => {
  return $directus.request($readItems('articles', {
    filter: {
      pages: {
        pages_id: {
          slug: {
            _eq: route.params.slug
          }
        }
      },
    },
    limit: pageRows.value,
    offset: page.value * pageRows.value,
    fields: [
      'id, title, content, slug, thumbnail, date_created, user_created.*',
    ],
  }));
});


const onChangePage = (event: any) => {
  if (event.page !== page.value) {
    page.value = event.page;
    refresh();
  }
};

const imageClick = (index: number) => {
  activeIndex.value = index;
  displayCustom.value = true;
};
</script>
