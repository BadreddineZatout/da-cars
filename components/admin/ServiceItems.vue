<template>
  <div class="mt-10">
    <h1 class="text-3xl font-bold">{{ $t("prices") }}</h1>
    <div class="mt-10">
      <div
        class="flex items-center justify-between border-b border-gray-200 px-3 py-3.5 dark:border-gray-700"
      >
        <UInput v-model.lazy="search" :placeholder="$t('filter_prices')" />
        <UButton
          @click="handleCreate"
          class="bg-lochmara hover:bg-blue-700"
          :label="$t('add_price')"
        />
      </div>
      <UTable :columns="columns" :rows="prices">
        <template #empty-state>
          <div class="flex flex-col items-center justify-center gap-3 py-6">
            <span class="text-sm italic">{{ $t("empty") }}</span>
            <UButton
              class="bg-lochmara hover:bg-blue-700"
              :label="$t('add_price')"
            />
          </div>
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
        <UPagination v-model="skip" :page-count="take" :total="prices_count" />
      </div>
    </div>
    <UModal v-model="isOpen">
      <ConfirmDeleteModal
        name="Item"
        :toDelete="toDelete"
        @confirm-delete="handleDelete"
      />
    </UModal>
  </div>
</template>

<script setup>
const props = defineProps(["service"]);

const prices = ref(await $fetch(`/api/services/${props.service}/prices`));
const prices_count = await $fetch(
  `/api/services/${props.service}/prices/count`,
);
const localePath = useLocalePath();
const { t } = useI18n();
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
    key: "price",
    label: t("price"),
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
      click: () =>
        navigateTo(
          localePath(`/admin/services/${props.service}/prices/${row.id}`),
        ),
    },
    {
      label: t("edit"),
      icon: "i-heroicons-pencil-square-20-solid",
      click: () =>
        navigateTo(
          localePath(`/admin/services/${props.service}/prices/${row.id}/edit`),
        ),
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
    prices.value = await $fetch(`/api/services/${props.service}/prices`, {
      query: {
        skip: skip.value - 1,
        take: take,
      },
    });
    return;
  }
  prices.value = await $fetch(`/api/services/${props.service}/prices`, {
    query: {
      search: search.value,
      skip: skip.value - 1,
      take: take,
    },
  });
});

const handleCreate = () => {
  return navigateTo(
    localePath(`/admin/services/${props.service}/prices/create`),
  );
};

const confirmDelete = (id) => {
  isOpen.value = true;
  toDelete.value = id;
};

const handleDelete = async (id) => {
  const response = await $fetch(`/api/prices/${id}`, {
    method: "DELETE",
  });

  if (!response.errors) {
    isOpen.value = false;
    toDelete.value = null;
    prices.value = await $fetch(`/api/services/${props.service}/prices`, {
      query: {
        search: search.value,
        skip: skip.value - 1,
        take: take,
      },
    });
  }
};
</script>
