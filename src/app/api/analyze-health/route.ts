import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE, HealthAnalysisResponse } from '@/types/health';
import dbConnect from '@/lib/mongodb';
import HealthAnalysis from '@/lib/models/HealthAnalysis';
import { rewardUserForAnalysis } from '@/lib/services/userService';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const MARKDOWN_ANALYSIS_PROMPT = `
Analyze this medical/health document in detail and respond in the following markdown format:

# 📋 [Document Title] - [Document Type]

📅 **Date:** [Document Date]
🔬 **Lab Results** | ✅ **AI Analysis Complete**

## 🤖 AI Summary

*Confidence: [confidence percentage]%*

[2-3 sentence summary about overall health status. Example: "Your metabolic panel shows excellent kidney function with creatinine at 0.9 mg/dL (normal range). Glucose levels at 92 mg/dL indicate good blood sugar control. Electrolytes are well-balanced."]

## 📊 Key Findings

• **Kidney function:** Excellent (eGFR: [value] mL/min)
• **Blood sugar:** Normal fasting glucose ([value] mg/dL)
• **Liver enzymes:** Within healthy range
• **Electrolyte balance:** Optimal

## 💡 AI Recommendations

✓ Continue current lifestyle habits
✓ Maintain hydration levels
✓ Schedule next blood test in 6 months

---

**Risk Assessment:** 🟢 Low Risk

IMPORTANT:
- Respond ONLY in markdown format
- Write ALL content in ENGLISH
- Use emojis (📋 📅 🔬 ✅🤖 📊 💡 ✓)
- List key findings with bullet points
- Indicate risk level (🟢 Low / 🟡 Moderate / 🔴 High)
- Highlight abnormal values
- Use professional but clear language
`;

const JSON_ANALYSIS_PROMPT = `
Analyze this medical/health document in detail and respond in the following JSON format:

{
  "documentType": "Document type (Blood Test, Medical Report, X-Ray Report, etc.)",
  "date": "Document date (if available)",
  "patientInfo": {
    "name": "Patient name (if available)",
    "age": "Age (if available)",
    "gender": "Gender (if available)",
    "id": "Patient ID/protocol number (if available)"
  },
  "findings": [
    {
      "parameter": "Test/parameter name",
      "value": "Measured value",
      "unit": "Unit (mg/dL, g/L, etc.)",
      "referenceRange": "Normal reference range",
      "status": "normal/low/high/critical",
      "category": "Category (Hemogram, Biochemistry, etc.)"
    }
  ],
  "abnormalValues": [
    {
      "parameter": "Abnormal parameter name",
      "value": "Measured value",
      "expectedRange": "Expected value range",
      "severity": "mild/moderate/severe",
      "meaning": "Possible meaning and significance of this abnormal value"
    }
  ],
  "summary": "Brief summary of overall health status (2-3 sentences)",
  "recommendations": [
    "Recommendation 1: Areas to monitor",
    "Recommendation 2: Points to pay attention to",
    "Recommendation 3: Physician consultation recommendations"
  ]
}

IMPORTANT:
- Respond ONLY in JSON format, no additional explanations
- Write ALL content in ENGLISH
- If information is not available in the document, leave the field empty or null
- Include medical terms in English
- Highlight critical values
- Explain possible causes and significance of abnormal values
`;

