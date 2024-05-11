const fetch = require('isomorphic-fetch');
const Jimp = require('jimp');
const redis = require('redis');

const imageUrl = 'https://i.dummyjson.com/data/products/2/thumbnail.jpg';

// Create a Redis client. Redis client is a software library or tool that allows applications to communicate with a Redis server
const client = redis.createClient();

fetch(imageUrl)
  .then(response => response.buffer())
  .then(buffer => {
    return Jimp.read(buffer);
  })
  .then(image => {
    return Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(font => {
      image.print(font, 10, 10, 'Hello, Image!').getBufferAsync(Jimp.MIME_JPEG)
        .then(imageBuffer => {
          // Store the image buffer in Redis
          client.set('imageData', imageBuffer, redis.print);
          console.log('Image data stored in Redis successfully!');
        })
        .catch(error => {
          console.log('Error:', error);
        });
        client.quit();
    });
  })
  .catch(error => {
    console.log('Error:', error);
  });
