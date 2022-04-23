const express=require('express')
const app=express()
const bodyParser=require('body-parser')
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
app.use(bodyParser.urlencoded({limit:'5mb'}))



io.on('connection',(socket)=>{

io.emit('online',true)

//join
socket.on('join',(res)=>{
  let data={username:res,text:`${res} jast join`}
 msg.push(data) 
 io.emit('show',msg)
 // console.log(user)
})

//show msg
io.emit('show',msg)

//send msg
socket.on('msg',(res)=>{
msg.push(res)
console.log(msg)
io.emit('show',msg)
})
 socket.on('file',(res)=>{
msg.push(res)
console.log(msg)
io.emit('show',msg)
 })
 
 
 socket.on('disconnect', ()=>{
   console.log('disconnect')
   });
})



http.listen(process.env.PORT||3030, function() {
   console.log('listening on *:3030');
});