const express = require('express');
const { connectDB } = require('./db');
const { healthCheck, upload, uploadResume } = require('./controller');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/api/health', healthCheck);
app.post('/api/upload-resume', upload.single('resume'), uploadResume);

app.use((err, req, res, next) => {
  if (err instanceof require('multer').MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File exceeds the 5 MB limit.',
      });
    }

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || 'Invalid upload.',
    });
  }

  next();
});

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

startServer();

module.exports = app;
