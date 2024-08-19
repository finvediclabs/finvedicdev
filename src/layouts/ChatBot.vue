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
    <q-img :src="Character_Drona" alt="" class="monk-image"/>
    <div class="chat-container-wrapper">
      <div class="chat-container" v-scroll-bottom>
        <!-- Messages -->
        <div class="messages">
          <div v-for="message in messages" :key="message.id" :class="message.type">
  <div class="message-container">
    <template v-if="message.type === 'incoming'" class="monk_icon">
    <div>  <q-img :src="Character_half_Drona" alt="Character Drona" style="width: 40px !important;height:40px !important; background-color: #5479F7; border-radius: 50%; object-fit: contain; border: 1.5px solid #dcdcdc"/>  </div>
    </template>
    <!-- Render messages with code blocks using v-html -->
    <div v-if="message.containsCode" class="code-block-container">
  <!-- Copy Button -->
  <q-btn class="copy-button" @click="copyCode(message.text)">copy code
  <!-- <q-img :src="copy_code" alt="code copy" style="width: 100%;"></q-img> -->
</q-btn>
<q-btn v-if="message.type === 'incoming'" class="copy-button-all" @click="copyText(message.text)" >copy
   <!-- <q-img :src="code" alt="code copy" style="width: 100%;"></q-img> -->
</q-btn>
  <div class="code-block" v-html="formattedCodeBlocks(message.text)"></div>
</div>
    
    <div v-else>
  <span>{{ message.text }}</span>
  <!-- Copy Button for incoming messages only -->
  <q-btn v-if="message.type === 'incoming'" class="copy-button" @click="copyText(message.text)" >copy
   <!-- <q-img :src="code" alt="code copy" style="width: 100%;"></q-img> -->
</q-btn>
</div>
  </div>
</div>
          <div v-if="isTyping" class="typing-preloader">
            <template v-if="isTyping" class="monk_icon">
              <q-img :src="Character_half_Drona" alt="Character Half" style="width: 40px !important;height:40px !important; background-color: #5479F7; border-radius: 50%; border: 1.5px solid #dcdcdc"/>
            </template>
            Typing...
          </div>
        </div>
      </div>
    </div>
    <!-- Input field for user to type messages -->
    <div class="input-container">
      <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Enter your Query..." class="input-field">
      <button @click="sendMessage" class="send-button">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M10 14l11 -11" />
          <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
        </svg>
      </button>
    </div>

    <!-- Button to toggle chatbot visibility -->
    <button class="toggle-button" @click="toggleChatbot" ref="toggle_button" @mousedown="startDragging">
      <template v-if="isOpen">
        <q-img :src="isOpen ? 'Character_Drona' : 'Character_Drona' " alt="Monk Icon" style="width:30px; background-color: red; border-radius:50%"/>
      </template>
      <template v-else>
        <q-img class='toggle-button-img' :src='Character_half_Drona' alt="Person Icon" style="width: 70px; height: 70px; margin-right: 10%; border: 2px solid #dcdcdc; background-color: #007bff; border-radius: 50%;"/>
      </template>
    </button>
  </div>
</template>


 
 <script>

 import copy_code from "../assets/copy_code.png";
 import code from "../assets/copy.png"
 import Character_Drona from "../assets/Character_Drona.png"
 import Character_half_Drona  from "../assets/Character_half_Drona.png"


