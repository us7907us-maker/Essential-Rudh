import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(request: Request) {
  const { messages } = await request.json();

  const result = await streamText({
    model: google('gemini-1.5-pro-latest'),
    system: `You are J.A.R.V.I.S., the ultimate AI assistant...`,
    messages,
  });

  return result.toDataStreamResponse();
}