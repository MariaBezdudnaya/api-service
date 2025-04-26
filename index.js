const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/categories', (req, res) => {
  res.sendFile(__dirname + '/data/categories_db.json');
});

app.get('/api/articles', (req, res) => {
  res.sendFile(__dirname + '/data/articles_db.json');
});

app.get('/api/users', (req, res) => {
  res.sendFile(__dirname + '/data/users_db.json');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});