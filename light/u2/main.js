const fs = require('fs');

const html = fs.readFileSync('./index.html', 'utf8');
const css = fs.readFileSync('./styel.css', 'utf8');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
