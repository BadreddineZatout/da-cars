<template>
  <div class="w-full px-5 py-20 sm:px-20">
    <h1 class="text-2xl font-bold sm:text-3xl">
      {{ $t("edit_price") }} #{{ price.id }}
    </h1>
    <div class="mt-20 w-full">
      <UForm
        :schema="schema"
        :state="price"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup :label="$t('name DE')" name="name_de">
          <UInput v-model="price.name_de" />
        </UFormGroup>
        <UFormGroup :label="$t('name FR')" name="name_fr">
          <UInput v-model="price.name_fr" />
        </UFormGroup>

        <UFormGroup :label="$t('price')" name="price">
          <UInput v-model="price.price" type="number" />
        </UFormGroup>

        <UButton type="submit" class="bg-lochmara hover:bg-blue-700">
          {{ $t("submit") }}
        </UButton>
      </UForm>
    </div>
  </div>
</template>

<script setup>
import { object, string, number } from "yup";
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const { t } = useI18n();
const localePath = useLocalePath();
const schema = object({
  name_de: string().required(t("required")),
  name_fr: string().required(t("required")),
  price: number().required(t("required")),
});
const route = useRoute();
const { data: price } = await useFetch(`/api/prices/${route.params.item}`);

const onSubmit = async () => {
  const response = await $fetch(`/api/prices/${price.value.id}`, {
    method: "PUT",
    body: {
      name_de: price.value.name_de,
      name_fr: price.value.name_fr,
      price: price.value.price,
    },
  });

  if (!response.errors) {
    return navigateTo(localePath(`/admin/services/${route.params.id}`));
  }
};
</script>
