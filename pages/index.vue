<template>
  <Description />
  <div v-if="images.length" class="px-36">
    <Carousel :media="images" />
  </div>
  <Services :services="services" />
  <Vehicles :vehicles="vehicles" />
  <PopularBrands :brands="brands" />
</template>
<script setup lang="ts">
const { data: brands } = await useFetch("/api/brands");
const { data: services } = await useFetch("/api/services");
const { data: vehicles } = await useFetch("/api/vehicles?take=3");
const { data: images } = await useFetch("/api/carousel");
</script>
