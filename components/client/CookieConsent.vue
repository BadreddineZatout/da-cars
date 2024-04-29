<template>
  <div class="sticky top-0 z-50 bg-lochmara p-5 text-center text-white">
    <p>
      We use tracking cookies to understand how you use the product and help us
      improve it. Please accept cookies to help us improve.
    </p>
    <button
      class="mx-2 mt-5 w-full rounded-lg border border-white px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
      type="button"
      @click="acceptCookies"
    >
      Accept cookies
    </button>
    <button
      class="mx-2 mt-5 w-full rounded-lg border border-white px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
      type="button"
      @click="declineCookies"
    >
      Decline cookies
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(["accept", "decline"]);
const acceptCookies = () => {
  emit("accept");
};
const declineCookies = () => {
  emit("decline");
};
</script>
