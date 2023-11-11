<template>
  <div>
    <ul role="list" class="-mx-2 space-y-1">
      <li v-for="item in menuItems" :key="item.id">
        <Disclosure v-slot="{ open }" v-if="item.hasChildren" as="div" class="mt-2">
          <DisclosureButton
            :class="[open ? 'bg-gray-50 text-indigo-600':'','flex w-full text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-left']">
            {{ item.title }}
            <span v-if="open" class="material-symbols-outlined">
              keyboard_arrow_up
            </span>
            <span v-else class="material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </DisclosureButton>
          <DisclosurePanel class="px-4 pt-2 pb-2 text-sm text-gray-500">
            <DynamicMenu :menuItems="item.children" />
          </DisclosurePanel>
        </Disclosure>
        <template v-else>
          <a v-if="item.url && item.page === null"
            class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
            :href="`${item.url}`" :target="item.openInNewTab ? '_blank' : '_self'">
            {{ item.title }}
          </a>
          <NuxtLink v-else
            class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
            :to="`/${item.page.slug}`" :target="item.openInNewTab ? '_blank' : '_self'">
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
<style scoped>
.router-link-active {
  @apply bg-gray-50 text-indigo-600;
}
</style>
