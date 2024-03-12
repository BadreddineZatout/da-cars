<template>
  <div class="w-full p-20">
    <h1 class="text-3xl font-bold">Add Feature</h1>
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

const route = useRoute();

const schema = object({
  name: string().required("Required"),
});

const feature = reactive({
  name: undefined,
});

const onSubmit = async () => {
  const response = await $fetch(
    `/api/services/${route.params.id}/features/create`,
    {
      method: "POST",
      body: feature,
    },
  );

  if (!response.errors) {
    return navigateTo(`/admin/services/${route.params.id}`);
  }
};
</script>
