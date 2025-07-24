import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,
  css: ["~/assets/css/tailwind.css"],
  imports: {
    autoImport: true,
  },
  components: {
    dirs: ["~/components", "~/components/ui"],
  },
  devServer: {
    port: 8000,
  },
  // TODO potentially add also:
  //  @pinia/nuxt + pinia persisted state?
  //  @vueuse/nuxt
  //  @nuxtjs/seo
  //  @vue-final-modal/nuxt
  //  @nuxtjs/web-vitals
  //  @nuxtjs/svg-sprite
  //  nuxt-svgo
  // TODO use any component library? - primevue, shadcn, reka-ui, nuxt/ui, vuestic, oku-ui, maz-ui
  // TODO any form library? @vee-validate, formkit, tanstack, vueform
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    // TODO change back to @wagmi/vue/nuxt once they start supporting Nuxt 4
    "@microhoffman/vue/nuxt",
    "nuxt-typed-router",
    "shadcn-nuxt",
  ],
  vite: {
    resolve: {
      conditions: ["module", "import", "default"], // prioritize ESM
    },
    optimizeDeps: {
      include: ["eventemitter3"], // force prebundle
    },
    plugins: [tailwindcss()],
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./app/components/ui",
  },
  eslint: {
    checker: true,
  },
});
