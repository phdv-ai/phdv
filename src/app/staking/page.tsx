"use client"

import React from 'react';
import ParticlesScene from '@/components/ParticlesScene';
import Staking from '@/components/Staking';
import Footer from '@/components/Footer';

export default function StakingPage() {
  return (
    <>
      <ParticlesScene />
      <Staking />
      <Footer />
    </>
  );
}
