<template>
  <div class="flex w-full items-center justify-between bg-black px-10">
    <NuxtLink :to="localePath('/')" class="w-1/12">
      <img src="/logo.jpg" alt="logo" />
    </NuxtLink>
    <div
      class="flex w-1/2 items-center justify-end gap-x-5 font-semibold text-white"
    >
      <NuxtLink class="hover:underline" :to="localePath('/services')">{{
        $t("services")
      }}</NuxtLink>
      <NuxtLink class="hover:underline" :to="localePath('/vehicles')">{{
        $t("vehicles")
      }}</NuxtLink>
      <NuxtLink class="hover:underline" to="#contact">{{
        $t("contact")
      }}</NuxtLink>
      <NuxtLink
        v-if="store.isLogged"
        class="ml-5 hover:underline"
        :to="localePath('/admin')"
        >{{ $t("admin") }}</NuxtLink
      >
      <NuxtLink
        v-else
        class="ml-5 hover:underline"
        :to="localePath('/login')"
        >{{ $t("login") }}</NuxtLink
      >

      <UDropdown
        class="ml-5"
        :items="items"
        mode="hover"
        :popper="{ placement: 'bottom-start' }"
      >
        <UButton
          color="black"
          label="Lang"
          trailing-icon="i-heroicons-chevron-down-20-solid"
        />
        <template #item="{ item }">
          <NuxtLink
            class="w-full text-left font-bold"
            :to="switchLocalePath(item.local)"
            >{{ item.label }}</NuxtLink
          >
        </template>
      </UDropdown>
    </div>
  </div>
</template>

<script setup>
const store = useStore();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
const items = [
  [
    {
      label: "Français",
      local: "fr",
    },
    {
      label: "Deutsch",
      local: "de",
    },
  ],
];
</script>
