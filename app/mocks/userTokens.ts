import { UserAsset } from "@/classes/Asset"

const USER_TOKENS: UserAsset[] = [
  new UserAsset({
    address: '0x123',
    name: 'USDC',
    symbol: 'USDC',
    decimals: 6,
    balance: 1000000,
  })
]

export default USER_TOKENS