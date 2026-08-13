import { whatsappClient } from "../index.js";

export const postContact = async (req, res) => {
    try {
        console.log("========== CONTACT API ==========");
        console.log("Request body:", req.body);

        const { name, email, subject, message, phone } = req.body;

        console.log("Name:", name);
        console.log("Phone:", phone);
        console.log("Email:", email);
        console.log("Subject:", subject);
        console.log("Message:", message);

        if (!name || !phone || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                error: "All fields are required",
                received: req.body
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

        console.log("WhatsApp Client:", !!whatsappClient);
        console.log("Sending WhatsApp message...");

        await whatsappClient.sendMessage(myWhatsAppId, text);

        console.log("WhatsApp message sent successfully");

        return res.status(200).json({
            success: true,
            message: "Notification sent!"
        });

    } catch (error) {
        console.error("========== WHATSAPP ERROR ==========");
        console.error(error);
        console.error("Message:", error?.message);
        console.error("Stack:", error?.stack);

        return res.status(500).json({
            success: false,
            error: "Failed to send notification",
            details: error?.message
        });
    }
};