<template>
  <div>
    <ul role="list" class="-mx-2 space-y-1">
      <li v-for="item in menuItems" :key="item.id">
        <div v-if="item.hasChildren" class="mt-2">
          <div
            @click="() => handleMenuItemClick(item)"
            :class="[
              item.open ? 'bg-gray-50 text-indigo-600' : '',
              'flex w-full text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-left cursor-pointer select-none',
              { 'router-link-active': isMenuItemActive(item) },
            ]"
          >
            {{ item.title }}
            <span v-if="item.open" class="material-symbols-outlined">
              keyboard_arrow_up
            </span>
            <span v-else class="material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </div>
          <transition name="fade">
            <div
              v-show="item.open"
              class="px-4 pt-2 pb-2 text-sm text-gray-500"
            >
              <DynamicMenu :menuItems="item.children" />
            </div>
          </transition>
        </div>
        <template v-else>
          <a
            v-if="item.url && item.page === null"
            class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
            :href="`${item.url}`"
            :target="item.openInNewTab ? '_blank' : '_self'"
          >
            {{ item.title }}
          </a>
          <NuxtLink
            v-else
            @click.native="handleMenuItemClick(item)"
            class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
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
import { defineProps } from "vue";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  menuItems: {
    type: Array,
    default: () => [],
  },
});

const router = useRouter();

const handleMenuItemClick = (clickedItem) => {
  props.menuItems.forEach((item) => {
    if (item !== clickedItem && item.hasChildren) {
      item.open = false;
    }
  });

  if (!clickedItem.open) {
    collapseMenus(clickedItem, props.menuItems);
  }

  clickedItem.open = !clickedItem.open;

  let parent = props.menuItems.find(
    (item) => item.children && item.children.includes(clickedItem)
  );
  while (parent) {
    parent.open = true;
    parent = props.menuItems.find(
      (item) => item.children && item.children.includes(parent)
    );
  }
};

const isMenuItemActive = (item) => {
  return router.currentRoute.value.path.includes(item.url);
};

const setActiveMenu = () => {
  const findActive = (items) => {
    for (const item of items) {
      if (item.hasChildren) {
        const foundInChildren = findActive(item.children);
        if (foundInChildren) {
          item.open = true;
          return true;
        }
      } else if (item.url && isMenuItemActive(item)) {
        item.open = true;
        return true;
      }
    }
    return false;
  };

  findActive(props.menuItems);
};

const collapseMenus = (clickedItem, items) => {
  items.forEach((item) => {
    if (item !== clickedItem && item.hasChildren) {
      item.open = false;
      collapseMenus(clickedItem, item.children);
    }
  });
};

onMounted(() => {
  setActiveMenu();
});

watch(router.currentRoute, () => {
  setActiveMenu();
});
</script>

<style scoped>
.router-link-active {
  @apply bg-gray-50 text-indigo-600;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
