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
      FinChat
    </div>

    <div id="chat-page">
    <div class="chat-container-wrapper">
      <div ref="scrollContainer" class="chat-container" v-scroll-bottom>
        <div>
          <div ref="connectingElement">Connecting...</div>
              <!-- Image container (hidden by default) -->
          <div id="imageView" class="hidden">
            <span id="closeButton" class="close-btn" @click="hideImageView">&times;</span>
            <img id="viewImage" src="" alt="Full Size Image">
          </div>
          <ul id="messageArea">

          </ul>
        </div>
      </div>
    </div>
  </div>

    <!-- Input field for user to type messages -->
    <div class="input-container">
            <input
              type="text"
              v-model="newMessage"
              @keyup.enter="sendMessage"
              placeholder="Message"
              class="input-field"
              id="message"
              required
            />
            <button @click="sendMessage" class="send-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-send"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 14l11 -11" />
                <path
                  d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"
                />
              </svg>

            </button>
            <input id="fileInput"  name="file" type="file" class="hidden-input" ref="file" @change="onFileChange" accept=".jpg,.png" hidden>
            <button for="fileInput" class="upload-doc" @click="triggerFileInput">
              <q-icon name="add_circle" />
            </button>
    </div>


    <!-- Button to toggle chatbot visibility -->
    <button
      class="toggle-button"
      @click="toggleChatbox"
      ref="toggle_button"
      @mousedown="startDragging"
    >
      <template v-if="isOpen">
        <q-img :src="ChatBoximg" alt="Monk Icon" style="background-color: red;" />
      </template>
      <template v-else>
        <q-img
          class="toggle-button-img"
          :src="ChatBoximg"
          alt="Person Icon"
          style="transform: scaleX(-1);"
        />
      </template>
    </button>
  </div>
</template>

<script>
import ChatBoximg from "../assets/ChatBox.webp";
import { storeToRefs } from "pinia";
import { useSessionStore } from "src/stores/session";
import { useProfileStore } from "src/stores/profile";
import { Client } from '@stomp/stompjs';
import axios from 'axios';
import '@quasar/extras/material-icons/material-icons.css';

