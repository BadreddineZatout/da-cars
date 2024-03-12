<template>
  <div class="w-full p-20">
    <h1 class="text-3xl font-bold">Edit Tag #{{ tag.tagId }}</h1>
    <div class="mt-20 w-full">
      <UFormGroup label="name" name="name">
        <UInput v-model="tag.tag.name" disabled />
      </UFormGroup>
      <UForm :schema="schema" :state="tag" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="value" name="value">
          <UInput v-model="tag.value" />
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
  value: string().required("Required"),
});
const route = useRoute();
const { data: tag } = await useFetch(
  `/api/vehicles/${route.params.id}/tags/${route.params.tag}`,
);

const onSubmit = async () => {
  const response = await $fetch(
    `/api/vehicles/${route.params.id}/tags/${route.params.tag}`,
    {
      method: "PUT",
      body: {
        value: tag.value.value,
      },
    },
  );

  if (!response.errors) {
    return navigateTo(`/admin/vehicles/${route.params.id}`);
  }
};
</script>
