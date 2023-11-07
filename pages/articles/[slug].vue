<template>
  <NuxtLink to="/">Zpět na domovskou stránku</NuxtLink>
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl pt-10">
      <h2 v-if="article[0].title" class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ article[0].title
      }}</h2>
      <div class="mt-5" v-html="article[0].content">

      </div>
      <div v-if="article[0].gallery && article[0].gallery.length > 0" class="card flex justify-content-center">
        <Galleria v-model:activeIndex="activeIndex" v-model:visible="displayCustom" :value="article[0].gallery" :responsiveOptions="responsiveOptions" :numVisible="7"
            containerStyle="max-width: 850px" :circular="true" :fullScreen="true" :showItemNavigators="true" :showThumbnails="false">
            <template #item="slotProps">
                <img :src="'https://lobster-app-mv2hv.ondigitalocean.app/assets/'+slotProps.item.directus_files_id" :alt="'image'" style="width: 100%; max-height: 600px; display: block" />
            </template>
            <template #thumbnail="slotProps">
                <img :src="'https://lobster-app-mv2hv.ondigitalocean.app/assets/'+slotProps.item.directus_files_id" :alt="'image'" style="display: block" />
            </template>
        </Galleria>

        <div v-if="article[0].gallery" class="grid grid-cols-4 gap-2" style="max-width: 400px">
            <div v-for="(image, index) of article[0].gallery" :key="index" class="col-span-1">
                <img :src="'https://lobster-app-mv2hv.ondigitalocean.app/assets/' + image.directus_files_id" :alt="'image'" style="cursor: pointer" @click="imageClick(index)" />
            </div>
        </div>
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
<style scoped>
</style>

