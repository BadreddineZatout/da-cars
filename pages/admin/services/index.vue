<template>
  <div class="w-full px-5 py-10">
    <h1 class="text-3xl font-bold">Services</h1>
    <div class="mt-10">
      <div
        class="flex border-b border-gray-200 px-3 py-3.5 dark:border-gray-700"
      >
        <UInput v-model="search" placeholder="Filter service..." />
      </div>
      <UTable :columns="columns" :rows="filteredRows" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const services = await $fetch("/api/services");

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Name",
  },
];

const search = ref("");

const filteredRows = computed(() => {
  if (!search.value) {
    return services;
  }
  return services.filter((service) => {
    return service.name.toLowerCase().includes(search.value.toLowerCase());
  });
});
</script>
