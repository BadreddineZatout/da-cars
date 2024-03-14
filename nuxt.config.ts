// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
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
    defaultLocale: "fr",
  },

  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
});
