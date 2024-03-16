<template>
  <div class="w-full px-5 py-20 sm:px-20">
    <h1 class="text-2xl font-bold sm:text-3xl">{{ $t("add_feature") }}</h1>
    <div class="mt-20 w-full">
      <UForm
        :schema="schema"
        :state="feature"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup :label="$t('name')" name="name">
          <UInput v-model="feature.name" />
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
const localePath = useLocalePath();
const { t } = useI18n();
const route = useRoute();

const schema = object({
  name: string().required(t("required")),
});

const feature = reactive({
  name: undefined,
});

const onSubmit = async () => {
  const response = await $fetch(
    `/api/vehicles/${route.params.id}/features/create`,
    {
      method: "POST",
      body: feature,
    },
  );

  if (!response.errors) {
    return navigateTo(localePath(`/admin/vehicles/${route.params.id}`));
  }
};
</script>
