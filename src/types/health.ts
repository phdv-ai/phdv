export interface HealthAnalysisResponse {
  success: boolean;
  analysis?: HealthAnalysisResult;
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
  title: string; // NEW: AI-generated title
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
  summary: string; // Enhanced (4-6 sentences)
  detailedAnalysis: string; // NEW: In-depth analysis (200+ words)
  medicalContext: string; // NEW: Educational info (150+ words)
  recommendations: RecommendationCategory[] | string[]; // Categorized (new) or simple array (legacy)
  riskAssessment: RiskAssessment; // NEW: Structured risk info
  confidence: number;
  disclaimer: string;
}

export interface HealthFinding {
  parameter: string;
  value: string;
  unit?: string;
  referenceRange?: string;
  status: 'normal' | 'low' | 'high' | 'critical';
  category?: string;
  clinicalSignificance?: string; // NEW: Detailed explanation
}

export interface AbnormalValue {
  parameter: string;
  value: string;
  expectedRange: string;
  severity: 'mild' | 'moderate' | 'severe';
  meaning?: string; // Enhanced detail
  possibleCauses?: string[]; // NEW
  recommendedActions?: string[]; // NEW
}

export interface RecommendationCategory {
  category: 'Immediate Actions' | 'Lifestyle Modifications' | 'Follow-up Care';
  items: string[];
}

export interface RiskAssessment {
  level: 'low' | 'moderate' | 'high';
  factors: string[];
  followUpRequired: boolean;
  followUpTiming?: string;
}

export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'text/csv',
  'text/plain',
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
  format: 'json' | 'phdv' | 'markdown';
  createdAt: string;
  updatedAt: string;
  // Analysis data can be either Gemini format or PHDV format
  // Using Record<string, any> for flexibility with both formats
  analysisData?: Record<string, any>;
}

// PHDV Analysis Data (stored in database)
export interface PHDVAnalysisData {
  phdvHealthData?: PHDVHealthData[];
  phdvAnonymizedData?: PHDVAnonymizedData[];
  phdvQualityScores?: PHDVQualityScore[];
  phdvAggregateStats?: PHDVAggregateStats;
  aiResponse?: string;
  processingSteps?: Record<string, { start: number; end: number }>;
}

// ==========================================
// PHDV (Personal Health Data Vault) Types
// ==========================================

export interface PHDVResponse {
  success: boolean;
  text?: string;
  files?: PHDVFileInfo[];
  state?: PHDVState;
  error?: string;
  details?: string;
  tokenReward?: {
    earned: number;
    total: number;
    isNewUser: boolean;
  };
}

export interface PHDVFileInfo {
  filename: string;
  mimeType: string;
  size: number;
}

export interface PHDVState {
  // Processing steps with timestamps
  steps?: Record<string, { start: number; end: number }>;

  // PHDV-DATA-VAULT output
  phdvHealthData?: PHDVHealthData[];
  phdvErrors?: string[];

  // PHDV-PRIVACY output
  phdvAnonymizedData?: PHDVAnonymizedData[];
  phdvPrivacyErrors?: string[];

  // PHDV-QUALITY-SCORE output
  phdvQualityScores?: PHDVQualityScore[];
  phdvAggregateStats?: PHDVAggregateStats;
  phdvQualityErrors?: string[];
}

export interface PHDVHealthData {
  filename: string;
  healthData: {
    metadata: {
      sourceFile: string;
      processingTimestamp: string;
      dataVersion: string;
      recordType: string;
    };
    patient?: {
      id?: string;
      name?: string;
      dateOfBirth?: string;
      gender?: string;
    };
    records: PHDVHealthRecord[];
    summary: {
      totalRecords: number;
      recordTypes: string[];
      dateRange?: {
        earliest: string;
        latest: string;
      };
    };
  };
  metadata: {
    recordCount: number;
    dateFields: string[];
    dataTypes: string[];
    processingTimestamp: string;
  };
}

export interface PHDVHealthRecord {
  recordId: string;
  recordType: 'vital_sign' | 'lab_result' | 'medication' | 'diagnosis' | 'procedure' | 'allergy' | 'immunization' | 'wearable_data';
  timestamp: string;
  data: Record<string, any>;
}

export interface PHDVAnonymizedData {
  filename: string;
  originalHealthData: any;
  anonymizedHealthData: any;
  anonymizationMetadata: {
    maskedFields: string[];
    generalizedFields: string[];
    privacyLevel: 'low' | 'medium' | 'high';
    processingTimestamp: string;
  };
}

export interface PHDVQualityScore {
  filename: string;
  qualityScore: {
    overallScore: number;
    grade: 'A' | 'B' | 'C' | 'D' | 'F';
    componentScores: {
      completeness: number;
      missingDataImpact: number;
      multiModality: number;
      sourceVerifiability: number;
      dataVolume: number;
    };
    strengths: string[];
    weaknesses: string[];
    improvementSuggestions: string[];
  };
  metrics: {
    completeness: {
      completenessPercentage: number;
      presentFields: number;
      totalPossibleFields: number;
    };
    missingDataRate: {
      overallMissingRate: number;
      criticalFieldsMissing: number;
      nonCriticalFieldsMissing: number;
    };
    multiModality: {
      dataTypeCount: number;
      hasVitalSigns: boolean;
      hasLabResults: boolean;
      hasMedications: boolean;
      hasWearableData: boolean;
      modalityScore: number;
    };
    sourceVerifiability: {
      hasSourceMetadata: string;
      hasTimestamps: string;
      hasProvenanceInfo: string;
      verifiabilityScore: number;
    };
    recordCount: number;
    dataTypes: string[];
  };
  recommendation: string;
}

export interface PHDVAggregateStats {
  totalDatasets: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  gradeDistribution: Record<string, number>;
  totalRecords: number;
  averageCompleteness: number;
  averageMissingDataRate: number;
}
