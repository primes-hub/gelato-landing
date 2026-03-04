#!/usr/bin/env node

/**
 * Simple HTTP Server for Gelato Landing Project
 * Usage: node server.js
 * Access: http://localhost:8000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 8000;
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.pdf': 'application/pdf',
  '.zip': 'application/zip',
  '.txt': 'text/plain',
  '.xml': 'application/xml'
};

const server = http.createServer(async (req, res) => {
  // Parse the URL
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // Handle root path
  if (pathname === '/') {
    pathname = '/index.html';
  }

  // Build the file path
  const filepath = path.join(__dirname, pathname);

  // Security: prevent directory traversal
  const realpath = path.resolve(filepath);
  const basedir = path.resolve(__dirname);
  
  if (!realpath.startsWith(basedir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  // Check if file exists
  fs.stat(filepath, (err, stats) => {
    if (err || !stats.isFile()) {
      // If file not found and it's not a file request, try index.html
      if (stats && stats.isDirectory()) {
        const indexPath = path.join(filepath, 'index.html');
        fs.readFile(indexPath, (err, data) => {
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1><p>Requested resource not found: ' + req.url + '</p>');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        });
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1><p>Requested resource not found: ' + req.url + '</p>');
      }
      return;
    }

    // Get file extension
    const ext = path.extname(filepath).toLowerCase();
    const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

    // Read and send the file
    fs.readFile(filepath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Server Error');
        return;
      }

      // Set headers
      const headers = {
        'Content-Type': mimeType,
        'Access-Control-Allow-Origin': '*'
      };

      // Cache control for static assets
      if (['.css', '.js', '.png', '.jpg', '.gif', '.svg', '.woff', '.woff2', '.ttf'].includes(ext)) {
        headers['Cache-Control'] = 'public, max-age=3600';
      } else if (ext === '.html') {
        headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
      }

      res.writeHead(200, headers);
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║          Gelato Landing - Local Development Server             ║
╚════════════════════════════════════════════════════════════════╝

✅ Server started successfully!

📍 Open your browser and navigate to:
   👉 http://localhost:${PORT}

📁 Project directory: ${__dirname}

🛑 To stop the server: Press Ctrl+C

🔧 Features:
   ✓ All CSS files loading correctly
   ✓ No file:// protocol errors
   ✓ Cookie support enabled
   ✓ CORS enabled
   ✓ Live file serving

⚡ TIP: Use Ctrl+Shift+R in your browser to hard refresh
       and bypass any cached resources.

${PORT !== 8000 ? `
⚠️  Using port ${PORT} instead of 8000.
   Make sure to use: http://localhost:${PORT}
` : ''}
  `);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Server shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server stopped.');
    process.exit(0);
  });
  
  // Force exit after 5 seconds
  setTimeout(() => {
    process.exit(1);
  }, 5000);
});
