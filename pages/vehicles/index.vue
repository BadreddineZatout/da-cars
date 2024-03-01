<template>
  <div class="my-10 flex gap-x-5 px-40">
    <div class="h-fit w-1/3 rounded-lg border border-lochmara">
      <Filters :brands="brands" />
    </div>
    <div class="w-2/3">
      <div class="mb-5 flex w-full justify-end">
        <Search @search="handleSearch" @clear-search="handleClearSearch" />
      </div>
      <h1 class="text-2xl font-bold">{{ vehicles.length ?? 0 }} Vehicles</h1>
      <div v-if="vehicles.length" class="mt-5">
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
const route = useRoute();
const { data: vehicles } = await useFetch("/api/vehicles", {
  query: route.query,
});

const { data: brands } = useFetch("/api/brands/sub");

const handleSearch = async (value) => {
  let data = await $fetch("/api/vehicles", {
    query: {
      ...route.query,
      search: value,
    },
  });
  vehicles.value = data;
};

const handleClearSearch = async (value) => {
  let data = await $fetch("/api/vehicles", {
    query: {
      ...route.query,
      search: null,
    },
  });
  vehicles.value = data;
};
</script>
