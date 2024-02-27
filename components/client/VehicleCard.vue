<template>
  <div class="flex items-start gap-x-5 py-5">
    <div class="relative w-1/3">
      <img :src="vehicle.media[0]?.path" alt="" />
      <p
        class="absolute right-5 top-2 flex items-center gap-x-1 font-semibold text-white"
      >
        <svg
          class="h-5 w-5"
          data-slot="icon"
          aria-hidden="true"
          fill="none"
          stroke-width="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
        {{ vehicle.media.length }}X
      </p>
    </div>
    <div class="w-2/3">
      <div class="flex items-start justify-between">
        <div class="w-3/4">
          <div>
            <h1 class="items-centre flex gap-x-2 text-xl font-semibold">
              <button
                v-if="vehicle.isPremium"
                class="rounded-lg bg-yellow-300 px-2 py-1 text-xs"
              >
                Premium
              </button>
              <span>{{ vehicle.id }}# {{ vehicle.name }}</span>
            </h1>
            <p>{{ vehicle.description }}</p>
          </div>
          <ul class="mt-5 flex flex-wrap gap-5">
            <li
              v-for="feature in vehicle.features"
              :key="feature.id"
              class="flex items-center gap-x-3"
            >
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
              {{ feature.name }}
            </li>
          </ul>
          <div class="mt-5">
            <p>Tel: {{ vehicle.phone }}</p>
            <p>{{ vehicle.address }}</p>
          </div>
        </div>
        <div>
          <p class="text-xl font-semibold">{{ vehicle.brand.name }}</p>
          <p class="text-xl font-bold text-lochmara">{{ vehicle.price }} £</p>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full border-b border-lochmara pb-5 text-right">
    <button
      class="mr-5 rounded-lg bg-lochmara px-5 py-2 text-white hover:shadow-md"
    >
      <a :href="`/vehicles/${vehicle.id}/reserve`">Reserve</a>
    </button>
    <button class="rounded-lg border border-lochmara px-5 py-2 hover:shadow-md">
      <a :href="`/vehicles/${vehicle.id}`">Details</a>
    </button>
  </div>
</template>

<script setup>
const props = defineProps(["vehicle"]);
</script>
