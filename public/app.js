// conenct to the socket
let socket = io();
socket.on("connect",()=>{
    console.log("Connection established to server via socket")
})

// get the data
socket.on("serverData", (data)=>{
    // console.log(data);
    drawPainting(data);
})

// draw and send information
let Height = window.innerHeight;
let Width = window.innerWidth;
function setup() {
    var canvas = createCanvas(Width-50,Height-50);
    canvas.parent('container');
    // background("#FEFFFB");
    stroke("#787878");
    strokeWeight(10)
    fill("#FEFFFB");
    // rectMode(CENTER);
    // rect(Width/2,Height/2,Width-50, Height-50,10);
    rect(5,5,Width-60, Height-60,10);
    stroke("red");
    strokeWeight(10)
}

function mouseDragged(){
    // line(mouseX, mouseY, pmouseX, pmouseY);

    let mouseObj = {
        x : mouseX,
        y : mouseY,
        px : pmouseX,
        py : pmouseY
    }

    socket.emit("mouseData", mouseObj);
}

function drawPainting(data){
    line(data.x,data.y, data.px, data.py);
}