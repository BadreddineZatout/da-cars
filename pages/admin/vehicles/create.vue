<template>
  <div class="w-full p-20">
    <h1 class="text-3xl font-bold">Add Vehicle</h1>
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
              v-model="vehicle.brand"
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
  brand: number().required("Required"),
  price: number().min(0, "Price must be greater than 0").required("Required"),
  phone: string().required("Required"),
  address: string().required("Required"),
  owner: string().required("Required"),
  rating: number().required("Required"),
  isPremium: boolean(),
});

const vehicle = reactive({
  name: undefined,
  description: undefined,
  brand: undefined,
  price: undefined,
  phone: undefined,
  address: undefined,
  owner: undefined,
  rating: undefined,
  isPremium: false,
});

const brands = await $fetch("/api/brands/sub");

const body = new FormData();

const handleMedia = (e) => {
  body.delete("files[]");
  Array.from(e.target.files).forEach((file) => {
    body.append("files[]", file);
  });
};

const onSubmit = async () => {
  clearBody(body);
  body.append("name", vehicle.name);
  body.append("description", vehicle.description);
  body.append("brand", vehicle.brand);
  body.append("price", vehicle.price);
  body.append("phone", vehicle.phone);
  body.append("address", vehicle.address);
  body.append("owner", vehicle.owner);
  body.append("rating", vehicle.rating);
  body.append("isPremium", vehicle.isPremium);
  const response = await $fetch("/api/admin/vehicles/create", {
    method: "POST",
    body: body,
  });

  if (!response.errors) {
    return navigateTo("/admin/vehicles");
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
