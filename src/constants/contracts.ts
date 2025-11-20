// import { Token } from "@/types"

// import { somniaMainnet } from './chains';
// import { ID_OF_CHAIN } from './config';

// // TypeScript interfaces for contract configuration

// export interface ContractAddress {
//     address: `0x${string}`;
// }

// export interface TokenContract {
//     address: `0x${string}`;
//     symbol?: string;
//     decimals: number;
//     name?: string;
//     tokenA?: TokenContract;
//     tokenB?: TokenContract;
//     isNative?: boolean;
// }

// export interface PaybackToken extends TokenContract {
//     name: string;
// }

// export interface NetworkContractConfig {
//     availableTokens: Token[];
//     chickenNFT: ContractAddress;
//     feedToken: TokenContract;
//     energyToken: TokenContract;
//     lpStakingContract: ContractAddress;
//     niaStakingContract: ContractAddress;
//     gameContract: ContractAddress;
//     niaToken: TokenContract;
//     wrappedNativeToken: TokenContract;
//     activeLpTokens: TokenContract[];
//     paybackToken: PaybackToken;
//     factoryV2: ContractAddress;
//     router: ContractAddress;
//     stableCoins: TokenContract[];
// }

// export interface ContractConfig {
//     [chainId: number]: NetworkContractConfig;
// }

// // Verdiğiniz kontrat adresleri


// export const factoryAbi = [
//     {
//         "constant": true,
//         "inputs": [
//             { "internalType": "address", "name": "tokenA", "type": "address" },
//             { "internalType": "address", "name": "tokenB", "type": "address" }
//         ],
//         "name": "getPair",
//         "outputs": [{ "internalType": "address", "name": "pair", "type": "address" }],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//     }
// ] as const;


// // UYARI: Bu proje artık SADECE Somnia Mainnet desteklemektedir
// // Testnet desteği kaldırılmıştır
// export const contractConfig: ContractConfig = {
//     [somniaMainnet.id]: {
//         stableCoins: [
//             {
//                 address: '0x28BEc7E30E6faee657a03e19Bf1128AaD7632A00',
//                 symbol: 'USDC.e',
//                 decimals: 6,
//             }
//         ],
//         availableTokens: [
//             {
//                 address: '0x28BEc7E30E6faee657a03e19Bf1128AaD7632A00',
//                 symbol: 'USDC.e',
//                 isNative: false,
//                 icon: '/images/tokens/usdc.png',
//                 decimals: 6,
//                 imageUrl: 'https://raw.githubusercontent.com/Ginger3Labs/gingerswap-v2sdk/refs/heads/main/images/0x28BEc7E30E6faee657a03e19Bf1128AaD7632A00.png',
//             },
//             {
//                 address: '0xC063B29CD6B30885783B505aE180B3079e0A2154',
//                 symbol: 'NIA',
//                 isNative: false,
//                 icon: '/images/tokens/nia.png',
//                 decimals: 18,
//                 imageUrl: 'https://raw.githubusercontent.com/Ginger3Labs/gingerswap-v2sdk/refs/heads/main/images/0xC063B29CD6B30885783B505aE180B3079e0A2154.png',
//             },
//             {
//                 address: '0x0000000000000000000000000000000000000000',
//                 symbol: 'SOMI',
//                 isNative: true,
//                 icon: '/images/tokens/stt.png',
//                 decimals: 18,
//             },


//         ],
//         chickenNFT: {
//             address: "0xe46a201323411708519883A1Dcfe6C701f3b26db" as `0x${string}`,
//         },
//         feedToken: {
//             address: "0x41827DD1c793D39D67F0d3F080e375645b849f8b" as `0x${string}`,
//             decimals: 18,
//             symbol: "FEED",
//         },
//         energyToken: {
//             address: "0x009290078800fDDca69F23aB23cCAFe01bb28407" as `0x${string}`,
//             decimals: 18,
//         },
//         lpStakingContract: {
//             address: "0x25b1440Fa0eFFc549ed5a35CB27134e2994F3915" as `0x${string}`,
//         },
//         niaStakingContract: {
//             address: "0x43978f81D5071Ba63933199e8F7bA060c6D2A4e9" as `0x${string}`,
//         },
//         gameContract: {
//             address: "0x65F915591ED341C6308d5267fDa788c05e2971D7" as `0x${string}`,
//         },
//         niaToken: {
//             address: "0xC063B29CD6B30885783B505aE180B3079e0A2154" as `0x${string}`,
//             decimals: 18,
//         },
//         wrappedNativeToken: {
//             address: "0x046EDe9564A72571df6F5e44d0405360c0f4dCab" as `0x${string}`,
//             decimals: 18,
//         },

//         activeLpTokens: [
//             {
//                 address: "0x89B6827843B884b862489c2Fc526374D0f9f1c39" as `0x${string}`,
//                 decimals: 18,
//                 name: "NIA/USDC LP",
//                 tokenA: {
//                     address: "0xC063B29CD6B30885783B505aE180B3079e0A2154",
//                     symbol: "NIA",
//                     decimals: 18,
//                 },
//                 tokenB: {
//                     address: "0x28BEc7E30E6faee657a03e19Bf1128AaD7632A00",
//                     symbol: "USDC.e",
//                     decimals: 6,
//                 },
//             },
//             {
//                 address: "0xB29713414fd01604a3b4267B0d6Df67DFa9e151B" as `0x${string}`,
//                 decimals: 18,
//                 name: "NIA/SOMI LP",
//                 tokenA: {
//                     address: "0xC063B29CD6B30885783B505aE180B3079e0A2154",
//                     symbol: "NIA",
//                     decimals: 18,
//                 },
//                 tokenB: {
//                     address: "0x0000000000000000000000000000000000000000",
//                     symbol: "SOMI",
//                     decimals: 18,
//                     isNative: true,
//                 },
//             }
//         ],
//         paybackToken: {
//             address: "0xC063B29CD6B30885783B505aE180B3079e0A2154" as `0x${string}`,
//             decimals: 18,
//             name: "NIA",
//         },
//         factoryV2: {
//             address: "0x6C4853C97b981Aa848C2b56F160a73a46b5DCCD4" as `0x${string}`,
//         },
//         router: {
//             address: "0xCdE9aFDca1AdAb5b5C6E4F9e16c9802C88Dc7e1A" as `0x${string}`,
//         }
//     },
// } as const;

// // Utility functions for working with contract configuration
// export function getContractConfig(): NetworkContractConfig | undefined {
//     return contractConfig[ID_OF_CHAIN];
// }

// export function getAvailableTokens(): Token[] {
//     return contractConfig[ID_OF_CHAIN]?.availableTokens || [];
// }

// export function getTokenBySymbol(symbol: string): Token | undefined {
//     return contractConfig[ID_OF_CHAIN]?.availableTokens.find(token => token.symbol === symbol);
// }

// export function getContractAddress(contractName: keyof Omit<NetworkContractConfig, 'availableTokens'>): `0x${string}` | undefined {
//     const config = contractConfig[ID_OF_CHAIN];
//     if (!config) return undefined;

//     const contract = config[contractName];
//     return 'address' in contract ? contract.address : undefined;
// }