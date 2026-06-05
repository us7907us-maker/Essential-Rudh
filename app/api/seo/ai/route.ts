import { NextRequest, NextResponse } from 'next/server';
import { geminiModel, geminiVisionModel } from '@/lib/gemini';
import { verifyAuth } from '@/lib/auth';
import { AiGenerateRequest } from '@/types/seo';

export async function POST(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body: AiGenerateRequest = await req.json();

    if (body.type === 'meta') {
      const prompt = `You are an expert SEO architect. Generate a meta title (max 60 chars) and meta description (max 155 chars) in pure JSON format: { "metaTitle": "", "metaDescription": "", "focusKeyword": "" }.
      Target: ${body.target}
      Context: ${body.context}
      Focus Keyword (if any): ${body.keyword || 'None'}
      Output ONLY raw JSON, no markdown formatting or backticks.`;

      const result = await geminiModel.generateContent(prompt);
      const responseText = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
      const data = JSON.parse(responseText);
      
      return NextResponse.json({ success: true, data });
    }

    if (body.type === 'schema') {
      const prompt = `You are a JSON-LD schema expert. Generate valid JSON-LD for the requested entity.
      Target schema type: ${body.target}
      Context data: ${body.context}
      Output ONLY raw JSON, no markdown formatting or backticks.`;

      const result = await geminiModel.generateContent(prompt);
      const responseText = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
      const data = JSON.parse(responseText);
      
      return NextResponse.json({ success: true, data });
    }

    return NextResponse.json({ error: 'Invalid AI type requested' }, { status: 400 });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}