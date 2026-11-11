const app = require('./app');
const port = process.env.PORT || 3001;
const server = app.listen(port);

server.on('listening', () => {
  console.log(`Countries: http://localhost:${server.address().port}/home`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error('This port is already in use. Change PORT in countries/.env.');
  } else {
    console.error(error.message);
  }
  process.exitCode = 1;
});
