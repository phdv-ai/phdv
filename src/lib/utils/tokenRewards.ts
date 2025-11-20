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
  return amount.toLocaleString('tr-TR');
}
