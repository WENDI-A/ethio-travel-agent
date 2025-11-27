export function bookingConfirmationEmail({
    userName,
    tourName,
    bookingDate,
    numberOfPeople,
    totalPrice,
}: {
    userName: string;
    tourName: string;
    bookingDate: string;
    numberOfPeople: number;
    totalPrice: number;
}) {
    return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
        .button { display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🇪🇹 Booking Confirmed!</h1>
        </div>
        <div class="content">
            <p>Dear ${userName},</p>
            <p>Thank you for booking with Ethio Travel! Your tour booking has been confirmed.</p>
            
            <div class="details">
                <h3>Booking Details</h3>
                <div class="detail-row">
                    <span><strong>Tour:</strong></span>
                    <span>${tourName}</span>
                </div>
                <div class="detail-row">
                    <span><strong>Date:</strong></span>
                    <span>${bookingDate}</span>
                </div>
                <div class="detail-row">
                    <span><strong>Number of People:</strong></span>
                    <span>${numberOfPeople}</span>
                </div>
                <div class="detail-row">
                    <span><strong>Total Price:</strong></span>
                    <span>$${totalPrice}</span>
                </div>
            </div>
            
            <p>Please complete your payment to secure your booking.</p>
            <center>
                <a href="${process.env.NEXTAUTH_URL}/bookings" class="button">View My Bookings</a>
            </center>
            
            <p>If you have any questions, please don't hesitate to contact us.</p>
            <p>Best regards,<br>The Ethio Travel Team</p>
        </div>
        <div class="footer">
            <p>© ${new Date().getFullYear()} Ethio Travel. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `;
}

export function paymentConfirmationEmail({
    userName,
    tourName,
    amount,
}: {
    userName: string;
    tourName: string;
    amount: number;
}) {
    return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .success-icon { font-size: 48px; text-align: center; margin: 20px 0; }
        .amount { font-size: 32px; color: #10b981; text-align: center; font-weight: bold; margin: 20px 0; }
        .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Payment Successful!</h1>
        </div>
        <div class="content">
            <div class="success-icon">🎉</div>
            <p>Dear ${userName},</p>
            <p>Your payment has been successfully processed!</p>
            
            <div class="amount">$${amount}</div>
            
            <p><strong>Tour:</strong> ${tourName}</p>
            
            <p>Your booking is now fully confirmed. We look forward to providing you with an amazing experience in Ethiopia!</p>
            
            <p>You will receive a reminder email one day before your tour.</p>
            
            <p>Best regards,<br>The Ethio Travel Team</p>
        </div>
        <div class="footer">
            <p>© ${new Date().getFullYear()} Ethio Travel. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `;
}

export function welcomeEmail({ userName }: { userName: string }) {
    return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🇪🇹 Welcome to Ethio Travel!</h1>
        </div>
        <div class="content">
            <p>Dear ${userName},</p>
            <p>Welcome to Ethio Travel - your gateway to discovering the wonders of Ethiopia!</p>
            
            <p>We're excited to have you join our community of travelers. With Ethio Travel, you can:</p>
            <ul>
                <li>🏛️ Explore Ethiopia's most beautiful cities</li>
                <li>🎫 Book curated tour packages</li>
                <li>🤖 Get personalized recommendations from our AI assistant</li>
                <li>📅 Manage your bookings easily</li>
            </ul>
            
            <p>Start exploring now and discover your next adventure!</p>
            
            <p>Best regards,<br>The Ethio Travel Team</p>
        </div>
        <div class="footer">
            <p>© ${new Date().getFullYear()} Ethio Travel. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `;
}
