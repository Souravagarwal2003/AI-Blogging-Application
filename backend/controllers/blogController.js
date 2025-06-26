import Blog from '../models/Blog.js';
import generateAIContent from '../utils/generateAIContent.js';

export const createBlogWithAI = async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });

  try {
    // Generate AI Content
    const content = await generateAIContent(title);

    // Simple SEO metadata generation for demonstration
    const seoData = {
      metaTitle: title,
      metaDescription: `${title} - AI generated blog content.`,
      keywords: title.split(' ').map((word) => word.toLowerCase()),
    };

    // Save blog
    const blog = await Blog.create({
      author: req.user._id,
      title,
      content,
      seoData,
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate blog content' });
  }
};

export const getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).json({ message: 'Server error' });
  }
};