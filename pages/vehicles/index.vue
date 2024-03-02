<template>
  <div class="my-10 flex gap-x-5 px-40">
    <div class="h-fit w-1/3 rounded-lg border border-lochmara">
      <Filters @apply-filters="handleFilter" :brands="brands" />
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

const refineFilters = (filters) => {
  const refinedFilters = {};
  if (filters.brand) refinedFilters.brand = filters.brand;
  if (filters.minPrice) refinedFilters.minPrice = filters.minPrice;
  if (filters.maxPrice) refinedFilters.maxPrice = filters.maxPrice;
  if (filters.rating) refinedFilters.rating = filters.rating;
  return refinedFilters;
};

const handleSearch = async (value) => {
  await navigateTo({
    path: "/vehicles",
    query: {
      ...route.query,
      search: value,
    },
  });
  vehicles.value = await $fetch("/api/vehicles", {
    query: {
      ...route.query,
      search: value,
    },
  });
};

const handleClearSearch = async (value) => {
  await navigateTo({
    path: "/vehicles",
    query: {
      ...route.query,
      search: null,
    },
  });
  vehicles.value = await $fetch("/api/vehicles", {
    query: {
      ...route.query,
      search: null,
    },
  });
};

const handleFilter = async (filters) => {
  await navigateTo({
    path: "/vehicles",
    query: {
      ...route.query,
      ...refineFilters(filters),
      isPremium: filters.isPremium,
    },
  });
  vehicles.value = await $fetch("/api/vehicles", {
    query: {
      ...route.query,
      ...refineFilters(filters),
      isPremium: filters.isPremium ? 1 : 0,
    },
  });
};
</script>
