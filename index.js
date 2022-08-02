const io = require("socket.io")(8900, {
  cors: {
    origin: "http://10.146.12.71:3000",
  },
});

let user=[]
//function
let addUser=(uid,sid)=>{
  if (user.some((n)=>n.uid==uid)) {
    user=user.filter((n)=>n.uid!=uid)
    user.push({uid,sid})
    console.log('change',user)
  }else{
  user.push({uid,sid})
  console.log('set',user)
  }
}
let removeUser=(sid)=>{
  user=user.filter((n)=>n.sid!=sid)
  console.log('disconnect',user)
}
//socket
io.on("connection", (socket) => {
  io.emit("online", true);

  //join
  socket.on("join", (res) => {
    let data = { username: res, text: `${res} jast join` };
    io.emit("show", data);
    addUser(res,socket.id)
    io.emit('many',user)
  });

  //show msg
  //io.emit('show',msg)

  //send msg
  socket.on("msg", (res) => {
    io.emit("show", res);
    console.log(res)
  });
  socket.on("file", (res) => {
    io.emit("show", res);
    console.log(res)
  });

  socket.on("disconnect", () => {
    console.log("disconnect");
    removeUser(socket.id)
    io.emit('many',user)
  });
});
