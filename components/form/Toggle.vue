<template>
  <div>
    <label class="inline-flex cursor-pointer items-center">
      <input
        v-model="value"
        type="checkbox"
        class="peer sr-only"
        @click="handleToggle"
      />
      <div
        class="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-lochmara peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"
      ></div>
      <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{{
        label
      }}</span>
    </label>
  </div>
</template>

<script setup>
const props = defineProps(["label"]);
const emit = defineEmits(["toggle"]);
const value = ref(false);

const handleToggle = (e) => {
  emit("toggle", value);
};
</script>
