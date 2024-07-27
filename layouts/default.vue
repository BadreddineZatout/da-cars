<template>
  <div>
    <AppHeader />
    <CookieConsent
      v-if="showBanner"
      @accept="acceptCookies"
      @decline="declineCookies"
    />
    <slot />
    <AppFooter />
  </div>
</template>

<script setup>
const { $posthog } = useNuxtApp();
const posthog = ref(null);
const showBanner = ref(true);
if ($posthog) {
  posthog.value = $posthog();
  showBanner.value = !(
    posthog.value.has_opted_out_capturing() ||
    posthog.value.has_opted_in_capturing()
  );
}
const acceptCookies = () => {
  posthog.value.opt_in_capturing();
  showBanner.value = false;
};
const declineCookies = () => {
  posthog.value.opt_out_capturing();
  showBanner.value = false;
};
</script>
