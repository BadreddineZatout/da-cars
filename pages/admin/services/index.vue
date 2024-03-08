<template>
  <div class="w-full px-5 py-10">
    <h1 class="text-3xl font-bold">Services</h1>
    <div class="mt-10">
      <div
        class="flex border-b border-gray-200 px-3 py-3.5 dark:border-gray-700"
      >
        <UInput v-model.lazy="search" placeholder="Filter service..." />
      </div>
      <UTable :columns="columns" :rows="services" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const services = ref(await $fetch("/api/services"));

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

watch(search, async () => {
  if (!search.value) {
    services.value = await $fetch("/api/services");
    return;
  }
  services.value = await $fetch("/api/services", {
    query: {
      search: search.value,
    },
  });
});
</script>
