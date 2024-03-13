<template>
  <div class="w-full px-5 py-10">
    <h1 class="text-3xl font-bold">Reservations</h1>
    <div class="mt-10">
      <div
        class="flex items-center justify-between border-b border-gray-200 px-3 py-3.5 dark:border-gray-700"
      >
        <UInput v-model.lazy="search" placeholder="Filter reservation..." />
        <UButton
          @click="handleCreate"
          class="bg-lochmara hover:bg-blue-700"
          label="Add reservation"
        />
      </div>
      <UTable :columns="columns" :rows="reservations">
        <template #empty-state>
          <div class="flex flex-col items-center justify-center gap-3 py-6">
            <span class="text-sm italic">Empty!</span>
            <UButton
              class="bg-lochmara hover:bg-blue-700"
              label="Add reservation"
            />
          </div>
        </template>
        <template #email-data="{ row }">
          <span>{{ row.email ? row.email : "---" }}</span>
        </template>
        <template #service-data="{ row }">
          <span>{{ row.service.name }}</span>
        </template>
        <template #item-data="{ row }">
          <span>{{ row.item.name }}</span>
        </template>
        <template #date-data="{ row }">
          <span>{{ moment(row.date).format("DD-MM-YYYY") }}</span>
        </template>
        <template #status-data="{ row }">
          <UBadge v-if="row.status == 0" color="yellow" variant="solid"
            >Pending</UBadge
          >
          <UBadge v-else-if="row.status == 1" color="green" variant="solid"
            >Accepted</UBadge
          >
          <UBadge v-else-if="row.status == 2" color="blue" variant="solid"
            >Completed</UBadge
          >
          <UBadge v-else color="red" variant="solid">Cancelled</UBadge>
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
          :total="reservations_count"
        />
      </div>
    </div>
    <UModal v-model="isOpen">
      <ConfirmDeleteModel
        name="reservation"
        :toDelete="toDelete"
        @confirm-delete="handleDelete"
      />
    </UModal>
  </div>
</template>

<script setup>
import moment from "moment";

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const reservations = ref(await $fetch("/api/reservations"));
const reservations_count = await $fetch("/api/reservations/count");

const columns = [
  {
    key: "id",
    label: "#",
  },
  {
    key: "first_name",
    label: "First Name",
  },
  {
    key: "last_name",
    label: "Last Name",
  },
  {
    key: "phone_number",
    label: "Phone",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "service",
    label: "Service",
  },
  {
    key: "item",
    label: "Item",
  },
  {
    key: "date",
    label: "Date",
  },
  {
    key: "status",
    label: "Status",
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
      click: () => navigateTo(`/admin/reservations/${row.id}`),
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
    reservations.value = await $fetch("/api/reservations", {
      query: {
        skip: skip.value - 1,
        take: take,
      },
    });
    return;
  }
  reservations.value = await $fetch("/api/reservations", {
    query: {
      search: search.value,
      skip: skip.value - 1,
      take: take,
    },
  });
});

const getStatus = (status) => {
  switch (status) {
    case 1:
      return '<UBadge color="green" variant="solid">Accepted</UBadge>';
    case 2:
      return '<UBadge color="blue" variant="solid">Completed</UBadge>';
    case 3:
      return '<UBadge color="red" variant="solid">Cancelled</UBadge>';
    default:
      return '<UBadge color="yellow" variant="solid">Pending</UBadge>';
  }
};

const confirmDelete = (id) => {
  isOpen.value = true;
  toDelete.value = id;
};

const handleDelete = async (id) => {
  const response = await $fetch(`/api/reservations/${id}`, {
    method: "DELETE",
  });

  if (!response.errors) {
    isOpen.value = false;
    toDelete.value = null;
    reservations.value = await $fetch("/api/reservations", {
      query: {
        search: search.value,
        skip: skip.value - 1,
        take: take,
      },
    });
  }
};
</script>
