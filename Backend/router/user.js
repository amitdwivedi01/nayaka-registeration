const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadController = require('../controller/user');

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Register API route
router.post('/register', uploadController.register);

// Upload API route
router.post('/upload', uploadController.upload);
router.post('/details', uploadController.details);
router.get('/users', uploadController.getAllUsers);
router.post('/login', uploadController.login);

// Handle multiple file uploads for uploaddoc route using Multer
router.post('/uploaddoc', upload.fields([
    { name: 'visa' },
    { name: 'ticket' }
]), uploadController.uploadDocuments);

module.exports = router;
