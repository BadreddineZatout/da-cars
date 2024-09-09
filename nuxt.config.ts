// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      posthogPublicKey: "phc_bpZLDvmrx6ZPRfL5dIXNqS0jEk56HhXGsHnaZ5HI7Hr",
      posthogHost: "https://us.i.posthog.com",
      uploadDir: process.env.IMG_UPLOAD_DIR
    },
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  modules: [
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],

  i18n: {
    vueI18n: "./i18n.config.ts",
    locales: ["fr", "de"],
    defaultLocale: "de",
  },

  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
});