export default {
  setup() {
    const session = useSessionStore();
    const { token, userType } = storeToRefs(session);

    const profileStore = useProfileStore();
    const { user } = storeToRefs(profileStore);

    return {
      token,
      userType,
      user,
    };
  },
  data() {
    return {
      uploadedFile: null,
      filePreviewUrl: "",
      isOpen: false,
      ChatBoximg: ChatBoximg,
      newMessage: "",
      maximizeIcon: "□",
      messages: [],
      isDragging: false,
      xOffset: 0,
      yOffset: 0,
      originalWelcomeMessage: "FinChat",
      name: "",
      username: null,
      stompClient: null,
      connecting: true,
      isWebSocketOpen: false, // Track WebSocket connection state
    };
  },
  mounted() {
    this.getUserData();
    this.getAllMessages();
  },
  methods: {
    triggerFileInput() {
      this.$refs.file.click();
    },
    onFileChange(event) {
    const file = event.target.files[0];
    if (file) {
        this.uploadedFile = file;
        this.filePreviewUrl = URL.createObjectURL(file);

        //console.log(this.uploadedFile)
        this.newMessage =file.name;
    }
  },
    toggleChatbox() {
      this.isOpen = !this.isOpen;
    },
    getUserData() {
      this.$api.get(`api/users/${this.user.id}`).then((response) => {
        if (response.data.success) {
          const user = response.data.data;
          this.connect(user.name);
        }
      });
    },
    minimizeChatbot() {
      this.isOpen = false;
    },
    toggleMaximize() {
      this.isMaximized = !this.isMaximized;
      this.maximizeIcon = this.isMaximized ? "▢" : "□";
      const welcomeMessage = this.$refs.welcomeMessage;
      welcomeMessage.innerHTML = this.isMaximized ? "FinChat" : this.originalWelcomeMessage;
      document.body.classList.toggle("no-scroll", this.isMaximized);
    },
    closeChatbot() {
      this.isOpen = false;
    },
    scrollToBottom() {
    this.$nextTick(() => {
      const container = this.$refs.scrollContainer;
      container.scrollTop = container.scrollHeight;
    });
},
    async getAllMessages() {
    try {
      const response = await this.$api.get('/api/getmessages');
      if (response.data&& Array.isArray(response.data)) {
        this.messages = response.data;
        this.displayMessages();
      }
      else{
        console.log("No Messages")
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  },
showImageView(url) {
  const imageView = document.getElementById('imageView');
  const viewImage = document.getElementById('viewImage');
  
  viewImage.src = url;
  imageView.classList.remove('hidden');
},
hideImageView() {
  const imageView = document.getElementById('imageView');
  imageView.classList.add('hidden');
},
  displayMessages() {
    if(Array.isArray(this.messages)){
      this.messages.forEach(receivedMessage => {
        if (receivedMessage.message.includes("fs/download")) {
          console.log(receivedMessage)
          const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
          const getImagesUrl = baseUrl + 'fs/download';
          const removeImagePath = baseUrl + 'fs/download/';
          const imagePathWithoutPrefix = receivedMessage.message.replace(removeImagePath, '');
          
          const formData = new FormData();
          formData.append('filename', imagePathWithoutPrefix);
          formData.append('sender',receivedMessage.username)

          axios.post(getImagesUrl, formData, { responseType: 'blob' })
              .then(downloadResponse => {
                  // Handle download success, e.g., open or save the downloaded file
                  const blob = new Blob([downloadResponse.data]);
                  const url = window.URL.createObjectURL(blob);

                  // Create a new list item for the image message
                  var messageArea = document.querySelector('#messageArea');
                  var messageElement = document.createElement('li');
                  messageElement.classList.add('chat-message');

                  var avatarElement = document.createElement('i');
                  var avatarText = document.createTextNode(receivedMessage.username[0]);
                  avatarElement.appendChild(avatarText);
                  avatarElement.style['background-color'] = this.getAvatarColor(receivedMessage.username);

                  messageElement.appendChild(avatarElement);

                  var usernameElement = document.createElement('span');
                  var usernameText = document.createTextNode(receivedMessage.username);
                  usernameElement.appendChild(usernameText);
                  messageElement.appendChild(usernameElement);

                  // Create the image element
                  var imageElement = document.createElement('img');
                  imageElement.src = url; // Set the source of the image to the blob URL
                  imageElement.alt = 'Downloaded Image';
                  imageElement.style.maxWidth = '200px'; // Adjust the image size as needed
                  imageElement.style.borderRadius = '5px'; // Optional styling
                  imageElement.addEventListener('click', () => {
                    this.showImageView(url);
                  });

                  messageElement.appendChild(imageElement);

                  messageArea.appendChild(messageElement);
                  messageArea.scrollTop = messageArea.scrollHeight;

                  formData.append('filename', "");
              })
              .then(() => {
                  console.log('Post request successful');
              })
              .catch(error => {
                  console.error('Error in post request:', error);
                });
      }
      else{

      var messageArea = document.querySelector('#messageArea');
      var messageElement = document.createElement('li');
      messageElement.classList.add('chat-message');

      var avatarElement = document.createElement('i');
      var avatarText = document.createTextNode(receivedMessage.username[0]);
      avatarElement.appendChild(avatarText);
      avatarElement.style['background-color'] = this.getAvatarColor(receivedMessage.username);

      messageElement.appendChild(avatarElement);

      var usernameElement = document.createElement('span');
      var usernameText = document.createTextNode(receivedMessage.username);
      usernameElement.appendChild(usernameText);
      messageElement.appendChild(usernameElement);
      receivedMessage.avatarColor = this.getAvatarColor(receivedMessage.username);

      var textElement = document.createElement('p');
      var messageText = document.createTextNode(receivedMessage.message);
      textElement.appendChild(messageText);
      messageElement.appendChild(textElement);

      var emojiElement = document.createElement('div');
        var emojiText = document.createTextNode("");
        emojiElement.append(emojiText);
        emojiElement.classList.add("Reactionarea");
        messageElement.appendChild(emojiElement);

            const emojiContainer = document.createElement('div');
            emojiContainer.classList.add('emoji-container');

            // List of emojis
            const emojis = ['👍'];
            
            emojis.forEach(emoji => {
              const emojiBtn = document.createElement('span');
              emojiBtn.classList.add('emoji-btn');
              emojiBtn.textContent = emoji;
              emojiContainer.appendChild(emojiBtn);
              emojiBtn.addEventListener("click",()=>{
                emojiText.textContent=`${this.username} reacted ${emoji}`;
                this.sendReaction(receivedMessage.username,receivedMessage.message,`${this.username} reacted ${emoji}`);
              })
            });

            messageElement.appendChild(emojiContainer);

      messageArea.appendChild(messageElement);
    }
  });

    this.scrollToBottom();

  }
  },
    connect(username) {
      if (username) {
        this.username = username;

        // Create a new instance of StompClient
        this.stompClient = new Client({
          brokerURL: 'ws://localhost:8087/websocket',
          connectHeaders: {
            login: this.username,
          },
          debug: function (str) {
            console.log(str);
          },
          onConnect: (frame) => {
            console.log('Connected: ' + frame);
            this.isWebSocketOpen = true;
            this.onConnected();
            this.stompClient.subscribe('/topic/public', this.onMessageReceived);
          },
          onStompError: (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
          },
          onWebSocketClose: (event) => {
            console.log('WebSocket connection closed: ' + event);
            this.isWebSocketOpen = false;
          },
        });

        this.stompClient.activate();
      }
    },
    onConnected() {
      console.log("STOMP connection established.");
      const joinMessage = JSON.stringify({
        sender: this.username,
        type: "JOIN",
      });

      if (this.isWebSocketOpen) {
        this.stompClient.publish({destination: '/app/chat.register', body: joinMessage});
        this.$refs.connectingElement.classList.add("hidden");
      }
    },
    onError(error) {
      console.log("STOMP connection failed.");
      this.$refs.connectingElement.textContent =
        "Unable to connect to STOMP! Please refresh the page and try again or contact the administrator.";
      this.$refs.connectingElement.style.color = "red";
    },
    onMessageReceived(message) {
    const receivedMessage = JSON.parse(message.body);
    console.log(receivedMessage)
    // Check if the message contains a download link
    if (receivedMessage.content && receivedMessage.content.includes("fs/download")) {
        const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
        const getImagesUrl = baseUrl + 'fs/download';
        const removeImagePath = baseUrl + 'fs/download/';
        const imagePathWithoutPrefix = receivedMessage.content.replace(removeImagePath, '');
        
        const formData = new FormData();
        formData.append('filename', imagePathWithoutPrefix);

        axios.post(getImagesUrl, formData, { responseType: 'blob' })
            .then(downloadResponse => {
                // Handle download success, e.g., open or save the downloaded file
                const blob = new Blob([downloadResponse.data]);
                const url = window.URL.createObjectURL(blob);

                // Create a new list item for the image message
                var messageArea = document.querySelector('#messageArea');
                var messageElement = document.createElement('li');
                messageElement.classList.add('chat-message');

                var avatarElement = document.createElement('i');
                var avatarText = document.createTextNode(receivedMessage.sender[0]);
                avatarElement.appendChild(avatarText);
                avatarElement.style['background-color'] = this.getAvatarColor(receivedMessage.sender);

                messageElement.appendChild(avatarElement);

                var usernameElement = document.createElement('span');
                var usernameText = document.createTextNode(receivedMessage.sender);
                usernameElement.appendChild(usernameText);
                messageElement.appendChild(usernameElement);

                // Create the image element
                var imageElement = document.createElement('img');
                imageElement.src = url; // Set the source of the image to the blob URL
                imageElement.alt = 'Downloaded Image';
                imageElement.style.maxWidth = '200px'; // Adjust the image size as needed
                imageElement.style.borderRadius = '5px'; // Optional styling
                imageElement.addEventListener('click', () => {
                    this.showImageView(url);
                });

                messageElement.appendChild(imageElement);

                messageArea.appendChild(messageElement);
                messageArea.scrollTop = messageArea.scrollHeight;

                formData.append('filename', "");
            })
            .then(() => {
                console.log('Post request successful');
            })
            .catch(error => {
                console.error('Error in post request:', error);
                this.showMsg(error.response?.data.message || error.message, 'negative');
            });
    }
    else if (receivedMessage.content && receivedMessage.reaction===null) {
        var messageArea = document.querySelector('#messageArea');
        var messageElement = document.createElement('li');
        messageElement.classList.add('chat-message');

        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(receivedMessage.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = this.getAvatarColor(receivedMessage.sender);

        messageElement.appendChild(avatarElement);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(receivedMessage.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
        receivedMessage.avatarColor = this.getAvatarColor(receivedMessage.sender);

        var textElement = document.createElement('p');
        var messageText = document.createTextNode(receivedMessage.content);
        textElement.appendChild(messageText);

        messageElement.appendChild(textElement);

        var emojiElement = document.createElement('div');
        var emojiText = document.createTextNode("");
        emojiElement.append(emojiText);
        emojiElement.classList.add("Reactionarea");
        messageElement.appendChild(emojiElement);

        const emojiContainer = document.createElement('div');
            emojiContainer.classList.add('emoji-container');

            // List of emojis
            const emojis = ['👍'];
            
            emojis.forEach(emoji => {
              const emojiBtn = document.createElement('span');
              emojiBtn.classList.add('emoji-btn');
              emojiBtn.textContent = emoji;
              emojiBtn.addEventListener("click",()=>{
                emojiText.textContent=`${this.username} reacted ${emoji}`;
                this.sendReaction(receivedMessage.sender,receivedMessage.content,`${this.username} reacted ${emoji}`);
              })
              emojiContainer.appendChild(emojiBtn);
            });

            messageElement.appendChild(emojiContainer);

        messageArea.appendChild(messageElement);
        messageArea.scrollTop = messageArea.scrollHeight;

        this.scrollToBottom();
    }
    else if (receivedMessage.reaction != null) {
        // Handle updating the emojiText for the reaction
        const messageElements = document.querySelectorAll('#messageArea .chat-message');
        messageElements.forEach(msgElement => {
            const textElement = msgElement.querySelector('p');
            if (textElement && textElement.textContent === receivedMessage.content) {
                const emojiElement = msgElement.querySelector('.Reactionarea');
                if (emojiElement) {
                    emojiElement.textContent = receivedMessage.reaction;
                }
            }
        });
    }
},
    async uploadFile(file) {
      try {
      // Check if the file type is JPG or PNG
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Only JPG and PNG files are allowed.');
      }

      // Proceed with uploading the file if validation passes
      const formData = new FormData();
      formData.append('file', file);

      const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
      const getFileUrl = baseUrl + 'fs/upload-file';

      const response = await fetch(getFileUrl, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'File upload failed');
      }

      const filePath = data.uri;
      console.log('File uploaded:', filePath);

          const chatMessage = {
            sender: this.username,
            content: filePath, // Assuming the backend returns the file URL
            type: "CHAT",
          };
          
          if (this.isWebSocketOpen) {
            this.stompClient.publish({ destination: '/app/chat.send', body: JSON.stringify(chatMessage) });
          }

          this.newMessage = ""; // Clear the message input
          filePath="";

    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    } finally {
      this.loading = false; // Ensure loading is set to false after completion
    }
  },
  sendReaction(sender,message,emoji) {
  const reactionMessage = {
    content:message,
    sender:sender,
    reaction: emoji, // The reaction itself
    type: "REACT", // Message type to differentiate from chat messages
  };

  //console.log(reactionMessage);

  // Send the reaction message over WebSocket
  if (this.isWebSocketOpen) {
    this.stompClient.publish({ destination: '/app/chat.react', body: JSON.stringify(reactionMessage) });
  }
},
sendMessage() {
  console.log(this.newMessage)
  if(this.uploadedFile&&(this.newMessage.endsWith(".jpg")||this.newMessage.endsWith(".png"))){
    this.uploadFile(this.uploadedFile)
  }
  else{
  const messageContent = this.newMessage.trim();
  if (messageContent && messageContent!=="") {
    console.log(messageContent);
      if (this.isWebSocketOpen) {
        const chatMessage = {
          sender: this.username,
          content: messageContent,
          type: "CHAT",
        };

        this.stompClient.publish({ destination: '/app/chat.send', body: JSON.stringify(chatMessage) });
        this.newMessage = ""; // Clear the message input
      }
    }
  }
},
    getAvatarColor(messageSender) {
    var colors = [
        '#2196F3', '#32c787', '#00BCD4', '#ff5652',
        '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
    ];

    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }

    var index = Math.abs(hash % colors.length);
    return colors[index];
},
startDragging(event) {
      this.isDragging = true;
      const chatbot = this.$refs.toggle_button;
      const boundingBox = chatbot.getBoundingClientRect();
      this.xOffset = event.clientX - boundingBox.left;
      this.yOffset = event.clientY - boundingBox.top;

      document.addEventListener("mousemove", this.drag);
      document.addEventListener("mouseup", this.stopDragging);
    },
    drag(event) {
      if (!this.isDragging) return;

      const chatbot = this.$refs.toggle_button;
      chatbot.style.left = `${event.clientX - this.xOffset}px`;
      chatbot.style.top = `${event.clientY - this.yOffset}px`;
    },
    stopDragging() {
      this.isDragging = false;
      document.removeEventListener("mousemove", this.drag);
      document.removeEventListener("mouseup", this.stopDragging);
    },
  },
  };
</script>
<style>

.emoji-container {
  position: absolute;
  bottom: 10px; 
  right: 0;
  background: white;
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 5px;
  display: none; 
}

/* Style for each emoji button */
.chat-message .Reactionarea{
  color: grey;
}
.emoji-btn {
  font-size: 1.5rem;
  cursor: pointer;
  margin:0 2px;
}
.chat-message:hover .emoji-container {
  display: flex;
}
/* Style for the selected emoji (optional) */
.emoji-btn.selected {
  background-color: #f0f0f0;
  border-radius: 5px;
}
/* Style for the hidden view container */
#imageView {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Hide the container by default */
.hidden {
  display: none;
}

/* Style for the close button */
.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  user-select: none;
}

