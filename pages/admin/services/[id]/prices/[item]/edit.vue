<template>
  <div class="w-full p-20">
    <h1 class="text-3xl font-bold">{{ $t("edit_price") }} #{{ price.id }}</h1>
    <div class="mt-20 w-full">
      <UForm
        :schema="schema"
        :state="price"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup :label="$t('name')" name="name">
          <UInput v-model="price.name" />
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
  name: string().required(t("required")),
  price: number().required(t("required")),
});
const route = useRoute();
const { data: price } = await useFetch(`/api/prices/${route.params.item}`);

const onSubmit = async () => {
  const response = await $fetch(`/api/prices/${price.value.id}`, {
    method: "PUT",
    body: {
      name: price.value.name,
      price: price.value.price,
    },
  });

  if (!response.errors) {
    return navigateTo(localePath(`/admin/services/${route.params.id}`));
  }
};
</script>
