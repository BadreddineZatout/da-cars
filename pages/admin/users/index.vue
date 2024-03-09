<template>
  <div class="w-full px-5 py-10">
    <h1 class="text-3xl font-bold">Users</h1>
    <div class="mt-10">
      <div
        class="flex items-center justify-between border-b border-gray-200 px-3 py-3.5 dark:border-gray-700"
      >
        <UInput v-model.lazy="search" placeholder="Filter user..." />
        <UButton
          @click="handleCreate"
          class="bg-lochmara hover:bg-blue-700"
          label="Add user"
        />
      </div>
      <UTable :columns="columns" :rows="users">
        <template #empty-state>
          <div class="flex flex-col items-center justify-center gap-3 py-6">
            <span class="text-sm italic">Empty!</span>
            <UButton class="bg-lochmara hover:bg-blue-700" label="Add user" />
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
        <UPagination v-model="skip" :page-count="take" :total="users_count" />
      </div>
    </div>
    <UModal v-model="isOpen">
      <ConfirmDeleteModel
        name="User"
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

const users = ref(await $fetch("/api/users"));
const users_count = await $fetch("/api/users/count");

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "email",
    label: "Email",
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
      click: () => navigateTo(`/admin/users/${row.id}`),
    },
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => navigateTo(`/admin/users/${row.id}/edit`),
    },
    {
      label: "Delete",
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
    users.value = await $fetch("/api/users", {
      query: {
        skip: skip.value - 1,
        take: take,
      },
    });
    return;
  }
  users.value = await $fetch("/api/users", {
    query: {
      search: search.value,
      skip: skip.value - 1,
      take: take,
    },
  });
});

const handleCreate = () => {
  return navigateTo("/admin/users/create");
};

const confirmDelete = (id) => {
  isOpen.value = true;
  toDelete.value = id;
};

const handleDelete = async (id) => {
  const response = await $fetch(`/api/users/${id}`, {
    method: "DELETE",
  });

  if (!response.errors) {
    isOpen.value = false;
    toDelete.value = null;
    users.value = await $fetch("/api/users", {
      query: {
        search: search.value,
        skip: skip.value - 1,
        take: take,
      },
    });
  }
};
</script>