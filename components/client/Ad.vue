<template>
  <a
    class="col-span-1 overflow-hidden rounded-lg border border-lochmara pb-5 hover:mx-5 hover:scale-105 hover:shadow-lg"
    :href="`/vehicles/${ad.id}`"
  >
    <div>
      <img :src="ad.image" alt="" />
    </div>
    <div class="items-centermt-5 mt-5 flex justify-between px-5">
      <div>
        <h1 class="text-2xl font-semibold">{{ ad.brand }}</h1>
        <h2 class="text-xl">{{ ad.name }}</h2>
      </div>
      <div class="text-2xl font-semibold text-lochmara">{{ ad.price }}€</div>
    </div>
    <div class="mt-10 px-5">
      {{ ad.description }}
    </div>
  </a>
</template>

<script setup>
const props = defineProps(["ad"]);
</script>
