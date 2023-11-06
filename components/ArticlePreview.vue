<template>
    <div class="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
        <article v-for="post in posts" :key="post.id" class="relative isolate flex gap-8 flex-row justify-center px-5">
            <div class="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                <img :src="'https://lobster-app-mv2hv.ondigitalocean.app/assets/'+post.articles_id.thumbnail" alt=""
                    class="absolute inset-0 h-auto w-full rounded-2xl bg-gray-50 object-cover" />
            </div>
            <div>
                <div class="flex items-center gap-x-4 text-xs">
                    <time :datetime="post.date_created" class="text-gray-500">{{ post.date_created }}</time>
                </div>
                <div class="group relative max-w-x xl:max-w-2xl">
                    <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <a :href="post.slug" :target="post.target">
                            <span class="absolute inset-0" />
                            {{ post.title }}
                        </a>
                    </h3>
                    <p class="mt-5 text-sm leading-6 text-gray-600">{{ post.content }}</p>
                </div>
                <div class="mt-6 flex border-t border-gray-900/5 pt-6">
                    <div class="relative flex items-center gap-x-4">
                        <img src="/user.png" alt="" class="h-10 w-10 rounded-full bg-gray-50" />
                        <div class="text-sm leading-6">
                            <p class="font-semibold text-gray-900">
                                <span>
                                    <span class="absolute inset-0">
                                    Petr Vylíčil
                                    </span>
                                </span>
                            </p>
                            <p class="text-gray-600">Ředitel</p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>
<script setup lang="ts">
defineProps({
    posts: {
        type: Array,
        required: true
    }
})