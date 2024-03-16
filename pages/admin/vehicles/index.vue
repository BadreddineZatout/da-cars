<template>
  <div class="w-full px-5 py-10">
    <h1 class="text-3xl font-bold">{{ $t("vehicles") }}</h1>
    <div class="mt-10">
      <div
        class="flex items-center justify-between border-b border-gray-200 px-3 py-3.5 dark:border-gray-700"
      >
        <UInput v-model.lazy="search" :placeholder="$t('filter_vehicles')" />
        <UButton
          @click="handleCreate"
          class="bg-lochmara hover:bg-blue-700"
          :label="$t('add_vehicle')"
        />
      </div>
      <UTable :columns="columns" :rows="vehicles">
        <template #empty-state>
          <div class="flex flex-col items-center justify-center gap-3 py-6">
            <span class="text-sm italic">{{ $t("empty") }}</span>
            <UButton
              class="bg-lochmara hover:bg-blue-700"
              :label="$t('add_vehicle')"
            />
          </div>
        </template>
        <template #brand-data="{ row }">
          <span>{{ row.brand.name }}</span>
        </template>
        <template #isPremium-data="{ row }">
          <svg
            v-if="row.isPremium"
            class="w-7 text-green-500"
            data-slot="icon"
            aria-hidden="true"
            fill="none"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          <svg
            v-else
            class="w-7 text-red-500"
            data-slot="icon"
            aria-hidden="true"
            fill="none"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </template>
        <template #rating-data="{ row }">
          <Rating :rating="row.rating" />
        </template>
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>
      <div
        class="flex justify-end border-t border-gray-200 px-3 py-3.5 dark:border-gray-700"
      >
        <UPagination
          v-model="skip"
          :page-count="take"
          :total="vehicles_count"
        />
      </div>
    </div>
    <UModal v-model="isOpen">
      <ConfirmDeleteModal
        name="vehicle"
        :toDelete="toDelete"
        @confirm-delete="handleDelete"
      />
    </UModal>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const localePath = useLocalePath();
const { t } = useI18n();

const vehicles = ref(await $fetch("/api/admin/vehicles"));
const vehicles_count = await $fetch("/api/admin/vehicles/count");

const columns = [
  {
    key: "id",
    label: "#",
  },
  {
    key: "name",
    label: t("name"),
  },
  {
    key: "brand",
    label: t("brand"),
  },
  {
    key: "price",
    label: t("price"),
  },
  {
    key: "phone",
    label: t("phone_number"),
  },
  {
    key: "address",
    label: t("address"),
  },
  {
    key: "isPremium",
    label: t("premium"),
  },
  {
    key: "rating",
    label: t("rating"),
  },
  {
    key: "owner",
    label: t("owner"),
  },
  {
    key: "actions",
  },
];

const items = (row) => [
  [
    {
      label: t("view"),
      icon: "i-heroicons-eye-20-solid",
      click: () => navigateTo(localePath(`/admin/vehicles/${row.id}`)),
    },
    {
      label: t("edit"),
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => navigateTo(localePath(`/admin/vehicles/${row.id}/edit`)),
    },
    {
      label: t("delete"),
      icon: "i-heroicons-trash-20-solid",
      click: () => confirmDelete(row.id),
    },
  ],
];

const search = ref("");
const skip = ref(1);
const take = 10;
const isOpen = ref(false);
const toDelete = ref(null);

watch([search, skip], async () => {
  if (!search.value) {
    vehicles.value = await $fetch("/api/admin/vehicles", {
      query: {
        skip: skip.value - 1,
        take: take,
      },
    });
    return;
  }
  vehicles.value = await $fetch("/api/admin/vehicles", {
    query: {
      search: search.value,
      skip: skip.value - 1,
      take: take,
    },
  });
});

const handleCreate = () => {
  return navigateTo(localePath("/admin/vehicles/create"));
};

const confirmDelete = (id) => {
  isOpen.value = true;
  toDelete.value = id;
};

const handleDelete = async (id) => {
  const response = await $fetch(`/api/admin/vehicles/${id}`, {
    method: "DELETE",
  });

  if (!response.errors) {
    isOpen.value = false;
    toDelete.value = null;
    vehicles.value = await $fetch("/api/admin/vehicles", {
      query: {
        search: search.value,
        skip: skip.value - 1,
        take: take,
      },
    });
  }
};
</script>
