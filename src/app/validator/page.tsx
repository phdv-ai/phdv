"use client"

import React from 'react';
import ParticlesScene from '@/components/ParticlesScene';
import Validator from '@/components/Validator';
import Footer from '@/components/Footer';

export default function ValidatorPage() {
  return (
    <>
      <ParticlesScene />
      <Validator />
      <Footer />
    </>
  );
}
