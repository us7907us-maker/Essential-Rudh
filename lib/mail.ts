import nodemailer from 'nodemailer';

// 1. MAIN EMAIL FUNCTION (Sab emails yahi bhejega)
export const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Essential Rush" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${to}`);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

// 2. MISSING FUNCTION: RAZORPAY WEBHOOK KE LIYE (Order Confirmed)
export const sendOrderConfirmationEmail = async (email: string, data?: any, extra?: any) => {
    const html = `
        <div style="font-family: Arial, sans-serif; padding: 40px 20px; background-color: #0A0A0A; color: #ffffff; text-align: center;">
            <h2 style="color: #D4AF37; font-style: italic;">Essential Rush</h2>
            <h3 style="color: #4CAF50;">Payment Successful & Order Confirmed</h3>
            <p style="color: #cccccc;">Thank you for your acquisition. Your luxury timepiece is being prepared for dispatch.</p>
            <p style="color: #888888; font-size: 12px; margin-top: 30px;">We will notify you once your order is shipped.</p>
        </div>
    `;
    await sendEmail(email, "Order Confirmed - Essential Rush", html);
};

// 3. MISSING FUNCTION: REFERRAL REWARD KE LIYE
export const sendReferralRewardEmail = async (email: string, data?: any, extra?: any) => {
    const html = `
        <div style="font-family: Arial, sans-serif; padding: 40px 20px; background-color: #0A0A0A; color: #ffffff; text-align: center;">
            <h2 style="color: #D4AF37; font-style: italic;">Essential Rush</h2>
            <h3 style="color: #D4AF37;">Vault Reward Received!</h3>
            <p style="color: #cccccc;">Congratulations! A referral reward has been successfully added to your Vault balance.</p>
            <p style="color: #888888; font-size: 12px; margin-top: 30px;">You can use this balance on your next acquisition.</p>
        </div>
    `;
    await sendEmail(email, "Vault Reward Added - Essential Rush", html);
};