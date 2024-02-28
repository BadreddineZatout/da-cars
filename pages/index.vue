<template>
  <Description />
  <Services :services="services" />
  <Vehicles :vehicles="vehicles" />
  <PopularBrands :brands="brands" />
</template>
<script setup lang="ts">
const { data: brands } = await useFetch("/api/brands");
const { data: services } = await useFetch("/api/services");
const { data: vehicles } = await useFetch("/api/vehicles?take=3");
</script>
