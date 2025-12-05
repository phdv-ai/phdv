'use client';

import { useState } from 'react';
import type {
  PHDVHealthData,
  PHDVAnonymizedData,
  PHDVQualityScore,
  PHDVAggregateStats,
} from '@/types/health';

interface PHDVResultCardProps {
  healthData: PHDVHealthData[];
  anonymizedData: PHDVAnonymizedData[];
  qualityScores: PHDVQualityScore[];
  aggregateStats: PHDVAggregateStats | null;
  aiResponse?: string;
  tokenReward?: {
    earned: number;
    total: number;
    isNewUser: boolean;
  };
}

export default function PHDVResultCard({
  healthData,
  anonymizedData,
  qualityScores,
  aggregateStats,
  aiResponse,
  tokenReward,
}: PHDVResultCardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'records' | 'privacy' | 'quality'>('overview');
  const [expandedRecords, setExpandedRecords] = useState<Record<string, boolean>>({});

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'B': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'C': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'D': return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      case 'F': return 'text-red-400 bg-red-500/10 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getPrivacyLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-400 bg-green-500/10';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10';
      case 'low': return 'text-red-400 bg-red-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const getRecordTypeIcon = (type: string) => {
    switch (type) {
      case 'vital_sign': return '💓';
      case 'lab_result': return '🧪';
      case 'medication': return '💊';
      case 'diagnosis': return '🏥';
      case 'procedure': return '🔬';
      case 'allergy': return '⚠️';
      case 'immunization': return '💉';
      case 'wearable_data': return '⌚';
      default: return '📋';
    }
  };

  const toggleRecord = (key: string) => {
    setExpandedRecords(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Get first file data for overview
  const firstHealthData = healthData[0];
  const firstQualityScore = qualityScores[0];
  const firstAnonymized = anonymizedData[0];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Token Reward Banner */}
      {tokenReward && (
        <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🎁</div>
              <div>
                <div className="text-sm text-gray-400">Tokens Earned!</div>
                <div className="text-2xl font-bold text-purple-400">
                  +{tokenReward.earned} Tokens
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Total Balance</div>
              <div className="text-xl font-semibold text-white">
                {tokenReward.total} Tokens
              </div>
            </div>
          </div>
          {tokenReward.isNewUser && (
            <div className="mt-2 text-sm text-purple-300 flex items-center gap-2">
              <span>🎉</span>
              <span>Welcome! First analysis completed!</span>
            </div>
          )}
        </div>
      )}

      {/* Quality Score Summary */}
      {firstQualityScore && (
        <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold border ${getGradeColor(firstQualityScore.qualityScore.grade)}`}>
                {firstQualityScore.qualityScore.grade}
              </div>
              <div>
                <div className="text-lg font-semibold text-white">
                  Data Quality Score
                </div>
                <div className="text-2xl font-bold text-cyan-400">
                  {firstQualityScore.qualityScore.overallScore.toFixed(1)}/100
                </div>
              </div>
            </div>
            {firstAnonymized && (
              <div className={`px-4 py-2 rounded-lg ${getPrivacyLevelColor(firstAnonymized.anonymizationMetadata.privacyLevel)}`}>
                🔒 {firstAnonymized.anonymizationMetadata.privacyLevel.toUpperCase()} Privacy
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-800 pb-2">
        {[
          { id: 'overview', label: 'Overview', icon: '📊' },
          { id: 'records', label: 'Health Records', icon: '📋' },
          { id: 'privacy', label: 'Privacy', icon: '🔒' },
          { id: 'quality', label: 'Quality Details', icon: '⭐' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && firstHealthData && (
          <div className="space-y-6">
            {/* Patient Info */}
            {firstHealthData.healthData.patient && (
              <div>
                <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                  <span>👤</span> Patient Information
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {firstHealthData.healthData.patient.id && (
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <div className="text-xs text-gray-500">Patient ID</div>
                      <div className="text-white font-mono">
                        {firstAnonymized?.anonymizedHealthData?.patient?.id || firstHealthData.healthData.patient.id}
                      </div>
                    </div>
                  )}
                  {firstHealthData.healthData.patient.dateOfBirth && (
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <div className="text-xs text-gray-500">Date of Birth</div>
                      <div className="text-white">
                        {firstAnonymized?.anonymizedHealthData?.patient?.dateOfBirth || firstHealthData.healthData.patient.dateOfBirth}
                      </div>
                    </div>
                  )}
                  {firstHealthData.healthData.patient.gender && (
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <div className="text-xs text-gray-500">Gender</div>
                      <div className="text-white capitalize">
                        {firstHealthData.healthData.patient.gender}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Summary Stats */}
            <div>
              <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                <span>📈</span> Summary
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-cyan-400">
                    {firstHealthData.healthData.summary.totalRecords}
                  </div>
                  <div className="text-sm text-gray-400">Total Records</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-purple-400">
                    {firstHealthData.healthData.summary.recordTypes.length}
                  </div>
                  <div className="text-sm text-gray-400">Data Types</div>
                </div>
                {firstQualityScore && (
                  <>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-green-400">
                        {firstQualityScore.metrics.completeness.completenessPercentage.toFixed(0)}%
                      </div>
                      <div className="text-sm text-gray-400">Completeness</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-yellow-400">
                        {(100 - firstQualityScore.metrics.missingDataRate.overallMissingRate).toFixed(0)}%
                      </div>
                      <div className="text-sm text-gray-400">Data Coverage</div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Record Types */}
            <div>
              <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                <span>📂</span> Data Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {firstHealthData.healthData.summary.recordTypes.map(type => (
                  <span
                    key={type}
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300 flex items-center gap-2"
                  >
                    {getRecordTypeIcon(type)} {type.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>

            {/* AI Response */}
            {aiResponse && (
              <div>
                <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                  <span>🤖</span> AI Analysis
                </h3>
                <div className="bg-gray-800/50 rounded-lg p-4 text-gray-300 leading-relaxed">
                  {aiResponse}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Records Tab */}
        {activeTab === 'records' && firstHealthData && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Health Records ({firstHealthData.healthData.records.length})
            </h3>
            <div className="space-y-2">
              {firstHealthData.healthData.records.map((record, index) => (
                <div
                  key={record.recordId}
                  className="bg-gray-800/50 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleRecord(record.recordId)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{getRecordTypeIcon(record.recordType)}</span>
                      <div>
                        <div className="text-white font-medium capitalize">
                          {record.recordType.replace('_', ' ')}
                        </div>
                        <div className="text-xs text-gray-500">
                          {record.data.type || record.data.test || record.data.name || 'Record'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-cyan-400 font-mono text-sm">
                        {record.data.value}
                        {record.data.unit && <span className="text-gray-500 ml-1">{record.data.unit}</span>}
                      </div>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform ${expandedRecords[record.recordId] ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  {expandedRecords[record.recordId] && (
                    <div className="px-4 pb-4 pt-2 border-t border-gray-700">
                      <pre className="text-xs text-gray-400 bg-gray-900/50 rounded p-3 overflow-x-auto">
                        {JSON.stringify(record.data, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Privacy Tab */}
        {activeTab === 'privacy' && firstAnonymized && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Privacy Protection</h3>
              <span className={`px-4 py-2 rounded-lg font-semibold ${getPrivacyLevelColor(firstAnonymized.anonymizationMetadata.privacyLevel)}`}>
                {firstAnonymized.anonymizationMetadata.privacyLevel.toUpperCase()} LEVEL
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-2">Masked Fields</div>
                <div className="text-2xl font-bold text-red-400">
                  {firstAnonymized.anonymizationMetadata.maskedFields.length}
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {firstAnonymized.anonymizationMetadata.maskedFields.slice(0, 5).map((field, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-red-500/10 text-red-400 rounded">
                      {field.split('.').pop()}
                    </span>
                  ))}
                  {firstAnonymized.anonymizationMetadata.maskedFields.length > 5 && (
                    <span className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded">
                      +{firstAnonymized.anonymizationMetadata.maskedFields.length - 5} more
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-2">Generalized Fields</div>
                <div className="text-2xl font-bold text-yellow-400">
                  {firstAnonymized.anonymizationMetadata.generalizedFields.length}
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {firstAnonymized.anonymizationMetadata.generalizedFields.slice(0, 5).map((field, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-yellow-500/10 text-yellow-400 rounded">
                      {field.split('.').pop()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-400 font-medium">
                <span>✓</span> Data has been anonymized
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Personal identifiers have been masked and sensitive dates have been generalized
                to protect patient privacy while maintaining data utility.
              </p>
            </div>
          </div>
        )}

        {/* Quality Tab */}
        {activeTab === 'quality' && firstQualityScore && (
          <div className="space-y-6">
            {/* Score Breakdown */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Score Components</h3>
              <div className="space-y-3">
                {Object.entries(firstQualityScore.qualityScore.componentScores).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="text-white">{(value as number).toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all"
                        style={{ width: `${Math.min(value as number, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                <h4 className="text-green-400 font-medium mb-2 flex items-center gap-2">
                  <span>💪</span> Strengths
                </h4>
                <ul className="space-y-1">
                  {firstQualityScore.qualityScore.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                <h4 className="text-red-400 font-medium mb-2 flex items-center gap-2">
                  <span>⚠️</span> Areas to Improve
                </h4>
                <ul className="space-y-1">
                  {firstQualityScore.qualityScore.weaknesses.map((w, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-red-400">•</span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                <span>💡</span> Improvement Suggestions
              </h4>
              <ul className="space-y-2">
                {firstQualityScore.qualityScore.improvementSuggestions.map((suggestion, i) => (
                  <li key={i} className="text-sm text-gray-300 bg-gray-800/50 rounded-lg p-3">
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>

            {/* Overall Recommendation */}
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
              <p className="text-cyan-300">{firstQualityScore.recommendation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
