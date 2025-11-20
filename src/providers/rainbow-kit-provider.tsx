'use client';

import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import '@rainbow-me/rainbowkit/styles.css';
import { somniaMainnet } from '@/constants/chains';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, rainbowWallet, coinbaseWallet, walletConnectWallet, okxWallet, ledgerWallet, trustWallet, zerionWallet, argentWallet, rabbyWallet } from '@rainbow-me/rainbowkit/wallets';
import { http, fallback } from 'wagmi';




import { createConfig } from 'wagmi';



const connectors = connectorsForWallets(
    [
        {
            groupName: 'Suggested',
            wallets: [
                metaMaskWallet,
                rainbowWallet,
                coinbaseWallet,
                walletConnectWallet,
                okxWallet
            ],
        },
        {
            groupName: 'Other',
            wallets: [
                ledgerWallet,
                trustWallet,
                zerionWallet,
                argentWallet,
                rabbyWallet,
            ],
        },
    ],
    {
        appName: 'Somnia Exchange',
        projectId: 'YOUR_PROJECT_ID',
    }
);

export const config = createConfig({
    connectors,
    chains: [somniaMainnet], // Sadece Somnia Mainnet kullanılacak
    transports: {
        [somniaMainnet.id]: fallback(
            somniaMainnet.rpcUrlList.map(url => http(url, { timeout: 3_000 }))
        ),
    },
});
const queryClient = new QueryClient();

export function RainbowKitProviderWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={darkTheme({
                    accentColor: '#f59e0b', // Amber color that matches somnia theme
                    accentColorForeground: 'white',
                    borderRadius: 'medium',
                    fontStack: 'system',
                })}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
} 