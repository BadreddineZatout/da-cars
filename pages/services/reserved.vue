<template>
  <div class="my-40 px-52 text-center">
    <svg
      class="mx-auto h-40 text-lochmara"
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
    <h1 class="mb-10 text-4xl font-bold">
      Your reservation was created
      <span class="text-lochmara">successfully</span>! <br />
      We will contact you soon.
    </h1>
    <NuxtLink
      class="rounded-lg bg-lochmara px-5 py-2.5 text-center text-lg font-medium text-white hover:bg-blue-800"
      to="/"
    >
      Return to home page
    </NuxtLink>
  </div>
</template>
