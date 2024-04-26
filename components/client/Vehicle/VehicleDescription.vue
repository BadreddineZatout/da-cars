<template>
  <div class="dark:bg-inherit">
    <h1 class="mt-10 border-b border-lochmara py-3 text-xl font-semibold">
      {{ $t("vehicle_description") }}
    </h1>
    <p class="mt-5 indent-5">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps(["description"]);
</script>
