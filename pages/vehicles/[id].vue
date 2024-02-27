<template>
  <div>
    {{ vehicle.name }}
  </div>
</template>

<script setup>
const route = useRoute();
const { data: vehicle } = await useFetch(`/api/vehicles/${route.params.id}`);
</script>
