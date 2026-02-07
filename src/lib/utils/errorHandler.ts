/**
 * Error handling utilities for consistent error management across the app
 */

export interface AppError {
  code: string;
  message: string;
  details?: string;
  statusCode: number;
}

/**
 * Error codes used throughout the application
 */
export const ERROR_CODES = {
  // Authentication errors
  WALLET_NOT_CONNECTED: 'WALLET_NOT_CONNECTED',
  INVALID_WALLET_ADDRESS: 'INVALID_WALLET_ADDRESS',

  // File errors
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  FILE_UPLOAD_FAILED: 'FILE_UPLOAD_FAILED',

  // API errors
  API_ERROR: 'API_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  RATE_LIMITED: 'RATE_LIMITED',

  // Health analysis errors
  NOT_HEALTH_DOCUMENT: 'NOT_HEALTH_DOCUMENT',
  ANALYSIS_FAILED: 'ANALYSIS_FAILED',
  GEMINI_API_ERROR: 'GEMINI_API_ERROR',

  // Database errors
  DATABASE_ERROR: 'DATABASE_ERROR',
  USER_NOT_FOUND: 'USER_NOT_FOUND',

  // Generic errors
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
} as const;

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];

/**
 * Create a standardized app error
 */
export function createAppError(
  code: ErrorCode,
  message: string,
  statusCode: number = 500,
  details?: string
): AppError {
  return {
    code,
    message,
    statusCode,
    details,
  };
}

/**
 * Pre-defined error messages for common scenarios
 */
export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ERROR_CODES.WALLET_NOT_CONNECTED]: 'Please connect your wallet to continue',
  [ERROR_CODES.INVALID_WALLET_ADDRESS]: 'Invalid wallet address provided',
  [ERROR_CODES.FILE_TOO_LARGE]: 'File size exceeds the maximum limit of 20MB',
  [ERROR_CODES.INVALID_FILE_TYPE]: 'File type is not supported',
  [ERROR_CODES.FILE_UPLOAD_FAILED]: 'Failed to upload file',
  [ERROR_CODES.API_ERROR]: 'An error occurred while processing your request',
  [ERROR_CODES.NETWORK_ERROR]: 'Network error. Please check your connection',
  [ERROR_CODES.RATE_LIMITED]: 'Too many requests. Please try again later',
  [ERROR_CODES.NOT_HEALTH_DOCUMENT]: 'The uploaded document does not appear to be health-related',
  [ERROR_CODES.ANALYSIS_FAILED]: 'Failed to analyze the health document',
  [ERROR_CODES.GEMINI_API_ERROR]: 'AI analysis service is temporarily unavailable',
  [ERROR_CODES.DATABASE_ERROR]: 'Database error occurred',
  [ERROR_CODES.USER_NOT_FOUND]: 'User not found',
  [ERROR_CODES.UNKNOWN_ERROR]: 'An unexpected error occurred',
  [ERROR_CODES.VALIDATION_ERROR]: 'Validation error',
};

/**
 * Get user-friendly error message from error code
 */
export function getErrorMessage(code: ErrorCode): string {
  return ERROR_MESSAGES[code] || ERROR_MESSAGES[ERROR_CODES.UNKNOWN_ERROR];
}

/**
 * Parse API error response into AppError
 */
export function parseApiError(error: unknown): AppError {
  if (error instanceof Error) {
    return createAppError(
      ERROR_CODES.UNKNOWN_ERROR,
      error.message,
      500
    );
  }

  if (typeof error === 'object' && error !== null) {
    const err = error as Record<string, unknown>;
    return createAppError(
      (err.code as ErrorCode) || ERROR_CODES.UNKNOWN_ERROR,
      (err.message as string) || 'Unknown error',
      (err.statusCode as number) || 500,
      err.details as string
    );
  }

  return createAppError(ERROR_CODES.UNKNOWN_ERROR, 'Unknown error', 500);
}

/**
 * Check if error is a specific type
 */
export function isErrorCode(error: AppError, code: ErrorCode): boolean {
  return error.code === code;
}
