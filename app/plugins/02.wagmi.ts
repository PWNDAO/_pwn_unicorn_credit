// plugins/2.wagmi.ts
import { WagmiPlugin } from "@wagmi/vue";
import { defineNuxtPlugin } from "nuxt/app";
import { wagmiAdapter } from "~/config/appkit";

export default defineNuxtPlugin((nuxtApp) => {
  console.log("WagmiPlugin", wagmiAdapter.wagmiConfig);
  nuxtApp.vueApp.use(WagmiPlugin, { config: wagmiAdapter.wagmiConfig });
});
