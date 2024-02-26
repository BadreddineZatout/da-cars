<template>
  <Description />
  <Services :services="services" />
  <Vehicles />
  <PopularBrands :brands="brands" />
</template>
<script setup lang="ts">
const { data: brands } = await useFetch("/api/brands");
const { data: services } = await useFetch("/api/services");
</script>
