
import {createDirectus, rest, readItem, readItems, aggregate} from '@directus/sdk';

type navigation = {
    title: string;
    slug: string;
}

export type IPage = {
    id: number;
    title: string;
    content: string;
    slug: string;
    articles: number[];
    gallery: number[];
}

type Article = {
    id: number;
    title: string;
    content: string;
    slug: string;
    pages: number;
}

type Schema = {
    navigation: navigation[];
    pages: IPage[];
    articles: Article[];
}

export default defineNuxtPlugin(() => {
    const runtimeConfig = useRuntimeConfig()

    const directus = createDirectus<Schema>(runtimeConfig.public.apiBase).with(rest());

    return {
        provide: { directus, readItem, readItems, aggregate },
    };
});
