<template>
  <div class="w-full px-5 py-10">
    <h1 class="text-3xl font-bold">{{ $t("reservations") }}</h1>
    <div class="mt-10">
      <div
        class="flex items-center justify-between border-b border-gray-200 px-3 py-3.5 dark:border-gray-700"
      >
        <UInput
          v-model.lazy="search"
          :placeholder="$t('filter_reservations')"
        />
      </div>
      <UTable :columns="columns" :rows="reservations">
        <template #empty-state>
          <div class="flex flex-col items-center justify-center gap-3 py-6">
            <span class="text-sm italic">{{ $t("empty") }}</span>
            <UButton
              class="bg-lochmara hover:bg-blue-700"
              :label="$t('add_reservation')"
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
          <UBadge
            v-if="row.status == Status.PENDING"
            color="yellow"
            variant="solid"
            >{{ $t("pending") }}</UBadge
          >
          <UBadge
            v-else-if="row.status == Status.ACCEPTED"
            color="green"
            variant="solid"
            >{{ $t("accepted") }}</UBadge
          >
          <UBadge
            v-else-if="row.status == Status.COMPLETED"
            color="blue"
            variant="solid"
            >{{ $t("completed") }}</UBadge
          >
          <UBadge v-else color="red" variant="solid">{{
            $t("cancelled")
          }}</UBadge>
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
      <ConfirmDeleteModal
        name="reservation"
        :toDelete="toDelete"
        @confirm-delete="handleDelete"
      />
    </UModal>
  </div>
</template>

<script setup>
import moment from "moment";
import { Status } from "~/enum";

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const localePath = useLocalePath();
const { t } = useI18n();

const reservations = ref(await $fetch("/api/reservations"));
const reservations_count = await $fetch("/api/reservations/count");

const columns = [
  {
    key: "id",
    label: "#",
  },
  {
    key: "first_name",
    label: t("first_name"),
  },
  {
    key: "last_name",
    label: t("last_name"),
  },
  {
    key: "phone_number",
    label: t("phone_number"),
  },
  {
    key: "email",
    label: t("email"),
  },
  {
    key: "service",
    label: t("service"),
  },
  {
    key: "item",
    label: t("item"),
  },
  {
    key: "date",
    label: t("date"),
  },
  {
    key: "status",
    label: t("status"),
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
      click: () => navigateTo(localePath(`/admin/reservations/${row.id}`)),
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
