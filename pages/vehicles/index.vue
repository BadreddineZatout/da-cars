<template>
  <div class="my-10 flex gap-x-5 px-40">
    <div class="w-1/3 rounded-lg border border-lochmara">
      <h1>Filters</h1>
    </div>
    <div class="w-2/3">
      <h1 class="text-2xl font-bold">{{ vehicles.length }} Vehicles</h1>
      <div class="mt-5">
        <VehicleCard
          v-for="vehicle in vehicles"
          :key="vehicle.id"
          :vehicle="vehicle"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: vehicles } = await useFetch("/api/vehicles");
</script>
