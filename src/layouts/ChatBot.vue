<template>
  <div class="chatbot" :class="{ open: isOpen, maximized: isMaximized }">
    <!-- Title bar -->
    <div class="title-bar">
      <div class="title">Chatbot</div>
      <div class="buttons">
        <button @click="minimizeChatbot">-</button>
        <button @click="toggleMaximize">{{ maximizeIcon }}</button>
        <button @click="closeChatbot">x</button>
      </div>
    </div>
    <div class="welcome-message" ref="welcomeMessage">
      Hi! I am Drona, your AI virtual assistant.<br>Ask me about Fintech?
    </div>
    <img src="https://gurukul.finvedic.com/images/monk.png" alt="" class="monk-image">
    <div class="chat-container-wrapper">
      <div class="chat-container" v-scroll-bottom>
        <!-- Messages -->
        <div class="messages">
  <div v-for="message in messages" :key="message.id" :class="message.type">
    <div class="message-container">
      <template v-if="message.type === 'incoming'" class="monk_icon">
        <img src="https://gurukul.finvedic.com/images/monk_half.png" alt="" style="width: 30px !important; background-color: #5479F7; border-radius: 50%;">
      </template>
     
      {{ message.text }}
      <!-- <template v-if="message.type === 'outgoing'" class="user_icon">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-heart user-icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" style="margin-left: auto;">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
          <path d="M6 21v-2a4 4 0 0 1 4 -4h.5" />
          <path d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z" />
        </svg>
      </template> -->
      
    </div>
  </div>
  <div v-if="isTyping" class="typing-preloader">
    <template v-if="isTyping" class="monk_icon" >
        <img src="https://gurukul.finvedic.com/images/monk_half.png" alt="" style="width: 30px !important; background-color: #5479F7; border-radius: 50%;">
      </template>
    Typing...</div>
</div>
      </div>
    </div>
    <!-- Input field for user to type messages -->
    <div class="input-container">
      <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Enter your Query..." class="input-field">
      <button @click="sendMessage" class="send-button">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg>
      </button>
    </div>
    <!-- Button to toggle chatbot visibility -->
    <button class="toggle-button" @click="toggleChatbot" ref="toggle_button" @mousedown="startDragging">
      <template v-if="isOpen">
        <img :src="isOpen ? 'https://gurukul.finvedic.com/images/monk_half.png' : 'https://gurukul.finvedic.com/images/monk_half_mirrored.png'" alt="Monk Icon" style="background-color: red;">
      </template>
      <template v-else>
        <img src="https://gurukul.finvedic.com/images/monk_half.png" alt="Person Icon" style="transform: scaleX(-1);">
      </template>
    </button>
  </div>
