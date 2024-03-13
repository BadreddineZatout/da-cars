<template>
  <div class="w-full p-20">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold">Reservation #{{ reservation.id }}</h1>
      <div class="flex items-center gap-5">
        <UButton class="bg-lochmara hover:bg-blue-700" label="Accept" />
        <UButton class="bg-red-500 hover:bg-red-700" label="Cancel" />
      </div>
    </div>
    <div class="mt-20 w-full">
      <UCard>
        <template #header>
          <div class="flex flex-wrap items-center">
            <div class="w-1/2">
              <h2 class="text-2xl font-semibold">First Name</h2>
              <h3 class="mt-3 text-xl">{{ reservation.first_name }}</h3>
            </div>
            <div class="w-1/2">
              <h2 class="text-2xl font-semibold">Last Name</h2>
              <h3 class="mt-3 text-xl">{{ reservation.last_name }}</h3>
            </div>
          </div>
        </template>

        <div class="mb-10 flex flex-wrap gap-10">
          <div class="w-1/4">
            <h2 class="text-2xl font-semibold">Phone</h2>
            <p class="mt-3 text-xl">{{ reservation.phone_number }}</p>
          </div>

          <div class="w-1/4">
            <h2 class="text-2xl font-semibold">Email</h2>
            <p class="mt-3 text-xl">
              {{ reservation.email ? reservation.email : "---" }}
            </p>
          </div>

          <div class="w-1/4">
            <h2 class="text-2xl font-semibold">Service</h2>
            <p class="mt-3 text-xl">
              {{ reservation.service.name }}
            </p>
          </div>
          <div class="w-1/4">
            <h2 class="text-2xl font-semibold">Item</h2>
            <p class="mt-3 text-xl">
              {{ reservation.item.name }}
            </p>
          </div>
          <div class="w-1/4">
            <h2 class="text-2xl font-semibold">Date</h2>
            <p class="mt-3 text-xl">
              {{ moment(reservation.date).format("DD-MM-YYYY") }}
            </p>
          </div>
          <div class="w-1/4">
            <h2 class="mb-3 text-2xl font-semibold">Status</h2>
            <UBadge
              v-if="reservation.status == 0"
              size="lg"
              color="yellow"
              variant="solid"
              >Pending</UBadge
            >
            <UBadge
              v-else-if="reservation.status == 1"
              size="lg"
              color="green"
              variant="solid"
              >Accepted</UBadge
            >
            <UBadge
              v-else-if="reservation.status == 2"
              size="lg"
              color="blue"
              variant="solid"
              >Completed</UBadge
            >
            <UBadge v-else size="lg" color="red" variant="solid"
              >Cancelled</UBadge
            >
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const route = useRoute();
const { data: reservation } = await useFetch(
  `/api/reservations/${route.params.id}`,
);
</script>
