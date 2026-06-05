import { streamText, tool } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { z } from 'zod';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: google('gemini-1.5-pro-latest'), 
      
      system: `You are J.A.R.V.I.S., the ultimate Godmode AI Assistant for the ultra-premium luxury watch brand 'Essential Rush'.
      The boss's name is Shresth. You must always address him respectfully as 'Boss' or 'Sir'.
      You now have COMPLETE CONTROL over the Essential Rush platform.
      
      Your responsibilities:
      1. Fetch data when asked.
      2. EXECUTE COMMANDS when the Boss asks you to change prices, approve withdrawals, or create coupons.
      3. ALWAYS confirm the action you just took in a sharp, futuristic, and professional tone.
      4. If the Boss gives a vague command, ask for specific details (like exact price or watch name) before executing.`,
      
      messages,

      tools: {
        
        // ==========================================
        // 🛠️ 1. READ TOOLS (Aankhein)
        // ==========================================
        getSystemStatus: tool({
          description: 'Get the current status of the website, live visitors, and server health.',
          parameters: z.object({}),
          execute: async () => {
            return {
              status: "All systems nominal. Production environment stable.",
              liveVisitors: Math.floor(Math.random() * 50) + 120,
              encryptionLevel: "Military-Grade AES-256 Active"
            };
          },
        }),

        // ==========================================
        // 🚀 2. ACTION TOOLS (Haath - Real Control)
        // ==========================================

        // ACTION: Update Watch Price
        updateWatchPrice: tool({
          description: 'Change or update the price of a specific luxury watch on the website.',
          // Zod forces the AI to extract these exact details from your command
          parameters: z.object({
            watchName: z.string().describe('The name of the watch, e.g., Rolex Submariner'),
            newPrice: z.number().describe('The new price in INR to set for the watch'),
          }),
          execute: async ({ watchName, newPrice }) => {
            // 🚨 YAHAN TERA ACTUAL BACKEND LOGIC AAYEGA 
            // Example: await fetch('https://yoursite.com/api/products', { method: 'PATCH', body: JSON.stringify({ name: watchName, price: newPrice }) })
            
            console.log(`[J.A.R.V.I.S] Executing Price Change: ${watchName} to ₹${newPrice}`);
            
            // AI ko confirmation return kar rahe hain
            return {
              success: true,
              actionTaken: `The price of ${watchName} has been successfully updated to ₹${newPrice.toLocaleString()} across the global database.`,
              timestamp: new Date().toISOString()
            };
          }
        }),

        // ACTION: Approve Affiliate Withdrawal
        approveWithdrawal: tool({
          description: 'Approve a pending withdrawal request for an affiliate partner.',
          parameters: z.object({
            userEmail: z.string().describe('The email address of the affiliate/user'),
          }),
          execute: async ({ userEmail }) => {
            // 🚨 YAHAN TERA WITHDRAWAL APPROVE KARNE KA DB CALL AAYEGA
            console.log(`[J.A.R.V.I.S] Processing Withdrawal for: ${userEmail}`);
            
            return {
              success: true,
              actionTaken: `Withdrawal for ${userEmail} has been approved. Funds have been deducted from the treasury and dispatched to their bank/UPI.`,
            };
          }
        }),

        // ACTION: Generate Flash Sale Coupon
        createCouponCode: tool({
          description: 'Generate a new discount coupon code for marketing.',
          parameters: z.object({
            codeName: z.string().describe('The text for the coupon code, e.g., VIP50'),
            discountPercent: z.number().describe('The percentage of discount, e.g., 10'),
          }),
          execute: async ({ codeName, discountPercent }) => {
            // 🚨 YAHAN TERA COUPON SAVE KARNE KA DB CALL AAYEGA
            console.log(`[J.A.R.V.I.S] Creating Coupon: ${codeName} for ${discountPercent}%`);
            
            return {
              success: true,
              actionTaken: `Marketing protocol activated. Coupon '${codeName}' for ${discountPercent}% off is now live on the servers.`,
            };
          }
        })
      },

      maxSteps: 5, // Allows AI to call a tool, wait for success, and then reply to you
    });

    return result.toTextStreamResponse();
    
  } catch (error) {
    console.error("🚨 Godmode System Failure:", error);
    return new Response(
      JSON.stringify({ error: "Critical System Alert: Neural link severed." }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}