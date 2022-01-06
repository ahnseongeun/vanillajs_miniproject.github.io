const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(message) {
    const ul = room.querySelector("ul");
    const li = document.createElement(li);
    li.innerText = message;
    ul.appendChild(li);
}

function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`
}

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", { payload: input.value },showRoom);
    roomName = input.value;
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
socket.on("welcome", () => {
    addMessage("someone joined!!");
});


/*
const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
    console.log("Connected to Server ");
})

socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.appendChild(li);
    console.log("Just got this: ", message.data, " from the server");
}); 

socket.addEventListener("close", () => {
    console.log("Disconntected Server");
})

function makeMessage(type, payload) {
    const msg = {type, payload}
    return JSON.stringify(msg);
}

//서로 다른 브라우저는 메시지를 주고받지 못한다.
//각각의 브라우저마다 실행된다.
function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    input.value = ""; 
}

//String으로 보내는 이유는 서버가 무엇일지 모르기 때문이다.
//모든 서버에서는 String으로 받아서 그 String을 알맞게 처리한다.
function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    //String을 보내야되닌깐 보낼때는 JSON.Stringify 사용
    socket.send(makeMessage("nickname", input.value));
    input.value = "";
}

messageForm.addEventListener("submit",handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);

/*
setTimeout(() => {
    socket.send("hello from the browser!");
}, 1000);
*/