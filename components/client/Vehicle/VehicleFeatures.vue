<template>
  <div class="mt-10 sm:px-5">
    <h1 class="border-b border-lochmara py-3 text-xl font-semibold">
      {{ $t("equipment") }}
    </h1>
    <div class="mt-5 grid grid-cols-2 gap-5">
      <div
        v-for="(feature, index) in features"
        :key="feature.id"
        class="col-span-1 flex items-center justify-between px-3 py-2 font-semibold"
        :class="{
          'bg-white': index % 4 === 0 || index % 4 === 1,
          'bg-gray-100': index % 4 === 2 || index % 4 === 3,
        }"
      >
        <p>{{ feature.name }}</p>
        <svg
          class="w-5"
          data-slot="icon"
          aria-hidden="true"
          fill="none"
          stroke-width="3"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m4.5 12.75 6 6 9-13.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["features"]);
</script>
