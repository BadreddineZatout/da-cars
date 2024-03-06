<template>
  <div
    v-if="!store.isLogged"
    class="my-36 flex h-96 w-full items-center justify-center px-5"
  >
    <form
      class="w-full rounded-md border border-lochmara px-5 py-10 sm:w-1/2 lg:w-1/3"
      @submit="handleSubmit"
    >
      <div class="mb-5 flex w-full justify-center">
        <img class="w-1/2" src="/logo.jpg" alt="logo" />
      </div>
      <div class="mb-5 w-full text-center">
        <h1 class="text-3xl font-bold">Login</h1>
      </div>
      <div class="mb-5 grid">
        <label class="font-semibold" for="email">Email</label>
        <input
          class="rounded-md border border-gray-500 px-3 py-2"
          id="email"
          name="email"
          type="email"
          v-model="email"
          required
        />
      </div>
      <div class="mb-5 grid">
        <label class="font-semibold" for="password">Password</label>
        <input
          class="rounded-md border border-gray-500 px-3 py-2"
          id="password"
          name="password"
          type="password"
          v-model="password"
          minlength="8"
          required
        />
      </div>
      <ul
        v-if="errorMessages.length"
        class="mt-5 list-disc px-5 font-semibold text-red-500"
      >
        <li v-for="error in errorMessages" :key="error.code">
          {{ error.message }}
        </li>
      </ul>
      <div class="text-center">
        <button
          class="mt-10 rounded-md border border-gray-500 px-10 py-2 hover:bg-lochmara hover:text-white"
          type="submit"
        >
          Login
        </button>
      </div>
    </form>
  </div>
  <div v-else class="my-32 w-full text-center">
    <h1 class="text-3xl font-bold">
      You're logged, Redirecting
      <PulseLoader :loading="is_loading" color="rgb(120, 113, 108)" />
    </h1>
  </div>
</template>

<script setup>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

const email = ref("");
const password = ref("");
let errorMessages = ref({});

const store = useStore();

onBeforeMount(() => {
  if (store.isLogged) window.location.href = "/";
});

const handleSubmit = async (event) => {
  event.preventDefault();
  const { user, token, errors } = await $fetch("/api/login", {
    method: "POST",
    body: {
      email: email.value,
      password: password.value,
    },
  });
  console.log(errors);
  if (!errors) {
    store.isLogged = true;
    store.user = user;
    store.token = token;
    return navigateTo("/admin");
  }
  errorMessages.value = errors;
};
</script>
