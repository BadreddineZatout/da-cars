<template>
  <div class="w-full px-5 py-20 sm:px-20">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold sm:text-3xl">
        Reservation #{{ reservation.id }}
      </h1>
      <div class="flex items-center gap-5">
        <UButton
          v-if="reservation.status == Status.PENDING"
          @click="showAcceptModal"
          class="bg-lochmara hover:bg-blue-700"
          :label="$t('accept')"
        />
        <UButton
          v-if="reservation.status == Status.ACCEPTED"
          @click="showCompleteModal"
          class="bg-green-500 hover:bg-green-700"
          :label="$t('complete')"
        />
        <UButton
          v-if="
            reservation.status == Status.PENDING ||
            reservation.status == Status.ACCEPTED
          "
          @click="showCancelModal"
          class="bg-red-500 hover:bg-red-700"
          :label="$t('cancel')"
        />
      </div>
    </div>
    <div class="mt-20 w-full">
      <UCard>
        <template #header>
          <div class="flex flex-wrap items-center">
            <div class="w-1/2">
              <h2 class="text-2xl font-semibold">{{ $t("first_name") }}</h2>
              <h3 class="mt-3 text-xl">{{ reservation.first_name }}</h3>
            </div>
            <div class="w-1/2">
              <h2 class="text-2xl font-semibold">{{ $t("last_name") }}</h2>
              <h3 class="mt-3 text-xl">{{ reservation.last_name }}</h3>
            </div>
          </div>
        </template>

        <div class="mb-10 flex flex-wrap gap-10">
          <div class="w-1/4">
            <h2 class="text-2xl font-semibold">{{ $t("phone_number") }}</h2>
            <p class="mt-3 text-xl">{{ reservation.phone_number }}</p>
          </div>

          <div class="w-1/4">
            <h2 class="text-2xl font-semibold">{{ $t("email") }}</h2>
            <p class="mt-3 text-xl">
              {{ reservation.email ? reservation.email : "---" }}
            </p>
          </div>

          <div class="w-1/4">
            <h2 class="text-2xl font-semibold">{{ $t("service") }}</h2>
            <p class="mt-3 text-xl">
              {{ reservation.service.name }}
            </p>
          </div>
          <div class="w-1/4">
            <h2 class="text-2xl font-semibold">{{ $t("item") }}</h2>
            <p class="mt-3 text-xl">
              {{ reservation.item.name }}
            </p>
          </div>
          <div class="w-1/4">
            <h2 class="text-2xl font-semibold">{{ $t("date") }}</h2>
            <p class="mt-3 text-xl">
              {{ moment(reservation.date).format("DD-MM-YYYY") }}
            </p>
          </div>
          <div class="w-1/4">
            <h2 class="mb-3 text-2xl font-semibold">{{ $t("status") }}</h2>
            <UBadge
              v-if="reservation.status == Status.PENDING"
              size="lg"
              color="yellow"
              variant="solid"
              >{{ $t("pending") }}</UBadge
            >
            <UBadge
              v-else-if="reservation.status == Status.ACCEPTED"
              size="lg"
              color="green"
              variant="solid"
              >{{ $t("accepted") }}</UBadge
            >
            <UBadge
              v-else-if="reservation.status == Status.COMPLETED"
              size="lg"
              color="blue"
              variant="solid"
              >{{ $t("completed") }}</UBadge
            >
            <UBadge v-else size="lg" color="red" variant="solid">{{
              $t("cancelled")
            }}</UBadge>
          </div>
        </div>
      </UCard>
    </div>
    <UModal v-model="isAcceptOpen">
      <ConfirmAcceptModal
        name="reservation"
        :toAccept="toAccept"
        @confirm-accept="handleAccept"
      />
    </UModal>
    <UModal v-model="isCancelOpen">
      <ConfirmCancelModal
        name="reservation"
        :toCancel="toCancel"
        @confirm-cancel="handleCancel"
      />
    </UModal>
    <UModal v-model="isCompleteOpen">
      <ConfirmCompleteModal
        name="reservation"
        :toComplete="toComplete"
        @confirm-complete="handleComplete"
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

const isAcceptOpen = ref(false);
const toAccept = ref(null);
const isCancelOpen = ref(false);
const toCancel = ref(null);
const isCompleteOpen = ref(false);
const toComplete = ref(null);

const route = useRoute();
const { data: reservation } = await useFetch(
  `/api/reservations/${route.params.id}`,
);

const showAcceptModal = () => {
  isAcceptOpen.value = true;
  toAccept.value = route.params.id;
};
const showCancelModal = () => {
  isCancelOpen.value = true;
  toCancel.value = route.params.id;
};
const showCompleteModal = () => {
  isCompleteOpen.value = true;
  toComplete.value = route.params.id;
};

const handleAccept = async () => {
  const response = await $fetch(`/api/reservations/${route.params.id}/accept`, {
    method: "PATCH",
  });

  if (!response.errors) {
    isAcceptOpen.value = false;
    toAccept.value = null;
    reservation.value.status = Status.ACCEPTED;
  }
};
const handleCancel = async () => {
  const response = await $fetch(`/api/reservations/${route.params.id}/cancel`, {
    method: "PATCH",
  });

  if (!response.errors) {
    isCancelOpen.value = false;
    toCancel.value = null;
    reservation.value.status = Status.CANCELLED;
  }
};
const handleComplete = async () => {
  const response = await $fetch(
    `/api/reservations/${route.params.id}/complete`,
    {
      method: "PATCH",
    },
  );

  if (!response.errors) {
    isCompleteOpen.value = false;
    toComplete.value = null;
    reservation.value.status = Status.COMPLETED;
  }
};
</script>
