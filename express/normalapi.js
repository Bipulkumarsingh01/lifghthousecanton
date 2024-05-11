const fetch = require('isomorphic-fetch');
const express = require('express'); 

const apiUrl = 'https://jsonplaceholder.typicode.com/comments';

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data); // Do something with the fetched data
  })
  .catch(error => {
    console.log('Error:', error);
  });
