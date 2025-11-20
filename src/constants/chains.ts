// import { mainnet, sepolia, hardhat } from 'wagmi/chains';

export const somniaMainnet = {
    id: 5031,
    name: "Somnia Mainnet",
    network: "somnia-mainnet",
    nativeCurrency: {
        decimals: 18,
        name: "SOMI",
        symbol: "SOMI",
    },
    rpcUrls: {
        public: { http: ["https://api.infra.mainnet.somnia.network"] },
        default: { http: ["https://api.infra.mainnet.somnia.network"] },
    },
    blockExplorers: {
        default: { name: "Somnia Explorer", url: "https://mainnet.somnia.w3us.site" },
    },
    rpcUrlList:
        [
            'https://api.infra.mainnet.somnia.network',
        ]
} as const


export const somniaTestnet = {
    id: 50312,
    name: "Somnia Testnet",
    network: "somnia-testnet",
    nativeCurrency: {
        decimals: 18,
        name: "STT",
        symbol: "STT",
    },
    rpcUrls: {
        public: { http: ["https://dream-rpc.somnia.network"] },
        default: { http: ["https://dream-rpc.somnia.network"] },
    },
    blockExplorers: {
        default: { name: "Shannon Explorer", url: "https://shannon-explorer.somnia.network" },
    },
    rpcUrlList:
        [
            'https://dream-rpc.somnia.network',
            'https://enterprise.onerpc.com/somnia_testnet?apikey=Ku3gV1hlxVE3wPUH5aeLC126NpZfO2Sg'
        ]
} as const
