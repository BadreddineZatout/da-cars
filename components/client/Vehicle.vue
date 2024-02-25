<template>
  <a
    class="border-lochmara col-span-1 overflow-hidden rounded-lg border pb-3 hover:mx-5 hover:scale-105 hover:shadow-lg"
    :href="`/vehicles/${vehicle.id}`"
  >
    <div>
      <img :src="vehicle.image" alt="" />
    </div>
    <div class="items-centermt-5 mt-5 flex justify-between px-5">
      <div>
        <h1 class="text-2xl font-semibold">{{ vehicle.brand }}</h1>
        <h2 class="text-xl">{{ vehicle.name }}</h2>
      </div>
      <div class="text-lochmara text-2xl font-semibold">
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
