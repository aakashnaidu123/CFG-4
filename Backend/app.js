const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./router/auth'));
app.use('/api/tasks', require('./router/tasks'));
app.use('/api/documents', require('./router/documents'));
app.use('/api/feedback', require('./router/feedback'));
app.use('/api/projects', require('./router/projects'));

module.exports = app;
