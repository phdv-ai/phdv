import mongoose, { Schema, model, models } from 'mongoose';

// Legacy Gemini analysis format
export interface IGeminiAnalysisData {
  title?: string;
  documentType?: string;
  date?: string;
  summary?: string;
  detailedAnalysis?: string;
  medicalContext?: string;
  findings?: any[];
  abnormalValues?: any[];
  recommendations?: any[];
  riskAssessment?: any;
  confidence?: number;
  disclaimer?: string;
}

// PHDV analysis format
export interface IPHDVAnalysisData {
  phdvHealthData?: any[];
  phdvAnonymizedData?: any[];
  phdvQualityScores?: any[];
  phdvAggregateStats?: any;
  aiResponse?: string;
  processingSteps?: Record<string, { start: number; end: number }>;
}

export interface IHealthAnalysis {
  _id: any;
  walletAddress: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  format: 'markdown' | 'json' | 'phdv';
  markdown?: string;
  // Can be either Gemini or PHDV format
  analysisData?: IGeminiAnalysisData | IPHDVAnalysisData;
  createdAt: Date;
  updatedAt: Date;
}

const HealthAnalysisSchema = new Schema<IHealthAnalysis>(
  {
    walletAddress: {
      type: String,
      required: [true, 'Wallet address is required'],
      index: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      enum: ['markdown', 'json', 'phdv'],
      default: 'json',
    },
    markdown: {
      type: String,
    },
    analysisData: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
HealthAnalysisSchema.index({ walletAddress: 1, createdAt: -1 });

const HealthAnalysis = models.HealthAnalysis || model<IHealthAnalysis>('HealthAnalysis', HealthAnalysisSchema);

export default HealthAnalysis;
