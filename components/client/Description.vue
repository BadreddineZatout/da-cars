<template>
  <div
    class="bg-royalBlue-100 border-royalBlue-300 mb-10 flex w-full items-center justify-between border-y-2 px-10 py-10 shadow-lg lg:px-20"
  >
    <div class="w-full lg:w-1/2">
      <h1 class="text-royalBlue-500 mb-1 text-3xl font-bold">Da Cars</h1>
      <h2 class="mb-5 text-xl font-semibold">
        {{ $t("sub_title") }}
      </h2>
      <p class="indent-8">
        {{ $t("company_description") }}
      </p>
    </div>
    <div class="hidden w-1/2 lg:flex lg:justify-center">
      <video
        src="/da-cars.mp4"
        autoPlay="autoplay"
        loop="loop"
        muted
        className="object-cover relative w-auto min-w-full min-h-full max-w-none z-[-1]"
        width="320" 
        height="240"
      />
    </div>
  </div>
</template>
