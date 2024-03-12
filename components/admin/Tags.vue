<template>
  <div class="mt-10">
    <h1 class="text-3xl font-bold">Tags</h1>
    <div class="mt-10">
      <div
        class="flex items-center justify-between border-b border-gray-200 px-3 py-3.5 dark:border-gray-700"
      >
        <UInput v-model="search" placeholder="Filter tag..." />
        <UButton
          @click="handleCreate"
          class="bg-lochmara hover:bg-blue-700"
          label="Add tag"
        />
      </div>
      <UTable :columns="columns" :rows="filteredRows">
        <template #empty-state>
          <div class="flex flex-col items-center justify-center gap-3 py-6">
            <span class="text-sm italic">Empty!</span>
            <UButton class="bg-lochmara hover:bg-blue-700" label="Add tag" />
          </div>
        </template>
        <template #name-data="{ row }">
          <span>{{ row.tag.name }}</span>
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
        <UPagination v-model="skip" :page-count="take" :total="tags.length" />
      </div>
    </div>
    <UModal v-model="isOpen">
      <ConfirmDeleteModel
        name="Tag"
        :toDelete="toDelete"
        @confirm-delete="handleDelete"
      />
    </UModal>
  </div>
</template>

<script setup>
const props = defineProps(["vehicle", "tags"]);

const columns = [
  {
    key: "tagId",
    label: "ID",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "value",
    label: "Value",
  },
  {
    key: "actions",
  },
];

const items = (row) => [
  [
    {
      label: "View",
      icon: "i-heroicons-eye-20-solid",
      click: () =>
        navigateTo(`/admin/vehicles/${props.vehicle}/tags/${row.tagId}`),
    },
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () =>
        navigateTo(`/admin/vehicles/${props.vehicle}/tags/${row.tagId}/edit`),
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => confirmDelete(row.tagId),
    },
  ],
];

const search = ref("");
const skip = ref(1);
const take = 10;
const isOpen = ref(false);
const toDelete = ref(null);

const tags = ref(props.tags);

const filteredRows = computed(() => {
  if (!search.value) {
    return tags.value.slice((skip.value - 1) * take, skip.value * take);
  }

  return tags.value
    .filter((item) => {
      return item.tag.name.toLowerCase().includes(search.value.toLowerCase());
    })
    .slice((skip.value - 1) * take, skip.value * take);
});

const handleCreate = () => {
  return navigateTo(`/admin/vehicles/${props.vehicle}/tags/create`);
};

const confirmDelete = (id) => {
  isOpen.value = true;
  toDelete.value = id;
};

const handleDelete = async (id) => {
  const response = await $fetch(`/api/vehicles/${props.vehicle}/tags/${id}`, {
    method: "DELETE",
  });

  if (!response.errors) {
    isOpen.value = false;
    toDelete.value = null;
    tags.value = tags.value.filter((tag) => tag.tagId != id);
  }
};
</script>
