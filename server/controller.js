const multer = require('multer');
const { processResumeUpload } = require('./service');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const isPdf = file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf');

    if (!isPdf) {
      return cb(new Error('Only PDF files are allowed.'));
    }

    cb(null, true);
  },
});

async function healthCheck(req, res) {
  return res.status(200).json({
    success: true,
    message: 'Server is running',
  });
}

async function uploadResume(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded.',
      });
    }

    const document = await processResumeUpload(req.file);

    return res.status(200).json({
      success: true,
      message: 'Resume uploaded and processed successfully.',
      fileName: document.fileName,
      size: document.size,
      extractedText: document.extractedText,
      pages: document.pages,
      uploadedAt: document.uploadedAt,
    });
  } catch (error) {
    console.error('Resume upload error:', error);

    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to process the uploaded PDF.',
      error: error.message || 'Unknown error',
    });
  }
}

module.exports = {
  upload,
  healthCheck,
  uploadResume,
};
