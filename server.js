// server.js
// Custom Next.js server for debugging and deployment

const { createServer } = require('http');
const next = require('next');

const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, hostname: host, port });
const handle = app.getRequestHandler();

console.log('DEBUG: Starting custom Next.js server...');
console.log('DEBUG: process.env.PORT =', process.env.PORT);
console.log('DEBUG: process.env.HOST =', process.env.HOST);
console.log('DEBUG: NODE_ENV =', process.env.NODE_ENV);
console.log('DEBUG: All env:', process.env);

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, host, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${host}:${port}`);
  });
});
