const inputMsg = document.querySelector('.input-chat')
const sendBtn = document.querySelector('.material-icons')
const chatContainer = document.querySelector('.msg-container')
const msgSender = document.querySelector('.msg-sender')
const msgReceiver = document.querySelector('.msg-receiver')
const spanSender = document.querySelector('.span-sender')
const spanReceiver = document.querySelector('span-receiver')
const msgTime = document.querySelector('.time')
const socket = io("localhost:3000");

function createParentChatDiv(option) {
  const chatParent = document.createElement('div')
  chatParent.className =  option ? 'chat-sender' : 'chat-receiver'
  const chatChild = document.createElement('div')
  chatChild.className = option ? 'msg-sender' : 'msg-receiver'
  chatParent.appendChild(chatChild)
  chatContainer.appendChild(chatParent)
  return chatChild
}

function elementCreate(value, option) {
  
  const chatMsg = document.createElement('span')
  chatMsg.className = option ? 'span-sender' : 'span-receiver'
  chatMsg.innerText = value
  const chatChild = createParentChatDiv(option)
  chatChild.appendChild(chatMsg)
  const breaker = document.createElement('br')
  chatMsg.appendChild(breaker)
  const timeMsg = document.createElement('small')
  timeMsg.className = 'time'
  timeMsg.innerText = getTime()
  chatMsg.appendChild(timeMsg)

}

function sendNewMsg() {
  elementCreate(inputMsg.value, false)
  socket.emit('sender', { message:  inputMsg.value })
  inputMsg.value = ''
  inputMsg.focus()
  scrollDown()
}

sendBtn.addEventListener('click', () => {
  if (inputMsg.value.trim().length >= 1) {
    sendNewMsg()
  }
})

inputMsg.addEventListener('keydown', (enter) => {
  if (enter.keyCode === 13 && inputMsg.value.trim().length >= 1) {
    sendNewMsg()
  }
})

socket.on('receive_broadcast', ({ message }) => {
  // função de scrollDown para o recebedor da msg quando estiver com o socket rodando 
  elementCreate(message, true)
  scrollDown()
})

function getTime() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  hours = hours < 10 ? '0'+ hours : hours; 
  minutes = minutes < 10 ? '0'+ minutes : minutes;

  return `${hours}:${minutes}`
}  

function scrollDown() {
  chatContainer.scrollTop = chatContainer.scrollHeight;
}