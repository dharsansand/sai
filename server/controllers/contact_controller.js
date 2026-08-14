

export const postContact = async (req, res) => {
    try {
        console.log("========== CONTACT API ==========");
        const { name, email, subject, message, phone } = req.body;

        

    } catch (error) {
        console.error("========== WHATSAPP ERROR ==========");
        return res.status(500).json({
            success: false,
            error: "Failed to send notification",
            details: error?.message
        });
    }
};