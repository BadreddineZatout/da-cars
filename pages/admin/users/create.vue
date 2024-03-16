<template>
  <div class="w-full p-20">
    <h1 class="text-3xl font-bold">{{ $t("add_user") }}</h1>
    <div class="mt-20 w-full">
      <UForm
        :schema="schema"
        :state="user"
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
          <UInput v-model="user.password" type="password" />
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
  password: string().min(8, t("password_min_8")).required(t("required")),
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
    return navigateTo(localePath("/admin/users"));
  }
};
</script>