</template>
 
 <script>
 export default {
   data() {
     return {
       isOpen: false,
       newMessage: '',
       maximizeIcon: '□',
       messages: [],
       isDragging: false,
       xOffset: 0,
       yOffset: 0,
       isTyping: false,
       originalWelcomeMessage: "Hi! I am Drona, your AI virtual assistant.<br>Ask me about Fintech?"
  
     };
   },
   methods: {
     toggleChatbot() {
       this.isOpen = !this.isOpen;
       
     },
     minimizeChatbot() {
       this.isOpen = false;
     },
     toggleMaximize() {
       this.isMaximized = !this.isMaximized;
       this.maximizeIcon = this.isMaximized ? '▢' : '□'; // Change icon based on maximize state
       if (this.isMaximized) {
    const welcomeMessage = this.$refs.welcomeMessage;
    welcomeMessage.innerHTML = "Hi! I am Drona, your AI virtual assistant. Ask me about Fintech?";
  }
  else {
        const welcomeMessage = this.$refs.welcomeMessage;
        welcomeMessage.innerHTML = this.originalWelcomeMessage;
      }
     },
 
     closeChatbot() {
   this.isOpen = false;
   this.messages = []; // Clear all messages
   
 },
     sendMessage() {
    
       const message = this.newMessage.trim();
       if (!message) return;
        // Don't send empty messages
 // Check if message is empty before setting isTyping to true
 this.isTyping = message.length > 0;
       // Push the outgoing message to the messages array immediately
       const outgoingMessage = { text: message, type: 'outgoing', id: Date.now() };
       this.messages.push(outgoingMessage);
       console.log('Outgoing message:', outgoingMessage); // Log outgoing message
       this.newMessage = ''; // Clear the input field
       this.$nextTick(() => {
        const chatContainer = this.$el.querySelector('.chat-container');
        chatContainer.scrollTop = chatContainer.scrollHeight;
    });
 
       // Send the message to the API
       const formData = new FormData();
       const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
       const chatBotUrl = baseUrl +'api/bot/query'
       formData.append('query', message); // Append the query parameter
       formData.append('source', 'PORTAL'); // Append the source parameter
       fetch(chatBotUrl, {
         method: 'POST',
         body: formData // Send form data
       })
       .then(response => {
         if (!response.ok) {
           throw new Error('Network response was not ok');
         }
         return response.json();
       })
       .then(data => {
         // Handle the response from the API
         const responseData = data.data; // Extract the 'data' field from the API response
         const incomingMessage = { text: responseData, type: 'incoming', id: Date.now() };
         this.messages.push(incomingMessage);
         console.log('Incoming message:', incomingMessage); // Log incoming message
         this.isTyping = false; 
 
         // Scroll to the bottom of the chat container after receiving a new message
         this.$nextTick(() => {
           const chatContainer = this.$el.querySelector('.chat-container');
           chatContainer.scrollTop = chatContainer.scrollHeight;
         });
       })
       .catch(error => {
         console.error('There was a problem with the fetch operation:', error);
         // Optionally, you can add an error message to the messages array
         const errorMessage = { text: 'Error sending message', type: 'incoming', id: Date.now() };
         this.messages.push(errorMessage);
         console.log('Error message:', errorMessage); // Log error message
         this.isTyping = false;
       });
     },
     startDragging(event) {
       this.isDragging = true;
       const chatbot = this.$refs.toggle_button;
       const boundingBox = chatbot.getBoundingClientRect();
       this.xOffset = event.clientX - boundingBox.left;
       this.yOffset = event.clientY - boundingBox.top;
       document.addEventListener('mousemove', this.drag);
       document.addEventListener('mouseup', this.stopDragging);
     },
     drag(event) {
       if (this.isDragging) {
         const chatbot = this.$refs.toggle_button;
         chatbot.style.left = event.clientX - this.xOffset + 'px';
         chatbot.style.top = event.clientY - this.yOffset + 'px';
       }
     },
     stopDragging() {
       this.isDragging = false;
       document.removeEventListener('mousemove', this.drag);
       document.removeEventListener('mouseup', this.stopDragging);
     }
   },
   directives: {
     'v-scroll-bottom': {
       updated: function(el) {
         el.scrollTop = el.scrollHeight;
       }
     }
   }
 };
 </script>
 
 <style scoped>
 .message-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* Adjust margin as needed */
}

