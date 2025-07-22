// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // TODO potentially add also:
  //  @pinia/nuxt + pinia persisted state?
  //  @vueuse/nuxt
  //  @nuxtjs/seo
  //  @vue-final-modal/nuxt
  //  @nuxtjs/web-vitals
  //  nuxt-typed-router
  //  @nuxtjs/svg-sprite
  //  nuxt-svgo
  // TODO use any component library? - primevue, shadcn, reka-ui, nuxt/ui, vuestic, oku-ui, maz-ui
  // TODO any form library? @vee-validate, formkit, tanstack, vueform
  modules: [
    '@nuxt/eslint', 
    '@nuxt/image'
  ]
})