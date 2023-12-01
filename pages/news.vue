<template>
  <div class="pt-10 max-w-2xl lg:max-w-5xl mx-auto">
    <h1 class="text-3xl font-semibold text-gray-900 pl-5">Aktuality</h1>
    <div class="flex items-center gap-2 mt-2 mb-2 max-w-sm px-5">
      <div class="flex w-full flex-col">
        <Calendar
          id="date"
          v-model="dates"
          selectionMode="range"
          :manualInput="false"
          dateFormat="dd.mm.yy"
          showButtonBar
          :placeholder="'Vyberte datum'"
        />
      </div>
      <div class="flex flex-col">
        <Button
          label="Vyhledat"
          severity="info"
          @click="refresh"
          :disabled="pending"
        />
      </div>
    </div>
    <!-- Articles -->
    <NewsPreview
      v-if="data.articles && data.articles.length > 0"
      :posts="data.articles"
    ></NewsPreview>

    <!-- Paginator -->
    <div
      v-if="data.articlesCount && Number(data.articlesCount[0].count) > 0"
      class="mt-6"
    >
      <Paginator
        @page="onChangePage"
        :rows="pageRows"
        :totalRecords="Number(data.articlesCount[0].count)"
      ></Paginator>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $directus, $readItems, $aggregate } = useNuxtApp();

import { useRoute } from "vue-router";
import Paginator from "primevue/paginator";
import NewsPreview from "~/components/NewsPreview.vue";
import Button from "primevue/button";
import Calendar from "primevue/calendar";

const config = useRuntimeConfig();
const route = useRoute();

const dates = ref();
const page = ref(0);
const pageRows = ref(20);

const { data, pending, refresh } = await useAsyncData("articles", async () => {
  const allResponses = await Promise.all([
    $directus.request(
      $aggregate("articles", {
        aggregate: {
          count: "*",
        },
        query: {
          filter: {
            date_created: {
              _between: dates.value
                ? dates.value[0].toISOString() +
                  "," +
                  dates.value[1].toISOString()
                : "",
            },
          },
        },
      })
    ),
    $directus.request(
      $readItems("articles", {
        filter: {
          date_created: {
            _between: dates.value
              ? dates.value[0].toISOString() +
                "," +
                dates.value[1].toISOString()
              : "",
          },
        },
        limit: pageRows.value,
        offset: page.value * pageRows.value,
        fields: [
          "id, title, content, slug, thumbnail, date_created, user_created.*",
        ],
      })
    ),
  ]);
  return {
    articlesCount: allResponses[0],
    articles: allResponses[1],
  };
});

const onChangePage = (event: any) => {
  if (event.page !== page.value) {
    page.value = event.page;
    refresh();
  }
};
</script>
