const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5001;

app.use(express.urlencoded({ extended: false }));

app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, '04-form.html'));
});

app.post('/submit', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const comments = req.body.comments;
  const newsletter = req.body.newsletter;

  res.json({
    username,
    email,
    comments,
    newsletter: newsletter === 'yes',
  });
});

app.use((req, res) => {
  res.status(404).type('html').send('<h1>404 - page not found</h1>');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
