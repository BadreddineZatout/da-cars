<template>
  <div class="w-full p-20">
    <h1 class="text-3xl font-bold">{{ $t("add_service") }}</h1>
    <div class="mt-20 w-full">
      <UForm
        :schema="schema"
        :state="service"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup :label="$t('name')" name="name">
          <UInput v-model="service.name" />
        </UFormGroup>

        <UFormGroup :label="$t('description')" name="description">
          <UTextarea v-model="service.description" />
        </UFormGroup>

        <UButton type="submit" class="bg-lochmara hover:bg-blue-700">
          {{ $t("submit") }}
        </UButton>
      </UForm>
    </div>
  </div>
</template>

<script setup>
import { object, string } from "yup";
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const { t } = useI18n();
const localePath = useLocalePath();
const schema = object({
  name: string().required(t("required")),
  description: string().required(t("required")),
});

const service = reactive({
  name: undefined,
  description: undefined,
});

const onSubmit = async () => {
  const response = await $fetch("/api/services/create", {
    method: "POST",
    body: service,
  });

  if (!response.errors) {
    return navigateTo(localePath("/admin/services"));
  }
};
</script>
