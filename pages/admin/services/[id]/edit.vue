<template>
  <div class="w-full px-5 py-20 sm:px-20">
    <h1 class="text-2xl font-bold sm:text-3xl">
      {{ $t("edit_service") }} #{{ service.id }}
    </h1>
    <div class="mt-20 w-full">
      <UForm
        :schema="schema"
        :state="service"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup :label="$t('name DE')" name="name_de">
          <UInput v-model="service.name_de" />
        </UFormGroup>
        <UFormGroup :label="$t('name FR')" name="name_fr">
          <UInput v-model="service.name_fr" />
        </UFormGroup>

        <UFormGroup :label="$t('description DE')" name="description_de">
          <UTextarea v-model="service.description_de" />
        </UFormGroup>
        <UFormGroup :label="$t('description FR')" name="description_fr">
          <UTextarea v-model="service.description_fr" />
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
  name_de: string().required(t("required")),
  name_fr: string().required(t("required")),
  description_de: string().required(t("required")),
  description_fr: string().required(t("required")),
});
const route = useRoute();
const { data: service } = await useFetch(`/api/services/${route.params.id}`);

const onSubmit = async () => {
  const response = await $fetch(`/api/services/${service.value.id}`, {
    method: "PUT",
    body: {
      name_fr: service.value.name_fr,
      name_de: service.value.name_de,
      description_de: service.value.description_de,
      description_fr: service.value.description_fr,
    },
  });

  if (!response.errors) {
    return navigateTo(localePath("/admin/services"));
  }
};
</script>
