<template>
  <div class="my-10 px-20">
    <h1 class="my-5 text-3xl font-semibold">{{ $t("our_services") }}</h1>
    <div class="grid grid-cols-2 gap-5">
      <a
        :href="`services/${service.id}`"
        v-for="service in services"
        :key="service.id"
        class="col-span-1 rounded-md border border-black bg-gray-50 p-5 text-xl hover:cursor-pointer hover:border-2"
      >
        <h1 class="font-semibold underline">
          {{ service.name }}
        </h1>
        <p class="indent-3">{{ service.description }}</p>
      </a>
    </div>
  </div>
</template>

<script setup>
const { data: services } = await useFetch("/api/services");
</script>
