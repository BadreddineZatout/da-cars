<template>
  <div class="w-full px-5 py-20 sm:px-20">
    <h1 class="text-2xl font-bold sm:text-3xl">{{ $t("add_tag") }}</h1>
    <div class="mt-20 w-full">
      <UForm :schema="schema" :state="tag" class="space-y-4" @submit="onSubmit">
        <div class="flex items-center justify-between gap-10">
          <UFormGroup class="w-1/2" :label="$t('choose_tag')" name="name">
            <USelect
              :placeholder="$t('select_tag')"
              v-model="tag.id"
              :options="tags"
              option-attribute="name"
            />
          </UFormGroup>
          <UFormGroup class="w-1/2" :label="$t('or_add_new_one')" name="name">
            <UInput :placeholder="$t('add_new_tag')" v-model="tag.name" />
          </UFormGroup>
        </div>
        <UFormGroup :label="$t('value')" name="value">
          <UInput v-model="tag.value" />
        </UFormGroup>

        <ul
          v-if="errors.length"
          class="mt-5 list-disc px-5 font-semibold text-red-500"
        >
          <li v-for="error in errors" :key="error.code">
            {{ error.message }}
          </li>
        </ul>

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
  id: number(),
  name: string(),
  value: string().required(t("required")),
});

const tag = reactive({
  id: undefined,
  name: undefined,
  value: undefined,
});

const currentTags = (await $fetch(`/api/vehicles/${route.params.id}`)).tags.map(
  (tag) => tag.tagId,
);
const tags = (await $fetch("/api/tags"))
  .filter((tag) => !currentTags.includes(tag.id))
  .map((tag) => {
    return { name: tag.name, value: tag.id };
  });
const errors = ref([]);

const onSubmit = async () => {
  const response = await $fetch(
    `/api/vehicles/${route.params.id}/tags/create`,
    {
      method: "POST",
      body: tag,
    },
  );

  if (!response.errors) {
    return navigateTo(localePath(`/admin/vehicles/${route.params.id}`));
  }
  errors.value = response.errors;
};
</script>
