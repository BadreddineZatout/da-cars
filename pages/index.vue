<template>
  <Description />
  <Services />
  <Vehicles />
  <PopularBrands :brands="brands" />
</template>
<script setup lang="ts">
const { data: brands } = await useFetch("/api/brands");
</script>
