const express=require('express');
const app=express();
const http=require('http');
const socket=require('socket.io');
const path=require('path');
const server=http.createServer(app);
const port=process.env.PORT||3000; 
var user=[];
let io=socket(server);
const filePath=path.join(__dirname,'/../public')
console.log(filePath);
app.use(express.static(filePath));
io.on('connection',(socket)=>{
  socket.on('newUserJoined',name=>{
    console.log(' a new user joined')
    user[socket.id]=name;
    socket.broadcast.emit('userJoined',{
      name:user[socket.id]
    });
  });
  socket.on('send',message=>{
    socket.broadcast.emit('recieved',{message:message,name:user[socket.id]})
  });
})



server.listen(port);
module.exports=io;