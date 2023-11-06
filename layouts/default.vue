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
                      <ul v-if="navigation[0]" role="list" class="-mx-2 space-y-1">
                        <DynamicMenu :menuItems="navigation[0].items" />
                      </ul>
                    </li>
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
        <div class="flex h-16 shrink-0 items-center mt-6 mb-6">
          <NuxtLink to="/">
            <img class="w-auto h-full mt-5" src="/logo.png" alt="ZŠ žulová" />
          </NuxtLink>
        </div>
        <nav class="flex flex-1 flex-col">
          <ul v-if="navigation[0]" role="list" class="flex flex-1 flex-col gap-y-7">
            <DynamicMenu :menuItems="navigation[0].items" />
          </ul>
        </nav>
      </div>
    </div>

    <div class="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
      <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
        <span class="sr-only">Open sidebar</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>
      <div class="flex-1 text-sm font-semibold leading-6 text-gray-900">Základní Škola Žulová</div>
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

const sidebarOpen = ref(false)
</script>
<style></style>
