import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).json({ message: 'User already exists with this email' });

    const hashedPass = await bcrypt.hash(password, 12);
    const user = await User.create({ username, email, password: hashedPass });
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};