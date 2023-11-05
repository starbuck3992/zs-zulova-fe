<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
          enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
          leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                <div class="flex h-16 shrink-0 items-center">
                  <img class="h-8 w-auto" src="/logo.png" alt="Your Company" />
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <a :href="item.href"
                            :class="[item.current ? 'bg-gray-50 text-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                            <component :is="item.icon"
                              :class="[item.current ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600', 'h-6 w-6 shrink-0']"
                              aria-hidden="true" />
                            {{ item.name }}
                          </a>
                        </li>
                      </ul>
                    </li>
<!--                    <li>-->
<!--                      <div class="text-xs font-semibold leading-6 text-gray-400">Your teams</div>-->
<!--                      <ul role="list" class="-mx-2 mt-2 space-y-1">-->
<!--                        <li v-for="team in teams" :key="team.name">-->
<!--                          <a :href="team.href"-->
<!--                            :class="[team.current ? 'bg-gray-50 text-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">-->
<!--                            <span-->
<!--                              :class="[team.current ? 'text-blue-600 border-blue-600' : 'text-gray-400 border-gray-200 group-hover:border-blue-600 group-hover:text-blue-600', 'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white']">{{-->
<!--                                team.initial }}</span>-->
<!--                            <span class="truncate">{{ team.name }}</span>-->
<!--                          </a>-->
<!--                        </li>-->
<!--                      </ul>-->
<!--                    </li>-->
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <div class="flex h-16 shrink-0 items-center">
          <NuxtLink to="/">
            <img class="w-auto h-full mt-5" src="/logo.png" alt="ZŠ žulová" />
          </NuxtLink>
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <DynamicMenu :menuItems="navigation[0].items" />
<!--              <ul role="list" class="-mx-2 space-y-1">-->
<!--                <li v-for="item in navigation" :key="item.name">-->
<!--                  <div class="flex">-->
<!--                    <a :href="item.href"-->
<!--                       :class="[item.current ? 'bg-gray-50 text-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">-->
<!--                      <component :is="item.icon"-->
<!--                                 :class="[item.current ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600', 'h-6 w-6 shrink-0']"-->
<!--                                 aria-hidden="true" />-->
<!--                      {{ item.name }}-->
<!--                    </a>-->
<!--                    <ChevronRightIcon v-if="item.subpages && !item.open" class="w-3"></ChevronRightIcon>-->
<!--                    <ChevronDownIcon v-if="item.open" class="w-3"></ChevronDownIcon>-->
<!--                  </div>-->
<!--                  <div v-if="item.subpages && item.open">-->
<!--                    <ul role="list" class="ml-5 space-y-1">-->
<!--                      <li class="flex" v-for="item in item.subpages" :key="item.name">-->
<!--                        <a :href="item.href"-->
<!--                           :class="[item.current ? 'bg-gray-50 text-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">-->
<!--                          <component :is="item.icon"-->
<!--                                     :class="[item.current ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600', 'h-6 w-6 shrink-0']"-->
<!--                                     aria-hidden="true" />-->
<!--                          {{ item.name }}-->
<!--                        </a>-->
<!--                        <ChevronRightIcon v-if="item.subpages" class="w-3"></ChevronRightIcon>-->

<!--                      </li>-->
<!--                    </ul>-->
<!--                  </div>-->
<!--                </li>-->
<!--              </ul>-->
            </li>
<!--            <li>-->
<!--              <div class="text-xs font-semibold leading-6 text-gray-400">Your teams</div>-->
<!--              <ul role="list" class="-mx-2 mt-2 space-y-1">-->
<!--                <li v-for="team in teams" :key="team.name">-->
<!--                  <a :href="team.href"-->
<!--                    :class="[team.current ? 'bg-gray-50 text-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">-->
<!--                    <span-->
<!--                      :class="[team.current ? 'text-blue-600 border-blue-600' : 'text-gray-400 border-gray-200 group-hover:border-blue-600 group-hover:text-blue-600', 'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white']">{{-->
<!--                        team.initial }}</span>-->
<!--                    <span class="truncate">{{ team.name }}</span>-->
<!--                  </a>-->
<!--                </li>-->
<!--              </ul>-->
<!--            </li>-->
<!--            <li class="-mx-6 mt-auto">-->
<!--              <a href="#"-->
<!--                class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50">-->
<!--                <img class="h-8 w-8 rounded-full bg-gray-50"-->
<!--                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"-->
<!--                  alt="" />-->
<!--                <span class="sr-only">Your profile</span>-->
<!--                <span aria-hidden="true">Tom Cook</span>-->
<!--              </a>-->
<!--            </li>-->
          </ul>
        </nav>
      </div>
    </div>

    <div class="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
      <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
        <span class="sr-only">Open sidebar</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>
      <div class="flex-1 text-sm font-semibold leading-6 text-gray-900">Dashboard</div>
      <a href="#">
        <span class="sr-only">Your profile</span>
        <img class="h-8 w-8 rounded-full bg-gray-50"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="" />
      </a>
    </div>
    <main class="lg:pl-72">
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue'
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  CalendarIcon,
  ChartPieIcon,
  Bars3Icon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  ChevronRightIcon,
  ChevronDownIcon
} from '@heroicons/vue/24/outline'
import { LifebuoyIcon, NewspaperIcon, PhoneIcon } from '@heroicons/vue/20/solid'
import DynamicMenu from '~/components/DynamicMenu.vue';
const { $directus, $readItems } = useNuxtApp()

  const {data: navigation} = await useAsyncData('navigation', () => {
    return $directus.request($readItems('navigation', {
      fields: [
        'id, title',
        'items.id, items.title, items.url, items.hasChildren, items.openInNewTab',
        'items.page.id, items.page.title, items.page.slug',
        'items.children.id, items.children.title',
        'items.children.page.id, items.children.page.title, items.children.page.slug'
      ]
    }))
  })
// const navigation = [
//   { name: 'Aktuality', href: '#', icon: HomeIcon, current: true },
//   {
//     name: 'O škole', href: '#', icon: UsersIcon, current: false,
//     subpages: [
//       {
//         name: 'Historie školy',
//         href: '#',
//         icon: PhoneIcon,
//         current: false
//       },
//       {
//         name: 'Školní vzdělávací program',
//         href: '#',
//         icon: PhoneIcon,
//         current: false
//       }
//     ]
//   },
//   { name: 'Úřední deska', href: '#', icon: FolderIcon, current: false, open: false },
//   { name: 'Školní družina', href: '#', icon: CalendarIcon, current: false, open: false },
//   { name: 'Školní jídelna', href: '#', icon: DocumentDuplicateIcon, current: false, open: false },
//   { name: 'Dokumenty ke stažení', href: '#', icon: ChartPieIcon, current: false, open: false },
//   { name: 'Bakaláři', href: '#', icon: ChartPieIcon, current: false, open: false },
//   { name: 'Rozvrh Hodin', href: '#', icon: ChartPieIcon, current: false, open: false },
//   { name: 'Kalendář akcí', href: '#', icon: ChartPieIcon, current: false, open: false },
//   { name: 'Google Classroom', href: '#', icon: ChartPieIcon, current: false, open: false },
//   { name: 'Příjmací řízení na SŠ', href: '#', icon: ChartPieIcon, current: false, open: false },
// ]
// const teams = [
//   { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
//   { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
//   { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
// ]

const sidebarOpen = ref(false)
</script>
<style></style>
