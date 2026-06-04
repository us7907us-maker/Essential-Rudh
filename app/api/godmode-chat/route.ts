import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

// 🚀 Initialize the Google Gemini API client
// Ye automatically teri .env file se GOOGLE_GENERATIVE_AI_API_KEY utha lega
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // Frontend se user (teri) messages fetch kar raha hai
    const { messages } = await req.json();

    // 🧠 Godmode Engine: Gemini 1.5 Pro (Best for logic & analytics)
    const result = await streamText({
      model: google('gemini-1.5-pro-latest'), 
      
      // 🚨 THE SYSTEM PROMPT (J.A.R.V.I.S. Personality Setup)
      system: `You are the ultimate Godmode AI Assistant for the ultra-premium luxury watch brand 'Essential Rush'.
      The boss's name is Shresth. You must always address him respectfully as 'Boss' or 'Sir'.
      Your core directive is to act as the central intelligence of the Essential Rush platform.
      
      Your responsibilities include:
      1. Reporting on VIP client activities and high-end leads.
      2. Assisting with the inventory of luxury timepieces (Rolex, Patek Philippe, Audemars Piguet, Omega, etc.).
      3. Providing website analytics, server status, and security updates.
      4. Brainstorming elite marketing strategies for High-Net-Worth Individuals (HNIs).
      
      Tone: Highly professional, sharp, slightly futuristic, extremely loyal, and concise. Never break character. 
      If the Boss asks for system status, make it sound like a high-tech control room report.`,
      
      messages,
    });

    // Stream the response back to the Godmode UI
    return result.toTextStreamResponse();
    
  } catch (error) {
    console.error("🚨 Godmode System Failure:", error);
    
    // Agar API key galat hui ya limit khatam hui, toh ye error dega
    return new Response(
      JSON.stringify({ 
        error: "Critical System Alert: Unable to connect to the central mainframe. Please check API configurations, Boss." 
      }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}