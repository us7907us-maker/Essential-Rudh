import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Order } from '@/models/Order';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        const newOrder = await Order.create({
            orderId: `ORD-${Date.now().toString().slice(-6)}`,
            customer: {
                name: `${body.customerInfo.firstName} ${body.customerInfo.lastName}`,
                email: body.customerInfo.email,
                phone: body.customerInfo.phone,
            },
            shippingData: body.customerInfo,
            items: body.items,
            totalAmount: body.totalAmount,
            paymentStatus: body.paymentStatus || 'Paid',
            status: 'Processing',
            couponCode: body.couponCode || null,
            referralCode: body.referralCode || null,
            discountApplied: body.discountApplied || 0,
            isRewardCredited: false
        });

        // 🚀 MONGODB BYPASS: Pending Wallet
        if (body.referralCode) {
            const cleanCode = body.referralCode.trim().toUpperCase();
            const db = mongoose.connection.db; 

            if(db) {
                const agentUpdate = await db.collection('agents').updateOne(
                    { code: new RegExp(`^${cleanCode}$`, 'i') }, 
                    { $inc: { sales: 1 } }
                );

                if (agentUpdate.modifiedCount === 0) {
                    await db.collection('users').updateOne(
                        { myReferralCode: new RegExp(`^${cleanCode}$`, 'i') },
                        { $inc: { pendingWalletBalance: 100 } }
                    );
                    console.log(`✅ [CHECKOUT] Added ₹100 PENDING wallet for Link: ${cleanCode}`);
                }
            }
        }

        revalidatePath('/godmode'); 
        revalidatePath('/api/orders');

        return NextResponse.json({ success: true, order: newOrder });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}