<template>
  <div class="flex w-full items-center justify-between bg-black sm:px-10">
    <NuxtLink :to="localePath('/')" class="w-1/3 sm:w-1/12">
      <img src="/logo.jpg" alt="logo" />
    </NuxtLink>
    <div
      class="flex w-1/2 items-center justify-end gap-x-2 font-semibold text-white sm:gap-x-5"
    >
      <NuxtLink
        class="hidden hover:underline sm:block"
        :to="localePath('/services')"
        >{{ $t("services") }}</NuxtLink
      >
      <NuxtLink
        class="hidden hover:underline sm:block"
        :to="localePath('/vehicles')"
        >{{ $t("vehicles") }}</NuxtLink
      >
      <NuxtLink class="hidden hover:underline sm:block" to="#contact">{{
        $t("contact")
      }}</NuxtLink>
      <NuxtLink
        v-if="store.isLogged"
        class="ml-5 hidden hover:underline sm:block"
        :to="localePath('/admin')"
        >{{ $t("admin") }}</NuxtLink
      >
      <NuxtLink
        v-else
        class="ml-5 hidden hover:underline sm:block"
        :to="localePath('/login')"
        >{{ $t("login") }}</NuxtLink
      >

      <UDropdown
        class="ml-5 sm:hidden"
        :items="nav_items"
        mode="click"
        :popper="{ placement: 'bottom-start' }"
      >
        <UButton
          color="black"
          label="Menu"
          trailing-icon="i-heroicons-chevron-down-20-solid"
        />
        <template #contact>
          <NuxtLink to="#contact">
            {{ $t("contact") }}
          </NuxtLink>
        </template>
        <template #admin="{ item }" v-if="store.isLogged">
          <NuxtLink :to="localePath(item.path)">{{ $t(item.label) }}</NuxtLink>
        </template>
        <template #login="{ item }">
          <NuxtLink v-if="!store.isLogged" :to="localePath(item.path)">{{
            $t(item.label)
          }}</NuxtLink>
        </template>
        <template #item="{ item }">
          <NuxtLink
            class="w-full text-left font-bold"
            :to="localePath(item.path)"
            >{{ $t(item.label) }}</NuxtLink
          >
        </template>
      </UDropdown>
      <UDropdown
        class="sm:ml-5"
        :items="items"
        mode="click"
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
const nav_items = store.isLogged
  ? [
      [
        {
          label: "services",
          path: "/services",
        },
        {
          label: "vehicles",
          path: "/vehicles",
        },
        {
          label: "contact",
          slot: "contact",
          path: "#contact",
        },
        {
          label: "admin",
          slot: "admin",
          path: "/admin",
        },
      ],
    ]
  : [
      [
        {
          label: "services",
          path: "/services",
        },
        {
          label: "vehicles",
          path: "/vehicles",
        },
        {
          label: "contact",
          slot: "contact",
          path: "#contact",
        },
        {
          label: "login",
          slot: "login",
          path: "/login",
        },
      ],
    ];
const items = [
  [
    {
      label: "Deutsch",
      local: "de",
    },
    {
      label: "Français",
      local: "fr",
    },
  ],
];
</script>
