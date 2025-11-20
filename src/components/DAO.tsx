"use client"

import React from 'react';
import { Vote, CheckCircle2, XCircle, Clock, TrendingUp, Users, Shield, Coins } from "lucide-react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`border border-cyan-400/50 bg-cyan-900/10 backdrop-blur-sm rounded-2xl p-6 ${className || ''}`}>
    {children}
  </div>
);

const Badge = ({ children, variant, className }: { children: React.ReactNode, variant?: 'default' | 'secondary', className?: string }) => {
  const variantStyles = variant === 'secondary'
    ? "bg-gray-600/30 text-gray-300"
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

const proposals = [
  {
    id: 1,
    title: "Increase Data Provider Rewards by 15%",
    description: "Proposal to increase base rewards for data providers to incentivize more participation",
    status: "active",
    votesFor: 12547,
    votesAgainst: 3421,
    totalVotes: 15968,
    quorum: 20000,
    timeLeft: "2 days",
  },
  {
    id: 2,
    title: "Add Support for Genomic Data",
    description: "Expand platform capabilities to include genomic and DNA sequencing data",
    status: "active",
    votesFor: 18234,
    votesAgainst: 5123,
    totalVotes: 23357,
    quorum: 20000,
    timeLeft: "5 days",
  },
  {
    id: 3,
    title: "Implement Tiered Validator System",
    description: "Create multiple validator tiers based on reputation and stake amount",
    status: "passed",
    votesFor: 25678,
    votesAgainst: 4321,
    totalVotes: 29999,
    quorum: 20000,
    timeLeft: "Ended",
  },
];

const validators = [
  { name: "HealthData Labs", reputation: 98, stake: "50K PHDV", validations: 1247 },
  { name: "MedResearch Institute", reputation: 96, stake: "45K PHDV", validations: 1089 },
  { name: "BioTech Validators", reputation: 94, stake: "38K PHDV", validations: 892 },
  { name: "Clinical Data Co", reputation: 92, stake: "35K PHDV", validations: 756 },
];

const feeDistribution = [
  { name: "Data Providers", value: 50, color: "#06b6d4" },
  { name: "Validators", value: 25, color: "#0891b2" },
  { name: "Researchers", value: 15, color: "#0e7490" },
  { name: "Treasury", value: 10, color: "#155e75" },
];

export default function DAO() {
  return (
    <div className="min-h-screen text-white px-8 md:px-20 lg:px-40 pt-24">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">DAO Governance</h1>
        <p className="text-gray-400">Participate in platform governance and shape the future of PHDV-AI</p>
      </header>

      <main className="space-y-8">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/30">
                <Vote className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-3xl font-bold">23</div>
                <div className="text-sm text-gray-400">Active Proposals</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/30">
                <Users className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-3xl font-bold">8.5K</div>
                <div className="text-sm text-gray-400">Token Holders</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/30">
                <Shield className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-3xl font-bold">142</div>
                <div className="text-sm text-gray-400">Validators</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/30">
                <Coins className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-3xl font-bold">2.1M</div>
                <div className="text-sm text-gray-400">Treasury PHDV</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Proposals */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Active Proposals</h2>
            <button className="border border-cyan-400 bg-cyan-400 text-white font-bold py-2 px-6 rounded-full hover:bg-cyan-500 transition-colors">
              Create Proposal
            </button>
          </div>

          {proposals.map((proposal) => (
            <Card key={proposal.id} className="hover:shadow-lg hover:shadow-cyan-400/20 transition-all">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xl font-bold">{proposal.title}</h3>
                      <Badge variant={proposal.status === "active" ? "default" : "secondary"} className="gap-1">
                        {proposal.status === "active" && <Clock className="h-3 w-3" />}
                        {proposal.status === "passed" && <CheckCircle2 className="h-3 w-3" />}
                        {proposal.status === "active" ? "Active" : "Passed"}
                      </Badge>
                    </div>
                    <p className="text-gray-400">{proposal.description}</p>
                  </div>
                  {proposal.status === "active" && (
                    <div className="text-left md:text-right">
                      <div className="text-sm text-gray-400">Time Left</div>
                      <div className="text-lg font-bold text-cyan-400">{proposal.timeLeft}</div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Voting Progress</span>
                    <span className="font-medium text-white">
                      {proposal.totalVotes.toLocaleString()} / {proposal.quorum.toLocaleString()} votes
                    </span>
                  </div>
                  <Progress value={(proposal.totalVotes / proposal.quorum) * 100} className="h-2" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">For</span>
                      <span className="text-sm font-medium text-cyan-400">
                        {proposal.votesFor.toLocaleString()} (
                        {Math.round((proposal.votesFor / proposal.totalVotes) * 100)}%)
                      </span>
                    </div>
                    <Progress value={(proposal.votesFor / proposal.totalVotes) * 100} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Against</span>
                      <span className="text-sm font-medium text-red-400">
                        {proposal.votesAgainst.toLocaleString()} (
                        {Math.round((proposal.votesAgainst / proposal.totalVotes) * 100)}%)
                      </span>
                    </div>
                    <Progress value={(proposal.votesAgainst / proposal.totalVotes) * 100} className="h-2" />
                  </div>
                </div>

                {proposal.status === "active" && (
                  <div className="flex gap-2 flex-wrap">
                    <button className="flex-1 flex items-center justify-center gap-2 border border-cyan-400 bg-cyan-400 text-white font-bold py-2 px-4 rounded-full hover:bg-cyan-500 transition-colors">
                      <CheckCircle2 className="h-4 w-4" />
                      Vote For
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 border border-cyan-400/50 text-cyan-400 py-2 px-4 rounded-full hover:bg-cyan-400/10 transition-colors">
                      <XCircle className="h-4 w-4" />
                      Vote Against
                    </button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Validators & Fee Distribution */}
        <div className="grid gap-6 lg:grid-cols-2 pb-16">
          <Card>
            <div className="mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
                <Shield className="h-6 w-6 text-cyan-400" />
                Top Validators
              </h2>
              <p className="text-gray-400">Highest reputation validators in the network</p>
            </div>

            <div className="space-y-4">
              {validators.map((validator, index) => (
                <div key={validator.name} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/10 border border-cyan-400/30 font-bold text-cyan-400">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-medium text-white">{validator.name}</span>
                      <Badge variant="secondary">{validator.reputation}% Rep</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400 flex-wrap">
                      <span>Stake: {validator.stake}</span>
                      <span>•</span>
                      <span>{validator.validations} validations</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
                <TrendingUp className="h-6 w-6 text-cyan-400" />
                Fee Distribution
              </h2>
              <p className="text-gray-400">How platform fees are allocated</p>
            </div>

            <div className="space-y-6">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={feeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {feeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
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
                </PieChart>
              </ResponsiveContainer>

              <div className="space-y-3">
                {feeDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-white">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-cyan-400">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
