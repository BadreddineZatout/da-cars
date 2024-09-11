<template>
  <div class=":py-20 w-full px-5 py-14 sm:px-32">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-lochmara sm:text-3xl">
        {{ locale == "fr" ? service.name_fr : service.name_de }}
      </h1>
      <NuxtLink
        class="rounded-lg border-2 border-lochmara px-4 py-2 font-semibold text-lochmara hover:bg-lochmara hover:text-white"
        :to="localePath(`/services/reserve-${service.id}`)"
        >{{ $t("reserve") }}</NuxtLink
      >
    </div>
    <p class="mt-5 indent-5">{{ locale == "fr" ? service.description_fr : service.description_de }}</p>
    <div v-if="service.items.length" class="mt-10">
      <h2 class="text-2xl font-semibold sm:text-3xl">{{ $t("prices") }}</h2>
      <ul class="list-disc pt-5 text-xl sm:px-60">
        <li
          v-for="item in service.items"
          :key="item.id"
          class="mb-2 flex items-center justify-between"
        >
          <p class="w-fit">{{ locale == "fr" ? item.name_fr : item.name_de }}</p>
          <p class="mx-5 grow border-t-2 border-dashed border-lochmara"></p>
          <p class="w-fit font-semibold text-lochmara">{{ item.price }} €</p>
        </li>
      </ul>
    </div>
    <div v-else class="mb-36"></div>
  </div>
</template>

<script setup>
const { locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const { data: service } = await useFetch(`/api/services/${route.params.id}`);
</script>
