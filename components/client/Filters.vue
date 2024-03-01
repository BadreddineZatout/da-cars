<template>
  <div class="px-4 py-5">
    <form class="mx-auto max-w-sm">
      <Select
        label="Brand"
        :options="
          brands.map((brand) => {
            return { name: brand.name, value: brand.id };
          })
        "
      />

      <Number class="mt-5" label="Min Price" min="0" />
      <Number class="mt-5" label="Max Price" min="0" />
      <Number class="mt-5" label="Rating" min="0" max="5" />
      <Toggle class="mt-5" label="Premium" />
      <div class="mt-10 flex items-center justify-around font-medium">
        <button
          class="w-1/3 rounded-lg border border-lochmara px-5 py-2 text-lochmara hover:bg-lochmara hover:text-white"
          @click="handleApplyFilters"
        >
          Apply
        </button>
        <button
          class="w-1/3 rounded-lg border border-red-500 px-5 py-2 text-red-500 hover:bg-red-500 hover:text-white"
          @click="handleClearFilters"
        >
          Clear
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
const props = defineProps(["brands"]);
const emit = defineEmits(["applyFilters", "clearFilters"]);

const filters = reactive({
  brand: null,
  minPrice: 0,
  maxPrice: Infinity,
  rating: 0,
  isPremium: null,
});

const handleApplyFilters = (e) => {
  e.preventDefault();
  emit("applyFilters", filters);
};
</script>
