const form = document.querySelector("form");
const request = io();
const messageInput = document.getElementById('msg')
const temp = document.querySelector("template").content;
const contain = document.querySelector(".container");
let name = prompt("enter the name");
if(name.trim()==='')
{
while(name.trim()=='')
{ 
 name = prompt("Please enter the name");
}
}
function appendMsg(sender, data,dir) {
    const bubble = document.createElement("div");
    const audio=document.createElement('audio');
    audio.setAttribute('src',sender==='admin'?'./Water-Bloop-8CloseDistance-www.FesliyanStudios.com.mp3':'./mixkit-santa-claus-ho-ho-ho-laughing-418.wav');
    bubble.className = "chat-container";
    bubble.innerHTML = 
 `<div class="chat-bubble">
  <p class="user">${sender}</p>
  <p class="msg">${data}</p>
</div>`;
const chatbub=bubble.querySelector('.chat-bubble');
if(dir==='right')
chatbub.style.backgroundColor='pink';
if(sender==='admin')
chatbub.style.backgroundColor='rosybrown'

chatbub.style.float=dir;
if(data.length>100)
{
bubble.style.wordBreak='break-all';
}
contain.appendChild(bubble);
h=audio.play();
console.log(h)
bubble.scrollIntoView(true);
}

request.emit("newUserJoined", name);

request.on("userJoined", (data) => {
    appendMsg("admin",` ${data.name} has joined`);
  
});

request.on("recieved", (data) => {
    appendMsg(data.name,data.message,'left');
});

form.addEventListener('submit',()=>{
    event.preventDefault(true);
    const msg=messageInput.value;
    if(messageInput.value.trim()==='')
    {return;
    }
    arr=[]
    messageInput.value='';
    appendMsg('You',msg,'right')      
  
    request.emit('send',msg,'right');
})
