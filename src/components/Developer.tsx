"use client"

import React, { useState } from 'react';
import { Code, Book, Zap, Key, Terminal, FileCode, Webhook, Package } from "lucide-react"

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`border border-cyan-400/50 bg-cyan-900/10 backdrop-blur-sm rounded-2xl p-6 ${className || ''}`}>
    {children}
  </div>
);

const Badge = ({ children, variant, className }: { children: React.ReactNode, variant?: 'default' | 'secondary' | 'outline', className?: string }) => {
  const variantStyles = variant === 'secondary'
    ? "bg-gray-600/30 text-gray-300"
    : variant === 'outline'
    ? "border border-cyan-400/30 text-cyan-400"
    : "bg-cyan-400/20 text-cyan-400";

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${variantStyles} ${className || ''}`}>
      {children}
    </span>
  );
};

const apiEndpoints = [
  {
    method: "GET",
    path: "/api/v1/datasets",
    description: "List all available datasets with filtering options",
    auth: "API Key",
  },
  {
    method: "GET",
    path: "/api/v1/datasets/:id",
    description: "Get detailed information about a specific dataset",
    auth: "API Key",
  },
  {
    method: "POST",
    path: "/api/v1/datasets/:id/access",
    description: "Request access to a dataset",
    auth: "API Key + OAuth",
  },
  {
    method: "GET",
    path: "/api/v1/health-data",
    description: "Query anonymized health data with filters",
    auth: "API Key + OAuth",
  },
  {
    method: "POST",
    path: "/api/v1/data/upload",
    description: "Upload health data to the platform",
    auth: "API Key + OAuth",
  },
  {
    method: "GET",
    path: "/api/v1/user/profile",
    description: "Get user profile and data sharing settings",
    auth: "OAuth",
  },
];

const sdks = [
  {
    name: "Python SDK",
    version: "v2.1.0",
    description: "Full-featured SDK for data science and research workflows",
    icon: "🐍",
    install: "pip install phdv-ai",
  },
  {
    name: "R Package",
    version: "v1.8.2",
    description: "Statistical analysis and visualization tools",
    icon: "📊",
    install: 'install.packages("phdvai")',
  },
  {
    name: "JavaScript/TypeScript",
    version: "v3.0.1",
    description: "Web and Node.js integration library",
    icon: "⚡",
    install: "npm install @phdv-ai/sdk",
  },
  {
    name: "GraphQL Client",
    version: "v1.5.0",
    description: "Flexible data querying with GraphQL",
    icon: "🔷",
    install: "npm install @phdv-ai/graphql",
  },
];

const codeExamples = {
  python: `from phdv_ai import PHDVClient

# Initialize client
client = PHDVClient(api_key="your_api_key")

# Query datasets
datasets = client.datasets.list(
    category="sleep",
    min_participants=1000,
    format="HL7_FHIR"
)

# Request dataset access
access = client.datasets.request_access(
    dataset_id="DS-2024-0847",
    purpose="Sleep quality research"
)

# Query health data
data = client.health_data.query(
    data_types=["sleep", "heart_rate"],
    date_range=("2024-01-01", "2024-12-31"),
    filters={"age_range": "25-35"}
)`,
  javascript: `import { PHDVClient } from '@phdv-ai/sdk';

// Initialize client
const client = new PHDVClient({
  apiKey: 'your_api_key'
});

// Query datasets
const datasets = await client.datasets.list({
  category: 'sleep',
  minParticipants: 1000,
  format: 'HL7_FHIR'
});

// Request dataset access
const access = await client.datasets.requestAccess({
  datasetId: 'DS-2024-0847',
  purpose: 'Sleep quality research'
});

// Query health data
const data = await client.healthData.query({
  dataTypes: ['sleep', 'heart_rate'],
  dateRange: ['2024-01-01', '2024-12-31'],
  filters: { ageRange: '25-35' }
});`,
  r: `library(phdvai)

# Initialize client
client <- phdv_client(api_key = "your_api_key")

# Query datasets
datasets <- list_datasets(
  client,
  category = "sleep",
  min_participants = 1000,
  format = "HL7_FHIR"
)

# Request dataset access
access <- request_access(
  client,
  dataset_id = "DS-2024-0847",
  purpose = "Sleep quality research"
)

# Query health data
data <- query_health_data(
  client,
  data_types = c("sleep", "heart_rate"),
  date_range = c("2024-01-01", "2024-12-31"),
  filters = list(age_range = "25-35")
)`,
};

export default function Developer() {
  const [activeTab, setActiveTab] = useState<'python' | 'javascript' | 'r'>('python');
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeExamples[activeTab]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen text-white px-8 md:px-20 lg:px-40 pt-24">
      {/* Header */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Developer Portal</h1>
          <p className="text-gray-400">Build applications with PHDV-AI APIs and SDKs</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 border border-cyan-400/50 text-cyan-400 py-2 px-4 rounded-lg hover:bg-cyan-400/10 transition-colors">
            <Book className="h-4 w-4" />
            Documentation
          </button>
          <button className="flex items-center gap-2 border border-cyan-400 bg-cyan-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-500 transition-colors">
            <Key className="h-4 w-4" />
            Get API Key
          </button>
        </div>
      </header>

      <main className="space-y-8">
        {/* Quick Start */}
        <Card className="border-l-4 border-l-cyan-400">
          <div className="mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
              <Zap className="h-6 w-6 text-cyan-400" />
              Quick Start
            </h2>
            <p className="text-gray-400">Get started with PHDV-AI in minutes</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-bold text-xl">
                1
              </div>
              <h4 className="font-medium text-lg text-white">Get API Key</h4>
              <p className="text-sm text-gray-400">
                Create an account and generate your API key from the dashboard
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-bold text-xl">
                2
              </div>
              <h4 className="font-medium text-lg text-white">Install SDK</h4>
              <p className="text-sm text-gray-400">
                Choose your preferred language and install the SDK using your package manager
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-bold text-xl">
                3
              </div>
              <h4 className="font-medium text-lg text-white">Start Building</h4>
              <p className="text-sm text-gray-400">
                Use our APIs to access health data and build innovative applications
              </p>
            </div>
          </div>
        </Card>

        {/* SDKs */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">SDKs & Libraries</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {sdks.map((sdk) => (
              <Card key={sdk.name} className="hover:shadow-lg hover:shadow-cyan-400/20 transition-all">
                <div className="space-y-4">
                  <div className="text-4xl">{sdk.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{sdk.name}</h3>
                    <Badge variant="secondary">{sdk.version}</Badge>
                  </div>
                  <p className="text-sm text-gray-400">{sdk.description}</p>
                  <div className="space-y-2">
                    <div className="rounded-lg bg-gray-900/50 border border-cyan-400/30 p-3">
                      <code className="text-xs text-cyan-400">{sdk.install}</code>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 border border-cyan-400/50 text-cyan-400 py-2 px-4 rounded-lg hover:bg-cyan-400/10 transition-colors text-sm">
                      <Book className="h-4 w-4" />
                      View Docs
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Code Examples */}
        <Card>
          <div className="mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
              <Code className="h-6 w-6 text-cyan-400" />
              Code Examples
            </h2>
            <p className="text-gray-400">Get started with these code snippets</p>
          </div>

          <div className="space-y-4">
            {/* Tabs */}
            <div className="flex gap-2 border-b border-cyan-400/30 pb-2">
              <button
                onClick={() => setActiveTab('python')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'python'
                    ? 'bg-cyan-400/20 text-cyan-400 font-medium'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Python
              </button>
              <button
                onClick={() => setActiveTab('javascript')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'javascript'
                    ? 'bg-cyan-400/20 text-cyan-400 font-medium'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                JavaScript
              </button>
              <button
                onClick={() => setActiveTab('r')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'r'
                    ? 'bg-cyan-400/20 text-cyan-400 font-medium'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                R
              </button>
            </div>

            {/* Code Block */}
            <div className="relative">
              <pre className="rounded-lg bg-gray-900/50 border border-cyan-400/30 p-4 overflow-x-auto">
                <code className="text-sm text-gray-300">{codeExamples[activeTab]}</code>
              </pre>
              <button
                onClick={handleCopyCode}
                className="absolute top-2 right-2 border border-cyan-400/50 bg-cyan-900/50 text-cyan-400 py-1 px-3 rounded-lg hover:bg-cyan-400/10 transition-colors text-xs"
              >
                {copiedCode ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </Card>

        {/* API Reference */}
        <Card>
          <div className="mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
              <Terminal className="h-6 w-6 text-cyan-400" />
              REST API Reference
            </h2>
            <p className="text-gray-400">Core API endpoints for data access and management</p>
          </div>

          <div className="space-y-3">
            {apiEndpoints.map((endpoint, index) => (
              <div key={index} className="rounded-xl border border-cyan-400/30 bg-cyan-900/10 p-4 hover:bg-cyan-900/20 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge
                        variant={endpoint.method === "GET" ? "secondary" : "default"}
                        className="font-mono"
                      >
                        {endpoint.method}
                      </Badge>
                      <code className="text-sm font-mono text-cyan-400">{endpoint.path}</code>
                    </div>
                    <p className="text-sm text-gray-400">{endpoint.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs gap-1">
                        <Key className="h-3 w-3" />
                        {endpoint.auth}
                      </Badge>
                    </div>
                  </div>
                  <button className="flex items-center justify-center p-2 hover:bg-cyan-400/10 rounded-lg transition-colors">
                    <FileCode className="h-5 w-5 text-cyan-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Additional Resources */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <div className="mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
                <Webhook className="h-6 w-6 text-cyan-400" />
                Webhooks
              </h2>
              <p className="text-gray-400">Real-time notifications for events</p>
            </div>

            <ul className="space-y-4 mb-6 text-sm">
              <li className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 border border-cyan-400/30 mt-0.5">
                  <Zap className="h-3 w-3 text-cyan-400" />
                </div>
                <div>
                  <div className="font-medium text-white">dataset.access_granted</div>
                  <div className="text-gray-400">Triggered when dataset access is approved</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 border border-cyan-400/30 mt-0.5">
                  <Zap className="h-3 w-3 text-cyan-400" />
                </div>
                <div>
                  <div className="font-medium text-white">data.uploaded</div>
                  <div className="text-gray-400">Triggered when new data is uploaded</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 border border-cyan-400/30 mt-0.5">
                  <Zap className="h-3 w-3 text-cyan-400" />
                </div>
                <div>
                  <div className="font-medium text-white">validation.completed</div>
                  <div className="text-gray-400">Triggered when data validation finishes</div>
                </div>
              </li>
            </ul>
            <button className="w-full border border-cyan-400/50 text-cyan-400 py-2 px-4 rounded-lg hover:bg-cyan-400/10 transition-colors">
              Configure Webhooks
            </button>
          </Card>

          <Card>
            <div className="mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
                <Package className="h-6 w-6 text-cyan-400" />
                Smart Contracts
              </h2>
              <p className="text-gray-400">Blockchain integration for transparency</p>
            </div>

            <ul className="space-y-4 mb-6 text-sm">
              <li className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 border border-cyan-400/30 mt-0.5">
                  <Code className="h-3 w-3 text-cyan-400" />
                </div>
                <div>
                  <div className="font-medium text-white">DataRegistry.sol</div>
                  <div className="text-gray-400">Dataset registration and metadata</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 border border-cyan-400/30 mt-0.5">
                  <Code className="h-3 w-3 text-cyan-400" />
                </div>
                <div>
                  <div className="font-medium text-white">AccessControl.sol</div>
                  <div className="text-gray-400">Permission management and licensing</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 border border-cyan-400/30 mt-0.5">
                  <Code className="h-3 w-3 text-cyan-400" />
                </div>
                <div>
                  <div className="font-medium text-white">RewardDistribution.sol</div>
                  <div className="text-gray-400">Token rewards and fee splitting</div>
                </div>
              </li>
            </ul>
            <button className="w-full border border-cyan-400/50 text-cyan-400 py-2 px-4 rounded-lg hover:bg-cyan-400/10 transition-colors">
              View on GitHub
            </button>
          </Card>
        </div>

        {/* Rate Limits */}
        <Card className="border-l-4 border-l-cyan-400 pb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">API Rate Limits</h2>
            <p className="text-gray-400">Request limits by tier</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Badge variant="outline">Free Tier</Badge>
              <div className="text-3xl font-bold text-cyan-400">1,000</div>
              <div className="text-sm text-gray-400">requests/day</div>
            </div>
            <div className="space-y-2">
              <Badge variant="secondary">Pro Tier</Badge>
              <div className="text-3xl font-bold text-cyan-400">50,000</div>
              <div className="text-sm text-gray-400">requests/day</div>
            </div>
            <div className="space-y-2">
              <Badge>Enterprise</Badge>
              <div className="text-3xl font-bold text-cyan-400">Unlimited</div>
              <div className="text-sm text-gray-400">Custom SLA</div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
