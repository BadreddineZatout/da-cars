<template>
  <div class="w-full p-20">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold">User #{{ user.id }}</h1>
      <UButton
        @click="handleEdit"
        class="bg-lochmara hover:bg-blue-700"
        label="Edit user"
      />
    </div>
    <div class="mt-20 w-full">
      <UCard>
        <template #header>
          <h2 class="text-2xl font-semibold">Name</h2>
          <h3 class="mt-3 text-xl">{{ user.name }}</h3>
        </template>

        <h2 class="text-2xl font-semibold">Email</h2>
        <p class="mt-3 text-xl">{{ user.email }}</p>
      </UCard>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const route = useRoute();
const { data: user } = await useFetch(`/api/users/${route.params.id}`);

const handleEdit = () => {
  return navigateTo(`/admin/users/${user.value.id}/edit`);
};
</script>
