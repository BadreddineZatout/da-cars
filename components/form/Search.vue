<template>
  <div class="flex grow items-center gap-5">
    <form class="grow">
      <label
        for="default-search"
        class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >{{ $t("search") }}</label
      >
      <div class="relative">
        <div
          class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3"
        >
          <svg
            class="h-4 w-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          :placeholder="$t('search_vehicles')"
          required
          v-model="search"
        />
        <button
          type="submit"
          class="absolute bottom-2.5 end-2.5 rounded-lg bg-lochmara px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="handleSearch"
        >
          {{ $t("search") }}
        </button>
      </div>
    </form>
    <div v-show="search.length">
      <button
        class="rounded-lg px-4 py-2 text-sm font-medium text-red-500 hover:border hover:border-red-500"
        @click="handleClearSearch"
      >
        X {{ $t("clear") }}
      </button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["search", "clearSearch"]);
const search = ref("");

const handleSearch = (e) => {
  e.preventDefault();
  if (search.value) {
    emit("search", search.value);
  }
};

const handleClearSearch = (e) => {
  e.preventDefault();
  search.value = "";
  emit("clearSearch");
};
</script>
