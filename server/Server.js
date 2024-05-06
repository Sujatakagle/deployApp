const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; 

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());

const baseUrl = 'http://localhost:5000';
const urlDatabase = {};

app.post('/encodeurl', (req, res) => {
  const longURL = req.body.longURL;
  if (!longURL || !longURL.startsWith('http')) {
    return res.status(400).json({ error: 'Invalid URL. URL must start with "http" or "https".' });
  }

  const shortCode = generateShortCode();
  const shortURL = baseUrl + '/' + shortCode;

  urlDatabase[shortCode] = longURL;

  res.json({ shortURL });
});

app.get('/:shortCode', (req, res) => {
  const shortCode = req.params.shortCode;
  const longURL = urlDatabase[shortCode];

  if (!longURL) {
    return res.status(404).json({ error: 'Invalid or expired URL.' });
  }

  res.redirect(longURL);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function generateShortCode() {
  let code = '';
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const shortURLLength = 6;
  for (let i = 0; i < shortURLLength; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}
