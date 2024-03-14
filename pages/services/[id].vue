<template>
  <div class="w-full px-32 py-20">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-lochmara">{{ service.name }}</h1>
      <a
        class="rounded-lg border-2 border-lochmara px-4 py-2 font-semibold text-lochmara hover:bg-lochmara hover:text-white"
        :href="`/services/reserve-${service.id}`"
        >{{ $t("reserve") }}</a
      >
    </div>
    <p class="mt-5 indent-5">{{ service.description }}</p>
    <div v-if="service.items.length" class="mt-10">
      <h2 class="text-3xl font-semibold">{{ $t("prices") }}</h2>
      <ul class="list-disc px-60 text-xl">
        <li
          v-for="item in service.items"
          :key="item.id"
          class="mb-2 flex items-center justify-between"
        >
          <p class="w-fit">{{ item.name }}</p>
          <p class="mx-5 grow border-t-2 border-dashed border-lochmara"></p>
          <p class="w-fit font-semibold text-lochmara">{{ item.price }} €</p>
        </li>
      </ul>
    </div>
    <div v-else class="mb-36"></div>
  </div>
</template>

<script setup>
const route = useRoute();
const { data: service } = await useFetch(`/api/services/${route.params.id}`);
</script>
