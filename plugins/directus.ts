import { createDirectus } from '@directus/sdk';
import { rest, readItem, readItems, readAll } from '@directus/sdk/rest';

interface Page {
    id: number;
    title: string;
    content: string;
    articles: number[];
}

interface Article {
    id: number;
    title: string;
    content: string;
    page: number;
}

interface Schema {
    pages: Page[];
    articles: Article[];
}

export default defineNuxtPlugin(() => {
    const runtimeConfig = useRuntimeConfig()

    const directus = createDirectus<Schema>(runtimeConfig.public.apiBase).with(rest());

    return {
        provide: { directus, readItem, readItems },
    };
});
