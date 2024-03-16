<template>
  <Head>
    <Title>Admin</Title>
  </Head>
  <div class="relative flex">
    <div class="absolute right-2 top-2 sm:hidden">
      <UDropdown
        class="ml-5 sm:hidden"
        :items="items"
        mode="click"
        :popper="{ placement: 'bottom-start' }"
      >
        <UButton
          color="black"
          label="Menu"
          trailing-icon="i-heroicons-chevron-down-20-solid"
        />
        <template #logout>
          <div class="w-full text-left font-bold" @click="handleLogout">
            {{ $t("log_out") }}
          </div>
        </template>
        <template #item="{ item }">
          <NuxtLink
            class="w-full text-left font-bold"
            :to="localePath(item.path)"
            >{{ $t(item.label) }}</NuxtLink
          >
        </template>
      </UDropdown>
    </div>
    <Sidebar class="hidden sm:block" />
    <slot />
  </div>
</template>

<script setup>
const store = useStore();
const localePath = useLocalePath();
const items = [
  [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "dashboard",
      path: "/admin",
    },
    {
      label: "reservations",
      path: "/admin/reservations",
    },
    {
      label: "vehicles",
      path: "/admin/vehicles",
    },
    {
      label: "services",
      path: "/admin/services",
    },
    {
      label: "users",
      path: "/admin/users",
    },
    {
      label: "settings",
      path: "/admin/settings",
    },
    {
      label: "logout",
      slot: "logout",
    },
  ],
];

const handleLogout = () => {
  store.$reset();
  return navigateTo(localePath("/"), {
    replace: true,
  });
};
</script>
