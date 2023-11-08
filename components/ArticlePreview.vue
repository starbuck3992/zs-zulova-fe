<template>
    <div class="border-t border-gray-200 mt-5"></div>
    <div class="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
        <article v-for="post in posts" :key="post.articles_id.id"
            class="relative isolate flex gap-8 flex-row justify-start px-5 rounded-lg hover:outline outline-1 outline-offset-1 outline-gray-200 shadow p-5 cursor-pointer">
            <NuxtLink class="relative isolate flex gap-8 flex-row justify-start px-5 h-fit lg:min-h-[300px]"
                :to="`articles/${post.articles_id.slug}`">
                <div class="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-52 lg:shrink-0">
                    <img :src="'https://lobster-app-mv2hv.ondigitalocean.app/assets/' + post.articles_id.thumbnail" alt=""
                        class="absolute sm:h-[300px] inset-0 h-auto w-auto rounded-2xl object-contain" />
                </div>
                <div>
                    <div class="flex items-center gap-x-4 text-xs">
                        <time :datetime="post.articles_id.date_created" class="text-gray-500">{{
                            post.articles_id.date_created
                        }}</time>
                    </div>
                    <div class="group relative max-w-xl xl:max-w-2xl md:w-[600px] lg:w-auto xl:w-[600px]">
                        <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                            <span>
                                <span class="absolute inset-0" />
                                {{ post.articles_id.title }}
                            </span>
                        </h3>
                        <p class="mt-5 text-sm leading-6 text-gray-600" v-html="post.articles_id.content"></p>
                    </div>
                    <div class="mt-6 flex border-t border-gray-900/5 pt-6">
                        <div class="relative flex items-center gap-x-4">
                            <img src="/user.png" alt="" class="h-10 w-10 rounded-full bg-gray-50" />
                            <div class="text-sm leading-6">
                                <p class="font-semibold text-gray-900">
                                    <span>
                                        <span class="absolute inset-0" />
                                        <UserDisplay :userId="post.articles_id.user_created" />
                                    </span>
                                </p>
                                <p class="text-gray-600">Ředitel</p>
                            </div>
                        </div>
                    </div>
                </div>
            </NuxtLink>
        </article>
    </div>
</template>
<script setup lang="ts">
import UserDisplay from './UserDisplay.vue';

defineProps({
    posts: {
        type: Array,
        required: true
    }
})
</script>