"use client";

import Footer from '@/components/Footer';
import dynamic from 'next/dynamic'
import Image from 'next/image';
import { FaTwitter, FaGithub, FaDiscord, FaUpload, FaMagic, FaLock, FaMoneyBillWave } from 'react-icons/fa';
import { ConnectWallet } from '@/components/ConnectWallet';
import Link from 'next/link';

const Scene = dynamic(() => import('@/components/Scene'), { ssr: false })

export default function Home() {
  return (
    <div className="relative">
      <Scene>
        <div className="w-screen px-8 md:px-20 lg:px-40">
          <section className="h-screen flex flex-col justify-center items-start">
            <div className="max-w-2xl">
              <div className="inline-block bg-gray-800 bg-opacity-50 text-gray-300 text-sm font-semibold px-4 py-2 rounded-full mb-4">
                ✨ Decentralized Science Powered by AI
              </div>
              <h1 className="text-6xl md:text-8xl font-bold text-white">
                Own Your Health Data. <span className="text-blue-400">Fuel Science.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mt-6">
                PHDV-AI is your personal health data vault. Store, control, and monetize your health data while contributing to breakthrough medical research through AI-powered insights and DAO governance.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <button className="bg-cyan-500 text-white font-bold py-3 px-6 rounded-full hover:bg-cyan-600 transition-colors">
                  Get Started
                </button>
                <Link href="/dashboard" className="border border-cyan-400 text-cyan-400 font-bold py-3 px-6 rounded-full hover:bg-cyan-400 hover:text-white transition-colors">
                  Upload Health Data
                </Link>
              </div>
              <div className="mt-12 flex items-center gap-12 text-white">
                <div>
                  <p className="text-3xl font-bold">10K+</p>
                  <p className="text-gray-400">Data Providers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">500+</p>
                  <p className="text-gray-400">Researchers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">$2M+</p>
                  <p className="text-gray-400">Rewards Paid</p>
                </div>
              </div>
            </div>
          </section>

          <section className="h-screen flex flex-col justify-center items-start text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white">How PHDV-AI Works</h2>
            <p className="text-lg text-gray-300 mt-4 max-w-2xl">
              A decentralized ecosystem where you control your health data and earn rewards for contributing to science
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
              <div className="group border border-cyan-400 p-6 rounded-2xl text-left transition-all duration-300">
                <div className="text-blue-400 text-3xl mb-4 transition-colors group-hover:text-blue-600"><FaUpload /></div>
                <h3 className="text-xl font-bold text-white transition-colors group-hover:text-gray-400">Upload Data</h3>
                <p className="text-gray-400 mt-2 transition-colors group-hover:text-gray-600">Securely upload your health data from wearables, EHRs, or manual entry</p>
              </div>
              <div className="group border border-cyan-400 p-6 rounded-2xl text-left transition-all duration-300">
                <div className="text-green-400 text-3xl mb-4 transition-colors group-hover:text-green-600"><FaMagic /></div>
                <h3 className="text-xl font-bold text-white transition-colors group-hover:text-gray-400">AI Analysis</h3>
                <p className="text-gray-400 mt-2 transition-colors group-hover:text-gray-600">Get personalized insights powered by advanced AI models</p>
              </div>
              <div className="group border border-cyan-400 p-6 rounded-2xl text-left transition-all duration-300">
                <div className="text-cyan-400 text-3xl mb-4 transition-colors group-hover:text-cyan-600"><FaLock /></div>
                <h3 className="text-xl font-bold text-white transition-colors group-hover:text-gray-400">Control Access</h3>
                <p className="text-gray-400 mt-2 transition-colors group-hover:text-gray-600">Choose which researchers can access your anonymized data</p>
              </div>
              <div className="group border border-cyan-400 p-6 rounded-2xl text-left transition-all duration-300">
                <div className="text-teal-400 text-3xl mb-4 transition-colors group-hover:text-teal-600"><FaMoneyBillWave /></div>
                <h3 className="text-xl font-bold text-white transition-colors group-hover:text-gray-400">Earn Rewards</h3>
                <p className="text-gray-400 mt-2 transition-colors group-hover:text-gray-600">Get compensated in tokens when researchers use your data</p>
              </div>
            </div>
          </section>

          <section className="h-screen flex flex-col justify-center items-center text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Ready to Take Control of Your Health Data?</h2>
            <p className="text-lg text-gray-300 mt-4 max-w-2xl">
              Join thousands of users who are contributing to medical breakthroughs while earning rewards
            </p>
            <div className="mt-8 flex items-center gap-4">
              <button className="bg-cyan-500 text-white font-bold py-3 px-6 rounded-full hover:bg-cyan-600 transition-colors">
                Get Started →
              </button>
              <button className="border border-cyan-400 text-cyan-400 font-bold py-3 px-6 rounded-full hover:bg-cyan-400 hover:text-white transition-colors">
                For Researchers
              </button>
            </div>
          </section>

          <section className="min-h-screen flex flex-col justify-end items-center pb-20">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-bold text-white max-w-4xl">Built with ❤️ for Decentralized Science</h2>
            </div>
            <Footer />
          </section>
        </div>
      </Scene>

    </div>
  );
}