.message-container img, .message-container svg {
  margin-right: 10px; /* Adjust margin between icon and text */
}
 .title-bar {
   background-color:#5479f7;
   color: #fff;
   display: none;
   justify-content: flex-end;
   align-items: center;
   padding: 0px 0px;
   border-top-left-radius: 20px;
   border-top-right-radius: 20px;
 }
 .title {
   display: none;
 }
 .chatbot.open.maximized .title-bar{
   background-color: #5479f7;
 }
 .chatbot.open.maximized .buttons button {
   background-color: #5479f7;
   border: none;
   color: #ffff;
   font-size: 16px;
   cursor: pointer;
   padding: 0;
   margin-left: 8px;
 }
 .buttons button {
   background-color: transparent;
   border: none;
   color: #ffff;
   font-size: 16px;
   cursor: pointer;
   padding: 0;
   margin-left: 8px;
 }
 
 .buttons button:hover {
   opacity: 0.8;
 }
 .chatbot {
   position: fixed;
   bottom: 0px;
   right: 0px;
   z-index: 9999;
 }
 .chatbot.open.maximized {
   width: 100vw;
   height: 100vh;
   bottom: 0;
   right: 0;
 }
 .chatbot.open.maximized .chat-container{
   min-width: 100vw;
   min-height: 100vh;
 }
 /* .chatbot.open.maximized .welcome-message {
   padding-top: 0px;
   margin-bottom: 0px;
   text-align: center;
   background-color: #5479f7;
   color: #fff;
   font-weight: 600;
   position: fixed; 
   width: 100vw;
   font-size: 32px;
 } */
 
 .chatbot.open .title-bar{
   display: flex;
   
   padding: 2px 4px;
 }
 .chatbot.open .toggle-button{
   display: none;
 }
 .chat-container {
   background-color: #fff;
   border: 2px solid #5479f7;;
   display: none;
   max-height: 400px;
   height: 500px; /* Limit height to enable scrolling */
   overflow-y: auto; /* Enable vertical scrolling */
   width: 300px; /* Fixed width */
   position: relative; /* Establish positioning context */
 }
 
 .chatbot.open .chat-container {
   display: block;
 }
 .chatbot.open .monk-image{
   display: block;
 }
 .chatbot.open  .welcome-message{
  display: block;
 }
 .chatbot.open .input-container{
  display: flex;
 }
 .welcome-message {
  font-size: 14px;
  text-align: center;
  font-weight: 600;
  background-color: #5479f7;
  color: #ffff;
  padding: 2%;
  display: none;
}
/*  
 .welcome-message {
   padding-top: 0px;
   text-align: center;
   background-color: #5479f7;
   color: #fff;
   font-weight: 600;
   display: block; 
   width: 300px;
 }
  */
 .messages {
   margin-bottom: 10px;
   margin-top: 10px;
 }
 .message-content {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.user-icon img {
  width: 30px; /* Adjust size as needed */
  height: 30px; /* Adjust size as needed */
  border-radius: 50%;
  margin-right: 10px;
}

.text {
  flex: 1;
   /* Adjust as needed */
}

.monk-icon img {
  width: 30px; /* Adjust size as needed */
  height: 30px; /* Adjust size as needed */
  border-radius: 50%;
  margin-left: 10px;
}

/* Adjustments for maximized screen */
.chatbot.open.maximized .text {
  max-width: calc(100% - 150px); /* Adjust as needed based on the width of user icon and monk icon */
}
 .messages div {
   margin: 5px 0;
   padding: 5px 10px;
   border-radius: 5px;
 }
 
 .messages .incoming {
   color: white;
   padding: 14px 16px;
   line-height: 18px;
   font-size: 14px;
   border-radius: 7px;
   margin-bottom: 30px;
   margin-right: auto;
   width: 90%;
   position: relative;
   margin-left: 4%;
   background: #007bff;
   &:after {
     bottom: 100%;
     left: 7%;
     border: solid transparent;
     content: " ";
     height: 0;
     width: 0;
     position: absolute;
     pointer-events: none;
     border-bottom-color: #007bff;
     border-width: 10px;
     margin-left: -10px;
   }
 }
 
 .messages .outgoing {
   color: #2a324b;
   padding: 14px 18px;
   line-height: 18px;
   font-size: 14px;
   font-weight: 500;
   border-radius: 7px;
   margin-bottom: 30px;
   margin-left: auto;
   width: 90%;
   position: relative;
   background: #9db1f1;
   margin-right: 4%;
   &:after {
     bottom: 100%;
     right: 7%;
     border: solid transparent;
     content: " ";
     height: 0;
     width: 0;
     position: absolute;
     pointer-events: none;
     border-bottom-color: #9db1f1;
     border-width: 10px;
     margin-left: -10px;
   }
 }
 
 .toggle-button {
   position: fixed;
   bottom: 20px;
   right: 20px;
   width: 80px;
   height: 70px;
   background-color: transparent;
   border: none;
   cursor: pointer;
   z-index: 9999999;
 }
 
 .toggle-button img {
   width: 100%;
   height: 100%;
   border-radius: 50%;
   background-color: #007bff;
 }
 
 .toggle-button:focus {
   outline: none;
 }
 .chatbot.open.maximized  .input-container{
    
   min-width: 100%;
   margin: 0px 0px;
   display: flex;
   position: fixed;
   margin-left: 1.1%;
   
   
 }
 .chatbot.open.maximized .input-field{
  
   border-radius: 0px;
  

 }
 .chatbot.open.maximized .welcome-message{
  font-size: 32px;
  padding: 1%;
 }

 .chatbot.open.maximized .send-button{
  border-radius: 0px;

 }
 .chatbot.open.maximized .monk-image{
   display: none;
 }
 .input-container {
  
   width: 300px;
   bottom: 0; /* Align to the bottom */
   margin: 0px 0px; /* Add margin for better spacing */
   display: none; /* Use flexbox for layout */
   border-bottom-left-radius: 20px;
   border-bottom-right-radius: 20px;
 }
 .typing-preloader {
  text-align: left;
  font-style: italic;
  min-height: 80px;
  color: #aaa; /* Adjust color */
  margin-bottom: 10px;
  color: white;
   padding: 14px 16px;
   line-height: 18px;
   font-size: 14px;
   border-radius: 7px;
   margin-bottom: 30px;
   margin-right: auto;
   width: 90%;
   position: relative;
   margin-left: 4%;
   background: #007bff;
   display: flex;
  align-items: center;
   &:after {
     bottom: 100%;
     left: 7%;
     border: solid transparent;
     content: " ";
     height: 0;
     width: 0;
     position: absolute;
     pointer-events: none;
     border-bottom-color: #007bff;
     border-width: 10px;
     margin-left: -10px;
   }
}
 .input-field {
   flex: 1; /* Take remaining space */
   border: 2px solid #5479F7;
   outline: none;
   height: 40px;
   transition: border-color 0.3s ease;
   border-bottom-left-radius: 20px;
 }
 
 .send-button {
   width: 40px; /* Adjust button width */
   height: 40px;
   background-color: #5479F7;
   border: none;
   color: white;
   cursor: pointer;
   display: flex; /* Use flexbox for layout */
   justify-content: center; /* Center icon horizontally */
   align-items: center; /* Center icon vertically */
   border-bottom-right-radius: 20px;
 }
 
 
 .chat-container-wrapper {
   /* Space for scrollbar */
   overflow: hidden; /* Hide overflow */
 }
 
 .chat-container::-webkit-scrollbar {
   width: 8px; /* Width of the scrollbar */
   height: 8px; /* Height of the scrollbar */
 }
 
 /* Track */
 .chat-container::-webkit-scrollbar-track {
   background: #f1f1f1; /* Color of the track */
   border-radius: 20px; /* Rounded corners */
 }
 .user-icon{
  background-color: #5479F7;
  border-radius: 50%;
  color: #9db1f1; 
  width: 30px;
  height:30px;
 }
 
 
 /* Handle */
 .chat-container::-webkit-scrollbar-thumb {
   background: #7f9af3; /* Color of the handle */
   border-radius: 20px; /* Rounded corners */
 }
 
 /* Handle on hover */
 .chat-container::-webkit-scrollbar-thumb:hover {
   background: #5479F7; /* Darker handle color on hover */
 }
 
 /* Other styles remain unchanged */
 
 
 .monk-image {
   position: absolute;
   display: none;
   bottom: 32px;
   left: 0; /* Position at the horizontal center of the container */
   margin-left: -80px; /* Adjust image width */
   width: 110px;
   transform: scaleX(-1);
   z-index: 3;
   /* Ensure the image is above other content */
 }
 
 </style>
 