const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: [
    'http://localhost:8010',
    'https://your-client-domain.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.static('public'));

app.get('/api/categories', (req, res) => {
  const data = require('./data/categories_db.json');
  res.json(data);
});

app.get('/api/articles', (req, res) => {
  const data = require('./data/articles_db.json');
  res.json(data);
});

app.get('/api/users', (req, res) => {
  const data = require('./data/users_db.json');
  res.json(data);
});

app.get('/api/articles/:id', (req, res) => {
  try {
    const article = article.find(item => item._id === req.params.id);
    if (!article) {
      return res.status(404).json({ 
        error: 'Article not found',
        status: 404
      });
    }
    res.json({ result: article });
  } catch (e) {
    console.error('Ошибка сервера:', e);
    res.status(500).json({
      error: 'Internal Server Error',
      details: e.message
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});