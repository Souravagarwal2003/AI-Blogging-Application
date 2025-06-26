import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true },
  content: { type: String, required: true }, // Markdown content
  seoData: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

export default mongoose.model('Blog', blogSchema);