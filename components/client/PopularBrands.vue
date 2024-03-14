<template>
  <div class="my-10 px-20">
    <h1 class="my-5 border-b border-lochmara text-3xl font-semibold">
      {{ $t("popular_brands") }}
    </h1>
    <div class="grid grid-cols-6 gap-y-5 p-5">
      <div v-for="brand in brands" :key="brand.id">
        <h2 class="text-xl font-semibold">{{ brand.name }}</h2>
        <p v-for="sub_brand in brand.subBrands" :key="sub_brand">
          <NuxtLink
            class="hover:underline"
            :to="localePath(`/vehicles?brand=${sub_brand.id}`)"
            >{{ sub_brand.name }}</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["brands"]);
const localePath = useLocalePath();
</script>
