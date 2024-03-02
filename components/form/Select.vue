<template>
  <label for="underline_select" class="sr-only">{{ label }}</label>
  <select
    id="underline_select"
    class="peer block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm text-gray-500 focus:border-gray-200 focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
    v-model="option"
    @change="handleSelect"
  >
    <option value="">Choose a {{ label }}</option>
    <option v-for="option in options" :key="option.id" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script setup>
const props = defineProps(["label", "options", "model"]);
const emit = defineEmits(["select"]);
const option = ref("");

const handleSelect = (e) => {
  e.preventDefault();
  emit("select", option);
};
</script>
