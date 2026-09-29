const pdf = require('pdf-parse');
const { connectDB } = require('./db');

async function processResumeUpload(file) {
  if (!file) {
    throw new Error('No file uploaded.');
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File exceeds the 5 MB limit.');
  }

  if (file.mimetype !== 'application/pdf' && !file.originalname.toLowerCase().endsWith('.pdf')) {
    throw new Error('Only PDF files are allowed.');
  }

  const parsedPdf = await pdf(file.buffer);
  const db = await connectDB();

  const resumeRecord = {
    fileName: file.originalname,
    size: file.size,
    mimeType: file.mimetype,
    extractedText: parsedPdf.text || '',
    pages: parsedPdf.numpages || 0,
    uploadedAt: new Date(),
  };

  const result = await db.collection('resumes').insertOne(resumeRecord);

  return {
    ...resumeRecord,
    _id: result.insertedId,
  };
}

module.exports = {
  processResumeUpload,
};
