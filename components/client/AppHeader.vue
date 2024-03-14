<template>
  <div class="flex w-full items-center justify-between bg-black px-10">
    <NuxtLink to="/" class="w-1/12">
      <img src="/logo.jpg" alt="logo" />
    </NuxtLink>
    <div
      class="flex w-1/3 items-center justify-between font-semibold text-white"
    >
      <NuxtLink class="hover:underline" to="/services">Services</NuxtLink>
      <NuxtLink class="hover:underline" to="/vehicles">Vehicles</NuxtLink>
      <NuxtLink class="hover:underline" to="#contact">Contact</NuxtLink>
      <NuxtLink v-if="store.isLogged" class="ml-5 hover:underline" to="/admin"
        >Admin</NuxtLink
      >
      <NuxtLink v-else class="ml-5 hover:underline" to="/login">Login</NuxtLink>

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
