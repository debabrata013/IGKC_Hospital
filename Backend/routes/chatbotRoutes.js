const express = require('express');
const { chatWithBot } = require('../controllers/chatbotController');

const router = express.Router();

// POST route to interact with the chatbot
router.post('/chat', chatWithBot);

module.exports = router;
