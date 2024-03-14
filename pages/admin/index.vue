<template>
  <div class="w-full p-10">
    <h1 class="text-3xl font-semibold">{{ $t("welcome_admin") }}</h1>
    <div class="mt-10 flex flex-wrap gap-x-16 gap-y-10">
      <Card
        class="w-1/4"
        :title="$t(reservation.title)"
        :value="reservation.value"
      />
      <Card class="w-1/4" :title="$t(vehicle.title)" :value="vehicle.value" />
      <Card class="w-1/4" :title="$t(service.title)" :value="service.value" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const { reservation, service, vehicle } = await $fetch("/api/admin");
</script>
