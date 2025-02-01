const axios = require('axios');

// Environment variables
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// IGKC Hospital Chatbot Controller
const chatWithBot = async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const hospitalFAQ = {
            "What are the visiting hours?": "Visiting hours are from 9 AM to 8 PM every day.",
            "How can I book an appointment?": "You can book an appointment via our website or by calling our reception.",
            "What services does the hospital offer?": "We offer general medicine, surgery, maternity, emergency services, and more.",
            "Where is the hospital located?": "IGKC Hospital is located at 123 Health St, Cityville.",
            "What insurance plans are accepted?": "We accept most major insurance plans. Please contact billing for details."
        };

        if (hospitalFAQ[message]) {
            return res.status(200).json({ reply: hospitalFAQ[message] });
        }

        const response = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [{ text: message }]
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // Extract the chatbot's reply
        const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I don't have an answer to that. Please contact hospital staff for more details.";

        return res.status(200).json({ reply });
    } catch (error) {
        console.error('Error in chatWithBot:', error.response?.data || error.message);
        return res.status(500).json({
            error: 'Failed to communicate with Gemini AI',
            details: error.response?.data || error.message,
        });
    }
};

module.exports = { chatWithBot };
