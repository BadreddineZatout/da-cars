<template>
  <div class="w-full p-20">
    <h1 class="text-3xl font-bold">Create User</h1>
    <div class="mt-20 w-full">
      <UForm
        :schema="schema"
        :state="user"
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
          <UInput v-model="user.password" type="password" />
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
  password: string()
    .min(8, "Password should at least have 8 characters")
    .required("Required"),
});

const user = reactive({
  name: undefined,
  email: undefined,
  password: undefined,
});

const onSubmit = async () => {
  const response = await $fetch("/api/users/create", {
    method: "POST",
    body: user,
  });

  if (!response.errors) {
    return navigateTo("/admin/users");
  }
};
</script>
