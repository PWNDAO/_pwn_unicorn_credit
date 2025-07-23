// config/appkit.ts
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { sepolia, type AppKitNetwork } from "@reown/appkit/networks";

export const networks = [sepolia] as [AppKitNetwork, ...AppKitNetwork[]];

// note: hardcoding projectId for now as i had problems with accessing
//  env variable value in here
export const projectId = "97c8a94aaca8161de8773d66a5cafc17";
if (!projectId) {
  throw new Error("reown projectId is not set");
}

console.log("creating wagmi adapter");
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
});
