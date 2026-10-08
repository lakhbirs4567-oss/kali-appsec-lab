const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const { doubleCsrf } = require('csrf-csrf');

const app = express();

// Security & Parsing Middleware
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser('super-secret-csrf-key-12345'));

// Anti-CSRF Double-Submit Configuration
const { doubleCsrfProtection, generateToken } = doubleCsrf({
  getSecret: () => 'super-secret-csrf-key-12345',
  cookieName: 'x-csrf-token',
  cookieOptions: { sameSite: 'strict', secure: false, httpOnly: true },
  getTokenFromRequest: (req) => req.headers['x-csrf-token']
});

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// CSRF Token Endpoint
app.get('/api/csrf-token', (req, res) => {
  const csrfToken = generateToken(req, res);
  res.json({ csrfToken });
});

// Protected Endpoints
app.get('/', (req, res) => {
  res.json({ status: 'Secure API Active', system: 'Kali AppSec Lab' });
});

// Apply doubleCsrfProtection middleware to state-changing routes
app.post('/api/login', doubleCsrfProtection, (req, res) => {
  const { username } = req.body;
  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Invalid payload structure' });
  }
  res.json({ message: `Session initialized for user: ${username}` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`[+] Hardened server running on http://localhost:${PORT}`));
