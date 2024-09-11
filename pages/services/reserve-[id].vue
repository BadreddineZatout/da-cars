<template>
  <div
    class="grid grid-cols-1 gap-5 px-5 py-16 sm:grid-cols-2 sm:px-40 sm:py-20"
  >
    <div class="col-span-1 sm:hidden">
      <h1 class="text-2xl font-bold text-lochmara sm:text-3xl">
        {{ locale == "fr" ? service.name_fr : service.name_de }}
      </h1>
      <p class="mt-5 indent-5">{{ locale == "fr" ? service.description_fr : service.description_de }}</p>
    </div>
    <div class="col-span-1">
      <h1 class="text-2xl font-bold text-lochmara sm:text-3xl">
        {{ $t("make_appointment") }}
      </h1>
      <form>
        <div class="mt-5">
          <label
            for="first_name"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >{{ $t("first_name") }}</label
          >
          <input
            type="text"
            id="first_name"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="John"
            required
            v-model="reservation.first_name"
          />
        </div>
        <div class="mt-5">
          <label
            for="last_name"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >{{ $t("last_name") }}</label
          >
          <input
            type="text"
            id="last_name"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Doe"
            required
            v-model="reservation.last_name"
          />
        </div>
        <div class="mt-5">
          <label
            for="phone-input"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >{{ $t("phone_number") }}</label
          >
          <div class="relative">
            <div
              class="pointer-events-none absolute inset-y-0 start-0 top-0 flex items-center ps-3.5"
            >
              <svg
                class="h-4 w-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 19 18"
              >
                <path
                  d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="phone-input"
              aria-describedby="helper-text-explanation"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="123-456-7890"
              required
              v-model="reservation.phone_number"
            />
          </div>
        </div>

        <div class="mt-5">
          <label
            for="email"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >{{ $t("email") }}</label
          >
          <input
            type="email"
            id="email"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="john.doe@company.com"
            v-model="reservation.email"
          />
        </div>

        <div class="mt-5">
          <label
            for="items"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >{{ $t("service_options") }}</label
          >
          <select
            id="items"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            v-model="reservation.itemId"
          >
            <option selected>{{ $t("choose_option") }}</option>
            <option
              v-for="item in service.items"
              :key="item.id"
              :value="item.id"
            >
              {{ locale == "fr" ? item.name_fr : item.name_de }} -- {{ item.price }}€
            </option>
          </select>
        </div>

        <div class="mt-5">
          <label
            for="email"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >{{ $t("date") }}</label
          >
          <VueDatePicker
            v-model="reservation.date"
            :enable-time-picker="false"
            :auto-apply="true"
          />
        </div>

        <ul
          v-if="errors.length"
          class="mt-5 list-disc px-5 font-semibold text-red-500"
        >
          <li v-for="error in errors" :key="error.code">{{ error.message }}</li>
        </ul>

        <button
          type="submit"
          class="mt-5 w-full rounded-lg bg-lochmara px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          @click="handleSubmit"
        >
          {{ $t("reserve") }}
        </button>
      </form>
    </div>
    <div class="col-span-1 hidden sm:block">
      <h1 class="text-2xl font-bold text-lochmara sm:text-3xl">
        {{ service.name }}
      </h1>
      <p class="mt-5 indent-5">{{ service.description }}</p>
    </div>
  </div>
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const { locale } = useI18n();
const route = useRoute();
const { data: service } = await useFetch(`/api/services/${route.params.id}`);

const reservation = reactive({
  first_name: "",
  last_name: "",
  phone_number: "",
  email: "",
  serviceId: route.params.id,
  itemId: null,
  date: "",
});

const errors = ref([]);

const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await $fetch("/api/services/reserve", {
    method: "POST",
    body: reservation,
  });

  if (response.errors) {
    errors.value = response.errors;
    return;
  }
  errors.value = [];
  return navigateTo("/services/reserved");
};
</script>
