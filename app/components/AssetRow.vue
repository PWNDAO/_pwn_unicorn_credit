<template>
    <div class="flex justify-between items-center gap-2 cursor-pointer hover:bg-neutral-800 p-2 rounded-md">
        <AssetImage :image-url="asset.imageUrl" :chain-id="asset.chainId" />
        <div class="mr-auto">
            <div>{{ asset.name }}</div>
            <div class="text-muted-foreground">
                <span>{{ asset.symbol }}</span>
                <span>{{ shortenAddress(asset.address) }}</span>
            </div>
        </div>
        <div>
            <div class="text-right">${{ assetPrice}}</div>
            <div class="text-muted-foreground">{{ asset.balance }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Asset } from '~/classes/Asset';
import { shortenAddress } from '~/lib/address';

interface Props {
    asset: Asset
}

const props = defineProps<Props>()

const assetPrice = computed(() => {
    // TODO
    return 1212
})
</script>