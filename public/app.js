let text = document.querySelector("#chat");
let sendButton = document.querySelector("#sendButton");
let sendReset = document.querySelector("#sendReset");
let textMessage = document.querySelector("#textMessage");

let usersConnected = document.getElementById("counter");
let numClicksText = document.getElementById("clicksTxt");

const urlParams = new URLSearchParams(window.location.search);

let userClick = document.getElementById("userClick");
let usersAVG = document.getElementById("userAVG");
let mayorMenor = document.getElementById("MediaTop");
const socket = io();
var user_click = 0;
socket.on("message", (data) => {
    const d = document.createElement("div");
    const t = document.createTextNode(data.username + ": " + data.message);
    d.appendChild(t);
    text.appendChild(d);
});

socket.on("usuario conectado", (data) => {
    const d = document.createElement("div");
    d.classList.add("joined");
    const t = document.createTextNode(
        "El usuario " + data.username + " se ha conectado"
    );
    d.appendChild(t);
    text.appendChild(d);

    usersConnected.innerText = data.usersConnected;
});

socket.on("usuario desconectado", (data) => {
    const d = document.createElement("div");
    d.classList.add("joined");
    const t = document.createTextNode(
        "El usuario " + data.username + " se ha desconectado!"
    );
    d.appendChild(t);
    text.appendChild(d);

    usersConnected.innerText = data.usersConnected;
});

socket.on("connect", () => {
    socket.emit("iam", urlParams.get("user"));
});

socket.on("numero de usuarios", (data) => {
    usersConnected.innerText = data.usersConnected;
    numClicksText.innerHTML = data.numClicks;
});
socket.on("new click", (data) => {
    numClicksText.innerText = data.numClicks;
    usersAVG.innerText = data.numClicks/data.usersConnected;
    
});
socket.on("set AVG", (data) =>{
    var media = data.numClicks / data.usersConnected;

    if(media == user_click ){
        mayorMenor.innerText = "Tu media es igual a la media global";

    }else if(media > user_click ){
        mayorMenor.innerText = "Tu media es menor a la media global";
    }else{
        mayorMenor.innerText = "Tu media es mayor a la media global";
    }
})


sendButton.onclick = () => {
 
    document.getElementById("sendButton").style.marginLeft = Math.random() * (100 - 0) + 0+"%";
    user_click = userClick.innerText++;
    socket.emit("click", "");
    socket.emit("click user", () => {
        userClick.innerText++;
        });
        socket.emit("AVG", () => {
        });
    
};
sendReset.onclick= () => {

    socket.emit("reset", "");
    numClicksText.innerText = 0; 
    userClick.innerText = 0;
    usersAVG.innerText = 0;
};
socket.on("reset emit", () => {
    
    
    
    
});


