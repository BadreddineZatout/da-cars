<template>
  <Description />
  <div v-if="images?.length" class="px-2 sm:px-36">
    <Carousel :media="images" />
  </div>
  <Services :services="services" />
  <Vehicles :vehicles="vehicles" />
  <div class="relative h-[500px] w-full">
    <MapboxMap
      map-id="{ID}"
      class="w-full"
      @load="onMapLoad"
      :options="{
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [7.39325523376465, 49.2538719177246], // starting position
        zoom: 15, // starting zoom
      }"
    />
  </div>
</template>
<script setup>
import mapboxgl from "mapbox-gl";
const { data: services } = await useFetch("/api/services");
const { data: vehicles } = await useFetch("/api/vehicles?take=3");
const { data: images } = await useFetch("/api/carousel");

const onMapLoad = (map) => {
  // Create a new marker
  const marker = new mapboxgl.Marker()
    .setLngLat([7.39325523376465, 49.2538719177246]) // Marker position
    .addTo(map); // Add the marker to the map
};
</script>
