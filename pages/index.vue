<template>
  <div class="relative isolate overflow-hidden bg-gray-900 shadow-lg rounded-b-lg h-96">
    <div class="absolute bg-sky-950 z-10 w-full h-full opacity-40"></div>
    <img src="/skola.jpg" alt=""
         class="absolute inset-0 -z-10 h-96 w-full object-cover object-right md:object-center" />
    <div class="mx-auto max-w-7xl px-6 lg:px-8 z-50 relative">
      <div class="mx-auto max-w-2xl lg:mx-0 py-10">
        <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl uppercase">ZŠ ŽULOVÁ</h2>
        <p class="mt-3 text-lg sm:text-3xl leading-8 text-white font-bold uppercase">Škola pro všechny</p>
      </div>
      <div
          class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-8">
        <div v-for="card in cards" :key="card.name"
             class="flex gap-x-4 rounded-xl bg-gray-100 hover:bg-white p-6 ring-1 ring-inset ring-white/50 cursor-pointer">
          <component :is="card.icon" class="h-7 w-5 flex-none text-blue-600" aria-hidden="true" />
          <div class="text-base leading-7">
            <h3 class="font-semibold text-black">{{ card.name }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
    <article v-for="post in posts" :key="post.id"
             class="relative isolate flex flex-col gap-8 lg:flex-row justify-center px-5">
      <div class="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
        <img :src="post.imageUrl" alt="" class="absolute inset-0 h-auto w-full rounded-2xl bg-gray-50 object-cover" />
      </div>
      <div>
        <div class="flex items-center gap-x-4 text-xs">
          <time :datetime="post.datetime" class="text-gray-500">{{ post.date }}</time>
        </div>
        <div class="group relative max-w-x xl:max-w-2xl">
          <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <a :href="post.href">
              <span class="absolute inset-0" />
              {{ post.title }}
            </a>
          </h3>
          <p class="mt-5 text-sm leading-6 text-gray-600">{{ post.description }}</p>
        </div>
        <div class="mt-6 flex border-t border-gray-900/5 pt-6">
          <div class="relative flex items-center gap-x-4">
            <img :src="post.author.imageUrl" alt="" class="h-10 w-10 rounded-full bg-gray-50" />
            <div class="text-sm leading-6">
              <p class="font-semibold text-gray-900">
                <a :href="post.author.href">
                  <span class="absolute inset-0" />
                  {{ post.author.name }}
                </a>
              </p>
              <p class="text-gray-600">{{ post.author.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>


</template>

<script setup lang="ts">
import {LifebuoyIcon, NewspaperIcon, PhoneIcon} from "@heroicons/vue/20/solid";

const { $directus, $readItems } = useNuxtApp()
const { data: global } = await useAsyncData('global', () => {
  return $directus.request($readItems('global'))
})

const cards = [
  {
    name: 'Rozvrh Hodin',
    icon: NewspaperIcon,
  },
  {
    name: 'Bakaláři',
    icon: LifebuoyIcon,
  },
  {
    name: 'Jídelníček',
    icon: NewspaperIcon,
  },
  {
    name: 'Kontakty',
    icon: PhoneIcon,
  },
]

const posts = [
  {
    id: 1,
    title: 'Badatelská výuka v 9. třídě',
    href: '#',
    description:
        'Skupinová práce na hodinách dějepisu v deváté třídě – Tajemství vojenského kufříku – 1. světová válka Hodina je zaměřena na podporu badatelských dovedností. Deváťáci si musí vybrat jeden ze čtyř kufříků, prozkoumat jeho obsah a na základě zjištěných informací sestavit příběh československého vojáka 1. světové války. Kufr obsahuje osobní dokumenty a denní věci legionářů, ale třeba i předměty, které jim krátily dlouhé večery a zmírnily stesk po domově. odkaz: https://www.vhu.cz/operace-historikon-zakladni-informace-a-objednavky-2/tajemstvi-vojenskeho-kufriku/',
    imageUrl:
        'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
    date: '16 Května, 2021',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Petr Vylíčil',
      role: 'Ředitel školy',
      href: '#',
      imageUrl:
          '/user.png',
    },
  },
  {
    id: 2,
    title: 'Motivační výlet 2. třída',
    href: '#',
    description:
        'Průvodci  letošního motivačního výletu 2. třídy byli Žuláci ze Sedmilánského kopce z knihy Pohádek a pověstí z Rychlebských hor od Karla Jedonka.  Zajímali nás jak Žuláci samotní, tak veškeré horniny v našem okolí a nejvíc ze všech samozřejmě žula. Po přečtení pověsti v dětech vyvstala otázka : „ Co je to vlastně žula ?“ V naší milé Žulové nebyla nouze na ukázky a vysvětlování. Vše bylo náplní našeho motivačního výletu. Vše – jak být spolu, lépe se poznat, zažít dobrodružství a něco se dozvědět.',
    imageUrl:
        'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
    date: '16 Května, 2021',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Petr Vylíčil',
      role: 'Ředitel školy',
      href: '#',
      imageUrl:
          '/user.png',
    },
  },
  // More posts...
]
</script>
