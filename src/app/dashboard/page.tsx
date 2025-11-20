"use client"

import React from 'react';
import { useAccount } from 'wagmi';
import ParticlesScene from '@/components/ParticlesScene';
import Dashboard from '@/components/Dashboard';
import Footer from '@/components/Footer';
import { ConnectWallet } from '@/components/ConnectWallet';
import { Wallet } from 'lucide-react';

export default function DashboardPage() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <>
        <ParticlesScene />
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-cyan-400/10 border-2 border-cyan-400/50 flex items-center justify-center">
                <Wallet className="w-10 h-10 text-cyan-400" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white">Wallet Connection Required</h1>
              <p className="text-gray-400">
                Please connect your wallet to access the dashboard
              </p>
            </div>
            <div className="flex justify-center pt-4">
              <ConnectWallet />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <ParticlesScene />
      <Dashboard />
      <Footer />
    </>
  );
}