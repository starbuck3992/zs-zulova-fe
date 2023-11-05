<template>
    <div>
        <ul role="list" class="-mx-2 space-y-1">
            <li v-for="item in menuItems" :key="item.id">
              <Disclosure v-if="item.hasChildren" as="div" class="mt-2">
                <DisclosureButton
                    class="flex justify-between w-full px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 rounded-md">
                  {{ item.title }}
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"
                       aria-hidden="true">
                    <path fill-rule="evenodd"
                          d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clip-rule="evenodd" />
                  </svg>
                </DisclosureButton>
                <DisclosurePanel class="px-4 pt-2 pb-2 text-sm text-gray-500">
                  <DynamicMenu :menuItems="item.children" />
                </DisclosurePanel>
              </Disclosure>
                <template v-else>
                    <NuxtLink
                        class="flex justify-between w-full px-4 py-1 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 rounded-md"
                        :to="`/${item.page.slug}`"
                        :target="item.openInNewTab ? '_blank' : '_self'"
                    >
                        {{ item.title }}
                    </NuxtLink>
              </template>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';

const props = defineProps({
    menuItems: {
        type: Array,
        default: () => []
    }
});
</script>
