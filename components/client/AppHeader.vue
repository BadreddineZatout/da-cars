<template>
  <div class="flex w-full items-center justify-between bg-black px-10">
    <NuxtLink to="/" class="w-1/12">
      <img src="/logo.jpg" alt="logo" />
    </NuxtLink>
    <div
      class="flex w-1/6 items-center justify-between font-semibold text-white"
    >
      <NuxtLink class="hover:underline" to="/services">Services</NuxtLink>
      <NuxtLink class="hover:underline" to="/vehicles">Vehicles</NuxtLink>
      <NuxtLink class="hover:underline" to="#contact">Contact</NuxtLink>
    </div>
  </div>
</template>
