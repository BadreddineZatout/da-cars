<template>
  <div class="w-full p-20">
    <h1 class="text-2xl font-bold sm:text-3xl">
      {{ $t("edit_user") }} #{{ user.id }}
    </h1>
    <div class="mt-20 w-full">
      <UForm
        :schema="schema"
        :state="{ ...user, password }"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup :label="$t('name')" name="name">
          <UInput v-model="user.name" />
        </UFormGroup>

        <UFormGroup :label="$t('email')" name="email">
          <UInput v-model="user.email" type="email" />
        </UFormGroup>
        <UFormGroup :label="$t('password')" name="password">
          <UInput v-model="password" type="password" />
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
const localePath = useLocalePath();
const { t } = useI18n();

const schema = object({
  name: string().required(t("required")),
  email: string().email().required(t("required")),
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
    return navigateTo(localePath("/admin/users"));
  }
};
</script>
