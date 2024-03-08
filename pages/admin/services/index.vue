<template>
  <div class="w-full px-5 py-10">
    <h1 class="text-3xl font-bold">Services</h1>
    <div class="mt-10">
      <div
        class="flex border-b border-gray-200 px-3 py-3.5 dark:border-gray-700"
      >
        <UInput v-model="q" placeholder="Filter service..." />
      </div>
      <UTable :columns="columns" :rows="filteredRows" :loading="pending" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const services = await $fetch("/api/services");
console.log(services);

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

const q = ref("");

const filteredRows = computed(() => {
  if (!q.value) {
    return services;
  }

  return services.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});
</script>
