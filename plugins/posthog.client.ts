import { defineNuxtPlugin } from "#app";
import posthog from "posthog-js";
export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const posthogClient = posthog.init(
    runtimeConfig.public.posthogPublicKey as string,
    {
      api_host:
        (runtimeConfig.public.posthogHost as string) ||
        "https://app.posthog.com",
      capture_pageview: false, // we add manual pageview capturing below
      loaded: (posthog) => {
        if (import.meta.env.MODE === "development") posthog.debug();
      },
    },
  );

  // Make sure that pageviews are captured with each route change
  const router = useRouter();
  router.afterEach((to) => {
    nextTick(() => {
      posthog.capture("$pageview", {
        current_url: to.fullPath,
      });
    });
  });

  return {
    provide: {
      posthog: () => posthogClient,
    },
  };
});
