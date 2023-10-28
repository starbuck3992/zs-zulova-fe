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

const directus = createDirectus<Schema>('https://zszulova.directus.app').with(rest());

export default defineNuxtPlugin(() => {
    return {
        provide: { directus, readItem, readItems },
    };
});
