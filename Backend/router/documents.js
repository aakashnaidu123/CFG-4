const express = require('express');
const router = express.Router();
const multer = require('multer');
const documentController = require('../controllers/documentController');
const { authenticateToken } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure the 'uploads' directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload a document for a project
router.post('/', authenticateToken, upload.single('document'), documentController.uploadDocument);

// Get all documents for a specific project
router.get('/project/:projectId', authenticateToken, documentController.getProjectDocuments);

module.exports = router;
