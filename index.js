const express=require('express')
const app=express()
const http = require('http').Server(app);
const io=require('socket.io')(http,
{cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }})
app.get('/', function(req, res) {
   res.send('hello world')
});
let user=[]
let msg=[]

//function



io.on('connection',(socket)=>{

io.emit('online',true)

//join
socket.on('join',(res)=>{
  let data={username:res,text:`${res} jast join`}
 io.emit('show',data)
 // console.log(user)
})

//show msg
//io.emit('show',msg)

//send msg
socket.on('msg',(res)=>{
io.emit('show',res)
})
 socket.on('file',(res)=>{
io.emit('show',res)
 })
 
 
 socket.on('disconnect', ()=>{
   console.log('disconnect')
   });
})



http.listen(process.env.PORT||3030, function() {
   console.log('listening on *:3030');
});