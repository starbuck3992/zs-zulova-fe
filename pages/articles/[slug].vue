<template>
  <div class="mx-auto max-w-7xl 2xl:max-w-[1500px] px-6 lg:px-8">
    <div
      v-if="articleData"
      class="mx-auto max-w-2xl xl:max-w-5xl pt-10"
    >
      <h2
        v-if="articleData.title"
        class="text-3xl font-bold tracking-tight text-[#93765d] sm:text-4xl"
      >
        {{ articleData.title }}
      </h2>
      <div
        class="mt-5"
        v-if="articleData.content"
        v-html="articleData.content"
      ></div>
      <div
        v-if="articleGallery && articleGallery?.length > 0"
        class="flex justify-content-center flex-col mt-10"
      >
        <Galleria
          v-model:activeIndex="activeIndex"
          v-model:visible="displayCustom"
          :value="articleGallery"
          :responsiveOptions="responsiveOptions"
          :numVisible="7"
          containerStyle="max-width: 850px"
          :circular="true"
          :fullScreen="true"
          :showItemNavigators="true"
          :showThumbnails="false"
        >
          <template #item="slotProps">
            <img
              :src="
                config.public.apiBase +
                'assets/' +
                slotProps.item.directus_files_id + '?quality=20'
              "
              :alt="'image'"
              style="width: 100%; max-height: 600px; display: block"
            />
          </template>
          <template #thumbnail="slotProps">
            <img
              :src="
                config.public.apiBase +
                'assets/' +
                slotProps.item.directus_files_id + '?quality=20'
              "
              :alt="'image'"
              style="display: block"
            />
          </template>
        </Galleria>

        <ul
          v-if="articleGallery"
          role="list"
          class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8"
        >
          <li
            v-for="(image, index) of articleGallery"
            :key="index"
            class="relative"
          >
            <div
              @click="imageClick(index)"
              class="group flex justify-center w-auto h-30 overflow-hidden rounded-lg bg-gray-white focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
            >
              <img
                :src="
                  config.public.apiBase + 'assets/' + image.directus_files_id + '?quality=20'
                "
                alt=""
                class="pointer-events-none object-cover w-fit h-44 group-hover:opacity-75 p-1 rounded-xl"
              />
              <button type="button" class="absolute inset-0 focus:outline-none">
                <span class="sr-only">View details</span>
              </button>
            </div>
          </li>
        </ul>
        <Button v-if="articleGallery.length < allImages.length" @click="loadMoreImages" class="mx-auto mt-12">
          Načíst další obrázky
        </Button>
      </div>
    </div>
    <div v-else class="mx-auto max-w-2xl xl:max-w-5xl pt-10">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Článek nenalezen
      </h2>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp();
import Button from "primevue/button";
import {onMounted, ref} from "vue";
import { useRoute } from "vue-router";
import Galleria from "primevue/galleria";

const config = useRuntimeConfig();
const route = useRoute();

const maxImages = 9;
const articleGallery = ref([]);
const allImages = ref([]);
const articleData = ref();

onMounted(async () => {

  const { data: article } = await useAsyncData("articles", () => {
    return $directus.request(
        $readItems("articles", {
          filter: {
            slug: { _eq: route.params.slug },
          },
          fields: ["id, title, content, gallery.*"],
        })
    );
  });

  articleData.value = article.value[0];

  allImages.value = article.value[0]?.gallery;
  articleGallery.value = article.value[0].gallery.slice(0, maxImages);
});


// Load more images
const loadMoreImages = () => {
  const newImages = allImages.value.slice(
    articleGallery.value.length,
    articleGallery.value.length + maxImages
  );
  articleGallery.value = [...articleGallery.value, ...newImages];
};

const activeIndex = ref(0);
const responsiveOptions = ref([
  {
    breakpoint: "1300px",
    numVisible: 4,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
  },
]);

const displayCustom = ref(false);

const imageClick = (index: number) => {
  activeIndex.value = index;
  displayCustom.value = true;
};
</script>
<style scoped></style>
