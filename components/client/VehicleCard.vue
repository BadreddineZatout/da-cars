<template>
  <div class="flex items-start gap-x-5 py-5">
    <div class="w-1/3">
      <img :src="vehicle.media[0]?.path" alt="" />
    </div>
    <div class="w-2/3">
      <div class="flex items-start justify-between">
        <div class="w-3/4">
          <div>
            <h1 class="items-centre flex gap-x-2 text-xl font-semibold">
              <button
                v-if="vehicle.isPremuim"
                class="rounded-lg bg-yellow-300 px-2 py-1 text-xs"
              >
                Premium
              </button>
              {{ vehicle.name }}
            </h1>
            <p>{{ vehicle.description }}</p>
          </div>
          <div class="mt-10">
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
      Reserve
    </button>
    <button class="rounded-lg border border-lochmara px-5 py-2 hover:shadow-md">
      Details
    </button>
  </div>
</template>

<script setup>
const props = defineProps(["vehicle"]);
</script>
