import mongoose, { Schema, model, models } from 'mongoose';

export interface IHealthAnalysis {
  _id: any;
  walletAddress: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  format: 'markdown' | 'json';
  markdown?: string;
  analysisData?: {
    documentType?: string;
    date?: string;
    summary?: string;
    findings?: any[];
    abnormalValues?: any[];
    recommendations?: string[];
  };
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
      enum: ['markdown', 'json'],
      default: 'markdown',
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
