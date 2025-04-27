const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
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
  const data = articles.find(item => item._id === req.params.id);
  res.json({
    result: data
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});