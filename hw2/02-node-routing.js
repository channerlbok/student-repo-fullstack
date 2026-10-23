const http = require('http');

const port = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');

  switch (pathname) {
    case '/welcome':
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>Welcome! Make yourself at home.</h1>');
      break;
    case '/redirect':
      res.writeHead(302, { Location: '/redirected' });
      res.end();
      break;
    case '/redirected':
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>You made it to the redirected page.</h1>');
      break;
    case '/cache':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=86400',
      });
      res.end('<p>this resource was cached</p>');
      break;
    case '/cookie':
      res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Set-Cookie': 'hello=world',
      });
      res.end('cookies… yummm');
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404 - page not found</h1>');
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
