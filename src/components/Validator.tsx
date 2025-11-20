"use client"

import React, { useState } from 'react';
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Award,
  Coins,
  FileCheck,
  Database,
  Activity,
} from "lucide-react"

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

const pendingValidations = [
  {
    id: 1,
    datasetId: "DS-2024-0847",
    title: "Sleep Quality in Remote Workers",
    submitter: "0x742d...3f8a",
    participants: 1250,
    dataPoints: "450K",
    uploadDate: "2024-01-15",
    priority: "high",
    estimatedReward: "125 PHDV",
  },
  {
    id: 2,
    datasetId: "DS-2024-0848",
    title: "Nutrition & Exercise Correlation",
    submitter: "0x8a3c...9d2b",
    participants: 890,
    dataPoints: "320K",
    uploadDate: "2024-01-16",
    priority: "medium",
    estimatedReward: "95 PHDV",
  },
  {
    id: 3,
    datasetId: "DS-2024-0849",
    title: "Heart Rate Variability Study",
    submitter: "0x5f1e...7c4d",
    participants: 2100,
    dataPoints: "780K",
    uploadDate: "2024-01-16",
    priority: "high",
    estimatedReward: "180 PHDV",
  },
];

const validationHistory = [
  {
    id: 1,
    datasetId: "DS-2024-0842",
    title: "Mental Health Tracking",
    status: "approved",
    completedDate: "2024-01-14",
    dqsScore: 94,
    reward: "150 PHDV",
  },
  {
    id: 2,
    datasetId: "DS-2024-0839",
    title: "Glucose Monitoring Data",
    status: "approved",
    completedDate: "2024-01-13",
    dqsScore: 91,
    reward: "120 PHDV",
  },
  {
    id: 3,
    datasetId: "DS-2024-0835",
    title: "Activity Patterns",
    status: "rejected",
    completedDate: "2024-01-12",
    dqsScore: 62,
    reward: "0 PHDV",
  },
];

