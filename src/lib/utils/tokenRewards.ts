/**
 * Generate random token reward between min and max (inclusive)
 */
export function generateTokenReward(min: number = 10, max: number = 100): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Calculate bonus multiplier based on file size
 */
export function calculateBonusMultiplier(fileSize: number): number {
  if (fileSize > 5 * 1024 * 1024) {
    return 1.2;
  }
  return 1.0;
}

/**
 * Format token amount for display
 */
export function formatTokens(amount: number): string {
  return amount.toLocaleString('en-US');
}

/**
 * User tier definitions based on total tokens
 */
export const USER_TIERS = {
  BRONZE: { min: 0, max: 999, name: 'Bronze', multiplier: 1.0 },
  SILVER: { min: 1000, max: 4999, name: 'Silver', multiplier: 1.1 },
  GOLD: { min: 5000, max: 19999, name: 'Gold', multiplier: 1.25 },
  PLATINUM: { min: 20000, max: 49999, name: 'Platinum', multiplier: 1.5 },
  DIAMOND: { min: 50000, max: Infinity, name: 'Diamond', multiplier: 2.0 },
} as const;

export type UserTierName = keyof typeof USER_TIERS;

/**
 * Get user tier based on total tokens
 */
export function getUserTier(totalTokens: number): typeof USER_TIERS[UserTierName] {
  if (totalTokens >= USER_TIERS.DIAMOND.min) return USER_TIERS.DIAMOND;
  if (totalTokens >= USER_TIERS.PLATINUM.min) return USER_TIERS.PLATINUM;
  if (totalTokens >= USER_TIERS.GOLD.min) return USER_TIERS.GOLD;
  if (totalTokens >= USER_TIERS.SILVER.min) return USER_TIERS.SILVER;
  return USER_TIERS.BRONZE;
}

/**
 * Calculate streak bonus multiplier
 * Consecutive days of analysis uploads increase rewards
 */
export function calculateStreakBonus(consecutiveDays: number): number {
  if (consecutiveDays >= 30) return 1.5;
  if (consecutiveDays >= 14) return 1.3;
  if (consecutiveDays >= 7) return 1.2;
  if (consecutiveDays >= 3) return 1.1;
  return 1.0;
}

/**
 * Calculate quality bonus based on data quality score
 */
export function calculateQualityBonus(qualityScore: number): number {
  if (qualityScore >= 90) return 1.5;
  if (qualityScore >= 80) return 1.3;
  if (qualityScore >= 70) return 1.2;
  if (qualityScore >= 60) return 1.1;
  return 1.0;
}

/**
 * Calculate total reward with all bonuses applied
 */
export function calculateTotalReward(
  baseReward: number,
  options: {
    fileSize?: number;
    consecutiveDays?: number;
    qualityScore?: number;
    totalTokens?: number;
  } = {}
): number {
  let multiplier = 1.0;

  if (options.fileSize) {
    multiplier *= calculateBonusMultiplier(options.fileSize);
  }

  if (options.consecutiveDays) {
    multiplier *= calculateStreakBonus(options.consecutiveDays);
  }

  if (options.qualityScore) {
    multiplier *= calculateQualityBonus(options.qualityScore);
  }

  if (options.totalTokens) {
    const tier = getUserTier(options.totalTokens);
    multiplier *= tier.multiplier;
  }

  return Math.round(baseReward * multiplier);
}
