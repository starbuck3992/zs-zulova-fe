<template>
    <div class="border-t border-gray-200 mt-5"></div>

    <!-- From Main Pages -->
    <div v-if="mainPage" class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3 px-5">
        <NuxtLink :to="`articles/${post.slug}`"
             v-for="post in posts" :key="post.id" class="flex flex-col items-start  shadow rounded-2xl">
            <div class="relative w-full">
                <img :src="'https://lobster-app-mv2hv.ondigitalocean.app/assets/' + post.thumbnail" alt=""
                    class="aspect-[16/9] w-full rounded-2xl rounded-b-none bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
                <div class="absolute inset-0 rounded-2xl rounded-b-none ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div class="max-w-xl p-4 pt-0">
                <div class="mt-8 flex gap-x-4 text-xs">
                    <time :datetime="formatDate(post.date_created)" class="text-gray-500">{{
                        formatDate(post.date_created) }}</time>
                </div>
                <div class="group relative">
                    <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <span class="absolute inset-0"></span>
                        {{ post.title }}
                    </h3>
                    <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600" v-html="post.content"></p>
                </div>
                <div class="relative mt-8 flex items-center gap-x-4">
                    <img src="/user.png" alt="" class="h-10 w-10 rounded-full bg-gray-50" />
                    <div class="text-sm leading-6">
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
    </div>
    <!-- From All Pages -->
    <div v-else class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
        <NuxtLink :to="`articles/${post.articles_id.slug}`"
             v-for="post in posts" :key="post.articles_id.id" class="flex flex-col items-start  shadow rounded-2xl">
            <div class="relative w-full">
                <img :src="'https://lobster-app-mv2hv.ondigitalocean.app/assets/' + post.articles_id.thumbnail" alt=""
                    class="aspect-[16/9] w-full rounded-2xl rounded-b-none bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
                <div class="absolute inset-0 rounded-2xl rounded-b-none ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div class="max-w-xl p-4 pt-0">
                <div class="mt-8 flex gap-x-4 text-xs">
                    <time :datetime="formatDate(post.articles_id.date_created)" class="text-gray-500">{{
                        formatDate(post.articles_id.date_created) }}</time>
                </div>
                <div class="group relative">
                    <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <span class="absolute inset-0"></span>
                        {{ post.articles_id.title }}
                    </h3>
                    <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600" v-html="post.articles_id.content"></p>
                </div>
                <div class="relative mt-8 flex items-center gap-x-4">
                    <img src="/user.png" alt="" class="h-10 w-10 rounded-full bg-gray-50" />
                    <div class="text-sm leading-6">
                        <p class="font-semibold text-gray-900">
                            <span>
                                <span class="absolute inset-0" />
                                {{ post.articles_id.user_created.first_name }}
                                {{ post.articles_id.user_created.last_name }}
                            </span>
                        </p>
                        <p class="text-gray-600"></p>
                    </div>
                </div>
            </div>
        </NuxtLink>
    </div>
</template>
<script setup lang="ts">

defineProps({
    posts: {
        type: Array,
        required: true
    },
    mainPage: {
        type: Boolean,
        default: false
    }
})

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}
</script>