export default function Validator() {
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');

  return (
    <div className="min-h-screen text-white px-8 md:px-20 lg:px-40 pt-24">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Validator Dashboard</h1>
        <p className="text-gray-400">Review and validate health data submissions to ensure quality</p>
      </header>

      <main className="space-y-8">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/30">
                <Clock className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-3xl font-bold">12</div>
                <div className="text-sm text-gray-400">Pending</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10 border border-green-500/30">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <div className="text-3xl font-bold">247</div>
                <div className="text-sm text-gray-400">Approved</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/30">
                <Award className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-3xl font-bold">4.8</div>
                <div className="text-sm text-gray-400">Reputation</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/30">
                <Coins className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-3xl font-bold">3,450</div>
                <div className="text-sm text-gray-400">PHDV Earned</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Validator Performance */}
        <Card className="border-l-4 border-l-cyan-400">
          <div className="mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
              <TrendingUp className="h-6 w-6 text-cyan-400" />
              Validator Performance
            </h2>
            <p className="text-gray-400">Your validation accuracy and reputation metrics</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Accuracy Rate</span>
                <span className="font-medium text-white">96%</span>
              </div>
              <Progress value={96} className="h-2" />
              <p className="text-xs text-gray-400">Consensus with other validators</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Response Time</span>
                <span className="font-medium text-white">4.2 hrs</span>
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-xs text-gray-400">Average validation time</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Reputation Score</span>
                <span className="font-medium text-white">4.8/5.0</span>
              </div>
              <Progress value={96} className="h-2" />
              <p className="text-xs text-gray-400">Based on 247 validations</p>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <div className="space-y-4">
          <div className="flex gap-2 border-b border-cyan-400/30 pb-2">
            <button
              onClick={() => setActiveTab('pending')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'pending'
                  ? 'bg-cyan-400/20 text-cyan-400 font-medium'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Clock className="h-4 w-4" />
              Pending ({pendingValidations.length})
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'history'
                  ? 'bg-cyan-400/20 text-cyan-400 font-medium'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FileCheck className="h-4 w-4" />
              History
            </button>
          </div>

          {/* Pending Tab */}
          {activeTab === 'pending' && (
            <div className="space-y-4">
              {pendingValidations.map((item) => (
                <Card key={item.id} className="hover:shadow-lg hover:shadow-cyan-400/20 transition-all">
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-xl font-bold">{item.title}</h3>
                          <Badge variant={item.priority === "high" ? "destructive" : "secondary"}>
                            {item.priority === "high" ? (
                              <AlertTriangle className="h-3 w-3 mr-1" />
                            ) : (
                              <Clock className="h-3 w-3 mr-1" />
                            )}
                            {item.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400">Dataset ID: {item.datasetId}</p>
                      </div>
                      <div className="text-left md:text-right">
                        <div className="text-lg font-bold text-cyan-400">{item.estimatedReward}</div>
                        <div className="text-sm text-gray-400">Est. reward</div>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm text-gray-300">
                          <span className="font-medium text-white">{item.participants}</span> participants
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm text-gray-300">
                          <span className="font-medium text-white">{item.dataPoints}</span> data points
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm text-gray-300">Uploaded {item.uploadDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-300">Submitter: {item.submitter}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <button className="flex items-center gap-2 border border-cyan-400 bg-cyan-400 text-white font-bold py-2 px-4 rounded-full hover:bg-cyan-500 transition-colors">
                        <FileCheck className="h-4 w-4" />
                        Start Validation
                      </button>
                      <button className="border border-cyan-400/50 text-cyan-400 py-2 px-4 rounded-full hover:bg-cyan-400/10 transition-colors">
                        View Dataset Details
                      </button>
                      <button className="border border-cyan-400/50 text-cyan-400 py-2 px-4 rounded-full hover:bg-cyan-400/10 transition-colors">
                        Download Sample
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              {validationHistory.map((item) => (
                <Card key={item.id}>
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <Badge variant={item.status === "approved" ? "secondary" : "destructive"} className="gap-1">
                          {item.status === "approved" ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <XCircle className="h-3 w-3" />
                          )}
                          {item.status}
                        </Badge>
                        {item.status === "approved" && <Badge variant="outline">DQS: {item.dqsScore}%</Badge>}
                      </div>
                      <p className="text-sm text-gray-400">
                        Dataset ID: {item.datasetId} • Completed: {item.completedDate}
                      </p>
                    </div>
                    <div className="text-left md:text-right">
                      <div className="text-lg font-bold text-cyan-400">{item.reward}</div>
                      <div className="text-sm text-gray-400">Earned</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Validation Guidelines */}
        <Card>
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Validation Guidelines</h2>
            <p className="text-gray-400">Key criteria for data quality assessment</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2 text-white">
                <CheckCircle className="h-4 w-4 text-cyan-400" />
                Data Completeness
              </h4>
              <ul className="text-sm text-gray-400 space-y-1 ml-6">
                <li>• All required fields populated</li>
                <li>• Minimal missing values (&lt;5%)</li>
                <li>• Consistent time series data</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2 text-white">
                <CheckCircle className="h-4 w-4 text-cyan-400" />
                Data Consistency
              </h4>
              <ul className="text-sm text-gray-400 space-y-1 ml-6">
                <li>• Values within expected ranges</li>
                <li>• No duplicate entries</li>
                <li>• Proper data types and formats</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2 text-white">
                <CheckCircle className="h-4 w-4 text-cyan-400" />
                Privacy Compliance
              </h4>
              <ul className="text-sm text-gray-400 space-y-1 ml-6">
                <li>• All PII removed or anonymized</li>
                <li>• Proper consent documentation</li>
                <li>• GDPR/HIPAA compliance verified</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2 text-white">
                <CheckCircle className="h-4 w-4 text-cyan-400" />
                Technical Standards
              </h4>
              <ul className="text-sm text-gray-400 space-y-1 ml-6">
                <li>• HL7 FHIR format compliance</li>
                <li>• SNOMED CT terminology used</li>
                <li>• Proper metadata included</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Rewards Info */}
        <Card className="border-l-4 border-l-cyan-400 pb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
              <Coins className="h-6 w-6 text-cyan-400" />
              Validator Rewards
            </h2>
            <p className="text-gray-400">How you earn PHDV tokens for validation work</p>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-1">
                <div className="text-sm text-gray-400">Base Reward</div>
                <div className="text-2xl font-bold text-cyan-400">50-200 PHDV</div>
                <div className="text-xs text-gray-400">Per dataset validated</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-400">Accuracy Bonus</div>
                <div className="text-2xl font-bold text-cyan-400">+20%</div>
                <div className="text-xs text-gray-400">For &gt;95% consensus rate</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-400">Speed Bonus</div>
                <div className="text-2xl font-bold text-cyan-400">+15%</div>
                <div className="text-xs text-gray-400">For &lt;6 hour response</div>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Rewards are calculated based on dataset size, complexity, and your validation quality. Maintain high
              accuracy and quick response times to maximize earnings and reputation.
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
}
