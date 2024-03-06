<template>
  <div class="w-full p-10">
    <h1 class="text-3xl font-semibold">Welcome to the admin panel</h1>
    <div class="mt-10 flex flex-wrap gap-x-16 gap-y-10">
      <Card
        class="w-1/4"
        :title="reservation.title"
        :value="reservation.value"
      />
      <Card class="w-1/4" :title="vehicle.title" :value="vehicle.value" />
      <Card class="w-1/4" :title="service.title" :value="service.value" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});
const { reservation, service, vehicle } = await $fetch("/api/admin");
</script>
