<template>
  <div>
    <h1 class="mt-10 border-b border-lochmara py-3 text-xl font-semibold">
      Vehicle description according to the supplier
    </h1>
    <p class="mt-5 indent-5">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps(["description"]);
</script>
