<template>
  <div
    class="block rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
  >
    <h5
      class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
      {{ title }}
    </h5>
    <p class="text-3xl font-semibold text-gray-700 dark:text-gray-400">
      {{ value }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps(["title", "value"]);
</script>
