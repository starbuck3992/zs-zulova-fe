<template>
  <div class="min-h-screen bg-[#fffdf7]">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="relative z-50 lg:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div
                  class="absolute left-full top-0 flex w-16 justify-center pt-5"
                >
                  <button
                    type="button"
                    class="-m-2.5 p-2.5"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 text-[#93765d]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div
                class="flex grow flex-col gap-y-5 overflow-y-auto bg-[#fffdf7] px-6 pb-2"
              >
                <div class="flex items-center mt-4">
                  <div class="flex h-20 -ml-2 shrink-0 items-center rounded-lg">
                    <img
                      class="h-20 w-auto rounded-lg"
                      src="/logo.png"
                      alt="Your Company"
                    />
                  </div>
                  <div
                    class="rounded-full bg-white w-7 h-7 flex items-center justify-start ml-2"
                  >
                    <a
                      class="p-2 text-[#93765d] hover:text-blue-200 mx-auto text-center block w-fit"
                      aria-label="Visit TrendyMinds Facebook"
                      href="https://www.facebook.com/ZakladniSkolaZulova"
                      target="_blank"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                        class="h-5"
                      >
                        <path
                          fill="currentColor"
                          d="m279.14 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                        ></path>
                      </svg>
                    </a>
                  </div>
                  <div
                    class="rounded-full bg-white w-7 h-7 flex items-center justify-center ml-2"
                  >
                    <a
                      class="p-2 text-[#93765d] hover:text-blue-200 mx-auto text-center block w-fit"
                      aria-label="Visit TrendyMinds Instagram"
                      href="https://www.instagram.com/zs_zulova/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA=="
                      target="_blank"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        class="h-5"
                      >
                        <path
                          fill="currentColor"
                          d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul
                        v-if="navigation[0]"
                        role="list"
                        class="-mx-2 space-y-1"
                      >
                        <DynamicMenu :menuItems="navigation[0].items" />
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div
      class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
    >
      <!-- Sidebar component, swap this element with another sidebar if you like //světle modrá - bg-[#f7f9ff] //bezova - bg-[#fff9f7] -->
      <div
        class="flex grow flex-col gap-y-5 overflow-y-auto bg-[#f7f9ff] shadow px-6"
      >
        <div class="flex h-40 shrink-0 items-center mt-2 mb-2">
          <NuxtLink to="/">
            <img
              class="w-auto h-40 mt-5 rounded-lg shadow border border-[#93765d]"
              src="/logo.png"
              alt="ZŠ žulová"
            />
          </NuxtLink>
          <div
            class="flex-1 h-fit justify-center text-center w-full mx-auto text-sm font-semibold leading-6 text-[#93765d]"
          >
            <div
              class="rounded-full shadow bg-white border border-[#93765d] w-7 h-7 flex items-center justify-center mx-auto"
            >
              <a
                class="p-2 text-[#93765d] hover:text-[#80634a] mx-auto text-center block w-fit"
                aria-label="Visit TrendyMinds Facebook"
                href="https://www.facebook.com/ZakladniSkolaZulova"
                target="_blank"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  class="h-5"
                >
                  <path
                    fill="currentColor"
                    d="m279.14 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                  ></path>
                </svg>
              </a>
            </div>
            <div
              class="rounded-full bg-white border border-[#93765d] w-7 h-7 flex items-center justify-center mx-auto mt-5"
            >
              <a
                class="p-2 text-[#93765d] hover:text-[#80634a] mx-auto text-center block w-fit"
                aria-label="Visit TrendyMinds Instagram"
                href="https://www.instagram.com/zs_zulova/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA=="
                target="_blank"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  class="h-5"
                >
                  <path
                    fill="currentColor"
                    d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <nav class="flex flex-1 flex-col">
          <ul
            v-if="navigation[0]"
            role="list"
            class="flex flex-1 flex-col gap-y-7"
          >
            <DynamicMenu :menuItems="navigation[0].items" />
          </ul>
        </nav>
      </div>
    </div>

    <div
      class="sticky top-0 z-40 flex items-center gap-x-6 bg-[#fffdf7] px-4 py-4 shadow-sm sm:px-6 lg:hidden border-b border-[#93765d]"
    >
      <button
        type="button"
        class="-m-2.5 p-2.5 text-[#93765d] lg:hidden"
        @click="sidebarOpen = true"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <div class="flex-1 text-sm font-semibold leading-6 text-[#93765d]">
        ZŠ Žulová - Škola pro všechny
      </div>
    </div>
    <main class="lg:pl-72">
      <slot></slot>
    </main>
  </div>
  <footer class="bg-[#fffdf7] relative w-full mt-10 shadow border-t">
    <div class="mx-auto max-w-7xl overflow-hidden px-6 py-3 lg:px-8">
      <div class="flex text-[#93765d] justify-center space-x-5">
        <a
          class="text-[#93765d] hover:text-blue-200"
          aria-label="Visit TrendyMinds Facebook"
          href="https://www.facebook.com/ZakladniSkolaZulova"
          target="_blank"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            class="h-5"
          >
            <path
              fill="currentColor"
              d="m279.14 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
            ></path>
          </svg>
        </a>
        <a
          class="text-[#93765d] hover:text-blue-200"
          aria-label="Visit TrendyMinds Instagram"
          href="https://www.instagram.com/zs_zulova/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA=="
          target="_blank"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            class="h-5"
          >
            <path
              fill="currentColor"
              d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
            ></path>
          </svg>
        </a>
      </div>
      <p class="mt-6 text-center text-xs leading-5 text-[#93765d]">
        &copy; 2023 ZŠ Žulová, Všechna práva vyhrazena.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import DynamicMenu from "~/components/DynamicMenu.vue";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
const { $directus, $readItems } = useNuxtApp();

const { data: navigation } = await useAsyncData("navigation", () => {
  return $directus.request(
    $readItems("navigation", {
      fields: [
        "id, title",
        "items.id, items.title, items.url, items.hasChildren, items.openInNewTab",
        "items.page.id, items.page.title, items.page.slug",
        "items.children.id, items.children.title, items.children.hasChildren, items.children.openInNewTab, items.children.url",
        "items.children.page.id, items.children.page.title, items.children.page.slug",
        "items.children.children.id, items.children.children.title, items.children.children.hasChildren, items.children.children.openInNewTab, items.children.children.url",
        "items.children.children.page.id, items.children.children.page.title, items.children.children.page.slug",
      ],
    })
  );
});

const sidebarOpen = ref(false);
</script>
<style></style>
