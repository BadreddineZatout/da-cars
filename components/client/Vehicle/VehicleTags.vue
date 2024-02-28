<template>
  <div class="mt-10 px-5">
    <h1 class="border-b border-lochmara py-3 text-xl font-semibold">
      Technical Data
    </h1>
    <div class="mt-5">
      <div
        v-for="(tag, index) in tags"
        :key="tag.id"
        :class="`flex items-center justify-between ${index % 2 == 0 ? 'bg-white' : 'bg-gray-100'}`"
      >
        <p class="w-1/2 px-3 py-2 font-semibold">{{ tag.tag.name }}</p>
        <p class="w-1/2 px-3 py-2">{{ tag.value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["tags"]);
console.log(props.tags);
</script>
