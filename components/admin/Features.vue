<template>
  <div class="mt-10">
    <h1 class="text-3xl font-bold">{{ $t("features") }}</h1>
    <div class="mt-10">
      <div
        class="flex items-center justify-between border-b border-gray-200 px-3 py-3.5 dark:border-gray-700"
      >
        <UInput v-model.lazy="search" :placeholder="$t('filter_features')" />
        <UButton
          @click="handleCreate"
          class="bg-lochmara hover:bg-blue-700"
          :label="$t('add_feature')"
        />
      </div>
      <UTable :columns="columns" :rows="features">
        <template #empty-state>
          <div class="flex flex-col items-center justify-center gap-3 py-6">
            <span class="text-sm italic">{{ $t("empty") }}</span>
            <UButton
              class="bg-lochmara hover:bg-blue-700"
              :label="$t('add_feature')"
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
        <UPagination
          v-model="skip"
          :page-count="take"
          :total="features_count"
        />
      </div>
    </div>
    <UModal v-model="isOpen">
      <ConfirmDeleteModal
        name="feature"
        :toDelete="toDelete"
        @confirm-delete="handleDelete"
      />
    </UModal>
  </div>
</template>

<script setup>
const props = defineProps(["vehicle"]);
const localePath = useLocalePath();
const { t } = useI18n();

const features = ref(await $fetch(`/api/vehicles/${props.vehicle}/features`));
const features_count = await $fetch(
  `/api/vehicles/${props.vehicle}/features/count`,
);

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
          localePath(`/admin/vehicles/${props.vehicle}/features/${row.id}`),
        ),
    },
    {
      label: t("edit"),
      icon: "i-heroicons-pencil-square-20-solid",
      click: () =>
        navigateTo(
          localePath(
            `/admin/vehicles/${props.vehicle}/features/${row.id}/edit`,
          ),
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
    features.value = await $fetch(`/api/vehicles/${props.vehicle}/features`, {
      query: {
        skip: skip.value - 1,
        take: take,
      },
    });
    return;
  }
  features.value = await $fetch(`/api/vehicles/${props.vehicle}/features`, {
    query: {
      search: search.value,
      skip: skip.value - 1,
      take: take,
    },
  });
});

const handleCreate = () => {
  return navigateTo(
    localePath(`/admin/vehicles/${props.vehicle}/features/create`),
  );
};

const confirmDelete = (id) => {
  isOpen.value = true;
  toDelete.value = id;
};

const handleDelete = async (id) => {
  const response = await $fetch(`/api/features/${id}`, {
    method: "DELETE",
  });

  if (!response.errors) {
    isOpen.value = false;
    toDelete.value = null;
    features.value = await $fetch(`/api/vehicles/${props.vehicle}/features`, {
      query: {
        search: search.value,
        skip: skip.value - 1,
        take: take,
      },
    });
  }
};
</script>
