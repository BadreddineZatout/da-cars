<template>
  <div class="w-full p-20">
    <h1 class="text-2xl font-bold sm:text-3xl">{{ $t("add_price") }}</h1>
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
const localePath = useLocalePath();
const { t } = useI18n();
const route = useRoute();

const schema = object({
  name: string().required(t("required")),
  price: number().required(t("required")),
});

const price = reactive({
  name: undefined,
  price: undefined,
});

const onSubmit = async () => {
  const response = await $fetch(
    `/api/services/${route.params.id}/prices/create`,
    {
      method: "POST",
      body: price,
    },
  );

  if (!response.errors) {
    return navigateTo(localePath(`/admin/services/${route.params.id}`));
  }
};
</script>
