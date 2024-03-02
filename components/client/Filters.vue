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
        @select="handleSelect"
      />

      <Number
        @input="handleMinPriceInput"
        class="mt-5"
        label="Min Price"
        min="0"
      />
      <Number
        @input="handleMaxPriceInput"
        class="mt-5"
        label="Max Price"
        min="0"
      />
      <Number
        @input="handleRatingPriceInput"
        class="mt-5"
        label="Rating"
        :min="0"
        :max="5"
      />
      <Toggle @toggle="handleToggle" class="mt-5" label="Premium" />
      <ul
        v-if="errors.length"
        class="mt-5 list-disc px-5 font-semibold text-red-500"
      >
        <li v-for="error in errors" :key="error.code">{{ error.message }}</li>
      </ul>

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
const props = defineProps(["brands", "errors"]);
const emit = defineEmits(["applyFilters", "clearFilters"]);

const filters = reactive({
  brand: null,
  minPrice: null,
  maxPrice: null,
  rating: null,
  isPremium: null,
});

const handleSelect = (value) => {
  filters.brand = value;
};

const handleMinPriceInput = (value) => {
  filters.minPrice = value;
};

const handleMaxPriceInput = (value) => {
  filters.maxPrice = value;
};

const handleRatingPriceInput = (value) => {
  filters.rating = value;
};

const handleToggle = (value) => {
  filters.isPremium = value;
};

const handleApplyFilters = (e) => {
  e.preventDefault();
  emit("applyFilters", filters);
};

const handleClearFilters = (e) => {
  e.preventDefault();
  emit("clearFilters", filters);
};
</script>
