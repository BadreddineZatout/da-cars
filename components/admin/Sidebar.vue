<template>
  <aside class="sticky top-0 h-full min-h-screen w-64 bg-black">
    <div class="flex items-center justify-center pt-5">
      <img class="h-20" src="/logo.jpg" alt="logo" />
    </div>
    <div class="h-full px-3 text-white dark:bg-gray-800">
      <ul class="space-y-5 font-medium">
        <li>
          <NuxtLink
            to="/admin"
            class="group mt-10 flex items-center rounded-lg p-2 hover:font-semibold hover:text-lochmara"
            :class="{ 'text-lochmara': $route.path == '/admin' }"
          >
            <svg
              class="group-hover: h-5 w-5 transition duration-75"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 21"
            >
              <path
                d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"
              />
              <path
                d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"
              />
            </svg>
            <span class="ms-3">Dashboard</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/admin/reservations"
            class="group flex items-center rounded-lg p-2 hover:font-semibold hover:text-lochmara"
            :class="{
              'text-lochmara': $route.path.includes('/admin/reservations'),
            }"
          >
            <svg
              class="h-5 w-5 flex-shrink-0"
              data-slot="icon"
              aria-hidden="true"
              fill="none"
              stroke-width="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <span class="ms-3 flex-1 whitespace-nowrap">Reservations</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/admin/vehicles"
            class="group flex items-center rounded-lg p-2 hover:font-semibold hover:text-lochmara"
            :class="{
              'text-lochmara': $route.path.includes('/admin/vehicles'),
            }"
          >
            <svg
              class="h-5 w-5 flex-shrink-0"
              data-slot="icon"
              aria-hidden="true"
              fill="none"
              stroke-width="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <span class="ms-3 flex-1 whitespace-nowrap">Vehicles</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/admin/services"
            class="group flex items-center rounded-lg p-2 hover:font-semibold hover:text-lochmara"
            :class="{
              'text-lochmara': $route.path.includes('/admin/services'),
            }"
          >
            <svg
              class="h-5 w-5 flex-shrink-0"
              data-slot="icon"
              aria-hidden="true"
              fill="none"
              stroke-width="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <span class="ms-3 flex-1 whitespace-nowrap">Services</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            href="/admin/users"
            class="group flex items-center rounded-lg p-2 hover:font-semibold hover:text-lochmara"
            :class="{ 'text-lochmara': $route.path.includes('/admin/users') }"
          >
            <svg
              class="h-5 w-5 flex-shrink-0"
              data-slot="icon"
              aria-hidden="true"
              fill="none"
              stroke-width="3"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <span class="ms-3 flex-1 whitespace-nowrap">Users</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/admin/settings"
            class="group flex items-center rounded-lg p-2 hover:font-semibold hover:text-lochmara"
            :class="{
              'text-lochmara': $route.path.includes('/admin/settings'),
            }"
          >
            <svg
              class="h-5 w-5 flex-shrink-0"
              data-slot="icon"
              aria-hidden="true"
              fill="none"
              stroke-width="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <span class="ms-3 flex-1 whitespace-nowrap">Settings</span>
          </NuxtLink>
        </li>
        <li>
          <button
            class="group flex items-center rounded-lg p-2 hover:font-semibold hover:text-lochmara"
            @click="handleLogout"
          >
            <svg
              class="h-5 w-5 flex-shrink-0"
              data-slot="icon"
              aria-hidden="true"
              fill="none"
              stroke-width="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <span class="ms-3 flex-1 whitespace-nowrap">Log Out</span>
          </button>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
const store = useStore();
const handleLogout = () => {
  store.$reset();
  return navigateTo("/", {
    replace: true,
  });
};
</script>
