import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { imageUrl, imageDescription } = await req.json();

    if (!imageUrl && !imageDescription) {
      return NextResponse.json({ error: 'Image URL or description required' }, { status: 400 });
    }

    // Use Gemini to generate SEO-optimized alt text
    const prompt = `Generate an SEO-optimized alt text for an image. 
The alt text should be:
- Concise (under 125 characters)
- Descriptive and accurate
- Include relevant keywords if applicable
- Accessible for screen readers

${imageDescription ? `Image description: ${imageDescription}` : ''}
${imageUrl ? `Image URL: ${imageUrl}` : ''}

Generate 3 different alt text options, ranked by SEO effectiveness.`;

    const { text } = await generateText({
      model: google('gemini-1.5-pro-latest'),
      prompt: prompt,
      temperature: 0.7,
      maxTokens: 500,
    });

    // Parse the AI response
    const altTexts = text
      .split('\n')
      .filter((line: string) => line.trim())
      .slice(0, 3)
      .map((alt: string) => alt.replace(/^\d+\.\s*/, '').trim());

    return NextResponse.json({
      success: true,
      data: {
        altTexts,
        recommended: altTexts[0],
        imageUrl
      }
    });
  } catch (error: any) {
    console.error('Alt text generation error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to generate alt text' 
    }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    return NextResponse.json({
      success: true,
      message: 'Use POST to generate alt text',
      example: {
        imageUrl: 'https://example.com/image.jpg',
        imageDescription: 'A luxury watch with gold dial'
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}