<template>
  <div class="my-10 px-2 sm:px-20">
    <h1
      class="my-5 border-b border-lochmara text-2xl font-semibold sm:text-3xl"
    >
      {{ $t("services") }}
    </h1>
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div
        v-for="service in services"
        :key="service.id"
        class="col-span-1 rounded-md border border-black bg-gray-50 p-5 text-center text-2xl hover:cursor-pointer hover:border-2 hover:font-semibold dark:border-lochmara dark:bg-inherit"
      >
        <NuxtLink :to="localePath(`/services/${service.id}`)">{{
          locale == "fr" ? service.name_fr : service.name_de
        }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n();
const props = defineProps(["services"]);
const localePath = useLocalePath();
</script>
