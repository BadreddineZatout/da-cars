<template>
  <div class="w-full px-5 py-20 sm:px-20">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold sm:text-3xl">
        {{ $t("vehicle") }} #{{ vehicle.id }}
      </h1>
      <UButton
        @click="handleEdit"
        class="bg-lochmara hover:bg-blue-700"
        :label="$t('edit_vehicle')"
      />
    </div>
    <div class="mt-20 w-full">
      <UCard>
        <template #header>
          <div class="flex flex-wrap items-center">
            <div class="w-1/2">
              <h2 class="text-2xl font-semibold">{{ $t("name") }}</h2>
              <h3 class="mt-3 text-xl">{{ vehicle.name }}</h3>
            </div>
            <div class="w-1/2">
              <h2 class="text-2xl font-semibold">{{ $t("owner") }}</h2>
              <h3 class="mt-3 text-xl">{{ vehicle.owner }}</h3>
            </div>
          </div>
        </template>

        <div class="mb-10 flex flex-wrap gap-10">
          <div class="w-1/4">
            <h2 class="text-2xl font-semibold">{{ $t("price") }}</h2>
            <p class="mt-3 text-xl">{{ vehicle.price }} €</p>
          </div>

          <div class="w-1/4">
            <h2 class="text-2xl font-semibold">{{ $t("brand") }}</h2>
            <p class="mt-3 text-xl">
              {{ vehicle.brand.name }}
            </p>
          </div>

          <div class="w-1/4">
            <h2 class="text-2xl font-semibold">{{ $t("phone_number") }}</h2>
            <p class="mt-3 text-xl">
              {{ vehicle.phone }}
            </p>
          </div>
          <div class="w-1/4">
            <h2 class="text-2xl font-semibold">{{ $t("address") }}</h2>
            <p class="mt-3 text-xl">
              {{ vehicle.address }}
            </p>
          </div>
          <div class="w-1/4">
            <h2 class="text-2xl font-semibold">{{ $t("premium") }}</h2>
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
            <h2 class="text-2xl font-semibold">{{ $t("rating") }}</h2>
            <Rating class="mt-2" :rating="vehicle.rating" />
          </div>
        </div>

        <h2 class="text-2xl font-semibold">{{ $t("description") }}</h2>
        <p class="mt-3 indent-5 text-xl">{{ vehicle.description }}</p>
      </UCard>
    </div>

    <Features :vehicle="vehicle.id" />
    <Tags :tags="vehicle.tags" :vehicle="vehicle.id" />

    <div class="mt-10">
      <h1 class="mb-10 text-3xl font-bold">{{ $t("media") }}</h1>
      <UCarousel
        v-slot="{ item }"
        :items="vehicle.media"
        :ui="{ item: 'basis-full' }"
        class="w-full overflow-hidden rounded-lg sm:w-1/2"
        arrows
      >
        <img :src="item.path" class="w-full" draggable="false" />
      </UCarousel>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const localePath = useLocalePath();

const route = useRoute();
const { data: vehicle } = await useFetch(`/api/vehicles/${route.params.id}`);

const handleEdit = () => {
  return navigateTo(localePath(`/admin/vehicles/${vehicle.value.id}/edit`));
};
</script>
