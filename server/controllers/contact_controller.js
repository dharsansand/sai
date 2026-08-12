import { whatsappClient } from "../index.js";

export const postContact = async (req, res) => {
    try {
        const { name, email, subject, message, phone } = req.body;

        // 1. Log for debugging
        console.log("New Contact Request:", req.body);

        // 2. Format the message for WhatsApp
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

        // 3. Your number to receive the notification
        // Format: CountryCode + Number + "@c.us"
        // Example for India: 919384428585@c.us
        const myWhatsAppId = "919384428585@c.us"; 

        // 4. Send the message
        await whatsappClient.sendMessage(myWhatsAppId, text);

        res.status(200).json({ success: true, message: "Notification sent!" });
    } catch (error) {
        console.error("WhatsApp Error:", error);
        res.status(500).json({ success: false, error: "Failed to send notification" });
    }
};