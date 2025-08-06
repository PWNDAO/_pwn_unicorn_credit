<template>
  <div>
    <ConnectWalletBtn v-if="!isConnected" />
    <Button @click="handleButtonClick" v-else variant="outline" size="sm">
      {{ addressFormatted }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { useAccount } from "@microhoffman/vue";
import { useAppKit } from "@reown/appkit/vue";
import { shortenAddress } from "~/lib/address";

const { open } = useAppKit();

const { isConnected, address } = useAccount();

const addressFormatted = computed(() => {
  if (!address.value) {
    return undefined;
  }
  return shortenAddress(address.value)
});

const handleButtonClick = () => {
  open()
}
</script>
