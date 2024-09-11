<template>
  <div class="w-full px-5 py-20 sm:px-20">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold sm:text-3xl">
        {{ $t("service") }} #{{ service.id }}
      </h1>
      <UButton
        @click="handleEdit"
        class="bg-lochmara hover:bg-blue-700"
        :label="$t('edit_service')"
      />
    </div>
    <div class="mt-20 w-full">
      <UCard>
        <template #header>
          <h2 class="text-2xl font-semibold">{{ $t("name") }}</h2>
          <h3 class="mt-3 text-xl">{{ locale == 'fr' ? service.name_fr : service.name_de }}</h3>
        </template>

        <h2 class="text-2xl font-semibold">{{ $t("description") }}</h2>
        <p class="mt-3 indent-5 text-xl">{{  locale == 'fr' ? service.description_fr : service.description_de }}</p>
      </UCard>
    </div>
    <ServiceItems :service="service.id" />
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
const { data: service } = await useFetch(`/api/services/${route.params.id}`);

const handleEdit = () => {
  return navigateTo(localePath(`/admin/services/${service.value.id}/edit`));
};
</script>
