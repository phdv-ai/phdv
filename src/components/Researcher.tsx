"use client"

import React, { useState } from 'react';
import { Search, Filter, Database, Users, CheckCircle2, Download, Lock, FileText, Shield, Activity, Heart, Dna, TrendingUp } from "lucide-react"
import { DatasetWizardDialog } from "@/components/dataset-wizard-dialog"

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`border border-cyan-400/50 bg-cyan-900/10 backdrop-blur-sm rounded-2xl p-6 ${className || ''}`}>
    {children}
  </div>
);

const Badge = ({ children, variant, className }: { children: React.ReactNode, variant?: 'default' | 'outline', className?: string }) => {
  const baseStyles = "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors";
  const variantStyles = variant === 'outline'
    ? "border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10"
    : "bg-cyan-400/20 text-cyan-400";

  return (
    <span className={`${baseStyles} ${variantStyles} ${className || ''}`}>
      {children}
    </span>
  );
};

const datasets = [
  {
    id: 1,
    title: "Sleep Patterns & Cardiovascular Health",
    description: "Longitudinal sleep data correlated with heart rate variability from 2,500+ participants",
    participants: 2547,
    dataPoints: "1.2M",
    format: "HL7 FHIR",
    price: "500 PHDV",
    validated: true,
    dqs: 94,
    categories: ["Sleep", "Cardiology"],
  },
  {
    id: 2,
    title: "Mental Health & Activity Correlation",
    description: "Stress levels, mood tracking, and physical activity data from diverse demographics",
    participants: 1823,
    dataPoints: "890K",
    format: "HL7 FHIR",
    price: "350 PHDV",
    validated: true,
    dqs: 91,
    categories: ["Mental Health", "Activity"],
  },
  {
    id: 3,
    title: "Nutrition & Metabolic Markers",
    description: "Dietary intake logs with blood glucose, cholesterol, and metabolic panel results",
    participants: 3102,
    dataPoints: "2.1M",
    format: "HL7 FHIR",
    price: "750 PHDV",
    validated: true,
    dqs: 96,
    categories: ["Nutrition", "Metabolism"],
  },
  {
    id: 4,
    title: "Wearable Device Multi-Modal Dataset",
    description: "Comprehensive wearable data including heart rate, steps, sleep, and GPS from multiple device types",
    participants: 4521,
    dataPoints: "5.8M",
    format: "HL7 FHIR",
    price: "1200 PHDV",
    validated: true,
    dqs: 89,
    categories: ["Wearables", "Multi-Modal"],
  },
];

export default function Researcher() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen text-white px-8 md:px-20 lg:px-40 pt-24">
      {/* Header */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Researcher Portal</h1>
          <p className="text-gray-400">Access high-quality, anonymized health datasets for your research</p>
        </div>
        <DatasetWizardDialog />
      </header>

      <main className="space-y-8">
        {/* Search & Filter */}
        <Card>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search datasets by condition, data type, or keyword..."
                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-cyan-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center justify-center gap-2 border border-cyan-400/50 text-cyan-400 py-3 px-6 rounded-lg hover:bg-cyan-400/10 transition-colors">
              <Filter className="h-4 w-4" />
              Advanced Filters
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <Badge>All Datasets</Badge>
            <Badge variant="outline">HL7 FHIR</Badge>
            <Badge variant="outline">SNOMED CT</Badge>
            <Badge variant="outline">Sleep</Badge>
            <Badge variant="outline">Cardiology</Badge>
            <Badge variant="outline">Mental Health</Badge>
            <Badge variant="outline">Nutrition</Badge>
            <Badge variant="outline">Wearables</Badge>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/30">
                <Database className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-3xl font-bold">247</div>
                <div className="text-sm text-gray-400">Datasets</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/30">
                <Users className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-sm text-gray-400">Participants</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/30">
                <CheckCircle2 className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-3xl font-bold">98%</div>
                <div className="text-sm text-gray-400">Validated</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/30">
                <Lock className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm text-gray-400">Anonymized</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Dataset Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Available Datasets</h2>
            <div className="text-sm text-gray-400">Showing 4 of 247 datasets</div>
          </div>

          {datasets.map((dataset) => (
            <Card key={dataset.id} className="hover:shadow-lg hover:shadow-cyan-400/20 transition-all">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xl font-bold">{dataset.title}</h3>
                      {dataset.validated && (
                        <Badge className="gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Validated
                        </Badge>
                      )}
                      <Badge variant="outline" className="gap-1">
                        <Shield className="h-3 w-3" />
                        DQS {dataset.dqs}%
                      </Badge>
                    </div>
                    <p className="text-gray-400">{dataset.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-cyan-400">{dataset.price}</div>
                    <div className="text-sm text-gray-400">per license</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {dataset.categories.map((category) => (
                    <Badge key={category} variant="outline">
                      {category}
                    </Badge>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-cyan-400" />
                    <span>
                      <span className="font-medium text-white">{dataset.participants.toLocaleString()}</span>
                      <span className="text-gray-400"> participants</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-cyan-400" />
                    <span>
                      <span className="font-medium text-white">{dataset.dataPoints}</span>
                      <span className="text-gray-400"> data points</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-cyan-400" />
                    <span className="text-gray-400">Format: </span>
                    <span className="font-medium text-white">{dataset.format}</span>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <button className="flex items-center gap-2 border border-cyan-400 bg-cyan-400 text-white font-bold py-2 px-4 rounded-full hover:bg-cyan-500 transition-colors">
                    <Lock className="h-4 w-4" />
                    Request Access
                  </button>
                  <button className="flex items-center gap-2 border border-cyan-400/50 text-cyan-400 py-2 px-4 rounded-full hover:bg-cyan-400/10 transition-colors">
                    <Download className="h-4 w-4" />
                    View Sample
                  </button>
                  <button className="flex items-center gap-2 border border-cyan-400/50 text-cyan-400 py-2 px-4 rounded-full hover:bg-cyan-400/10 transition-colors">
                    <FileText className="h-4 w-4" />
                    Datasheet
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Cards */}
        <div className="grid gap-6 md:grid-cols-2 pb-16">
          <Card className="border-l-4 border-l-cyan-400">
            <h3 className="text-xl font-bold mb-2">HL7 FHIR & SNOMED CT Compliance</h3>
            <p className="text-sm text-gray-400 mb-3">International healthcare data standards</p>
            <p className="text-sm text-gray-400">
              All datasets follow HL7 FHIR standards and use SNOMED CT terminology for clinical concepts, ensuring
              seamless integration with your research tools and compliance with healthcare data regulations.
            </p>
          </Card>

          <Card className="border-l-4 border-l-cyan-400">
            <h3 className="text-xl font-bold mb-2">Data Transparency & Quality</h3>
            <p className="text-sm text-gray-400 mb-3">Rigorous validation and documentation</p>
            <p className="text-sm text-gray-400">
              Each dataset includes comprehensive datasheets with methodology, participant demographics, data quality
              scores, and validation reports. Our validator network ensures data integrity before publication.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