/* Style for the image inside the view */
#viewImage {
  max-width: 90%;
  max-height: 90%;
}

#chat-page .chat-message span {
    color: #333;
    font-weight: 600;
}

#chat-page .chat-message p {
    color: #43464b;
}
 #chat-page ul {
    list-style-type: none;
    background-color: #ffffff;
    margin: 0;
    overflow: auto;
    overflow-y: scroll;
    padding: 0 20px 0px 20px;
    height: calc(100% - 150px);
}

 #chat-page ul li {
    line-height: 1.5rem;
    padding: 10px 20px;
    margin: 0;
    border-bottom: 1px solid #f4f4f4;
}

#chat-page ul li p {
    margin: 0;
}

#chat-page .chat-message {
    padding-left: 68px;
    position: relative;
}

#chat-page .chat-message i {
    position: absolute;
    width: 42px;
    height: 42px;
    overflow: hidden;
    left: 10px;
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    line-height: 42px;
    color: #fff;
    text-align: center;
    border-radius: 50%;
    font-style: normal;
    text-transform: uppercase;
}

#chat-page .chat-message span {
    color: #333;
    font-weight: 600;
}

#chat-page .chat-message p {
    color: #43464b;
}
</style>
 <style scoped>

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
   visibility: visible;
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
  background-color: #96aeff;
  color: #ffff;
  padding: 2%;
  display: none;
}

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

 
 .toggle-button {
   position: fixed;
   bottom: 20px;
   right: 100px; 
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
 
 .input-field {
   flex: 1; /* Take remaining space */
   border: 2px solid #5479F7;
   outline: none;
   height: 40px;
   width: 300px;
   transition: border-color 0.3s ease;
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
 }
 .upload-doc {
   width: 40px; /* Adjust button width */
   height: 40px;
   background-color: #1d3892;
   border: none;
   color: white;
   cursor: pointer;
   display: flex; /* Use flexbox for layout */
   justify-content: center; /* Center icon horizontally */
   align-items: center; /* Center icon vertically */
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
   background: #6a8af1; /* Color of the handle */
   border-radius: 20px; /* Rounded corners */
 }
 
 /* Handle on hover */
 .chat-container::-webkit-scrollbar-thumb:hover {
   background: #5479F7; /* Darker handle color on hover */
 }
 
 /* Other styles remain unchanged */
 
 </style>
 