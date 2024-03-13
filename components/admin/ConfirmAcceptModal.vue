<template>
  <div>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <h1 class="text-xl font-bold">Accept {{ name }} #{{ toAccept }}</h1>
      </template>

      <p>Are you sure you want to accept this {{ name.toLowerCase() }}?</p>

      <template #footer>
        <div class="flex justify-end">
          <UButton
            @click="handleConfirm"
            class="bg-lochmara hover:bg-blue-700"
            label="Accept"
          />
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup>
const props = defineProps(["toAccept", "name"]);
const emit = defineEmits(["confirmAccept"]);

const handleConfirm = () => {
  emit("confirmAccept", props.toAccept);
};
</script>
