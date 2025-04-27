const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:8010',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['X-Request-Id']
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
    const data = require('./data/articles_db.json');
    const article = res.json(data).find(item => item._id === req.params.id);
    if (!article) {
      return res.status(404).json({ 
        error: 'Article not found',
        status: 404
      });
    }

    const fields = req.query.fields?.split(',') || [];
    const response = {};

    fields.forEach(field => {
      if (field === 'madeIn') {
        response.madeIn = {
          title: article.madeIn?.title || 'Не указано',
          code: article.madeIn?.code || 'N/A'
        };
      } else if (field === 'category') {
        response.category = {
          title: article.category?.title || 'Без категории'
        };
      } else {
        response[field] = article[field];
      }
    });

    res.json({ result: response });

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