const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/messageController');
const auth = require('../middleware/auth');

router.post('/', sendMessage);
router.get('/', auth, getMessages); // Admin paneli için

module.exports = router; 