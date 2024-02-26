<template>
  <div class="my-10 px-20">
    <div
      class="my-5 flex items-center justify-between border-b border-lochmara"
    >
      <h1 class="text-3xl font-semibold">Recommanded For You</h1>
      <a
        class="flex items-center hover:font-semibold hover:underline"
        href="/vehicles"
        >See More<svg
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
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path></svg
      ></a>
    </div>
    <div class="grid grid-cols-3 gap-5">
      <Vehicle
        v-for="vehicle in vehicles"
        :key="vehicle.id"
        :vehicle="vehicle"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["vehicles"]);
</script>
