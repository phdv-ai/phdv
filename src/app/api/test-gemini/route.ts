import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function GET() {
  try {
    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: 'GEMINI_API_KEY environment variable is not set',
        },
        { status: 500 }
      );
    }

    // Test with a simple prompt
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent([
      'Sadece "Gemini API başarıyla bağlandı!" diye yanıt ver.'
    ]);

    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      success: true,
      message: 'Gemini API connection successful',
      testResponse: text,
      apiKeyPresent: true,
      model: 'gemini-1.5-flash',
    });

  } catch (error: any) {
    console.error('Gemini test error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Gemini API connection failed',
        details: error.message,
        apiKeyPresent: !!process.env.GEMINI_API_KEY,
      },
      { status: 500 }
    );
  }
}
