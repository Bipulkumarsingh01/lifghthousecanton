/*const fetch = require('isomorphic-fetch');
const redis = require('redis');

const apiUrl = 'https://jsonplaceholder.typicode.com/comments';
const redisClient = redis.createClient();

redisClient.on('error', (error) => {
  console.error('Redis error:', error);
});

(async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Store the data in Redis
    await new Promise((resolve, reject) => {
      redisClient.set('apiData', JSON.stringify(data), (error, result) => {
        if (error) {
          console.error('Error storing data in Redis:', error);
          reject(error);
        } else {
          console.log('Data stored in Redis successfully!');
          resolve(result);
        }
      });
    });

    // Close the Redis connection
    redisClient.quit();
  } catch (error) {
    console.error('Error:', error);
    // Close the Redis connection if an error occurs
    redisClient.quit();
  }
})(); */




  
  

const fetch = require('isomorphic-fetch');
const redis = require('redis');

const apiUrl = 'https://jsonplaceholder.typicode.com/comments';
const redisClient = redis.createClient();

redisClient.on('error', (error) => {
  console.error('Redis error:', error);
});

async function fetchDataAndStoreInRedis() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Store the data in Redis
    redisClient.set('apiUrl', JSON.stringify(data), (error, result) => {
      if (error) {
        console.error('Error storing data in Redis:', error);
      } else {
        console.log('Data stored in Redis successfully!');
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchDataAndStoreInRedis();
