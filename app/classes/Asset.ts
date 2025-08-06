import type { Address } from "viem"

export class Asset {
    constructor(
        public chainId: number | undefined,
        public address: Address | undefined,
        public name: string | undefined,
        public symbol: string | undefined,
        public decimals: number | undefined,
        public imageUrl: string | undefined,
    ) {}
}

export class UserAsset extends Asset {
    constructor(
        chainId: number | undefined,
        address: Address | undefined,
        name: string | undefined,
        symbol: string | undefined,
        decimals: number | undefined,
        imageUrl: string | undefined,
        public balance: number | undefined,
    ) {
        super(chainId, address, name, symbol, decimals, imageUrl)
    }
}

export class LpPair extends Asset {
    constructor(
        chainId: number | undefined,
        address: Address | undefined,
        name: string | undefined,
        symbol: string | undefined,
        decimals: number | undefined,
        imageUrl: string | undefined,
        public token0: Address | undefined,
        public token1: Address | undefined,
    ) {
        super(chainId, address, name, symbol, decimals, imageUrl)
    }
}
