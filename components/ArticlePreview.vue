<template>
  <div v-if="!mainPage" class="border-t border-[#93765d] mt-5"></div>

  <!-- From Main Pages -->
  <div
    v-if="mainPage"
    class="mx-auto mt-16 grid max-w-xl grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4 xl:grid-cols-5 px-5"
  >
    <template v-for="post in posts" :key="post.id">
      <NuxtLink
        v-if="post.slug"
        :to="`/articles/${post.slug}`"
        class="flex flex-col items-start shadow-sm bg-white p-3 rounded-lg cursor-pointer shadow-[#93765d]"
      >
        <div class="relative w-full cursor-pointer">
          <img
            :src="config.public.apiBase + 'assets/' + post.thumbnail"
            alt=""
            class="aspect-[16/9] w-full rounded-lg bg-white object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
          />
          <div class="absolute inset-0 rounded-lg" />
        </div>
        <div class="max-w-xl p-4 pt-0">
          <div class="mt-8 flex gap-x-4 text-xs">
            <time
              :datetime="formatDate(post.date_created)"
              class="text-gray-500"
              >{{ formatDate(post.date_created) }}</time
            >
          </div>
          <div class="relative">
            <h3 class="mt-3 text-lg font-semibold leading-6 text-black">
              <span class="absolute inset-0 text-[#93765d]"></span>
              {{ post.title }}
            </h3>
            <p
              class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600"
              v-html="post.excerpt"
            ></p>
          </div>
          <div class="relative mt-8 flex items-center gap-x-2">
            <img src="/user.png" alt="" class="w-5 rounded-full bg-gray-50" />
            <div class="text-xs">
              <p class="font-semibold text-gray-900">
                <span>
                  <span class="absolute inset-0" />
                  {{ post.user_created.first_name }}
                  {{ post.user_created.last_name }}
                </span>
              </p>
              <p class="text-gray-600"></p>
            </div>
          </div>
        </div>
      </NuxtLink>
    </template>
  </div>
  <!-- From All Pages -->
  <div
    v-else
    class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3"
  >
    <template v-for="post in posts" :key="post.id">
      <NuxtLink
        v-if="post.slug"
        :to="`/articles/${post.slug}`"
        class="flex flex-col items-start shadow shadow-slate-300 bg-white rounded-lg"
      >
        <div class="relative w-full">
          <img
            :src="config.public.apiBase + 'assets/' + post.thumbnail"
            alt=""
            class="aspect-[16/9] w-full rounded-lg rounded-b-none bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
          />
          <div
            class="absolute inset-0 rounded-lg rounded-b-none ring-1 ring-inset ring-gray-900/10"
          />
        </div>
        <div class="max-w-xl p-4 pt-0">
          <div class="mt-8 flex gap-x-4 text-xs">
            <time
              :datetime="formatDate(post.date_created)"
              class="text-gray-500"
              >{{ formatDate(post.date_created) }}</time
            >
          </div>
          <div class="relative">
            <h3 class="mt-3 text-lg font-semibold leading-6 text-[#93765d]">
              <span class="absolute inset-0"></span>
              {{ post.title }}
            </h3>
            <p
              class="mt-5 text-sm leading-6 text-gray-600"
              v-html="post.excerpt"
            ></p>
          </div>
          <div class="relative mt-8 flex items-center gap-x-4">
            <img
              src="/user.png"
              alt=""
              class="h-10 w-10 rounded-full bg-gray-50"
            />
            <div class="text-sm leading-6">
              <p class="font-semibold text-gray-900">
                <span class="absolute inset-0"></span>
                {{ post.user_created.first_name }}
                {{ post.user_created.last_name }}
              </p>
              <p class="text-gray-600"></p>
            </div>
          </div>
        </div>
      </NuxtLink>
    </template>
  </div>
</template>
<script setup lang="ts">
defineProps({
  posts: {
    type: Array,
    required: true,
  },
  mainPage: {
    type: Boolean,
    default: false,
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
