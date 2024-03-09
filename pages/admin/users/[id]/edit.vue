<template>
  <div class="w-full p-20">
    <h1 class="text-3xl font-bold">Edit User #{{ user.id }}</h1>
    <div class="mt-20 w-full">
      <UForm
        :schema="schema"
        :state="{ ...user, password }"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="name" name="name">
          <UInput v-model="user.name" />
        </UFormGroup>

        <UFormGroup label="email" name="email">
          <UInput v-model="user.email" type="email" />
        </UFormGroup>
        <UFormGroup label="password" name="password">
          <UInput v-model="password" type="password" />
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
  email: string().email().required("Required"),
  password: string().optional(),
});

const route = useRoute();
const { data: user } = await useFetch(`/api/users/${route.params.id}`);
const password = ref("");
const onSubmit = async () => {
  const response = await $fetch(`/api/users/${user.value.id}`, {
    method: "PUT",
    body: password.value
      ? {
          name: user.value.name,
          email: user.value.email,
          password: password.value,
        }
      : {
          name: user.value.name,
          email: user.value.email,
        },
  });

  if (!response.errors) {
    return navigateTo("/admin/users");
  }
};
</script>
