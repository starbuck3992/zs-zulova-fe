<template>
  <div class="relative">
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
          class="absolute h-full lg:h-[400px] w-full object-cover md:object-center rounded rounded-t-none"
        />
        <div class="mx-auto lg:h-[400px]"></div>
      </template>
    </CustomCarousel>
    <div class="z-20 min-w-max max-w-screen-sm absolute top-5 right-5 rounded">
      <div class="bg-[#fffdf7] w-full h-full absolute -z-10 rounded"></div>
      <h2
        class="text-xl z-20 hidden w-full lg:block font-bold tracking-tight text-[#535355] border-l-4 border-[#e6be1e] rounded rounded-l-none sm:text-xl uppercase p-3"
      >
        ZŠ ŽULOVÁ - Škola pro všechny
      </h2>
    </div>
    <div class="flex gap-2 w-fit absolute bottom-5 -translate-x-1/2 left-1/2">
      <div
        v-for="card in cards"
        :key="card.name"
        class="flex gap-x-2 xl:gap-x-4 rounded bg-[#fffdf7] border-[#e6be1e] border-2 hover:opacity-90 shadow px-3 py-2 ring-inset ring-white/10 cursor-pointer relative w-[200px] mx-auto sm:m-0 sm:w-full"
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
        <div class="flex gap-x-1 items-center w-28 xl:w-32">
          <component
            :is="card.icon"
            class="w-6 text-[#93765d]"
            aria-hidden="true"
          />
          <div class="text-xs lg:text-xs 2xl:text-sm leading-7 w-full">
            <h3 class="font-semibold text-[#535355]">{{ card.name }}</h3>
          </div>
        </div>
      </div>
    </div>
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
            '!bg-[#fffdf7] text-[#93765d] border-0 px-4 py-2 !rounded-none',
            'dark:bg-gray-900 dark:text-[#93765d] dark:border-[#93765d]', // Dark Mode
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
const pageRows = ref(12);

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
