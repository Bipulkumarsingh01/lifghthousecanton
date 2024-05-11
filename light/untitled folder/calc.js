const http = require('http');
const fs = require('fs');
const port = 3000; // change to the port you want to use

// read the HTML file using fs.readFile
fs.readFile('calc.html', function (err, html) {
  if (err) {
    throw err;
  }

  // create a server that listens on the specified port
  http.createServer(function (request, response) {
    // set the response header to indicate that the content is HTML
    response.writeHead(200, {'Content-Type': 'text/html'});

    // write the HTML file to the response
    response.write(html);

    // end the response
    response.end();
  }).listen(port);

  // log a message indicating that the server is running
  console.log(`Server running on port ${port}`);
});

