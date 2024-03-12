<template>
  <div class="w-full p-20">
    <h1 class="text-3xl font-bold">Settings</h1>
    <div class="mt-20 w-full">
      <UForm class="space-y-4" @submit="onSubmit">
        <UFormGroup class="w-1/2" size="xl" label="Carousel Media" name="media">
          <input
            class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-lg text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            id="media"
            type="file"
            multiple
            @change="handleMedia"
          />
        </UFormGroup>

        <div class="flex flex-wrap gap-10">
          <div v-for="image in media" :key="image.id" class="relative w-1/4">
            <img :src="image.path" alt="carousel image" />
            <UButton
              class="absolute right-2 top-2 rounded-full bg-red-500 font-bold hover:bg-red-600"
              @click="removeMedia(image.id)"
            >
              X
            </UButton>
          </div>
        </div>

        <UButton type="submit" class="bg-lochmara hover:bg-blue-700">
          Submit
        </UButton>
      </UForm>
    </div>
  </div>
</template>

<script setup>
const body = new FormData();
const media = await $fetch("/api/carousel");
const handleMedia = (e) => {
  body.delete("files[]");
  Array.from(e.target.files).forEach((file) => {
    body.append("files[]", file);
  });
};

const onSubmit = async () => {
  const response = await $fetch(`/api/admin/carousel`, {
    method: "POST",
    body: body,
  });

  if (!response.errors) {
    return navigateTo("/admin/vehicles");
  }
};

const removeMedia = async (mediaId) => {
  const response = await $fetch(`/api/carousel/${mediaId}`, {
    method: "DELETE",
  });

  if (!response.errors) {
    media = media.filter((media) => media.id != mediaId);
  }
};
</script>
