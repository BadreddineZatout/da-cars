<template>
  <div>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <h1 class="text-xl font-bold">
          {{ $t("complete") }} {{ $t(name.toLowerCase()) }} #{{ toComplete }}
        </h1>
      </template>

      <p>{{ $t("confirm_complete_" + name.toLowerCase()) }}</p>

      <template #footer>
        <div class="flex justify-end">
          <UButton
            @click="handleConfirm"
            class="bg-green-500 hover:bg-green-700"
            label="Complete"
          />
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup>
const props = defineProps(["toComplete", "name"]);
const emit = defineEmits(["confirmComplete"]);

const handleConfirm = () => {
  emit("confirmComplete", props.toComplete);
};
</script>
