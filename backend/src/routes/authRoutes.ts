import { Router } from 'express';
import { User } from '../models/userModels';
import jwt from 'jsonwebtoken';
import { config } from '../config';

const router = Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login and get JWT token
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ message: 'Invalid username or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });
    res.status(200).send({ token });
  } catch (err) {
    res.status(400).send(err);
  }
});

export { router as authRoutes };
