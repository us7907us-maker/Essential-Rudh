import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/usertemp'; // Model path zaroor check kar lena
import bcrypt from 'bcryptjs'; // Password secure (hash) karne ke liye

export async function POST(req: Request) {
    try {
        const { email, otp, newPassword } = await req.json();
        await connectDB();

        const user = await User.findOne({ email });
        
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        // 1. OTP Check karo
        if (user.resetOtp !== otp) {
            return NextResponse.json({ success: false, message: "Invalid OTP! Please try again." }, { status: 400 });
        }

        // 2. OTP Expiry Check karo (10 mins wali condition)
        if (new Date() > new Date(user.otpExpiry)) {
            return NextResponse.json({ success: false, message: "OTP has expired. Please request a new one." }, { status: 400 });
        }

        // 3. Naya Password Secure karo aur Save karo
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        
        // 4. Purana OTP delete kar do taaki koi dobara use na kar paye
        user.resetOtp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        return NextResponse.json({ success: true, message: "Password updated successfully!" });

    } catch (error) {
        console.error("Reset Password Error:", error);
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
    }
}