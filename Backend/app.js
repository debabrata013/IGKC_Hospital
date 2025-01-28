const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const chatbotRoutes = require('./routes/chatbotRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/chatbot', chatbotRoutes);

// Health check route
app.get('/', (req, res) => {
    res.send('Hospital Management System Backend is running.');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
