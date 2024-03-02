<template>
  <div>
    <label
      for="number-input"
      class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >{{ label }}</label
    >
    <input
      type="number"
      id="number-input"
      aria-describedby="helper-text-explanation"
      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      :placeholder="`Select ${label}`"
      :min="min"
      :max="max"
      v-model="value"
      @change="handleInput"
    />
  </div>
</template>

<script setup>
const props = defineProps(["label", "min", "max"]);
const emit = defineEmits(["input"]);
const value = ref(0);

const handleInput = (e) => {
  e.preventDefault();
  emit("input", value);
};
</script>
