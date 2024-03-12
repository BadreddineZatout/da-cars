<template>
  <div class="w-full p-20">
    <h1 class="text-3xl font-bold">Edit Feature #{{ feature.id }}</h1>
    <div class="mt-20 w-full">
      <UForm
        :schema="schema"
        :state="feature"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="name" name="name">
          <UInput v-model="feature.name" />
        </UFormGroup>

        <UButton type="submit" class="bg-lochmara hover:bg-blue-700">
          Submit
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

const schema = object({
  name: string().required("Required"),
});
const route = useRoute();
const { data: feature } = await useFetch(
  `/api/features/${route.params.feature}`,
);

const onSubmit = async () => {
  const response = await $fetch(`/api/features/${feature.value.id}`, {
    method: "PUT",
    body: {
      name: feature.value.name,
    },
  });

  if (!response.errors) {
    return navigateTo(`/admin/vehicles/${route.params.id}`);
  }
};
</script>
