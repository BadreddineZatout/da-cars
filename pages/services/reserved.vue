<template>
  <div class="my-20 px-5 text-center sm:my-40 sm:px-52">
    <svg
      class="mx-auto h-32 text-lochmara sm:h-40"
      data-slot="icon"
      aria-hidden="true"
      fill="none"
      stroke-width="1.5"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
    <h1 class="mb-10 text-3xl font-bold sm:text-4xl">
      {{ $t("reservation_created") }} <br />
      {{ $t("we_will_contact_you_soon") }}
    </h1>
    <NuxtLink
      class="rounded-lg bg-lochmara px-5 py-2.5 text-center text-lg font-medium text-white hover:bg-blue-800"
      to="/"
    >
      {{ $t("return_to_home_page") }}
    </NuxtLink>
  </div>
</template>
