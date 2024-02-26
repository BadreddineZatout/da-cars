<template>
  <a
    class="col-span-1 overflow-hidden rounded-lg border border-lochmara pb-3 hover:mx-5 hover:scale-105 hover:shadow-lg"
    :href="`/vehicles/${vehicle.id}`"
  >
    <div>
      <img :src="vehicle.media[0]?.path" alt="" />
    </div>
    <div class="items-centermt-5 mt-5 flex justify-between px-5">
      <div>
        <h1 class="text-2xl font-semibold">{{ vehicle.brand.name }}</h1>
        <h2 class="text-xl">{{ vehicle.name }}</h2>
      </div>
      <div class="text-2xl font-semibold text-lochmara">
        {{ vehicle.price }}€
      </div>
    </div>
    <div class="mt-10 px-5">
      {{ vehicle.description }}
    </div>

    <div class="mt-5 px-5">
      <p class="text-gray-400">{{ vehicle.address }}</p>
    </div>
  </a>
</template>

<script setup>
const props = defineProps(["vehicle"]);
</script>
