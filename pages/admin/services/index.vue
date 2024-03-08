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
      <div
        class="flex justify-end border-t border-gray-200 px-3 py-3.5 dark:border-gray-700"
      >
        <UPagination
          v-model="skip"
          :page-count="take"
          :total="services_count"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const services = ref(await $fetch("/api/services"));
const services_count = await $fetch("/api/services/count");

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
const skip = ref(1);
const take = 10;

watch([search, skip], async () => {
  if (!search.value) {
    services.value = await $fetch("/api/services", {
      query: {
        skip: skip.value - 1,
        take: take,
      },
    });
    return;
  }
  services.value = await $fetch("/api/services", {
    query: {
      search: search.value,
      skip: skip.value - 1,
      take: take,
    },
  });
});

watch;
</script>
