<template>
  <div class="w-full px-32 py-20">
    <h1 class="text-3xl font-bold">{{ service.name }}</h1>
    <p class="mt-5 indent-5">{{ service.description }}</p>
    <div class="mt-10">
      <h2 class="text-2xl font-semibold">Prices</h2>
      <ul class="list-disc px-20 text-xl">
        <li
          v-for="item in service.items"
          :key="item.id"
          class="mb-2 flex items-center justify-between"
        >
          <p class="w-fit">{{ item.name }}</p>
          <p class="mx-5 grow border-t-2 border-dashed border-lochmara"></p>
          <p class="w-fit font-semibold text-lochmara">{{ item.price }} £</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { data: service } = await useFetch(`/api/services/${route.params.id}`);
</script>
