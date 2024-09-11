<template>
  <div class="w-full px-5 py-20 sm:px-20">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold sm:text-3xl">
        {{ $t("price") }} #{{ price.id }}
      </h1>
      <UButton
        @click="handleEdit"
        class="bg-lochmara hover:bg-blue-700"
        :label="$t('edit_price')"
      />
    </div>
    <div class="mt-20 w-full">
      <UCard>
        <template #header>
          <h2 class="text-2xl font-semibold">{{ $t("name") }}</h2>
          <h3 class="mt-3 text-xl">{{ locale == 'fr' ? price.name_fr : price.name_de }}</h3>
        </template>

        <h2 class="text-2xl font-semibold">{{ $t("price") }}</h2>
        <p class="mt-3 text-xl">{{ price.price }} €</p>
      </UCard>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const { locale } = useI18n();
const localePath = useLocalePath();

const route = useRoute();
const { data: price } = await useFetch(`/api/prices/${route.params.item}`);

const handleEdit = () => {
  return navigateTo(
    localePath(
      `/admin/services/${route.params.id}/prices/${route.params.item}/edit`,
    ),
  );
};
</script>
