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
    'nuxt-mapbox',
    'nuxt-nodemailer'
  ],

  nodemailer: {
    from: '"DA Cars" <contact@bold-feistel.212-132-125-98.plesk.page>',
    host: 'bold-feistel.212-132-125-98.plesk.page',
    port: 465,
    secure: true,
    auth: {
      user: 'contact@bold-feistel.212-132-125-98.plesk.page',
      pass: 'eO2uv$729',
    },
    tls: {
      rejectUnauthorized: false // Allows self-signed certificates, if necessary
    }
  },

  mapbox: {
    accessToken: 'pk.eyJ1IjoiYmFkcmVkZGluZS05OSIsImEiOiJjbTB5ZGd4b3UwaWxkMm1zNmVxZzRpNjVkIn0.VNZK05FvnH-uEGYFR5DXag'
  },

  i18n: {
    vueI18n: "./i18n.config.ts",
    locales: ["fr", "de"],
    defaultLocale: "de",
  },

  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
});
