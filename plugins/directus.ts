import { createDirectus } from '@directus/sdk';
import { rest, readItem, readItems } from '@directus/sdk/rest';

interface Page {
    id: number;
    title: string;
    content: string;
}

interface Schema {
    pages: Page[];
}

export default defineNuxtPlugin(() => {
    const runtimeConfig = useRuntimeConfig()

    const directus = createDirectus<Schema>(runtimeConfig.public.apiBase).with(rest());

    return {
        provide: { directus, readItem, readItems },
    };
});
