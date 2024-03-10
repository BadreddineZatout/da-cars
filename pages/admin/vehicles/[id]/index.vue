<template>
  <div class="w-full p-20">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold">Vehicle #{{ vehicle.id }}</h1>
      <UButton
        @click="handleEdit"
        class="bg-lochmara hover:bg-blue-700"
        label="Edit vehicle"
      />
    </div>
    <div class="mt-20 w-full">
      <UCard>
        <template #header>
          <div class="flex flex-wrap items-center">
            <div class="w-1/2">
              <h2 class="text-2xl font-semibold">Name</h2>
              <h3 class="mt-3 text-xl">{{ vehicle.name }}</h3>
            </div>
            <div class="w-1/2">
              <h2 class="text-2xl font-semibold">Owner</h2>
              <h3 class="mt-3 text-xl">{{ vehicle.owner }}</h3>
            </div>
          </div>
        </template>

        <div class="mb-10 flex flex-wrap gap-10">
          <div class="w-1/4">
            <h2 class="text-2xl font-semibold">Price</h2>
            <p class="mt-3 text-xl">{{ vehicle.price }} €</p>
          </div>

          <div class="w-1/4">
            <h2 class="text-2xl font-semibold">Brand</h2>
            <p class="mt-3 text-xl">
              {{ vehicle.brand.name }}
            </p>
          </div>

          <div class="w-1/4">
            <h2 class="text-2xl font-semibold">Phone</h2>
            <p class="mt-3 text-xl">
              {{ vehicle.phone }}
            </p>
          </div>
          <div class="w-1/4">
            <h2 class="text-2xl font-semibold">Address</h2>
            <p class="mt-3 text-xl">
              {{ vehicle.address }}
            </p>
          </div>
          <div class="w-1/4">
            <h2 class="text-2xl font-semibold">Is Premium</h2>
            <svg
              v-if="vehicle.isPremium"
              class="mt-2 w-10 text-green-500"
              data-slot="icon"
              aria-hidden="true"
              fill="none"
              stroke-width="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <svg
              v-else
              class="w-7 text-red-500"
              data-slot="icon"
              aria-hidden="true"
              fill="none"
              stroke-width="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
          <div class="w-1/4">
            <h2 class="text-2xl font-semibold">Rating</h2>
            <Rating class="mt-2" :rating="vehicle.rating" />
          </div>
        </div>

        <h2 class="text-2xl font-semibold">Description</h2>
        <p class="mt-3 indent-5 text-xl">{{ vehicle.description }}</p>
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
const { data: vehicle } = await useFetch(`/api/vehicles/${route.params.id}`);

const handleEdit = () => {
  return navigateTo(`/admin/vehicles/${vehicle.value.id}/edit`);
};
</script>