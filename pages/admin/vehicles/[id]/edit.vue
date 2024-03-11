<template>
  <div class="w-full p-20">
    <h1 class="text-3xl font-bold">Edit Vehicle #{{ vehicle.id }}</h1>
    <div class="mt-20 w-full">
      <UForm
        :schema="schema"
        :state="vehicle"
        class="space-y-4"
        @submit="onSubmit"
      >
        <div class="flex justify-between gap-5">
          <UFormGroup class="w-1/2" label="name" name="name">
            <UInput v-model="vehicle.name" />
          </UFormGroup>

          <UFormGroup class="w-1/2" label="brand" name="brand">
            <USelect
              placeholder="Select Brand..."
              v-model="vehicle.brandId"
              :options="
                brands.map((brand) => {
                  return { name: brand.name, value: brand.id };
                })
              "
              option-attribute="name"
            />
          </UFormGroup>
        </div>

        <UFormGroup label="description" name="description">
          <UTextarea v-model="vehicle.description" />
        </UFormGroup>

        <div class="flex justify-between gap-5">
          <UFormGroup class="w-1/2" label="price" name="price">
            <UInput v-model="vehicle.price" type="number" />
          </UFormGroup>

          <UFormGroup class="w-1/2" label="phone" name="phone">
            <UInput v-model="vehicle.phone" type="tel" />
          </UFormGroup>
        </div>

        <div class="flex justify-between gap-5">
          <UFormGroup class="w-1/2" label="owner" name="owner">
            <UInput v-model="vehicle.owner" />
          </UFormGroup>

          <UFormGroup class="w-1/2" label="rating" name="rating">
            <USelect
              v-model="vehicle.rating"
              placeholder="Select Rating..."
              :options="[1, 2, 3, 4, 5]"
            />
          </UFormGroup>
        </div>
        <div class="flex justify-between gap-5">
          <UFormGroup class="w-1/2" label="address" name="address">
            <UInput v-model="vehicle.address" />
          </UFormGroup>

          <UFormGroup class="w-1/2" label="isPremium" name="isPremium">
            <UToggle v-model="vehicle.isPremium" />
          </UFormGroup>
        </div>

        <UFormGroup class="w-1/2" label="Media" name="media">
          <input
            class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-lg text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            id="media"
            type="file"
            multiple
            @change="handleMedia"
          />
        </UFormGroup>

        <div class="flex flex-wrap gap-10">
          <div
            v-for="image in vehicle.media"
            :key="image.id"
            class="relative w-1/4"
          >
            <img :src="image.path" :alt="image.name" />
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
import { object, string, number, boolean } from "yup";
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const schema = object({
  name: string().required("Required"),
  description: string().required("Required"),
  brandId: number().required("Required"),
  price: number().min(0, "Price must be greater than 0").required("Required"),
  phone: string().required("Required"),
  address: string().required("Required"),
  owner: string().required("Required"),
  rating: number().required("Required"),
  isPremium: boolean(),
});
const brands = await $fetch("/api/brands/sub");

const route = useRoute();
const { data: vehicle } = await useFetch(`/api/vehicles/${route.params.id}`);
const body = new FormData();

const handleMedia = (e) => {
  body.delete("files[]");
  Array.from(e.target.files).forEach((file) => {
    body.append("files[]", file);
  });
};

const onSubmit = async () => {
  clearBody();
  body.append("name", vehicle.value.name);
  body.append("description", vehicle.value.description);
  body.append("brandId", vehicle.value.brandId);
  body.append("price", vehicle.value.price);
  body.append("phone", vehicle.value.phone);
  body.append("address", vehicle.value.address);
  body.append("owner", vehicle.value.owner);
  body.append("rating", vehicle.value.rating);
  body.append("isPremium", vehicle.value.isPremium);
  console.log(body);
  const response = await $fetch(`/api/admin/vehicles/${vehicle.value.id}`, {
    method: "PUT",
    body: body,
  });

  if (!response.errors) {
    // return navigateTo("/admin/vehicles");
  }
};

const removeMedia = async (mediaId) => {
  const response = await $fetch(`/api/vehicle-media/${mediaId}`, {
    method: "DELETE",
  });

  if (!response.errors) {
    vehicle.value.media = vehicle.value.media.filter(
      (media) => media.id != mediaId,
    );
  }
};

const clearBody = () => {
  body.delete("name");
  body.delete("description");
  body.delete("brandId");
  body.delete("price");
  body.delete("phone");
  body.delete("address");
  body.delete("owner");
  body.delete("rating");
  body.delete("isPremium");
};
</script>
