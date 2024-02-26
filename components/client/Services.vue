<template>
  <div class="my-10 px-20">
    <h1 class="my-5 border-b border-lochmara text-3xl font-semibold">
      Services
    </h1>
    <div class="grid grid-cols-3 gap-5">
      <div
        v-for="service in services"
        :key="service.id"
        class="col-span-1 rounded-md border border-black bg-gray-50 p-5 text-center text-2xl hover:cursor-pointer hover:border-2 hover:font-semibold"
      >
        <a :href="`services/${service.id}`">{{ service.name }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["services"]);
</script>
