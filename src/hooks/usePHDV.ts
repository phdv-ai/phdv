'use client';

import { useState, useCallback } from 'react';
import type {
  PHDVResponse,
  PHDVHealthData,
  PHDVAnonymizedData,
  PHDVQualityScore,
  PHDVAggregateStats,
} from '@/types/health';

export interface UsePHDVResult {
  // State
  isLoading: boolean;
  error: string | null;

  // Results
  text: string | null;
  healthData: PHDVHealthData[];
  anonymizedData: PHDVAnonymizedData[];
  qualityScores: PHDVQualityScore[];
  aggregateStats: PHDVAggregateStats | null;
  tokenReward: {
    earned: number;
    total: number;
    isNewUser: boolean;
  } | null;

  // Actions
  processHealthFile: (file: File, walletAddress: string) => Promise<PHDVResponse | null>;
  reset: () => void;
}

export function usePHDV(): UsePHDVResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [healthData, setHealthData] = useState<PHDVHealthData[]>([]);
  const [anonymizedData, setAnonymizedData] = useState<PHDVAnonymizedData[]>([]);
  const [qualityScores, setQualityScores] = useState<PHDVQualityScore[]>([]);
  const [aggregateStats, setAggregateStats] = useState<PHDVAggregateStats | null>(null);
  const [tokenReward, setTokenReward] = useState<{
    earned: number;
    total: number;
    isNewUser: boolean;
  } | null>(null);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setText(null);
    setHealthData([]);
    setAnonymizedData([]);
    setQualityScores([]);
    setAggregateStats(null);
    setTokenReward(null);
  }, []);

  const processHealthFile = useCallback(async (
    file: File,
    walletAddress: string
  ): Promise<PHDVResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('walletAddress', walletAddress);

      const response = await fetch('/api/phdv', {
        method: 'POST',
        body: formData,
      });

      const data: PHDVResponse = await response.json();

      if (!data.success) {
        setError(data.error || 'Processing failed');
        setIsLoading(false);
        return data;
      }

      // Update state with results
      setText(data.text || null);
      setHealthData(data.state?.phdvHealthData || []);
      setAnonymizedData(data.state?.phdvAnonymizedData || []);
      setQualityScores(data.state?.phdvQualityScores || []);
      setAggregateStats(data.state?.phdvAggregateStats || null);
      setTokenReward(data.tokenReward || null);
      setIsLoading(false);

      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setError(errorMessage);
      setIsLoading(false);
      return null;
    }
  }, []);

  return {
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
  };
}

export default usePHDV;
