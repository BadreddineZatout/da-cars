<template>
  <div class="w-full px-2 py-10 sm:px-10">
    <h1 class="text-2xl font-semibold sm:text-3xl">
      {{ $t("welcome_admin") }}
    </h1>
    <div class="mt-10 flex flex-wrap gap-5 sm:gap-x-16 sm:gap-y-10">
      <Card
        class="w-3/4 sm:w-1/4"
        :title="$t(reservation.title)"
        :value="reservation.value"
      />
      <Card
        class="w-3/4 sm:w-1/4"
        :title="$t(vehicle.title)"
        :value="vehicle.value"
      />
      <Card
        class="w-3/4 sm:w-1/4"
        :title="$t(service.title)"
        :value="service.value"
      />
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
