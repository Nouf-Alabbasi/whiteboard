// initializing express app
let express = require("express");
let app = express();

app.use("/", express.static("public"));

// creating an http server ON the express ap
let http = require("http")
let server = http.createServer(app);

server.listen(5000, () => {
  console.log("listening on 5000");
})


// add socket on top of the http server
let io = require("socket.io");
io = new io.Server(server);

io.sockets.on("connect", (socket)=>{
  console.log("New Connection: ", socket.id);

  // when server gets data from C
  socket.on("mouseData", (data) =>{
    console.log(data);
    io.sockets.emit("serverData",data);
  })

  // for when C disconnects
  socket.on("disconnect", ()=>{
    console.log("Socket Disconnected: ", socket.id);
  })
})


/*information flow

✅ C - initiate conncetion to S
✅ S - recognise a C connection and ack when C connects
C - ack, when connection has been established

On to the whiteboard

C - emit mouseX, mouseY ("mouseData") to server
S - .on getting "mouseData", .emits to all C "serverData" (this is hte same as mousedata)
C - .on getting "serverData", draw ellipse

*/