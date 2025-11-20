"use client"

import React from 'react';
import { Upload, Search, Shield, Coins, ArrowRight, TrendingUp } from "lucide-react"

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`border border-cyan-400/50 bg-cyan-900/10 backdrop-blur-sm rounded-2xl p-6 ${className || ''}`}>
    {children}
  </div>
);

const Badge = ({ children, variant, className }: { children: React.ReactNode, variant?: 'default' | 'outline', className?: string }) => {
  const variantStyles = variant === 'outline'
    ? "border border-cyan-400/30 text-cyan-400"
    : "bg-cyan-400/20 text-cyan-400";

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${variantStyles} ${className || ''}`}>
      {children}
    </span>
  );
};

const roles = [
  {
    title: "Data Provider",
    icon: Upload,
    description: "Upload and share your health data to earn rewards",
    rewards: [
      "Base reward: 10-50 PHDV per dataset",
      "Quality bonus: up to 2x multiplier",
      "Consistency bonus: +5% per month",
      "Referral rewards: 10% of referee earnings",
    ],
    requirements: ["Connect wallet", "Upload verified health data", "Maintain data quality score >70%"],
  },
  {
    title: "Researcher",
    icon: Search,
    description: "Access datasets and contribute to scientific discoveries",
    rewards: [
      "Dataset access fees: 100-2000 PHDV",
      "Publication rewards: 500-5000 PHDV",
      "Collaboration bonuses",
      "Citation rewards from other researchers",
    ],
    requirements: [
      "Verified researcher credentials",
      "Institutional affiliation or independent verification",
      "Agree to ethical research guidelines",
    ],
  },
  {
    title: "Validator",
    icon: Shield,
    description: "Validate data quality and earn staking rewards",
    rewards: [
      "Validation fees: 1-5 PHDV per validation",
      "Staking rewards: 8-12% APY",
      "Reputation bonuses",
      "Governance voting power",
    ],
    requirements: ["Stake minimum 1,000 PHDV", "Technical validation capabilities", "Maintain >90% accuracy rate"],
  },
  {
    title: "Staker",
    icon: Coins,
    description: "Stake tokens to secure the network and earn passive income",
    rewards: [
      "Base staking: 8% APY",
      "Long-term bonus: up to 12% APY",
      "Governance participation rewards",
      "Early unstaking penalty: 2%",
    ],
    requirements: ["Minimum stake: 100 PHDV", "Lock period: 30-365 days", "Participate in governance (optional)"],
  },
];

const tokenFlow = [
  { from: "Researchers", to: "Data Providers", amount: "50%", description: "Dataset access fees" },
  { from: "Researchers", to: "Validators", amount: "25%", description: "Validation fees" },
  { from: "Researchers", to: "Treasury", amount: "15%", description: "Platform fees" },
  { from: "Researchers", to: "Stakers", amount: "10%", description: "Network security" },
];

export default function Tokenomics() {
  return (
    <div className="min-h-screen text-white px-8 md:px-20 lg:px-40 pt-24">
      {/* Header */}
      <header className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold md:text-5xl">PHDV Token Economics</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A sustainable token model that rewards all participants in the health data ecosystem
        </p>
      </header>

      <main className="space-y-8">
        {/* Token Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-l-4 border-l-cyan-400">
            <div className="space-y-2">
              <div className="text-sm text-gray-400">Total Supply</div>
              <div className="text-3xl font-bold">100M PHDV</div>
              <div className="text-xs text-gray-400">Fixed supply</div>
            </div>
          </Card>

          <Card className="border-l-4 border-l-cyan-400">
            <div className="space-y-2">
              <div className="text-sm text-gray-400">Circulating</div>
              <div className="text-3xl font-bold">45M PHDV</div>
              <div className="text-xs text-gray-400">45% of total</div>
            </div>
          </Card>

          <Card className="border-l-4 border-l-cyan-400">
            <div className="space-y-2">
              <div className="text-sm text-gray-400">Staked</div>
              <div className="text-3xl font-bold">28M PHDV</div>
              <div className="text-xs text-gray-400">62% of circulating</div>
            </div>
          </Card>

          <Card className="border-l-4 border-l-cyan-400">
            <div className="space-y-2">
              <div className="text-sm text-gray-400">Current Price</div>
              <div className="text-3xl font-bold">$0.50</div>
              <div className="text-xs text-cyan-400">↑ 12.5% (24h)</div>
            </div>
          </Card>
        </div>

        {/* Role Cards */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-center">Ecosystem Roles & Rewards</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {roles.map((role) => {
              const Icon = role.icon
              return (
                <Card key={role.title} className="hover:shadow-lg hover:shadow-cyan-400/20 transition-all">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/30">
                        <Icon className="h-6 w-6 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{role.title}</h3>
                        <p className="text-sm text-gray-400">{role.description}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2 text-white">
                        <Coins className="h-4 w-4 text-cyan-400" />
                        Rewards
                      </h4>
                      <ul className="space-y-1">
                        {role.rewards.map((reward, index) => (
                          <li key={index} className="text-sm text-gray-400 flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">•</span>
                            <span>{reward}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2 text-white">
                        <Shield className="h-4 w-4 text-cyan-400" />
                        Requirements
                      </h4>
                      <ul className="space-y-1">
                        {role.requirements.map((req, index) => (
                          <li key={index} className="text-sm text-gray-400 flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Token Flow */}
        <Card className="border-l-4 border-l-cyan-400">
          <div className="mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
              <TrendingUp className="h-6 w-6 text-cyan-400" />
              Token Flow & Distribution
            </h2>
            <p className="text-gray-400">How tokens move through the ecosystem</p>
          </div>

          <div className="space-y-4">
            {tokenFlow.map((flow, index) => (
              <div key={index} className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl border border-cyan-400/30 bg-cyan-900/10">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Badge variant="outline">{flow.from}</Badge>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <Badge variant="outline">{flow.to}</Badge>
                  </div>
                  <p className="text-sm text-gray-400">{flow.description}</p>
                </div>
                <div className="text-left md:text-right">
                  <div className="text-2xl font-bold text-cyan-400">{flow.amount}</div>
                  <div className="text-xs text-gray-400">of fees</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Distribution Chart */}
        <div className="grid gap-6 lg:grid-cols-2 pb-16">
          <Card>
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Token Allocation</h2>
              <p className="text-gray-400">Initial distribution of 100M PHDV tokens</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white">Community Rewards (40%)</span>
                  <span className="font-medium text-cyan-400">40M PHDV</span>
                </div>
                <div className="h-3 rounded-full bg-cyan-400/20 overflow-hidden">
                  <div className="h-full bg-cyan-400" style={{ width: "40%" }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white">Ecosystem Development (25%)</span>
                  <span className="font-medium text-cyan-400">25M PHDV</span>
                </div>
                <div className="h-3 rounded-full bg-cyan-400/20 overflow-hidden">
                  <div className="h-full bg-cyan-400" style={{ width: "25%" }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white">Team & Advisors (20%)</span>
                  <span className="font-medium text-cyan-400">20M PHDV</span>
                </div>
                <div className="h-3 rounded-full bg-cyan-400/20 overflow-hidden">
                  <div className="h-full bg-cyan-400" style={{ width: "20%" }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white">Treasury & Reserves (15%)</span>
                  <span className="font-medium text-cyan-400">15M PHDV</span>
                </div>
                <div className="h-3 rounded-full bg-cyan-400/20 overflow-hidden">
                  <div className="h-full bg-cyan-400" style={{ width: "15%" }} />
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Vesting Schedule</h2>
              <p className="text-gray-400">Token unlock timeline for different allocations</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-bold">
                  1
                </div>
                <div>
                  <div className="font-medium text-white">Community Rewards</div>
                  <p className="text-sm text-gray-400">
                    Released over 5 years based on platform usage and participation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-bold">
                  2
                </div>
                <div>
                  <div className="font-medium text-white">Team & Advisors</div>
                  <p className="text-sm text-gray-400">
                    1-year cliff, then linear vesting over 3 years
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-bold">
                  3
                </div>
                <div>
                  <div className="font-medium text-white">Ecosystem Development</div>
                  <p className="text-sm text-gray-400">
                    Released quarterly based on development milestones
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
