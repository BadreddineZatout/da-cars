<template>
  <div class="my-10 flex flex-col gap-x-2 px-2 sm:flex-row sm:gap-x-5 sm:px-40">
    <div class="h-fit w-full rounded-lg border border-lochmara sm:w-1/3">
      <Filters
        @apply-filters="handleFilter"
        @clear-filters="handleClearFilter"
        :brands="brands"
        :errors="errors"
      />
    </div>
    <div class="mt-5 w-full sm:mt-0 sm:w-2/3">
      <div class="mb-5 flex w-full justify-end">
        <Search @search="handleSearch" @clear-search="handleClearSearch" />
      </div>
      <h1 class="text-2xl font-bold">
        {{ vehicles.length ?? 0 }} {{ $t("vehicles") }}
      </h1>
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
const errors = ref([]);
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
      search: route.query.search,
      ...refineFilters(filters),
      isPremium: filters.isPremium ? 1 : 0,
    },
  });
  const response = await $fetch("/api/vehicles", {
    query: {
      search: route.query.search,
      ...refineFilters(filters),
      isPremium: filters.isPremium ? 1 : 0,
    },
  });
  if (response.errors) {
    errors.value = response.errors;
  } else {
    errors.value = [];
    vehicles.value = response;
  }
};

const handleClearFilter = async () => {
  await navigateTo({
    path: "/vehicles",
    query: route.query.search ? { search: route.query.search } : {},
  });
  vehicles.value = await $fetch("/api/vehicles", {
    query: route.query.search ? { search: route.query.search } : {},
  });
  errors.value = [];
};
</script>
