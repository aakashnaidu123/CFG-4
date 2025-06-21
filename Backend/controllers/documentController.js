const { Document } = require('../models');

exports.uploadDocument = async (req, res) => {
  try {
    const { project_id, name } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    
    const file_path = `/uploads/${req.file.filename}`;

    const doc = await Document.create({
      name,
      file_path,
      project_id,
      uploader_id: req.user.id,
    });

    res.status(201).json({ message: 'Document uploaded successfully', doc });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
};

exports.getProjectDocuments = async (req, res) => {
  try {
    const docs = await Document.findAll({ where: { project_id: req.params.projectId } });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching documents', details: err.message });
  }
};
