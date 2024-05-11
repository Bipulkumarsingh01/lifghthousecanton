const express = require('express'); 

const app =express();

app.get('/',(req,res)=>{
  res.send('server is working fine');
});

app.post('/subbmit',(req,res)=>{
  res.send('subbmited sucessfullyy');
});

const port =3000; // define the port 
app.listen(port,()=>{
  console.log(`Server is listening on  this port ${port}`);
});