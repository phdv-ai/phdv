import Image from 'next/image';
import Link from 'next/link';
import { FaTwitter, FaGithub, FaDiscord } from 'react-icons/fa';

const CURRENT_YEAR = new Date().getFullYear();

const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/phdv_ai',
  github: 'https://github.com/phdv-ai',
  discord: '#',
} as const;

export default function Footer() {
  return (
    <footer className="w-full text-gray-400 mx-auto px-8 md:px-20 lg:px-40 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-gray-800 pt-12">
          <div className="md:col-span-1">
            <Image src="/image/phdv-logo.svg" alt="PHDV-AI Logo" width={80} height={24} />
            <p className="text-sm mt-4">Decentralized personal health data vault, powered by AI and blockchain technology.</p>
            <div className="flex gap-4 mt-4 text-2xl">
              <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href={SOCIAL_LINKS.discord} className="hover:text-white transition-colors" aria-label="Discord">
                <FaDiscord />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/researcher" className="hover:text-white transition-colors">Researcher Portal</Link></li>
              <li><Link href="/staking" className="hover:text-white transition-colors">Staking</Link></li>
              <li><Link href="/tokenomics" className="hover:text-white transition-colors">Tokenomics</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/developer" className="hover:text-white transition-colors">Developer Tools</Link></li>
              <li><Link href="/validator" className="hover:text-white transition-colors">Validator</Link></li>
              <li><Link href="/phdv" className="hover:text-white transition-colors">PHDV Pipeline</Link></li>
              <li><Link href="/health-demo" className="hover:text-white transition-colors">Health Demo</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/compliance" className="hover:text-white transition-colors">Compliance</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-6 flex justify-between items-center text-sm">
          <p>&copy; {CURRENT_YEAR} PHDV-AI. All rights reserved.</p>
          <p className="text-gray-500">Built on Somnia Network</p>
        </div>
      </div>
    </footer>
  );
}