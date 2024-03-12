<template>
  <div class="w-full p-20">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold">feature #{{ feature.id }}</h1>
      <UButton
        @click="handleEdit"
        class="bg-lochmara hover:bg-blue-700"
        label="Edit feature"
      />
    </div>
    <div class="mt-20 w-full">
      <UCard>
        <template #header>
          <h2 class="text-2xl font-semibold">Name</h2>
          <h3 class="mt-3 text-xl">{{ feature.name }}</h3>
        </template>
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
const { data: feature } = await useFetch(
  `/api/features/${route.params.feature}`,
);

const handleEdit = () => {
  return navigateTo(
    `/admin/services/${route.params.id}/features/${route.params.feature}/edit`,
  );
};
</script>
