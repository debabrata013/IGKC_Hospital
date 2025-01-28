const axios = require('axios');

// Environment variables
// const GEMINI_API_URL = 'https://api.gemini-ai.com/v1/chat'; // Replace with the actual Gemini AI endpoint
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
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


// // Environment variables
// const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Train Chatbot Controller
const trainBot = async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Training text is required' });
    }

    try {
        const response = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [{ text }],
                    },
                ],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // Handle success response
        return res.status(200).json({
            message: 'Training data submitted successfully',
            response: response.data,
        });
    } catch (error) {
        console.error('Error training the bot:', error.response?.data || error.message);
        return res.status(500).json({
            error: 'Failed to train the chatbot',
            details: error.response?.data || error.message,
        });
    }
};

module.exports = { chatWithBot, trainBot };



