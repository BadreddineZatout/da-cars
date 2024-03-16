<template>
  <div class="w-full p-20">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold">{{ $t("tag") }} #{{ tag.tagId }}</h1>
      <UButton
        @click="handleEdit"
        class="bg-lochmara hover:bg-blue-700"
        :label="$t('edit_tag')"
      />
    </div>
    <div class="mt-20 w-full">
      <UCard>
        <template #header>
          <div class="flex justify-between">
            <div class="w-1/2">
              <h2 class="text-2xl font-semibold">{{ $t("name") }}</h2>
              <h3 class="mt-3 text-xl">{{ tag.tag.name }}</h3>
            </div>
            <div class="w-1/2">
              <h2 class="text-2xl font-semibold">{{ $t("value") }}</h2>
              <h3 class="mt-3 text-xl">{{ tag.value }}</h3>
            </div>
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const localePath = useLocalePath();

const route = useRoute();
const { data: tag } = await useFetch(
  `/api/vehicles/${route.params.id}/tags/${route.params.tag}`,
);

const handleEdit = () => {
  return navigateTo(
    localePath(
      `/admin/vehicles/${route.params.id}/tags/${route.params.tag}/edit`,
    ),
  );
};
</script>
