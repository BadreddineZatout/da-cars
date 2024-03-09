<template>
  <div class="w-full p-20">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold">Service #{{ service.id }}</h1>
      <UButton
        @click="handleEdit"
        class="bg-lochmara hover:bg-blue-700"
        label="Edit service"
      />
    </div>
    <div class="mt-20 w-full">
      <UCard>
        <template #header>
          <h2 class="text-2xl font-semibold">Name</h2>
          <h3 class="mt-3 text-xl">{{ service.name }}</h3>
        </template>

        <h2 class="text-2xl font-semibold">Description</h2>
        <p class="mt-3 indent-5 text-xl">{{ service.description }}</p>
      </UCard>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const route = useRoute();
const { data: service } = await useFetch(`/api/services/${route.params.id}`);

const handleEdit = () => {
  return navigateTo(`/admin/services/${service.value.id}/edit`);
};
</script>
