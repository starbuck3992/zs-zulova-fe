<template>
  <div class="relative isolate overflow-hidden bg-gray-900 shadow-lg rounded-b-lg lg:h-96">
    <div class="absolute bg-sky-950 z-10 w-full h-full opacity-40"></div>
    <img src="/skola.jpg" alt="" class="absolute inset-0 -z-10 h-full lg:h-96 w-full object-cover object-right md:object-center" />
    <div class="mx-auto max-w-7xl px-6 lg:px-8 z-50 relative">
      <div class="mx-auto max-w-2xl lg:mx-0 pt-10">
        <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl uppercase">ZŠ ŽULOVÁ</h2>
        <p class="mt-3 text-lg sm:text-3xl leading-8 text-white font-bold uppercase">Škola pro všechny</p>
      </div>
      <div class="mx-auto py-10 lg:py-0 lg:mt-20 grid max-w-2xl grid-cols-1 gap-6 lg:mx-0 lg:max-w-none sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div v-for="card in cards" :key="card.name"
          class="flex gap-x-4 rounded-xl bg-gray-100 hover:bg-white p-6 ring-1 ring-inset ring-white/10 cursor-pointer">
          <a :href="card.link">
            <component :is="card.icon" class="h-7 w-5 flex-none text-blue-600" aria-hidden="true" />
            <div class="text-sm 2xl:text-base leading-7">
              <h3 class="font-semibold text-black">{{ card.name }}</h3>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
  <ArticlePreview :mainPage="true" v-if="articles &&articles?.length > 0" :posts="articles"></ArticlePreview>
</template>

<script setup lang="ts">
import { LifebuoyIcon, NewspaperIcon, PhoneIcon } from "@heroicons/vue/20/solid";
const { $directus, $readItems } = useNuxtApp()
import { useRoute } from 'vue-router';
import ArticlePreview from '~/components/ArticlePreview.vue';

const { data: articles } = await useAsyncData('articles', () => {
  return $directus.request($readItems('articles', {
    limit: 6,
    sort: '-date_created',
  }))
})

const cards = [
  {
    name: 'Rozvrh Hodin',
    icon: NewspaperIcon,
    link: 'https://zszulova.bakalari.cz/timetable/public/',
    target: '_blank'
  },
  {
    name: 'Bakaláři',
    icon: LifebuoyIcon,
    target: '_parent',
  },
  {
    name: 'Jídelníček',
    icon: NewspaperIcon,
    target: '_parent',

  },
  {
    name: 'Kontakty',
    icon: PhoneIcon,
    target: '_parent',
  },
]
</script>
