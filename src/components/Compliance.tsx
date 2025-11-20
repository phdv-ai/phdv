"use client"

import React from 'react';
import { Shield, Lock, Eye, FileText, AlertCircle, CheckCircle2, Download, Trash2 } from "lucide-react"

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

const accessLogs = [
  {
    id: 1,
    researcher: "Stanford Medical Research",
    dataset: "Sleep & Cardiovascular Data",
    date: "2024-10-28",
    purpose: "Sleep disorder correlation study",
    status: "active",
  },
  {
    id: 2,
    researcher: "MIT Health Lab",
    dataset: "Mental Health & Activity",
    date: "2024-10-25",
    purpose: "Stress management research",
    status: "active",
  },
  {
    id: 3,
    researcher: "Johns Hopkins University",
    dataset: "Nutrition & Metabolic Markers",
    date: "2024-10-20",
    purpose: "Dietary intervention study",
    status: "completed",
  },
];

export default function Compliance() {
  return (
    <div className="min-h-screen text-white px-8 md:px-20 lg:px-40 pt-24">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Privacy & Compliance</h1>
        <p className="text-gray-400">Your data rights and regulatory compliance information</p>
      </header>

      <main className="space-y-8">
        {/* Compliance Badges */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-l-4 border-l-cyan-400">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/30">
                <Shield className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <div className="font-bold text-lg">GDPR Compliant</div>
                <div className="text-sm text-gray-400">EU Data Protection</div>
              </div>
            </div>
          </Card>

          <Card className="border-l-4 border-l-cyan-400">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/30">
                <Lock className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <div className="font-bold text-lg">HIPAA Compliant</div>
                <div className="text-sm text-gray-400">US Health Privacy</div>
              </div>
            </div>
          </Card>

          <Card className="border-l-4 border-l-cyan-400">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/30">
                <CheckCircle2 className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <div className="font-bold text-lg">ISO 27001</div>
                <div className="text-sm text-gray-400">Security Standard</div>
              </div>
            </div>
          </Card>
        </div>

        {/* GDPR Rights */}
        <Card>
          <div className="mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
              <Shield className="h-6 w-6 text-cyan-400" />
              Your GDPR Rights
            </h2>
            <p className="text-gray-400">As a data subject, you have the following rights under GDPR</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3 p-4 rounded-xl border border-cyan-400/30 bg-cyan-900/10">
              <Eye className="h-5 w-5 text-cyan-400 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1 text-white">Right to Access</h4>
                <p className="text-sm text-gray-400">
                  View all personal data we hold about you at any time
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl border border-cyan-400/30 bg-cyan-900/10">
              <FileText className="h-5 w-5 text-cyan-400 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1 text-white">Right to Portability</h4>
                <p className="text-sm text-gray-400">
                  Download your data in a machine-readable format
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl border border-cyan-400/30 bg-cyan-900/10">
              <Trash2 className="h-5 w-5 text-cyan-400 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1 text-white">Right to Erasure</h4>
                <p className="text-sm text-gray-400">
                  Request deletion of your personal data from our systems
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl border border-cyan-400/30 bg-cyan-900/10">
              <Lock className="h-5 w-5 text-cyan-400 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1 text-white">Right to Restrict</h4>
                <p className="text-sm text-gray-400">
                  Limit how we process your personal information
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* HIPAA Compliance */}
        <Card>
          <div className="mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
              <Lock className="h-6 w-6 text-cyan-400" />
              HIPAA Compliance
            </h2>
            <p className="text-gray-400">How we protect your health information</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1 text-white">End-to-End Encryption</h4>
                <p className="text-sm text-gray-400">
                  All health data is encrypted at rest and in transit using AES-256 and TLS 1.3
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1 text-white">De-identification</h4>
                <p className="text-sm text-gray-400">
                  Personal identifiers are removed before data is shared with researchers, following HIPAA Safe Harbor method
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1 text-white">Access Controls</h4>
                <p className="text-sm text-gray-400">
                  Role-based access controls ensure only authorized parties can access specific data
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1 text-white">Audit Trails</h4>
                <p className="text-sm text-gray-400">
                  Complete logging of all data access and modifications for compliance verification
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Access Log */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
                <Eye className="h-6 w-6 text-cyan-400" />
                Data Access Log
              </h2>
              <p className="text-gray-400">Track who has accessed your anonymized data</p>
            </div>
            <button className="flex items-center gap-2 border border-cyan-400/50 text-cyan-400 py-2 px-4 rounded-lg hover:bg-cyan-400/10 transition-colors">
              <Download className="h-4 w-4" />
              Export Log
            </button>
          </div>

          <div className="space-y-4">
            {accessLogs.map((log) => (
              <div
                key={log.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-cyan-400/30 bg-cyan-900/10 gap-4"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-white">{log.researcher}</span>
                    <Badge variant={log.status === "active" ? "default" : "secondary"}>{log.status}</Badge>
                  </div>
                  <div className="text-sm text-gray-400">Dataset: {log.dataset}</div>
                  <div className="text-sm text-gray-400">Purpose: {log.purpose}</div>
                </div>
                <div className="text-left md:text-right">
                  <div className="text-sm text-gray-400">Accessed</div>
                  <div className="font-medium text-white">{log.date}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-l-4 border-l-red-500 hover:shadow-lg hover:shadow-red-500/20 transition-all">
            <div className="mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2 text-red-400 mb-2">
                <AlertCircle className="h-5 w-5" />
                Revoke All Consent
              </h3>
              <p className="text-sm text-gray-400">
                Immediately revoke all data sharing permissions and remove your data from active studies
              </p>
            </div>
            <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Revoke All Consent
            </button>
          </Card>

          <Card className="border-l-4 border-l-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 transition-all">
            <div className="mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                <Download className="h-5 w-5 text-cyan-400" />
                Download Your Data
              </h3>
              <p className="text-sm text-gray-400">
                Export all your personal health data in a portable format (FHIR JSON)
              </p>
            </div>
            <button className="w-full flex items-center justify-center gap-2 border border-cyan-400 bg-cyan-400 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-500 transition-colors">
              <Download className="h-4 w-4" />
              Download Data Archive
            </button>
          </Card>
        </div>

        {/* Security Info */}
        <Card className="border-l-4 border-l-cyan-400 pb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
              <Lock className="h-6 w-6 text-cyan-400" />
              Data Security & Anonymization
            </h2>
          </div>

          <p className="text-sm text-gray-400 mb-6">
            Your privacy is our top priority. Before any data is shared with researchers, we employ multiple layers of protection:
          </p>

          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 shrink-0" />
              <span className="text-gray-300">
                <strong className="text-white">K-anonymity:</strong> Your data is grouped with at least 4 other similar individuals
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 shrink-0" />
              <span className="text-gray-300">
                <strong className="text-white">Differential Privacy:</strong> Statistical noise is added to prevent re-identification
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 shrink-0" />
              <span className="text-gray-300">
                <strong className="text-white">Zero-Knowledge Proofs:</strong> Researchers can verify data validity without seeing raw data
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 shrink-0" />
              <span className="text-gray-300">
                <strong className="text-white">Smart Contract Enforcement:</strong> Access rules are enforced by blockchain, not humans
              </span>
            </li>
          </ul>
        </Card>
      </main>
    </div>
  );
}
