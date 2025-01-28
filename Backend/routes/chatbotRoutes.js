const express = require('express');
const { chatWithBot, trainBot } = require('../controllers/chatbotController');

const router = express.Router();

// POST route for chatbot interaction
router.post('/chat', chatWithBot);

// POST route for chatbot training
router.post('/train', trainBot);

module.exports = router;
