<template>
    <div v-if="user">
        {{ user }}
    </div>
</template>
  
<script setup>
import { useAsyncData } from 'nuxt/app';
import { defineProps } from 'vue';

const { $directus, $readItems } = useNuxtApp();
const props = defineProps({
    userId: {
        type: String,
        required: true
    }
});
console.log(props.userId);
const { data: user } = await useAsyncData(`users`, () =>
    $directus.request($readItems('users', {
        filter: {
            id: { _eq: props.userId }
        },
        fields: ['id', 'first_name', 'last_name']
    }))
);

console.log(user.value);
</script>