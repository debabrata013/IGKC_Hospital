const axios = require('axios');

// Environment variables
const GEMINI_API_URL = 'https://api.gemini-ai.com/v1/chat'; // Replace with the actual Gemini AI endpoint
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Chatbot Controller
const chatWithBot = async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const response = await axios.post(
            GEMINI_API_URL,
            { input: message },
            {
                headers: {
                    Authorization: `Bearer ${GEMINI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Send chatbot response to client
        return res.status(200).json({ reply: response.data.reply });
    } catch (error) {
        console.error('Error in chatWithBot:', error.response?.data || error.message);
        return res.status(500).json({
            error: 'Failed to communicate with Gemini AI',
        });
    }
};

module.exports = { chatWithBot };
