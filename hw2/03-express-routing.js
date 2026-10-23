const express = require('express');

const app = express();
const port = process.env.PORT || 5001;

app.get('/welcome', (req, res) => {
  res.status(200).type('html').send('<h1>Welcome! Make yourself at home.</h1>');
});

app.get('/redirect', (req, res) => {
  res.redirect(302, '/redirected');
});

app.get('/redirected', (req, res) => {
  res.type('html').send('<h1>You made it to the redirected page.</h1>');
});

app.get('/cache', (req, res) => {
  res.set('Cache-Control', 'public, max-age=86400');
  res.type('html').send('<p>this resource was cached</p>');
});

app.get('/cookie', (req, res) => {
  res.cookie('hello', 'world');
  res.type('text').send('cookies… yummm');
});

app.use((req, res) => {
  res.status(404).type('html').send('<h1>404 - page not found</h1>');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
