'use client';

import { useState } from 'react';
import HealthAnalysisCard from './HealthAnalysisCard';

export default function HealthAnalysisUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 20 * 1024 * 1024) {
        setError('Dosya çok büyük. Maksimum: 20MB');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError('Lütfen bir dosya seçin');
      return;
    }

    if (!walletAddress) {
      setError('Lütfen wallet adresinizi girin');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('walletAddress', walletAddress);

      const response = await fetch('/api/analyze-health', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analiz başarısız');
      }

      const data = await response.json();
      setResult(data);
      setFile(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🏥 Sağlık Raporu Analizi
          </h1>
          <p className="text-gray-400">
            AI destekli sağlık raporu analizi ve token kazanma sistemi
          </p>
        </div>

        {/* Upload Form */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mb-6 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Wallet Address */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Wallet Adresi
              </label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                disabled={loading}
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Sağlık Raporu (PDF, CSV, DOC, DOCX, PNG, JPEG)
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.csv,.doc,.docx,.png,.jpeg,.jpg"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-500 file:text-white hover:file:bg-cyan-600 file:cursor-pointer cursor-pointer focus:outline-none focus:border-cyan-500 transition-colors"
                  disabled={loading}
                />
              </div>
              {file && (
                <p className="mt-2 text-sm text-gray-400">
                  Seçilen: {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{' '}
                  MB)
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!file || !walletAddress || loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Analiz Ediliyor...</span>
                </>
              ) : (
                <>
                  <span>🤖</span>
                  <span>Analiz Et</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        {result && (
          <HealthAnalysisCard
            markdown={result.markdown}
            fileName={result.fileName}
            tokenReward={result.tokenReward}
          />
        )}
      </div>
    </div>
  );
}
