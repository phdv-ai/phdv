import { NextResponse } from 'next/server';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE, PHDVResponse } from '@/types/health';
import dbConnect from '@/lib/mongodb';
import HealthAnalysis from '@/lib/models/HealthAnalysis';
import { rewardUserForAnalysis } from '@/lib/services/userService';

// BioAgents-PHDV API URL (configure in .env.local)
const PHDV_API_URL = process.env.PHDV_API_URL || 'http://localhost:3001';

export async function POST(request: Request) {
  try {
    // Connect to database
    await dbConnect();

    // Parse FormData
    let formData;
    try {
      formData = await request.formData();
    } catch (formDataError) {
      return NextResponse.json<PHDVResponse>(
        {
          success: false,
          error: 'Invalid request format',
          details: 'Request body must be sent as multipart/form-data.'
        },
        { status: 400 }
      );
    }

    const file = formData.get('file') as File | null;
    const walletAddress = formData.get('walletAddress') as string | null;

    if (!file) {
      return NextResponse.json<PHDVResponse>(
        {
          success: false,
          error: 'No file provided',
          details: 'Please upload a health data file.'
        },
        { status: 400 }
      );
    }

    if (!walletAddress) {
      return NextResponse.json<PHDVResponse>(
        {
          success: false,
          error: 'Wallet address required',
          details: 'Please provide your wallet address.'
        },
        { status: 400 }
      );
    }

    // File type validation
    if (!ALLOWED_FILE_TYPES.includes(file.type as any)) {
      return NextResponse.json<PHDVResponse>(
        {
          success: false,
          error: `Unsupported file type: ${file.type}`,
          details: `Supported formats: PDF, CSV, DOC, DOCX, PNG, JPEG, TXT`
        },
        { status: 400 }
      );
    }

    // File size validation
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json<PHDVResponse>(
        {
          success: false,
          error: 'File too large',
          details: `Maximum file size: ${MAX_FILE_SIZE / 1024 / 1024}MB. Your file: ${(file.size / 1024 / 1024).toFixed(2)}MB`
        },
        { status: 400 }
      );
    }

    // Generate unique IDs for this request
    const conversationId = `phdv-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    // Create FormData for PHDV API
    const phdvFormData = new FormData();
    phdvFormData.append('message', 'Process and analyze this health data file');
    phdvFormData.append('files', file);
    phdvFormData.append('userId', walletAddress.toLowerCase());
    phdvFormData.append('conversationId', conversationId);

    // Call BioAgents-PHDV API
    const phdvResponse = await fetch(`${PHDV_API_URL}/api/chat`, {
      method: 'POST',
      body: phdvFormData,
    });

    if (!phdvResponse.ok) {
      const errorData = await phdvResponse.json().catch(() => ({}));
      return NextResponse.json<PHDVResponse>(
        {
          success: false,
          error: 'PHDV processing failed',
          details: errorData.error || `PHDV API returned status ${phdvResponse.status}`
        },
        { status: 500 }
      );
    }

    const phdvData = await phdvResponse.json();

    // Extract PHDV results from state
    const state = phdvData.state || {};
    const healthData = state.phdvHealthData || [];
    const anonymizedData = state.phdvAnonymizedData || [];
    const qualityScores = state.phdvQualityScores || [];
    const aggregateStats = state.phdvAggregateStats;

    // Check if we have valid health data
    if (healthData.length === 0) {
      return NextResponse.json<PHDVResponse>(
        {
          success: false,
          error: 'No health data extracted',
          details: state.phdvErrors?.join(', ') || 'Could not extract health data from the file. Please ensure it contains valid health information.'
        },
        { status: 400 }
      );
    }

    // Save to database (using anonymized data for storage)
    const analysisRecord = await HealthAnalysis.create({
      walletAddress: walletAddress.toLowerCase(),
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      format: 'phdv',
      analysisData: {
        // Store PHDV-specific data
        phdvHealthData: healthData,
        phdvAnonymizedData: anonymizedData,
        phdvQualityScores: qualityScores,
        phdvAggregateStats: aggregateStats,
        aiResponse: phdvData.text,
        processingSteps: state.steps,
      },
    });

    // Reward user with tokens based on quality score
    let tokenAmount = 50; // Default tokens
    if (qualityScores.length > 0) {
      const avgScore = qualityScores.reduce((sum: number, qs: any) => sum + qs.qualityScore.overallScore, 0) / qualityScores.length;
      // Higher quality data = more tokens (10-100 range)
      tokenAmount = Math.round(10 + (avgScore / 100) * 90);
    }

    const tokenReward = await rewardUserForAnalysis(walletAddress, tokenAmount);

    return NextResponse.json<PHDVResponse>({
      success: true,
      text: phdvData.text,
      files: phdvData.files,
      state: {
        steps: state.steps,
        phdvHealthData: healthData,
        phdvAnonymizedData: anonymizedData,
        phdvQualityScores: qualityScores,
        phdvAggregateStats: aggregateStats,
        phdvErrors: state.phdvErrors,
        phdvPrivacyErrors: state.phdvPrivacyErrors,
        phdvQualityErrors: state.phdvQualityErrors,
      },
      tokenReward: {
        earned: tokenReward.earnedTokens,
        total: tokenReward.totalTokens,
        isNewUser: tokenReward.isNewUser,
      },
    });

  } catch (error: any) {
    console.error('PHDV API error:', error);

    let errorMessage = 'An error occurred during processing';
    let errorDetails = error.message;

    if (error.message?.includes('ECONNREFUSED')) {
      errorMessage = 'PHDV service unavailable';
      errorDetails = 'The PHDV processing service is not running. Please ensure BioAgents-PHDV is started.';
    } else if (error.message?.includes('timeout')) {
      errorMessage = 'Processing timeout';
      errorDetails = 'The file processing took too long. Please try with a smaller file.';
    }

    return NextResponse.json<PHDVResponse>(
      {
        success: false,
        error: errorMessage,
        details: errorDetails
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  // Check if PHDV API is reachable
  let phdvStatus = 'unknown';
  try {
    const response = await fetch(`${PHDV_API_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000)
    });
    phdvStatus = response.ok ? 'connected' : 'error';
  } catch {
    phdvStatus = 'disconnected';
  }

  return NextResponse.json({
    status: 'ready',
    message: 'PHDV API endpoint is ready',
    phdvApiUrl: PHDV_API_URL,
    phdvStatus,
    supportedFileTypes: [...ALLOWED_FILE_TYPES, 'text/plain'],
    maxFileSize: `${MAX_FILE_SIZE / 1024 / 1024}MB`,
  });
}
