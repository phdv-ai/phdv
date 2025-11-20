import User, { IUser } from '@/lib/models/User';
import { generateTokenReward } from '@/lib/utils/tokenRewards';

export interface TokenRewardResult {
  earnedTokens: number;
  totalTokens: number;
  isNewUser: boolean;
}

/**
 * Award tokens to a user for completing a health analysis
 * Creates user if doesn't exist, updates tokens if exists
 */
export async function rewardUserForAnalysis(
  walletAddress: string,
  customTokenAmount?: number
): Promise<TokenRewardResult> {
  try {
    const earnedTokens = customTokenAmount ?? generateTokenReward(10, 100);

    const updatedUser = await User.findOneAndUpdate(
      { walletAddress: walletAddress.toLowerCase().trim() },
      {
        $inc: {
          tokens: earnedTokens,
          totalAnalyses: 1,
        },
        $set: {
          lastAnalysisDate: new Date(),
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    const isNewUser = updatedUser.totalAnalyses === 1;

    return {
      earnedTokens,
      totalTokens: updatedUser.tokens,
      isNewUser,
    };
  } catch (error) {
    console.error('Error rewarding user tokens:', error);
    throw new Error('Token reward failed');
  }
}

/**
 * Get user's token balance
 */
export async function getUserTokens(walletAddress: string): Promise<number> {
  try {
    const user = await User.findOne({
      walletAddress: walletAddress.toLowerCase().trim()
    });
    return user?.tokens ?? 0;
  } catch (error) {
    console.error('Error fetching user tokens:', error);
    return 0;
  }
}

/**
 * Get user statistics
 */
export async function getUserStats(walletAddress: string): Promise<IUser | null> {
  try {
    return await User.findOne({
      walletAddress: walletAddress.toLowerCase().trim()
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return null;
  }
}
