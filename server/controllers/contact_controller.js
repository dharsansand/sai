import { whatsappClient } from "../index.js";

export const postContact = async (req, res) => {
    try {
        console.log("========== CONTACT API ==========");
        const { name, email, subject, message, phone } = req.body;

        // 1. Check if WhatsApp is actually connected
        // If whatsappClient.info is undefined, it means you are NOT logged in.
        if (!whatsappClient || !whatsappClient.info || !whatsappClient.info.wid) {
            console.error("❌ WhatsApp is not ready. sendMessage skipped.");
            return res.status(503).json({
                success: false,
                error: "WhatsApp service is not connected yet.",
                details: "Please scan the QR code at /api/whatsapp/qr first."
            });
        }

        const text = `
*📩 New Inquiry from Maison*
----------------------------
👤 *Name:* ${name}
📞 *Phone:* ${phone}
📧 *Email:* ${email}
📋 *Subject:* ${subject}
💬 *Message:* ${message}
----------------------------
        `;

        const myWhatsAppId = "919384428585@c.us";

        // 2. Send the message
        await whatsappClient.sendMessage(myWhatsAppId, text);
        console.log("✅ WhatsApp message sent successfully");

        return res.status(200).json({
            success: true,
            message: "Notification sent!"
        });

    } catch (error) {
        console.error("========== WHATSAPP ERROR ==========");
        return res.status(500).json({
            success: false,
            error: "Failed to send notification",
            details: error?.message
        });
    }
};