'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { usePHDV } from '@/hooks/usePHDV';
import PHDVResultCard from './PHDVResultCard';

export default function PHDVUploader() {
  const { address, isConnected } = useAccount();
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const {
    isLoading,
    error,
    text,
    healthData,
    anonymizedData,
    qualityScores,
    aggregateStats,
    tokenReward,
    processHealthFile,
    reset,
  } = usePHDV();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 20 * 1024 * 1024) {
        alert('File too large. Maximum: 20MB');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.size > 20 * 1024 * 1024) {
        alert('File too large. Maximum: 20MB');
        return;
      }
      setFile(droppedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file');
      return;
    }

    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    await processHealthFile(file, address);
  };

  const handleReset = () => {
    setFile(null);
    reset();
  };

  const hasResults = healthData.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <span>🔐</span>
            <span>Personal Health Data Vault</span>
          </h1>
          <p className="text-gray-400">
            Secure health data processing with privacy protection and quality scoring
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm">
            <span className="flex items-center gap-2 text-cyan-400">
              <span>📊</span> Data Extraction
            </span>
            <span className="flex items-center gap-2 text-purple-400">
              <span>🔒</span> Privacy Protection
            </span>
            <span className="flex items-center gap-2 text-green-400">
              <span>⭐</span> Quality Scoring
            </span>
          </div>
        </div>

        {/* Upload Form */}
        {!hasResults && (
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mb-6 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Wallet Status */}
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👛</span>
                  <div>
                    <div className="text-sm text-gray-400">Wallet</div>
                    <div className="text-white font-mono text-sm">
                      {isConnected && address
                        ? `${address.slice(0, 6)}...${address.slice(-4)}`
                        : 'Not Connected'}
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  isConnected
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-red-500/10 text-red-400'
                }`}>
                  {isConnected ? '✓ Connected' : '✗ Disconnected'}
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Health Data File
                </label>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    dragActive
                      ? 'border-cyan-500 bg-cyan-500/5'
                      : file
                        ? 'border-green-500 bg-green-500/5'
                        : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.csv,.doc,.docx,.png,.jpeg,.jpg,.txt"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isLoading}
                  />

                  {file ? (
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">📄</span>
                      </div>
                      <div className="text-left">
                        <div className="text-white font-medium">{file.name}</div>
                        <div className="text-sm text-gray-400">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setFile(null);
                        }}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="text-4xl mb-4">📁</div>
                      <div className="text-white mb-2">
                        Drop your health file here or click to browse
                      </div>
                      <div className="text-sm text-gray-500">
                        Supports: PDF, TXT, CSV, DOC, DOCX, PNG, JPEG (max 20MB)
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                  <div className="font-medium mb-1">Error</div>
                  <div className="text-sm">{error}</div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!file || !isConnected || isLoading}
                className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Processing with PHDV...</span>
                  </>
                ) : (
                  <>
                    <span>🔐</span>
                    <span>Process with PHDV</span>
                  </>
                )}
              </button>

              {/* Processing Steps Info */}
              {isLoading && (
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-3">Processing Steps:</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-cyan-400">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span>Extracting health data...</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500">
                      <span>○</span>
                      <span>Anonymizing sensitive information...</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500">
                      <span>○</span>
                      <span>Calculating quality score...</span>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}

        {/* Results */}
        {hasResults && (
          <>
            <PHDVResultCard
              healthData={healthData}
              anonymizedData={anonymizedData}
              qualityScores={qualityScores}
              aggregateStats={aggregateStats}
              aiResponse={text || undefined}
              tokenReward={tokenReward || undefined}
            />

            {/* Process Another Button */}
            <div className="mt-6 text-center">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Process Another File
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
