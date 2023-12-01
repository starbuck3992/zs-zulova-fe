<template>
  <ul role="list" class="divide-y divide-gray-100 px-5">
    <li
      v-for="post in posts"
      :key="post.id"
      class="flex justify-start gap-x-6 py-2 max-w-2xl lg:max-w-5xl mx-auto"
    >
      <NuxtLink v-if="post.slug" :to="`/articles/${post.slug}`">
        <div class="flex min-w-0 gap-x-4">
          <img
            class="h-12 w-12 flex-none rounded-lg bg-gray-50"
            :src="config.public.apiBase + 'assets/' + post.thumbnail"
            alt=""
          />
          <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900">
              {{ post.title }}
            </p>
            <p class="mt-1 truncate text-xs leading-5 text-gray-500">
              <time
                :datetime="formatDate(post.date_created)"
                class="text-gray-500"
              >
                {{ formatDate(post.date_created) }}
              </time>
            </p>
          </div>
        </div>
        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end"></div>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps({
  posts: {
    type: Array,
    required: true,
  },
});

const config = useRuntimeConfig();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};
</script>
