"use client"

import React, { useState } from 'react';
import { Layers, TrendingUp, Lock, Unlock, Coins, Clock, AlertCircle, Award } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`border border-cyan-400/50 bg-cyan-900/10 backdrop-blur-sm rounded-2xl p-6 ${className || ''}`}>
    {children}
  </div>
);

const Badge = ({ children, variant, className }: { children: React.ReactNode, variant?: 'default' | 'secondary' | 'outline' | 'destructive', className?: string }) => {
  const variantStyles = variant === 'secondary'
    ? "bg-gray-600/30 text-gray-300"
    : variant === 'outline'
    ? "border border-cyan-400/30 text-cyan-400"
    : variant === 'destructive'
    ? "bg-red-500/20 text-red-400"
    : "bg-cyan-400/20 text-cyan-400";

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${variantStyles} ${className || ''}`}>
      {children}
    </span>
  );
};

const Progress = ({ value, className }: { value: number, className?: string }) => (
  <div className={`w-full bg-cyan-400/20 rounded-full overflow-hidden ${className || ''}`}>
    <div
      className="bg-cyan-400 h-full transition-all duration-300"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

const stakingPools = [
  {
    id: 1,
    name: "Validator Pool",
    apy: 18.5,
    minStake: "1,000 PHDV",
    lockPeriod: "30 days",
    totalStaked: "2.5M PHDV",
    participants: 1247,
    risk: "Medium",
  },
  {
    id: 2,
    name: "Governance Pool",
    apy: 12.3,
    minStake: "500 PHDV",
    lockPeriod: "14 days",
    totalStaked: "1.8M PHDV",
    participants: 2341,
    risk: "Low",
  },
  {
    id: 3,
    name: "Liquidity Pool",
    apy: 24.7,
    minStake: "2,000 PHDV",
    lockPeriod: "90 days",
    totalStaked: "950K PHDV",
    participants: 456,
    risk: "High",
  },
];

const rewardsHistory = [
  { month: "Jul", rewards: 42 },
  { month: "Aug", rewards: 48 },
  { month: "Sep", rewards: 55 },
  { month: "Oct", rewards: 51 },
  { month: "Nov", rewards: 62 },
  { month: "Dec", rewards: 68 },
  { month: "Jan", rewards: 73 },
];

const activeStakes = [
  {
    id: 1,
    pool: "Validator Pool",
    amount: "5,000 PHDV",
    apy: 18.5,
    startDate: "2024-12-15",
    unlockDate: "2025-01-14",
    earned: "76.25 PHDV",
  },
  {
    id: 2,
    pool: "Governance Pool",
    amount: "2,500 PHDV",
    apy: 12.3,
    startDate: "2024-12-20",
    unlockDate: "2025-01-03",
    earned: "10.52 PHDV",
  },
];

export default function Staking() {
  const [stakeAmount, setStakeAmount] = useState("");
  const [activeTab, setActiveTab] = useState<'pools' | 'active'>('pools');

  return (
    <div className="min-h-screen text-white px-8 md:px-20 lg:px-40 pt-24">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Staking</h1>
        <p className="text-gray-400">Stake your PHDV tokens to earn rewards and participate in governance</p>
      </header>

      <main className="space-y-8">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/30">
                <Layers className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-3xl font-bold">7,500</div>
                <div className="text-sm text-gray-400">Your Staked</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/30">
                <TrendingUp className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-3xl font-bold">16.2%</div>
                <div className="text-sm text-gray-400">Avg APY</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/30">
                <Coins className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-3xl font-bold">86.77</div>
                <div className="text-sm text-gray-400">Total Earned</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/30">
                <Lock className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-3xl font-bold">5.2M</div>
                <div className="text-sm text-gray-400">Total Staked</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Rewards Chart */}
        <Card className="border-l-4 border-l-cyan-400">
          <div className="mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
              <TrendingUp className="h-6 w-6 text-cyan-400" />
              Staking Rewards History
            </h2>
            <p className="text-gray-400">Your monthly staking rewards over time</p>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={rewardsHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(6, 182, 212, 0.2)" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(8, 145, 178, 0.1)",
                  border: "1px solid rgba(6, 182, 212, 0.5)",
                  borderRadius: "8px",
                  backdropFilter: "blur(8px)",
                }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#06b6d4" }}
              />
              <Line type="monotone" dataKey="rewards" stroke="#06b6d4" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Tabs */}
        <div className="space-y-4">
          <div className="flex gap-2 border-b border-cyan-400/30 pb-2">
            <button
              onClick={() => setActiveTab('pools')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'pools'
                  ? 'bg-cyan-400/20 text-cyan-400 font-medium'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layers className="h-4 w-4" />
              Staking Pools
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'active'
                  ? 'bg-cyan-400/20 text-cyan-400 font-medium'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Lock className="h-4 w-4" />
              Your Stakes
            </button>
          </div>

          {/* Pools Tab */}
          {activeTab === 'pools' && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {stakingPools.map((pool) => (
                  <Card key={pool.id} className="hover:shadow-lg hover:shadow-cyan-400/20 transition-all">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold">{pool.name}</h3>
                          <Badge
                            variant={
                              pool.risk === "Low" ? "secondary" : pool.risk === "Medium" ? "default" : "destructive"
                            }
                          >
                            {pool.risk} Risk
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-cyan-400">{pool.apy}%</div>
                          <div className="text-sm text-gray-400">APY</div>
                        </div>
                      </div>

                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Min. Stake</span>
                          <span className="font-medium text-white">{pool.minStake}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Lock Period</span>
                          <span className="font-medium text-white">{pool.lockPeriod}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Total Staked</span>
                          <span className="font-medium text-white">{pool.totalStaked}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Participants</span>
                          <span className="font-medium text-white">{pool.participants.toLocaleString()}</span>
                        </div>
                      </div>

                      <button className="w-full flex items-center justify-center gap-2 border border-cyan-400 bg-cyan-400 text-white font-bold py-2 px-4 rounded-full hover:bg-cyan-500 transition-colors">
                        <Lock className="h-4 w-4" />
                        Stake Now
                      </button>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Quick Stake */}
              <Card className="border-l-4 border-l-cyan-400">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">Quick Stake</h2>
                  <p className="text-gray-400">Stake your PHDV tokens in seconds</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Amount to Stake</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="0.00"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        className="flex-1 bg-gray-900/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                      <button className="border border-cyan-400/50 text-cyan-400 py-3 px-6 rounded-lg hover:bg-cyan-400/10 transition-colors">
                        Max
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Available Balance</span>
                      <span className="font-medium text-white">1,247 PHDV</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => setStakeAmount("100")}
                      className="border border-cyan-400/30 text-cyan-400 py-2 px-4 rounded-lg hover:bg-cyan-400/10 transition-colors text-sm"
                    >
                      100
                    </button>
                    <button
                      onClick={() => setStakeAmount("500")}
                      className="border border-cyan-400/30 text-cyan-400 py-2 px-4 rounded-lg hover:bg-cyan-400/10 transition-colors text-sm"
                    >
                      500
                    </button>
                    <button
                      onClick={() => setStakeAmount("1000")}
                      className="border border-cyan-400/30 text-cyan-400 py-2 px-4 rounded-lg hover:bg-cyan-400/10 transition-colors text-sm"
                    >
                      1K
                    </button>
                    <button
                      onClick={() => setStakeAmount("5000")}
                      className="border border-cyan-400/30 text-cyan-400 py-2 px-4 rounded-lg hover:bg-cyan-400/10 transition-colors text-sm"
                    >
                      5K
                    </button>
                  </div>

                  {stakeAmount && (
                    <div className="p-4 bg-cyan-900/20 border border-cyan-400/30 rounded-lg">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Estimated APY</span>
                          <span className="font-medium text-white">16.2%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Est. Monthly Rewards</span>
                          <span className="font-medium text-cyan-400">
                            {((Number.parseFloat(stakeAmount) * 0.162) / 12).toFixed(2)} PHDV
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Est. Yearly Rewards</span>
                          <span className="font-medium text-cyan-400">
                            {(Number.parseFloat(stakeAmount) * 0.162).toFixed(2)} PHDV
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    disabled={!stakeAmount}
                    className="w-full border border-cyan-400 bg-cyan-400 text-white font-bold py-3 px-6 rounded-full hover:bg-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Stake {stakeAmount || "0"} PHDV
                  </button>
                </div>
              </Card>
            </div>
          )}

          {/* Active Stakes Tab */}
          {activeTab === 'active' && (
            <div className="space-y-4">
              {activeStakes.map((stake) => (
                <Card key={stake.id}>
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">{stake.pool}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="secondary">{stake.apy}% APY</Badge>
                          <Badge variant="outline" className="gap-1">
                            <Lock className="h-3 w-3" />
                            Locked
                          </Badge>
                        </div>
                      </div>
                      <div className="text-left md:text-right">
                        <div className="text-2xl font-bold text-white">{stake.amount}</div>
                        <div className="text-sm text-gray-400">Staked</div>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-400">Earned Rewards</div>
                        <div className="text-lg font-bold text-cyan-400">{stake.earned}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-400">Start Date</div>
                        <div className="text-lg font-medium text-white">{stake.startDate}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-400">Unlock Date</div>
                        <div className="text-lg font-medium text-white">{stake.unlockDate}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Time until unlock</span>
                        <span className="font-medium text-white">12 days</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <button className="flex-1 flex items-center justify-center gap-2 border border-cyan-400/50 text-cyan-400 py-2 px-4 rounded-full hover:bg-cyan-400/10 transition-colors">
                        <Coins className="h-4 w-4" />
                        Claim Rewards
                      </button>
                      <button
                        disabled
                        className="flex-1 flex items-center justify-center gap-2 border border-cyan-400/50 text-cyan-400 py-2 px-4 rounded-full hover:bg-cyan-400/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Unlock className="h-4 w-4" />
                        Unstake (Locked)
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid gap-6 md:grid-cols-2 pb-16">
          <Card>
            <div className="mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
                <Award className="h-6 w-6 text-cyan-400" />
                Staking Benefits
              </h2>
            </div>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 border border-cyan-400/30 mt-0.5">
                  <Coins className="h-3 w-3 text-cyan-400" />
                </div>
                <div>
                  <div className="font-medium text-white">Earn Passive Income</div>
                  <div className="text-gray-400">Receive regular rewards based on your stake amount</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 border border-cyan-400/30 mt-0.5">
                  <Award className="h-3 w-3 text-cyan-400" />
                </div>
                <div>
                  <div className="font-medium text-white">Governance Rights</div>
                  <div className="text-gray-400">Vote on proposals and shape platform decisions</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 border border-cyan-400/30 mt-0.5">
                  <TrendingUp className="h-3 w-3 text-cyan-400" />
                </div>
                <div>
                  <div className="font-medium text-white">Compound Growth</div>
                  <div className="text-gray-400">Restake rewards to maximize your earnings</div>
                </div>
              </li>
            </ul>
          </Card>

          <Card>
            <div className="mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
                <AlertCircle className="h-6 w-6 text-cyan-400" />
                Important Information
              </h2>
            </div>

            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 shrink-0 mt-0.5 text-cyan-400" />
                <span>Staked tokens are locked for the specified period and cannot be withdrawn early</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-cyan-400" />
                <span>APY rates are variable and may change based on network conditions</span>
              </li>
              <li className="flex items-start gap-3">
                <Lock className="h-4 w-4 shrink-0 mt-0.5 text-cyan-400" />
                <span>Rewards are calculated and distributed automatically every 24 hours</span>
              </li>
              <li className="flex items-start gap-3">
                <Coins className="h-4 w-4 shrink-0 mt-0.5 text-cyan-400" />
                <span>Unstaking may incur a small fee to cover network transaction costs</span>
              </li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
}
