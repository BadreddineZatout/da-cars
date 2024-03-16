<template>
  <div class="w-full px-5 py-20 sm:px-20">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold sm:text-3xl">
        {{ $t("user") }} #{{ user.id }}
      </h1>
      <UButton
        @click="handleEdit"
        class="bg-lochmara hover:bg-blue-700"
        :label="$t('edit_user')"
      />
    </div>
    <div class="mt-20 w-full">
      <UCard>
        <template #header>
          <h2 class="text-2xl font-semibold">{{ $t("name") }}</h2>
          <h3 class="mt-3 text-xl">{{ user.name }}</h3>
        </template>

        <h2 class="text-2xl font-semibold">{{ $t("email") }}</h2>
        <p class="mt-3 text-xl">{{ user.email }}</p>
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
const { data: user } = await useFetch(`/api/users/${route.params.id}`);

const handleEdit = () => {
  return navigateTo(localePath(`/admin/users/${user.value.id}/edit`));
};
</script>
