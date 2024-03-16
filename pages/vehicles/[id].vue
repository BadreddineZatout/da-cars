<template>
  <div class="my-10 grid grid-cols-1 gap-5 px-5 sm:grid-cols-3 sm:px-60">
    <div
      class="col-span-1 h-fit rounded-sm border border-lochmara bg-white px-5 py-3 shadow-sm sm:hidden"
    >
      <div class="border-b border-lochmara pb-5">
        <h1 class="text-2xl font-bold">{{ vehicle.brand.name }}</h1>
        <h2 class="text-xl">{{ vehicle.name }}</h2>
        <h2 class="mt-5 text-3xl font-bold">{{ vehicle.price }} €</h2>
      </div>
      <div class="pt-5">
        <div class="flex items-center justify-between">
          <p class="text-xl font-semibold">{{ vehicle.owner }}</p>
          <Rating :rating="vehicle.rating" />
        </div>
        <p>{{ vehicle.address }}</p>
        <p class="mt-5 font-semibold">Tel: {{ vehicle.phone }}</p>
      </div>
    </div>
    <div class="col-span-1 sm:col-span-2">
      <div>
        <Carousel :media="vehicle.media" />
      </div>
      <VehicleDescription
        v-if="vehicle.description"
        :description="vehicle.description"
      />
      <VehicleTags v-if="vehicle.tags.length" :tags="vehicle.tags" />
      <VehicleFeatures
        v-if="vehicle.features.length"
        :features="vehicle.features"
      />
    </div>
    <div
      class="col-span-1 hidden h-fit rounded-sm border border-lochmara bg-white px-5 py-3 shadow-sm sm:block"
    >
      <div class="border-b border-lochmara pb-5">
        <h1 class="text-2xl font-bold">{{ vehicle.brand.name }}</h1>
        <h2 class="text-xl">{{ vehicle.name }}</h2>
        <h2 class="mt-5 text-3xl font-bold">{{ vehicle.price }} €</h2>
      </div>
      <div class="pt-5">
        <div class="flex items-center justify-between">
          <p class="text-xl font-semibold">{{ vehicle.owner }}</p>
          <Rating :rating="vehicle.rating" />
        </div>
        <p>{{ vehicle.address }}</p>
        <p class="mt-5 font-semibold">Tel: {{ vehicle.phone }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { data: vehicle } = await useFetch(`/api/vehicles/${route.params.id}`);
</script>