export async function POST(request: Request) {
  try {
    // Connect to database
    await dbConnect();

    // Get format preference from URL params (default: markdown)
    const url = new URL(request.url);
    const format = url.searchParams.get('format') || 'markdown'; // 'markdown' or 'json'

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const walletAddress = formData.get('walletAddress') as string | null;

    if (!file) {
      return NextResponse.json<HealthAnalysisResponse>(
        {
          success: false,
          error: 'Dosya bulunamadı. Lütfen bir dosya yükleyin.'
        },
        { status: 400 }
      );
    }

    if (!walletAddress) {
      return NextResponse.json<HealthAnalysisResponse>(
        {
          success: false,
          error: 'Wallet adresi gerekli. Lütfen wallet adresinizi gönderin.'
        },
        { status: 400 }
      );
    }

    // File type validation
    if (!ALLOWED_FILE_TYPES.includes(file.type as any)) {
      return NextResponse.json<HealthAnalysisResponse>(
        {
          success: false,
          error: `Desteklenmeyen dosya tipi: ${file.type}`,
          details: `Desteklenen formatlar: PDF, CSV, DOC, DOCX, PNG, JPEG`
        },
        { status: 400 }
      );
    }

    // File size validation
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json<HealthAnalysisResponse>(
        {
          success: false,
          error: 'Dosya boyutu çok büyük',
          details: `Maksimum dosya boyutu: ${MAX_FILE_SIZE / 1024 / 1024}MB. Yüklenen dosya: ${(file.size / 1024 / 1024).toFixed(2)}MB`
        },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = buffer.toString('base64');

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.4,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
      },
    });

    // Choose prompt based on format
    const prompt = format === 'json' ? JSON_ANALYSIS_PROMPT : MARKDOWN_ANALYSIS_PROMPT;

    // Send to Gemini for analysis
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      },
    ]);

    const response = await result.response;
    const analysisText = response.text();

    // Handle response based on format
    if (format === 'markdown') {
      // Save to database
      const savedAnalysis = await HealthAnalysis.create({
        walletAddress,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        format: 'markdown',
        markdown: analysisText,
      });

      // Reward user with tokens
      const tokenReward = await rewardUserForAnalysis(walletAddress);

      // Return markdown directly
      return NextResponse.json<HealthAnalysisResponse>({
        success: true,
        markdown: analysisText,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        tokenReward: {
          earned: tokenReward.earnedTokens,
          total: tokenReward.totalTokens,
          isNewUser: tokenReward.isNewUser,
        },
      });
    } else {
      // Try to parse JSON response
      let parsedAnalysis;
      try {
        // Remove markdown code blocks if present
        const cleanedText = analysisText
          .replace(/```json\n?/g, '')
          .replace(/```\n?/g, '')
          .trim();

        parsedAnalysis = JSON.parse(cleanedText);
      } catch (parseError) {
        // If JSON parsing fails, return raw text
        parsedAnalysis = {
          documentType: 'Analiz Edilen Belge',
          summary: analysisText,
          rawAnalysis: analysisText,
          findings: [],
          abnormalValues: [],
          recommendations: ['Ham analiz metnini inceleyiniz.']
        };
      }

      // Save to database
      const savedAnalysis = await HealthAnalysis.create({
        walletAddress,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        format: 'json',
        analysisData: parsedAnalysis,
      });

      // Reward user with tokens
      const tokenReward = await rewardUserForAnalysis(walletAddress);

      return NextResponse.json<HealthAnalysisResponse>({
        success: true,
        analysis: parsedAnalysis,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        tokenReward: {
          earned: tokenReward.earnedTokens,
          total: tokenReward.totalTokens,
          isNewUser: tokenReward.isNewUser,
        },
      });
    }

  } catch (error: any) {
    console.error('Health analysis error:', error);

    let errorMessage = 'Analiz sırasında bir hata oluştu';
    let errorDetails = error.message;

    if (error.message?.includes('API key')) {
      errorMessage = 'API key hatası';
      errorDetails = 'Gemini API key geçersiz veya eksik';
    } else if (error.message?.includes('quota')) {
      errorMessage = 'API kotası aşıldı';
      errorDetails = 'Günlük API kullanım limiti doldu';
    } else if (error.message?.includes('invalid')) {
      errorMessage = 'Geçersiz dosya formatı';
      errorDetails = 'Dosya formatı okunamadı veya bozuk';
    }

    return NextResponse.json<HealthAnalysisResponse>(
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
  return NextResponse.json({
    status: 'ready',
    message: 'Health analysis API is ready',
    supportedFormats: ALLOWED_FILE_TYPES,
    maxFileSize: `${MAX_FILE_SIZE / 1024 / 1024}MB`,
  });
}
