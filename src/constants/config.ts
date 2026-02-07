import { somniaMainnet } from "./chains"

// Network Configuration
// NOTE: This project only supports Somnia Mainnet
export const DEFAULT_CHAIN = somniaMainnet;
export const ID_OF_CHAIN = somniaMainnet.id;
export const NATIVE_CURRENCY_SYMBOL = somniaMainnet.nativeCurrency.symbol;
export const NAME_OF_CHAIN = somniaMainnet.name;

// App Configuration
export const APP_CONFIG = {
  name: 'PHDV',
  version: '0.1.0',
  description: 'Personal Health Data Vault',
} as const;

// File Upload Limits
export const FILE_UPLOAD_CONFIG = {
  maxFileSize: 20 * 1024 * 1024, // 20MB
  supportedTypes: ['application/pdf', 'text/csv', 'image/png', 'image/jpeg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  supportedExtensions: ['.pdf', '.csv', '.doc', '.docx', '.png', '.jpeg', '.jpg'],
} as const;

// Token Rewards Configuration
export const TOKEN_REWARDS_CONFIG = {
  minReward: 10,
  maxReward: 100,
  baseRewardPerAnalysis: 50,
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  analyzeHealth: '/api/analyze-health',
  phdv: '/api/phdv',
  dashboard: '/api/dashboard',
  testGemini: '/api/test-gemini',
} as const;