import { useProfileStore } from "src/stores/profile";
import { storeToRefs } from "pinia";
import { useRolesStore } from "src/stores/roles";

 export default {

  mounted(){
    this.getUserData();
  },
  setup() {
      const profileStore = useProfileStore();
      const { user } = storeToRefs(profileStore);
      const { setUserData } = profileStore;
      const rolesStore = useRolesStore();
      const { roles } = storeToRefs(rolesStore);
      return {
        roles,
        user,
        setUserData
      };
    },

   data() {
     return {
       isOpen: false,
       Character_half_Drona:Character_half_Drona,
       Character_Drona:Character_Drona,
       copy_code:copy_code,
       code:code,
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

    // Fetch profile data
    async getUserData() {
      this.$api.get(`api/users/${this.user.id}`).then(response => {
        if (response.data.success) {
          var user = response.data.data;
          //console.log(user)
          this.userId = user.id;
        } else {
          this.showMsg(response.data.message, 'negative');
        }
      }).catch(error => {
        this.loading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      });
    },

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
      document.body.classList.add('no-scroll'); // Add class to body
    } else {
      const welcomeMessage = this.$refs.welcomeMessage;
      welcomeMessage.innerHTML = this.originalWelcomeMessage;
      document.body.classList.remove('no-scroll'); // Remove class from body
    }
  },
  closeChatbot() {
    this.isOpen = false;
    this.messages = []; // Clear all messages
    document.body.classList.remove('no-scroll'); // Remove class from body when closing
  },
  sendMessage() {
    const message = this.newMessage.trim();
    if (!message) return;

    this.isTyping = message.length > 0;

    // Push the outgoing message to the messages array immediately
    const outgoingMessage = { text: message, type: 'outgoing', id: Date.now() };
    this.messages.push(outgoingMessage);
    // console.log('Outgoing message:', outgoingMessage); 
    // Log outgoing message
    this.newMessage = ''; // Clear the input field
    this.$nextTick(() => {
      const chatContainer = this.$el.querySelector('.chat-container');
      chatContainer.scrollTop = chatContainer.scrollHeight;
    });

    // Send the message to the API
    const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
    const chatBotUrl = baseUrl + 'api/drona/askdrona';

    const requestData = {
          "User-ID": this.userId,
          "question": message
      };

    const Body=JSON.stringify(requestData);
    console.log(Body);

    fetch(chatBotUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      body: Body // Send form data
    })
    .then(response => {
      //console.log('Response:', response);
      if (!response.ok) {
        throw new Error('Network response was not ok');

      }
      return response.json();
    })
    .then(data => {
      const responseData = data.DronaResponse || "Sorry, no response received.";
      // Check if the response contains a code block
      const containsCode = responseData.includes('```');
      const formattedMessage = containsCode 
        ? responseData.replace(/```([\s\S]*?)```/g, '<div class="code-block">$1</div>')
        : responseData;

      // console.log('Formatted message:', formattedMessage); 
      // Log formatted message with code blocks

      const incomingMessage = { text: formattedMessage, type: 'incoming', id: Date.now(), containsCode };
      this.messages.push(incomingMessage);
      // console.log('Incoming message:', incomingMessage);
       // Log incoming message
      this.isTyping = false;

      this.$nextTick(() => {
        const chatContainer = this.$el.querySelector('.chat-container');
        chatContainer.scrollTop = chatContainer.scrollHeight;
      });
    })
    .catch(error => {
      // console.error('There was a problem with the fetch operation:', error);
      const errorMessage = { text: 'Error sending message', type: 'incoming', id: Date.now() };
      this.messages.push(errorMessage);
      // console.log('Error message:', errorMessage); // Log error message
      this.isTyping = false;
    });

  },
  copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Text copied to clipboard');
    }).catch(err => {
      // console.error('Failed to copy text: ', err);
    });
  },
  copyCode(htmlText) {
    // Create a temporary container to parse the HTML and extract code blocks
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlText;
    
    // Extract all code blocks
    const codeBlocks = Array.from(tempDiv.querySelectorAll('.code-block'));
    
    // Combine all code blocks' text content into a single string
    const codeTexts = codeBlocks.map(codeBlock => codeBlock.textContent || codeBlock.innerText).join('\n\n');
    
    // Copy the combined code to clipboard
    navigator.clipboard.writeText(codeTexts).then(() => {
      alert('Code copied to clipboard!');
    }).catch(err => {
      // console.error('Failed to copy code: ', err);
    });
  },
  formattedCodeBlocks(htmlText) {
    // Format code blocks for display
    return htmlText.replace(/```([\s\S]*?)```/g, '<div class="code-block">$1</div>');
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
  .codeBlock {
  background-color: black;
  color: white;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid black !important;
  z-index: 100;
  white-space: pre-wrap; /* Preserve whitespace and line breaks */
  overflow: auto; /* Ensure scroll if content is too large */
  margin: 5px 0; /* Optional: Add some margin for better spacing */
}
 .message-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* Adjust margin as needed */
}
.no-scroll {
  overflow: hidden;
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
   width: 100%;
   height: 100%;
   bottom: 0;
   right: 0;
 }
 .chatbot.open.maximized .chat-container{
   min-width: 100vw;
   min-height: 84vh;
   /* border: 2px solid black; */
   /* max-height: 90vh; */
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
   -webkit-touch-callout: default; 
  -webkit-user-select: text; 
  -khtml-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
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
 
 .toggle-button-img {
   width: 100%;
   height: 100%;
   border-radius: 50%;
   background-color: #007bff;
 }
 
 .toggle-button:focus {
   outline: none;
 }
 .chatbot.open.maximized  .input-container{
    min-height: 6vh;
    max-height: 6vh;
   min-width: 100vw;
   margin: 0px 0px;
   display: flex;
   position: fixed;
   bottom: 0;
   /* margin-left: 1.1%; */
   
   
 }
 .chatbot.open.maximized .input-field{
  
   border-radius: 0px;
  

 }
 .chatbot.open.maximized .messages .incoming{
  margin-bottom: 40px;
  margin-top: 30px;
 }
 .chatbot.open.maximized .messages .outgoing{
  margin-bottom: 40px;
  margin-top:30px;
 }
 .chatbot.open.maximized .welcome-message{
  font-size: 32px;
  padding: 1%;
 }
 
 .chatbot.open.maximized .chat-container-wrapper {
   /* Space for scrollbar */
   overflow: hidden; /* Hide overflow */
 }
 
 .chatbot.open.maximized .chat-container::-webkit-scrollbar {
   width: 8px; /* Width of the scrollbar */
   height: 8px; /* Height of the scrollbar */
 }
 
 /* Track */
 .chatbot.open.maximized .chat-container::-webkit-scrollbar-track {
   background: #f1f1f1; /* Color of the track */
   border-radius: 20px; /* Rounded corners */
 }

 
 
 /* Handle */
 .chatbot.open.maximized .chat-container::-webkit-scrollbar-thumb {
   background: #7f9af3; /* Color of the handle */
   border-radius: 20px; /* Rounded corners */
 }
 
 /* Handle on hover */
 .chatbot.open.maximized .chat-container::-webkit-scrollbar-thumb:hover {
   background: #5479F7; /* Darker handle color on hover */
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
 .custom-btn_chat{
  padding-top: 0% !important;
  padding-bottom: 0% !important;
  align-items: flex-start;
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
 .copy-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: black;
  color: white;
  font-size: 12px;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
.copy-button-all {
  position: absolute;
  top: 5px;
  right: 100px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 12px;
}

.copy-button:hover {
  background-color: #0056b3;
}

.code-block {
  background-color: black;
  color: white;
  margin-top: 4% !important;
  margin-bottom: 4% !important;
  /* padding: 10px; */
 
  white-space: pre-wrap;
  overflow-y: auto;
  overflow-x: hidden;
  width: fit-content;

}
.code-block-container{
  margin: 5px 0;
    padding: 5px 10px;
    border-radius: 5px;
    overflow-x: hidden;
  border-radius: 5px;
}
 </style>
 