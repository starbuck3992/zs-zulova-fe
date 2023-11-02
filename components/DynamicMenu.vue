<template>
    <div>
        <ul role="list" class="-mx-2 space-y-1">
            <li v-for="item in menuItems" :key="item.label">
                <template v-if="!Array.isArray(item.submenu) && !Array.isArray(item.menu_items)">
                    <nuxt-link
                        class="flex justify-between w-full px-4 py-1 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 rounded-md"
                        :to="{ name: 'section-slug', params: { section: item.page_id.collection, slug: item.page_id.key.toString() } }">
                        {{ item.label }}
                    </nuxt-link>
                </template>
                <Disclosure v-else as="div" class="mt-2">
                    <DisclosureButton
                        class="flex justify-between w-full px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 rounded-md">
                        {{ item.label }}
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"
                            aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg>
                    </DisclosureButton>
                    <DisclosurePanel class="px-4 pt-2 pb-2 text-sm text-gray-500">
                        <DynamicMenu v-if="Array.isArray(item.submenu)" :menuItems="item.submenu" />
                        <DynamicMenu v-if="Array.isArray(item.menu_items)" :menuItems="item.menu_items" />
                    </DisclosurePanel>
                </Disclosure>
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