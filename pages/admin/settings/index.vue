<template>
  <div class="w-full p-5 sm:p-20">
    <h1 class="text-2xl font-bold sm:text-3xl">{{ $t("settings") }}</h1>
    <div class="mt-10 w-full">
      <UForm class="space-y-4" @submit="onSubmit">
        <UFormGroup
          class="w-1/2"
          size="xl"
          :label="$t('carousel_media')"
          name="media"
        >
          <input
            class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-lg text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            id="media"
            type="file"
            multiple
            @change="handleMedia"
          />
        </UFormGroup>

        <UButton type="submit" class="bg-lochmara hover:bg-blue-700">
          {{ $t("submit") }}
        </UButton>
      </UForm>
      <div class="mt-10 flex flex-wrap gap-10">
        <div
          v-for="image in media"
          :key="image.id"
          class="relative w-full sm:w-1/4"
        >
          <img :src="image.path" alt="carousel image" />
          <UButton
            class="absolute right-2 top-2 rounded-full bg-red-500 font-bold hover:bg-red-600"
            @click="removeMedia(image.id)"
          >
            X
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const body = new FormData();
const { data: media } = await useFetch("/api/carousel");
const handleMedia = (e) => {
  body.delete("files[]");
  Array.from(e.target.files).forEach((file) => {
    body.append("files[]", file);
  });
};

const onSubmit = async () => {
  const response = await $fetch(`/api/carousel`, {
    method: "POST",
    body: body,
  });

  if (!response.errors) {
    return window.location.reload();
  }
};

const removeMedia = async (mediaId) => {
  const response = await $fetch(`/api/carousel/${mediaId}`, {
    method: "DELETE",
  });

  if (!response.errors) {
    media.value = media.value.filter((media) => media.id != mediaId);
  }
};
</script>
