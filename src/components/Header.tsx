"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FaHome, FaDatabase, FaSearch, FaRegCheckSquare, FaLayerGroup, FaShieldAlt, FaChevronDown } from "react-icons/fa";
export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-4 z-50 text-white p-4 rounded-lg"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(4px)'
      }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/image/phdv-logo.svg" alt="PHDV-AI Logo" width={128} height={32} />
        
        </Link>
        <nav className="hidden md:flex items-center gap-4 text-sm">
          <Link href="#" className="bg-cyan-500 text-white px-4 py-2 rounded-full flex items-center gap-2">
            <FaHome />
            <span>Home</span>
          </Link>
          <Link href="/dashboard" className="hover:text-gray-300 flex items-center gap-2">
            <FaDatabase />
            <span>Dashboard</span>
          </Link>
          <Link href="#" className="hover:text-gray-300 flex items-center gap-2">
            <FaSearch />
            <span>Research</span>
          </Link>
          <Link href="#" className="hover:text-gray-300 flex items-center gap-2">
            <FaRegCheckSquare />
            <span>DAO</span>
          </Link>
          <Link href="#" className="border border-cyan-400 text-cyan-400 px-4 py-2 rounded-full flex items-center gap-2">
            <FaLayerGroup />
            <span>Tools</span>
            <FaChevronDown />
          </Link>
          <Link href="#" className="hover:text-gray-300 flex items-center gap-2">
            <FaShieldAlt />
            <span>Info</span>
            <FaChevronDown />
          </Link>
        </nav>
      </div>
    </header>
  );
}