<template>
  <div class="w-full p-20">
    <h1 class="text-3xl font-bold">Add Price</h1>
    <div class="mt-20 w-full">
      <UForm
        :schema="schema"
        :state="price"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="name" name="name">
          <UInput v-model="price.name" />
        </UFormGroup>

        <UFormGroup label="price" name="price">
          <UInput v-model="price.price" type="number" />
        </UFormGroup>

        <UButton type="submit" class="bg-lochmara hover:bg-blue-700">
          Submit
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

const route = useRoute();

const schema = object({
  name: string().required("Required"),
  price: number().required("Required"),
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
    return navigateTo(`/admin/services/${route.params.id}`);
  }
};
</script>
