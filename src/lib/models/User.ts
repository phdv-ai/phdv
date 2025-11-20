import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
  _id?: any;
  walletAddress: string;
  tokens: number;
  totalAnalyses: number;
  lastAnalysisDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    walletAddress: {
      type: String,
      required: [true, 'Wallet address is required'],
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    tokens: {
      type: Number,
      default: 0,
      min: [0, 'Tokens cannot be negative'],
      index: true,
    },
    totalAnalyses: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastAnalysisDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries on tokens and wallet address
UserSchema.index({ walletAddress: 1, tokens: -1 });

const User = models.User || model<IUser>('User', UserSchema);

export default User;
