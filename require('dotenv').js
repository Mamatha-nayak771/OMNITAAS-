require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rate limiting to prevent brute-force
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { message: 'Too many login attempts, please try later.' }
});

app.post('/login', loginLimiter, (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    return res.status(200).json({ message: 'Login successful' });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
