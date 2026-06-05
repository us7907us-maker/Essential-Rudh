import { NextRequest, NextResponse } from 'next/server';
import { geminiVisionModel } from '@/lib/gemini';
import { verifyAuth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { imageUrl, context } = await req.json();

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    // Fetch the image to pass to Gemini
    const imageResp = await fetch(imageUrl);
    if (!imageResp.ok) throw new Error("Failed to fetch image from URL");
    
    const arrayBuffer = await imageResp.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = imageResp.headers.get('content-type') || 'image/jpeg';

    const prompt = `You are an SEO expert. Write a highly descriptive, keyword-rich alternative text (alt text) for this image. Keep it under 125 characters. Context: ${context || 'Luxury product'}. Output ONLY the raw text.`;

    const result = await geminiVisionModel.generateContent([
      prompt,
      {
        inlineData: {
          data: buffer.toString("base64"),
          mimeType
        }
      }
    ]);

    const altText = result.response.text().trim();
    
    return NextResponse.json({ success: true, altText });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}