const express = require('express');
const path = require('node:path');
const getCountries = require('./services/countries');

const MIN_POPULATION = 50_000_000;

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  res.render('home', { title: 'Explore our world' });
});

app.get('/countries', async (req, res) => {
  const countries = await getCountries();
  res.render('countries', { title: 'All countries', countries });
});

app.get('/populous', async (req, res) => {
  const countries = await getCountries();
  const populousCountries = countries.filter(
    (country) => typeof country.population === 'number' && country.population >= MIN_POPULATION,
  );
  populousCountries.sort((a, b) => b.population - a.population);

  res.render('populous', {
    title: 'Countries with at least 50 million people',
    countries: populousCountries,
  });
});

app.get('/regions', async (req, res) => {
  const countries = await getCountries();
  const regions = [];

  countries.forEach((country) => {
    const regionName = country.region?.trim() || 'Unknown region';
    let region = regions.find((item) => item.name === regionName);

    if (!region) {
      region = { name: regionName, countries: [] };
      regions.push(region);
    }

    region.countries.push(country.names?.common || 'Unnamed country');
  });

  regions.sort((a, b) => a.name.localeCompare(b.name));
  res.render('regions', { title: 'Countries by region', regions, total: countries.length });
});

app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Page not found',
    message: 'Choose a page from the navigation.',
  });
});

app.use((error, req, res, next) => {
  res.status(503).render('error', {
    title: 'Country data is unavailable',
    message: error.message,
  });
});

module.exports = app;
