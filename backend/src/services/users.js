import bcrypt from 'bcrypt';
import { User } from '../db/models/user.js';
import jwt from 'jsonwebtoken';

export async function createUser({ username, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ username, email, password: hashedPassword })
    return await user.save()
}

export async function loginUser({ username, password }) {
    try {
      // Find user by username
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('Invalid credentials');
      }
  
      // Check if the password is correct
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        throw new Error('Invalid credentials');
      }
  
      // Create JWT token
      const token = jwt.sign({ sub: user._id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });
  
      // Return the token
      return { token };
    } catch (error) {
      // Optionally, add custom error logging here
      throw new Error('Login failed, please check your credentials and try again');
    }
}

export async function getUserInfoById(userId) {
  try {
    const user = await User.findById(userId)
    if (!user) return { username: userId }
    return { username: user.username }
  } catch (err) {
    return { username: userId }
  }
}