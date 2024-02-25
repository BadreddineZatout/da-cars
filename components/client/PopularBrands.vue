<template>
  <div class="my-10 px-20">
    <h1 class="border-lochmara my-5 border-b text-3xl font-semibold">
      Popular car brands
    </h1>
    <div class="grid grid-cols-6 gap-y-5 p-5">
      <div v-for="brand in brands" :key="brand.id">
        <h2 class="text-xl font-semibold">{{ brand.name }}</h2>
        <p v-for="sub_brand in brand.subBrands" :key="sub_brand">
          <a
            class="hover:underline"
            :href="`/vehicles?brand=${sub_brand.id}`"
            >{{ sub_brand.name }}</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["brands"]);
</script>
