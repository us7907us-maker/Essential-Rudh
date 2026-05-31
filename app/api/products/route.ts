import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0; // Aggressive caching disabled

// 🚀 GET: Database se saare ASLI products lane ke liye
export async function GET() {
    try {
        await connectDB();
        
        // Asli products DB se nikaal rahe hain
        const products = await Product.find({}).sort({ createdAt: -1 }).lean() || [];

        // 🚨 MAIN FIX: Frontend 'res.data' expect kar raha hai, isliye data object ke andar bhejna zaroori hai
        return NextResponse.json({ success: true, data: products }, { status: 200 });

    } catch (error) {
        console.error("GET Products Error:", error);
        return NextResponse.json({ success: false, data: [] }, { status: 500 });
    }
}

// 🚀 POST: Godmode se naya product Database mein save karne ke liye
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        
        // Security Check - Safe casting for TypeScript
        if (!session || (session.user as any)?.role !== "SUPER_ADMIN") {
            return NextResponse.json(
                { success: false, error: 'Unauthorized: Only Super Admins can add products' },
                { status: 401 }
            );
        }

        await connectDB();
        const body = await req.json(); 

        // 🚀 THE MAGIC FIX: Schema Strict Validation
        // Backend pehle hi data check karega Mongoose ke paas bhejane se pehle
        console.log("📦 Incoming Product Payload:", { 
            name: body.name, 
            imagesCount: body.images?.length,
            price: body.price
        });

        if (!body.images || body.images.length === 0) {
            return NextResponse.json({ success: false, error: 'At least one product main image is required in images array' }, { status: 400 });
        }
        if (!body.name || !body.price) {
            return NextResponse.json({ success: false, error: 'Missing product name or price' }, { status: 400 });
        }

        // MongoDB mein naya product save karo
        const newProduct = await Product.create(body);
        console.log("✅ Product successfully saved in DB:", newProduct._id);

        // Naya product add hote hi Next.js cache delete karke naya data dikhayega
        revalidatePath('/'); 
        revalidatePath('/shop'); 
        revalidatePath('/godmode'); 
        revalidatePath('/godmode/products'); // Extra safety

        return NextResponse.json({ success: true, data: newProduct }, { status: 201 });

    } catch (error: any) {
        // 🚀 ADVANCED LOGGING: Agar Mongoose kisi field se naraaz hoga toh exact reason terminal mein print karega
        console.error("❌ POST Products Error:", {
            message: error.message,
            errors: error.errors || 'No detailed validation errors'
        });
        return NextResponse.json(
            { success: false, error: 'Failed to add product: ' + error.message }, 
            { status: 500 }
        );
    }
}