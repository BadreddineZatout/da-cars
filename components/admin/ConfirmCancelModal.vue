<template>
  <div>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <h1 class="text-xl font-bold">Cancel {{ name }} #{{ toCancel }}</h1>
      </template>

      <p>Are you sure you want to cancel this {{ name.toLowerCase() }}?</p>

      <template #footer>
        <div class="flex justify-end">
          <UButton
            @click="handleConfirm"
            class="bg-red-500 hover:bg-red-700"
            label="Cancel"
          />
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup>
const props = defineProps(["toCancel", "name"]);
const emit = defineEmits(["confirmCancel"]);

const handleConfirm = () => {
  emit("confirmCancel", props.toCancel);
};
</script>
