<template>
  <div class="relative">
    <div class="bg-[#004b9b]">
      <h2
        class="text-4xl hidden lg:block font-bold tracking-tight text-white sm:text-4xl uppercase py-8 pl-10"
      >
        ZŠ ŽULOVÁ - Škola pro všechny
      </h2>
    </div>
    <CustomCarousel
      :value="carouselImages"
      :numVisible="1"
      :numScroll="1"
      :autoplayInterval="8000"
      circular
      :show-navigators="false"
      :show-indicators="false"
    >
      <template #item="slotProps">
        <img
          :src="
            config.public.apiBase + 'assets/' + slotProps.data.directus_files_id
          "
          class="absolute h-full lg:h-80 w-full object-cover md:object-center"
        />
        <div class="mx-auto max-w-7xl px-6 lg:px-8 z-50 lg:h-80 relative">
          <div class="mx-auto max-w-2xl lg:mx-0 pt-10"></div>
          <div
            class="mx-auto py-10 lg:py-0 lg:mt-44 mb-5 grid max-w-2xl grid-cols-1 gap-6 lg:mx-0 lg:max-w-none sm:grid-cols-2 lg:grid-cols-5 lg:gap-8"
          >
            <div
              v-for="card in cards"
              :key="card.name"
              class="flex gap-x-4 rounded-xl bg-white hover:bg-gray-100 p-2 ring-1 ring-inset ring-white/10 cursor-pointer relative w-[200px] mx-auto sm:m-0 sm:w-auto"
            >
              <NuxtLink
                v-if="card.to"
                :to="card.to"
                class="absolute w-full h-full inset-0"
              ></NuxtLink>
              <a
                v-else
                :href="card.link"
                :target="card.target"
                class="absolute w-full h-full inset-0"
              ></a>
              <div class="flex lg:block gap-x-2 items-center flex-wrap">
                <component
                  :is="card.icon"
                  class="h-7 w-5 flex-none text-[#004b9b]"
                  aria-hidden="true"
                />
                <div class="text-sm 2xl:text-base leading-7">
                  <h3 class="font-semibold text-[#004b9b]">{{ card.name }}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </CustomCarousel>
  </div>

  <ArticlePreview
    :mainPage="true"
    v-if="articles && articles?.length > 0"
    :posts="articles"
  ></ArticlePreview>

  <!-- Paginator -->
  <div v-if="Number(articlesCount[0].count) > 0" class="mt-6">
    <Paginator
      @page="onChangePage"
      :rows="pageRows"
      :totalRecords="Number(articlesCount[0].count)"
      :pt-options="{ mergeProps: true }"
      :pt="{
        root: {
          class: [
            'flex items-center justify-center flex-wrap',
            '!bg-[#e0f2ff] text-gray-500 border-0 px-4 py-2 !rounded-none',
            'dark:bg-gray-900 dark:text-white/60 dark:border-blue-900/40', // Dark Mode
          ],
        },
      }"
    ></Paginator>
  </div>
</template>

<script setup lang="ts">
import Carousel from "primevue/carousel";
import {
  LifebuoyIcon,
  NewspaperIcon,
  PhoneIcon,
  CalendarIcon,
} from "@heroicons/vue/20/solid";
import Paginator from "primevue/paginator";
const { $directus, $readItems, $aggregate } = useNuxtApp();
import ArticlePreview from "~/components/ArticlePreview.vue";

const CustomCarousel = {
  extends: Carousel,
  props: {
    value: Array,
    numVisible: Number,
    numScroll: Number,
    autoplayInterval: Number,
    showNavigators: Boolean,
    showIndicators: Boolean,
    responsiveOptions: Array,
  },
  methods: {
    onTouchMove() {
      return;
    },
  },
};

const config = useRuntimeConfig();
const page = ref(0);
const pageRows = ref(9);

const { data: articlesCount } = await useAsyncData(
  "articlesCount",
  async () => {
    return $directus.request(
      $aggregate("articles", {
        aggregate: {
          count: "*",
        },
      })
    );
  }
);

const { data: articles, refresh } = await useAsyncData("articles", async () => {
  return $directus.request(
    $readItems("articles", {
      limit: pageRows.value,
      offset: page.value * pageRows.value,
      sort: "-date_created",
      fields: [
        "id, title, excerpt, slug, thumbnail, date_created, user_created.*",
      ],
    })
  );
});

const onChangePage = (event: any) => {
  if (event.page !== page.value) {
    page.value = event.page;
    refresh();
  }
};

const { data: carouselImages } = await useAsyncData(
  "mainPageImageSlider_files",
  () => {
    return $directus.request(
      $readItems("mainPageImageSlider_files", {
        fields: ["*"],
      })
    );
  }
);

const cards = [
  {
    name: "Rozvrh Hodin",
    icon: NewspaperIcon,
    link: "https://zszulova.bakalari.cz/timetable/public/",
    target: "_blank",
  },
  {
    name: "Bakaláři",
    icon: LifebuoyIcon,
    link: "https://zszulova.bakalari.cz/login",
    target: "_blank",
  },
  {
    name: "Jídelníček",
    icon: NewspaperIcon,
    to: "jidelni-listek",
  },
  {
    name: "Kontakty",
    icon: PhoneIcon,
    to: "kontakt",
  },
  {
    name: "Kalendář akcí",
    icon: CalendarIcon,
    link: "https://zszulova.bakalari.cz/timetable/public/",
    target: "_blank",
  },
];
</script>
<style lang="css" scoped>
.shadow-text {
  text-shadow: 2px 2px 0.5px #004b9b;
}
</style>
