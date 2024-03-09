<template>
  <div class="w-full p-20">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold">price #{{ price.id }}</h1>
      <UButton
        @click="handleEdit"
        class="bg-lochmara hover:bg-blue-700"
        label="Edit price"
      />
    </div>
    <div class="mt-20 w-full">
      <UCard>
        <template #header>
          <h2 class="text-2xl font-semibold">Name</h2>
          <h3 class="mt-3 text-xl">{{ price.name }}</h3>
        </template>

        <h2 class="text-2xl font-semibold">price</h2>
        <p class="mt-3 text-xl">{{ price.price }} €</p>
      </UCard>
    </div>
    <priceItems :price="price.id" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const route = useRoute();
const { data: price } = await useFetch(`/api/prices/${route.params.item}`);

const handleEdit = () => {
  return navigateTo(
    `/admin/services/${route.params.id}/prices/${route.params.item}/edit`,
  );
};
</script>
