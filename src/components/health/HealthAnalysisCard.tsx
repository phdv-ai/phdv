'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface HealthAnalysisCardProps {
  markdown: string;
  fileName?: string;
  tokenReward?: {
    earned: number;
    total: number;
    isNewUser: boolean;
  };
}

export default function HealthAnalysisCard({
  markdown,
  fileName,
  tokenReward,
}: HealthAnalysisCardProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Parse markdown to extract sections
  const parseMarkdown = (md: string) => {
    const lines = md.split('\n');
    let title = '';
    let date = '';
    let summary = '';
    let findings: string[] = [];
    let recommendations: string[] = [];
    let riskLevel = '';

    let currentSection = '';

    lines.forEach((line) => {
      // Title
      if (line.startsWith('# 📋')) {
        title = line.replace('# 📋', '').trim();
      }
      // Date
      else if (line.includes('📅 **Tarih:**')) {
        date = line.replace('📅 **Tarih:**', '').trim();
      }
      // Sections
      else if (line.startsWith('## 🤖 AI Özeti')) {
        currentSection = 'summary';
      } else if (line.startsWith('## 📊 Ana Bulgular')) {
        currentSection = 'findings';
      } else if (line.startsWith('## 💡 AI Önerileri')) {
        currentSection = 'recommendations';
      } else if (line.startsWith('**Risk Değerlendirmesi:**')) {
        riskLevel = line;
      }
      // Content
      else if (line.trim()) {
        if (currentSection === 'summary' && !line.startsWith('*Güven:')) {
          summary += line + ' ';
        } else if (currentSection === 'findings' && line.startsWith('•')) {
          findings.push(line.replace('• ', ''));
        } else if (currentSection === 'recommendations' && line.startsWith('✓')) {
          recommendations.push(line.replace('✓ ', ''));
        }
      }
    });

    // Extract confidence
    const confidenceMatch = md.match(/Güven: %(\d+)/);
    const confidence = confidenceMatch ? parseInt(confidenceMatch[1]) : 96;

    // Extract risk level
    let risk: 'low' | 'medium' | 'high' = 'low';
    if (riskLevel.includes('🟢') || riskLevel.includes('Düşük')) {
      risk = 'low';
    } else if (riskLevel.includes('🟡') || riskLevel.includes('Orta')) {
      risk = 'medium';
    } else if (riskLevel.includes('🔴') || riskLevel.includes('Yüksek')) {
      risk = 'high';
    }

    return {
      title,
      date,
      summary: summary.trim(),
      findings,
      recommendations,
      confidence,
      risk,
    };
  };

  const data = parseMarkdown(markdown);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-500 bg-green-500/10';
      case 'medium':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'high':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-green-500 bg-green-500/10';
    }
  };

  const getRiskText = (risk: string) => {
    switch (risk) {
      case 'low':
        return '🟢 Düşük Risk';
      case 'medium':
        return '🟡 Orta Risk';
      case 'high':
        return '🔴 Yüksek Risk';
      default:
        return '🟢 Düşük Risk';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Token Reward Banner */}
      {tokenReward && (
        <div className="mb-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🎁</div>
              <div>
                <div className="text-sm text-gray-400">Token Kazandınız!</div>
                <div className="text-2xl font-bold text-purple-400">
                  +{tokenReward.earned} Token
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Toplam Bakiye</div>
              <div className="text-xl font-semibold text-white">
                💰 {tokenReward.total} Token
              </div>
            </div>
          </div>
          {tokenReward.isNewUser && (
            <div className="mt-2 text-sm text-purple-300 flex items-center gap-2">
              <span>🎉</span>
              <span>İlk analizinizi tamamladınız!</span>
            </div>
          )}
        </div>
      )}

      {/* Main Card */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {data.title}
                </h2>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    📅 {data.date}
                  </span>
                  <span className="text-cyan-400">🔬 Lab Sonuçları</span>
                  <span className="text-green-400">✅ AI Analiz Tamamlandı</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className={`w-6 h-6 transition-transform ${
                  isCollapsed ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        {!isCollapsed && (
          <div className="p-6 space-y-6">
            {/* AI Summary */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span>🤖</span>
                  <span>AI Özeti</span>
                </h3>
                <span className="text-sm text-gray-400">
                  Güven: {data.confidence}%
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed">{data.summary}</p>
            </div>

            {/* Key Findings */}
            <div>
              <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                <span>📊</span>
                <span>Ana Bulgular</span>
              </h3>
              <div className="space-y-2">
                {data.findings.map((finding, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>{finding}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <div>
              <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                <span>💡</span>
                <span>AI Önerileri</span>
              </h3>
              <div className="space-y-2">
                {data.recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <span className="text-green-400 mt-1">✓</span>
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="pt-4 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Risk Değerlendirmesi:</span>
                <span
                  className={`px-4 py-2 rounded-lg font-semibold ${getRiskColor(
                    data.risk
                  )}`}
                >
                  {getRiskText(data.risk)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Raw Markdown Toggle (for debugging) */}
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-4">
          <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-300">
            Ham Markdown Görüntüle
          </summary>
          <div className="mt-2 p-4 bg-gray-900 border border-gray-800 rounded-lg">
            <pre className="text-xs text-gray-400 whitespace-pre-wrap">
              {markdown}
            </pre>
          </div>
        </details>
      )}
    </div>
  );
}
