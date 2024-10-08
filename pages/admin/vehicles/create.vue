<template>
  <div class="w-full px-5 py-20 sm:px-20">
    <h1 class="text-2xl font-bold sm:text-3xl">{{ $t("add_vehicle") }}</h1>
    <div class="mt-20 w-full">
      <UForm
        :schema="schema"
        :state="vehicle"
        class="space-y-4"
        @submit="onSubmit"
      >
        <div class="flex justify-between gap-5">
          <UFormGroup class="w-1/2" :label="$t('name')" name="name">
            <UInput v-model="vehicle.name" />
          </UFormGroup>
          <UFormGroup class="w-1/2" :label="$t('brand')" name="brand">
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

        <UFormGroup :label="$t('description')" name="description">
          <UTextarea v-model="vehicle.description" />
        </UFormGroup>

        <div class="flex justify-between gap-5">
          <UFormGroup class="w-1/2" :label="$t('price')" name="price">
            <UInput v-model="vehicle.price" type="number" />
          </UFormGroup>

          <UFormGroup class="w-1/2" :label="$t('phone_number')" name="phone">
            <UInput v-model="vehicle.phone" type="tel" />
          </UFormGroup>
        </div>

        <div class="flex justify-between gap-5">
          <UFormGroup class="w-1/2" :label="$t('rating')" name="rating">
            <USelect
              v-model="vehicle.rating"
              placeholder="Select Rating..."
              :options="[1, 2, 3, 4, 5]"
            />
          </UFormGroup>
          <UFormGroup class="w-1/2" :label="$t('premium')" name="isPremium">
            <UToggle v-model="vehicle.isPremium" />
          </UFormGroup>
        </div>
        <UFormGroup class="w-1/2" :label="$t('media')" name="media">
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
    </div>
  </div>
</template>

<script setup>
import { object, string, number, boolean } from "yup";
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const localePath = useLocalePath();
const { t } = useI18n();

const schema = object({
  name: string().required(t("required")),
  description: string().required(t("required")),
  brand: number().required(t("required")),
  price: number()
    .min(0, "Price must be greater than 0")
    .required(t("required")),
  phone: string().required(t("required")),
  address: string().required(t("required")),
  owner: string().required(t("required")),
  rating: number().required(t("required")),
  isPremium: boolean(),
});

const vehicle = reactive({
  name: undefined,
  description: undefined,
  brand: undefined,
  price: undefined,
  phone: undefined,
  address: "Pirmasenser Straße 98 • 66482 Zweibrücken",
  owner: "DA Cars",
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
    return navigateTo(localePath("/admin/vehicles"));
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
