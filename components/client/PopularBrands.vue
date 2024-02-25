<template>
  <div class="my-10 px-20">
    <h1 class="my-5 border-b border-lochmara text-3xl font-semibold">
      Popular car brands
    </h1>
    <div class="grid grid-cols-6 gap-y-5 p-5">
      <div v-for="brand in brands" :key="brand.id">
        <h2 class="text-xl font-semibold">{{ brand.name }}</h2>
        <p v-for="sub_brand in brand.subBrands" :key="sub_brand">
          <a class="hover:underline" :href="`/vehicles?brand=${sub_brand}`">{{
            sub_brand
          }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const brands = ref([
  {
    id: 6,
    name: "Audi",
    subBrands: ["Audi A1", "Audi A3", "Audi A4", "Audi A6", "Audi Q5"],
  },
  {
    id: 7,
    name: "BMW",
    subBrands: [
      "BMW 1 Series",
      "BMW 2 Series",
      "BMW 3 Series",
      "BMW 5 Series",
      "BMW X1",
    ],
  },
  {
    id: 8,
    name: "Ford",
    subBrands: [
      "Ford Ecosport",
      "Ford Fiesta",
      "Ford Focus",
      "Ford Ka",
      "Ford Mondeo",
    ],
  },
  {
    id: 1,
    name: "Mercedes-Benz",
    subBrands: [
      "Mercedes B-class Class",
      "Mercedes C-Class",
      "Mercedes CLA",
      "Mercedes E-Klasse",
      "Mercedes GLA",
    ],
  },
  {
    id: 2,
    name: "Opel",
    subBrands: [
      "Opel Adam",
      "Opel Astra",
      "Opel Corsa",
      "Opel Insignia",
      "Opel Mokka",
    ],
  },
  {
    id: 3,
    name: "VW",
    subBrands: [
      "Volkswagen Golf",
      "Volkswagen Polo",
      "VW Passat",
      "Volkswagen Touran",
      "VW up!",
    ],
  },
  {
    id: 4,
    name: "Other car brands",
    subBrands: ["Citroen", "Fiat", "Peugeot", "Renault", "Skoda"],
  },
  {
    id: 5,
    name: "Car brands from Asia",
    subBrands: ["Hyundai", "Mazda", "Mitsubishi", "Nissan", "Toyota"],
  },
]);
</script>
