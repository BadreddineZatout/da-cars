<template>
  <div id="contact" class="bg-black px-14 pb-2 pt-5 text-white">
    <div class="flex flex-col justify-around sm:flex-row">
      <div class="w-full sm:w-1/6">
        <NuxtLink to="/">
          <img src="/logo.jpg" alt="logo" />
        </NuxtLink>
      </div>
      <div class="w-full flex-col sm:w-4/6">
        <h1 class="text-2xl font-bold">DA-Cars</h1>
        <h2 class="mb-5 w-11/12 text-xl font-semibold sm:w-3/4">
          {{ $t("sub_title") }}
        </h2>
        <div class="mb-2 flex items-center">
          <svg
            class="w-5"
            data-slot="icon"
            aria-hidden="true"
            fill="none"
            stroke-width="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          <p class="ml-2 font-semibold">
            Pirmasenser Straße 98 • 66482 Zweibrücken
          </p>
        </div>
        <div class="mb-2 flex items-center">
          <svg
            class="w-5"
            data-slot="icon"
            aria-hidden="true"
            fill="none"
            stroke-width="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          <a href="tel:+49 1724483803" class="ml-2 font-semibold"
            >+49 (0) 172 - 4483803</a
          >
        </div>
        <div class="mb-2 flex items-center">
          <svg
            class="w-5"
            data-slot="icon"
            aria-hidden="true"
            fill="none"
            stroke-width="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          <p class="ml-2 font-semibold">info@da-cars.de</p>
        </div>
      </div>
    </div>
    <div class="text-center text-gray-400">
      © DA-CARS – 2023. All rights reserved
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
