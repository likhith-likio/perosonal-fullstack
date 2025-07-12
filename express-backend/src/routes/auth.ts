import express from 'express';
import { db } from '../config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/auth';
import dotenv from 'dotenv'
dotenv.config()


const router = express.Router();

router.post('/login', async (req, res) => {
  console.log("login called!");
  const { email, password } = req.body;

  const [rows]: any = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  const user = rows[0];

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });

  res.json({ token });
});

router.get('/users', verifyToken, async (req, res) => {
   console.log("/users called!");
  const [rows]: any = await db.query('SELECT id, first_name, last_name, email, dob, created_at, updated_at FROM users');
  res.json(rows);
});

// Express route
router.get("/validate-token", (req, res) => {
  console.log("/validate-token called!");
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(401).json({ message: "No token" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    return res.json({ valid: true })
  } catch (err) {
    return res.status(401).json({ valid: false })
  }
})



export default router;
