export interface HealthAnalysisResponse {
  success: boolean;
  analysis?: HealthAnalysisResult;
  markdown?: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  error?: string;
  details?: string;
  tokenReward?: {
    earned: number;
    total: number;
    isNewUser: boolean;
  };
}

export interface HealthAnalysisResult {
  documentType: string;
  date?: string;
  patientInfo?: {
    name?: string;
    age?: string;
    gender?: string;
    id?: string;
  };
  findings: HealthFinding[];
  abnormalValues: AbnormalValue[];
  summary: string;
  recommendations: string[];
  rawAnalysis?: string;
}

export interface HealthFinding {
  parameter: string;
  value: string;
  unit?: string;
  referenceRange?: string;
  status: 'normal' | 'low' | 'high' | 'critical';
  category?: string;
}

export interface AbnormalValue {
  parameter: string;
  value: string;
  expectedRange: string;
  severity: 'mild' | 'moderate' | 'severe';
  meaning?: string;
}

export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'text/csv',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
  'image/jpg',
] as const;

export const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

export type AllowedFileType = typeof ALLOWED_FILE_TYPES[number];

// Dashboard API Types
export interface DashboardResponse {
  success: boolean;
  data?: {
    user: {
      walletAddress: string;
      tokens: number;
      totalAnalyses: number;
      lastAnalysisDate?: string;
      memberSince: string;
    };
    reports: DashboardReport[];
    stats: {
      totalReports: number;
      reportsThisMonth: number;
      reportsThisWeek: number;
    };
  };
  error?: string;
  details?: string;
}

export interface DashboardReport {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  format: 'markdown' | 'json';
  createdAt: string;
  updatedAt: string;
  // Full analysis data for JSON format
  analysisData?: {
    documentType?: string;
    date?: string;
    patientInfo?: {
      name?: string;
      age?: string;
      gender?: string;
      id?: string;
    };
    findings?: HealthFinding[];
    abnormalValues?: AbnormalValue[];
    summary?: string;
    recommendations?: string[];
  };
  // Full markdown content for markdown format
  markdown?: string;
}
