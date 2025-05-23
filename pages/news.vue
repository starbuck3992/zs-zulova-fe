<template>
  <div class="pt-10 max-w-2xl lg:max-w-5xl mx-auto">
    <h1 class="text-3xl font-semibold text-[#93765d] pl-5">Aktuality</h1>
    <h4 class="text-gray-900 pl-5 mt-2">
      Filtrace aktualit dle data vytvoření (od - do):
    </h4>
    <div class="flex items-center gap-2 mt-1 mb-5 max-w-sm px-5">
      <div class="flex w-full flex-col">
        <Calendar
          id="date"
          v-model="dates"
          selectionMode="range"
          :manualInput="false"
          dateFormat="dd.mm.yy"
          :placeholder="'Vyberte datum: od - do'"
          :show-button-bar="false"
          ref="calendar"
          :pt-options="{ mergeProps: true }"
          :pt="{
            input: {
              class: [
                'font-sans text-base text-gray-600 !dark:text-gray-600 bg-white !dark:bg-white p-3 border border-gray-300 dark:border-blue-900/40 transition-colors duration-200 appearance-none rounded-lg',
                'hover:border-[#93765d]', //Hover
              ],
            },
          }"
        >
          <template #footer>
            <div class="flex items-center justify-between w-full">
              <div class="py-2">
                <Button
                  label="Vyčistit"
                  @click="clear()"
                  class="mr-2"
                  :disabled="pending"
                  severity="secondary"
                />
              </div>
              <div class="py-2">
                <Button
                  label="Vyhledat"
                  @click="search()"
                  class="mr-2"
                  :disabled="pending"
                  severity="info"
                  :pt-options="{ mergeProps: true }"
                  :pt="{
                    root: ({ props, context }) => ({
                      class: [
                        '!bg-[#fffdf7] !text-[#93765d] !border-[#93765d]', // Dark Mode
                      ],
                    }),
                  }"
                />
              </div>
            </div>
          </template>
        </Calendar>
      </div>
    </div>
    <!-- Articles -->
    <NewsPreview
      v-if="data && data.articles && data.articles.length > 0"
      :posts="data.articles"
    ></NewsPreview>

    <!-- Paginator -->
    <div
      v-if="
        data && data.articlesCount && Number(data.articlesCount[0].count) > 0
      "
      class="mt-6"
    >
      <Paginator
        @page="onChangePage"
        :rows="pageRows"
        :totalRecords="Number(data.articlesCount[0].count)"
        :pt-options="{ mergeProps: true }"
        :pt="{
          root: {
            class: [
              'flex items-center justify-center flex-wrap',
              '!bg-[#fffdf7] text-gray-500 border-0 px-4 py-2 !rounded-none',
              'dark:bg-gray-900 dark:text-[#93765d]/60 dark:border-blue-900/40', // Dark Mode
            ],
          },
        }"
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
const calendar = ref();

const clear = () => {
  dates.value = null;
  page.value = 0;
  refresh();
  calendar.value.overlayVisible = false;
};

const search = () => {
  page.value = 0;
  refresh();
  calendar.value.overlayVisible = false;
};

const { data, pending, refresh } = await useAsyncData("articles", async () => {
  const dateFilter = () => {
    if (dates.value) {
      if (dates.value[0] && dates.value[1]) {
        return {
          _between:
            dates.value[0].toISOString().split("T", 1)[0] +
            "," +
            dates.value[1].toISOString().split("T", 1)[0],
        };
      } else if (!dates.value[0] && dates.value[1]) {
        return {
          _lte: dates.value[1].toISOString().split("T", 1)[0],
        };
      } else if (dates.value[0] && !dates.value[1]) {
        return {
          _gte: dates.value[0].toISOString().split("T", 1)[0],
        };
      } else {
        return {
          _between: "",
        };
      }
    } else {
      return {
        _between: "",
      };
    }
  };

  const allResponses = await Promise.all([
    $directus.request(
      $aggregate("articles", {
        aggregate: {
          count: "*",
        },
        query: {
          filter: {
            date_created: dateFilter(),
          },
        },
      })
    ),
    $directus.request(
      $readItems("articles", {
        filter: {
          date_created: dateFilter(),
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
