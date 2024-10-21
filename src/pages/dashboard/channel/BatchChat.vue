<template>
    <div class="header">
    <div class="channelbtn active" @click="switchTab('channel')">Chat Channel</div>
    <div class="mediabtn" @click="switchTab('media')">Media Channel</div>
  </div>
                 <!-- Image container (hidden by default) -->
                 <div id="imageView" class="hidden">
                    <img id="viewImage" src="" alt="Full Size Image">
                    <div id="closeButton" class="close-btn" @click="hideImageView">&times;</div>
                  </div>
<div class="container">
        <div class="channelbox active">
          <div id="chat-page">
            <div class="chat-container-wrapper">
              <div ref="chatscrollContainer" class="chat-container" v-scroll-bottom>
                <div>
                  <div ref="connectingElement">Connecting...</div>
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
                  <button @click="sendMessage" class="send-button" title="Send Message">
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

                  <input id="fileInput"  name="file" type="file" class="hidden-input" ref="file" @change="onFileChange" accept=".jpg,.png"  hidden>
                  <button for="fileInput" class="upload-doc" @click="triggerFileInput" title="Add image">
                    <q-icon name="add_circle" />
                  </button>

                  <input id="mediaInput"  name="file" type="file" class="hidden-input" ref="media" @change="onFileChange" accept=".pdf" hidden>
                  <button for="fileInput" class="upload-assignment" @click="triggerMediaInput" title="Upload File or Assignment">
                    <q-icon name="upload_file" />
                  </button>
          </div>

        </div>

        <div class="mediabox">
          <div id="chat-page">
            <div class="chat-container-wrapper">
              <div ref="mediascrollContainer" class="media-container" v-scroll-bottom>
                <div>
                  <ul id="mediaArea">

                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
</div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useSessionStore } from "src/stores/session";
import { useProfileStore } from "src/stores/profile";
import { Client } from '@stomp/stompjs';
import axios from 'axios';
import '@quasar/extras/material-icons/material-icons.css';

export default {
name: 'ContainerComponent',
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
    showFolderContents: false,
    folderFiles: [] ,
    uploadedFile: null,
    filePreviewUrl: "",
    isOpen: false,
    newMessage: "",
    maximizeIcon: "□",
    messages: [],
    isDragging: false,
    xOffset: 0,
    yOffset: 0,
    batchNumber:1,
    originalWelcomeMessage: "FinChat",
    name: "",
    username: null,
    useremail:null,
    stompClient: null,
    matchingUser:null,
    connecting: true,
    isWebSocketOpen: false, // Track WebSocket connection state
  };
},
mounted() {
  this.getUserData();
  this.getAllMessages();
},
methods: {
  switchTab(tab) {
    // Remove 'active' class from both tabs
    document.querySelector('.channelbtn').classList.remove('active');
    document.querySelector('.mediabtn').classList.remove('active');
    
    // Hide both content areas
    document.querySelector('.channelbox').classList.remove('active');
    document.querySelector('.mediabox').classList.remove('active');
    
    // Add 'active' class to the selected tab
    document.querySelector(`.${tab}btn`).classList.add('active');
    
    // Show the corresponding content area
    document.querySelector(`.${tab}box`).classList.add('active');
  },
  triggerFileInput() {
    this.$refs.file.click();
  },
  triggerMediaInput() {
    this.$refs.media.click();
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
  async getUserData() {
    await this.$api.get(`api/users/${this.user.id}`).then((response) => {
      if (response.data.success) {
        const user = response.data.data;
        this.username = user.name;
        this.connect(this.username);
        this.getBatchData();
      }
    });
  },
  async getBatchData(){
    try {
        const response = await this.$api.get('/api/getBatchData'); 
        
        // console.log(response.data)
        if (response.data) {
          this.matchingUser = response.data.find(item => item.name === this.username);
          this.batchNumber = this.matchingUser.batch;
          //console.log(this.matchingUser)
          //console.log(this.username)
        } else {
            this.showMsg(response.data?.message || "Failed to fetch batch data", 'negative');
        }
    } catch (error) {
        // console.log(error.response?.data.message || error.message, 'negative');
    } finally {
        this.loading = false; // Stop loading indicator
    }
  },
  scrollToBottom() {
  this.$nextTick(() => {
    const chatcontainer = this.$refs.chatscrollContainer;
    chatcontainer.scrollTop = chatcontainer.scrollHeight;
    const mediacontainer = this.$refs.mediascrollContainer;
    mediacontainer.scrollTop = mediacontainer.scrollHeight;
  });
},
  async getAllMessages() {
  try {
    const response = await this.$api.get(`api/private/messages/${this.batchNumber}`);
    if (response.data&& Array.isArray(response.data)) {
    
      //console.log(response.data);

      this.messages = response.data;
      this.displayMessages();
    }
    else{
      // console.log("No Messages")
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
displayMedia(receivedMessage){
        const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
        const getImagesUrl = baseUrl + 'fs/download';
        const removeImagePath = baseUrl + 'fs/download/';
        const imagePathWithoutPrefix = receivedMessage.content.replace(removeImagePath, '');
        const getfileUrl = baseUrl + 'ms/download';
        const removefilePath = baseUrl + 'ms/download/';
        
        const formData = new FormData();
        formData.append('filename', imagePathWithoutPrefix);
        formData.append('sender',receivedMessage.sender)

       // Create a new list item for the image message
        var mediaArea = document.querySelector('#mediaArea');
        var messageElement = document.createElement('li');
        messageElement.classList.add('chat-message');

        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(receivedMessage.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = this.getAvatarColor(receivedMessage.sender);

        messageElement.appendChild(avatarElement);

        var usernameElement = document.createElement('div');
        usernameElement.style.fontWeight="bold"
        var usernameText = document.createTextNode(receivedMessage.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
      if (receivedMessage.content.includes("fs/download")) {
      
         // Create the image element
        var mediaElement = document.createElement('img');
        mediaElement.style.maxWidth = '200px'; // Adjust the image size as needed
        mediaElement.style.borderRadius = '5px'; 

        axios.post(getImagesUrl, formData, { responseType: 'blob' })
            .then(downloadResponse => {
                // Handle download success, e.g., open or save the downloaded file
                const blob = new Blob([downloadResponse.data]);
                const url = window.URL.createObjectURL(blob);

                mediaElement.src = url; // Set the source of the image to the blob URL
                mediaElement.alt = 'Downloaded Image';
                mediaElement.addEventListener('click', () => {
                  this.showImageView(url);
                });

                messageElement.appendChild(mediaElement);

                mediaArea.appendChild(messageElement);
                mediaArea.scrollTop = mediaArea.scrollHeight;

                formData.append('filename', "");

                this.folderFiles.push({
                  name: imagePathWithoutPrefix,
                  url: url
                });
            })
            .then(() => {
                console.log('Post request successful');
            })
            .catch(error => {
                console.error('Error in post request:', error);
              });
    }
    else if (receivedMessage.content.includes("ms/download")) {
      const filePathWithoutPrefix = receivedMessage.content.replace(removefilePath, '');
      const formData = new FormData();
      formData.append('filename', filePathWithoutPrefix);

      var fileDiv = document.createElement('div');
      fileDiv.classList.add('file-container');
      fileDiv.style.display = 'flex';
      fileDiv.style.alignItems = 'center';
      fileDiv.style.padding = '10px';
      fileDiv.style.border = '1px solid #ccc';
      fileDiv.style.borderRadius = '5px';
      fileDiv.style.margin = '10px 0';
      fileDiv.style.cursor = 'pointer';

      var fileIcon = document.createElement('i');
      fileIcon.classList.add('fa', 'fa-file-pdf-o');
      fileIcon.style.fontSize = '24px';
      fileIcon.style.marginRight = '10px';

      var fileNameElement = document.createElement('span');
      fileNameElement.textContent = filePathWithoutPrefix;
      fileNameElement.style.flexGrow = '1';

      var downloadButton = document.createElement('button');
      downloadButton.textContent = 'Download';
      downloadButton.style.backgroundColor = '#4CAF50';
      downloadButton.style.color = 'white';
      downloadButton.style.border = 'none';
      downloadButton.style.borderRadius = '3px';
      downloadButton.style.padding = '5px 10px';
      downloadButton.style.cursor = 'pointer';

      fileDiv.appendChild(fileIcon);
      fileDiv.appendChild(fileNameElement);
      fileDiv.appendChild(downloadButton);
      messageElement.appendChild(fileDiv);
      mediaArea.appendChild(messageElement);
      mediaArea.scrollTop = messageArea.scrollHeight;

      fileDiv.addEventListener('click', () => {
          axios.post(getfileUrl, formData, { responseType: 'blob' })
              .then(downloadResponse => {
                  const blob = new Blob([downloadResponse.data], { type: 'application/pdf' });
                  const url = window.URL.createObjectURL(blob);
                  window.open(url, '_blank');
              })
              .catch(error => {
                  console.error('Error in file download:', error);
                  this.showMsg(error.response?.data.message || error.message, 'negative');
              });
      });

      downloadButton.addEventListener('click', (event) => {
          event.stopPropagation();
          axios.post(getfileUrl, formData, { responseType: 'blob' })
              .then(downloadResponse => {
                  const blob = new Blob([downloadResponse.data], { type: 'application/pdf' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = filePathWithoutPrefix;
                  a.click();
              })
              .catch(error => {
                  console.error('Error in file download:', error);
                  this.showMsg(error.response?.data.message || error.message, 'negative');
              });
      });

      this.scrollToBottom();
  }    
},
displayMessages() {
  const messageArea = document.querySelector('#messageArea');
  const mediaArea=document.querySelector('#mediaArea')

  messageArea.innerHTML = ''; // Clear the existing messages
  mediaArea.innerHTML='';

  this.messages.forEach(receivedMessage => {
      this.displaySingleMessage(receivedMessage); // Display each message individually
      this.displayMedia(receivedMessage)
  });

  this.scrollToBottom(); // Scroll to the bottom after rendering all messages
},
displaySingleMessage(receivedMessage) {

    //console.log(receivedMessage)

    const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
    const getImagesUrl = baseUrl + 'fs/download';
    const removeImagePath = baseUrl + 'fs/download/';
    const getfileUrl = baseUrl + 'ms/download';
    const removefilePath = baseUrl + 'ms/download/';

    // Create a new list item for the message (whether it's text or image)
    const messageArea = document.querySelector('#messageArea');
    const messageElement = document.createElement('li');
    messageElement.classList.add('chat-message');

    const avatarElement = document.createElement('i');
    const avatarText = document.createTextNode(receivedMessage.sender[0]);
    avatarElement.appendChild(avatarText);
    avatarElement.style['background-color'] = this.getAvatarColor(receivedMessage.sender);

    messageElement.appendChild(avatarElement);

    const usernameElement = document.createElement('div');
    const usernameText = document.createTextNode(receivedMessage.sender);
    usernameElement.appendChild(usernameText);
    usernameElement.style.fontWeight = "bold";
    messageElement.appendChild(usernameElement);

    if (receivedMessage.sender.trim() === this.username.trim()) {
          const emojiContainer = document.createElement('div');
          emojiContainer.classList.add('emoji-container');
        
          const emojiBtn = document.createElement('span');
          emojiBtn.classList.add('emoji-btn');
          emojiBtn.innerHTML = "<span class='material-icons' style='color:red'>delete</span>";
          emojiContainer.appendChild(emojiBtn);
          emojiBtn.addEventListener("click", () => {
            this.deleteMessage(receivedMessage.id,messageElement)
          });
          messageElement.appendChild(emojiContainer);
        }

    if (receivedMessage.content.includes("fs/download")) {
      const imagePathWithoutPrefix = receivedMessage.content.replace(removeImagePath, '');

      // Create a placeholder for the image
      const imageElement = document.createElement('img');
      imageElement.alt = 'Loading Image...';
      imageElement.style.maxWidth = '200px';
      imageElement.style.borderRadius = '5px';
      messageElement.appendChild(imageElement);
      messageArea.appendChild(messageElement);
      messageArea.scrollTop = messageArea.scrollHeight;

      // Download the image
      const formData = new FormData();
      formData.append('filename', imagePathWithoutPrefix);
      formData.append('sender', receivedMessage.sender);

      axios.post(getImagesUrl, formData, { responseType: 'blob' })
        .then(downloadResponse => {
          // Handle download success, e.g., open or save the downloaded file
          const blob = new Blob([downloadResponse.data]);
          const url = window.URL.createObjectURL(blob);

          // Update the image element with the actual image
          imageElement.src = url;
          imageElement.alt = 'Downloaded Image';
          imageElement.addEventListener('click', () => {
            this.showImageView(url);
          });
        })
        .catch(error => {
          console.error('Error in image download:', error);
          imageElement.alt = 'Failed to load image';
        });
    } 
    else if (receivedMessage.content.includes("ms/download")) {
      const filePathWithoutPrefix = receivedMessage.content.replace(removefilePath, '');
      const formData = new FormData();
      formData.append('filename', filePathWithoutPrefix);

      var fileDiv = document.createElement('div');
      fileDiv.classList.add('file-container');
      fileDiv.style.display = 'flex';
      fileDiv.style.alignItems = 'center';
      fileDiv.style.padding = '10px';
      fileDiv.style.border = '1px solid #ccc';
      fileDiv.style.borderRadius = '5px';
      fileDiv.style.margin = '10px 0';
      fileDiv.style.cursor = 'pointer';
      fileDiv.style.width='95%';

      var fileIcon = document.createElement('i');
      fileIcon.classList.add('fa', 'fa-file-pdf-o');
      fileIcon.style.fontSize = '24px';
      fileIcon.style.marginRight = '10px';

      var fileNameElement = document.createElement('span');
      fileNameElement.textContent = filePathWithoutPrefix;
      fileNameElement.style.flexGrow = '1';

      var downloadButton = document.createElement('button');
      downloadButton.textContent = 'Download';
      downloadButton.style.backgroundColor = '#4CAF50';
      downloadButton.style.color = 'white';
      downloadButton.style.border = 'none';
      downloadButton.style.borderRadius = '3px';
      downloadButton.style.padding = '5px 10px';
      downloadButton.style.cursor = 'pointer';

      fileDiv.appendChild(fileIcon);
      fileDiv.appendChild(fileNameElement);
      fileDiv.appendChild(downloadButton);
      messageElement.appendChild(fileDiv);
      messageArea.appendChild(messageElement);
      messageArea.scrollTop = messageArea.scrollHeight;

      fileDiv.addEventListener('click', () => {
          axios.post(getfileUrl, formData, { responseType: 'blob' })
              .then(downloadResponse => {
                  const blob = new Blob([downloadResponse.data], { type: 'application/pdf' });
                  const url = window.URL.createObjectURL(blob);
                  window.open(url, '_blank');
              })
              .catch(error => {
                  console.error('Error in file download:', error);
                  this.showMsg(error.response?.data.message || error.message, 'negative');
              });
      });

      downloadButton.addEventListener('click', (event) => {
          event.stopPropagation();
          axios.post(getfileUrl, formData, { responseType: 'blob' })
              .then(downloadResponse => {
                  const blob = new Blob([downloadResponse.data], { type: 'application/pdf' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = filePathWithoutPrefix;
                  a.click();
              })
              .catch(error => {
                  console.error('Error in file download:', error);
                  this.showMsg(error.response?.data.message || error.message, 'negative');
              });
      });

      this.scrollToBottom();
  }
  else {
      // Text message
      const textElement = document.createElement('p');
      const messageText = document.createTextNode(receivedMessage.content);
      textElement.appendChild(messageText);
      messageElement.appendChild(textElement);
      messageArea.appendChild(messageElement);
      messageArea.scrollTop = messageArea.scrollHeight;
  this.scrollToBottom();
}
},
connect(username) {
  if (username) {
    let baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '');
    let wsurl = null;

    if (baseUrl.includes("http:")) {
      baseUrl = baseUrl.replace('http://', '');
      wsurl = 'ws://' + baseUrl + '/websocket';
    } else {
      baseUrl = baseUrl.replace('https://', '');
      wsurl = 'wss://' + baseUrl + '/websocket';
    }

    // Create a new instance of StompClient
    this.stompClient = new Client({
      brokerURL: wsurl,
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

        // Subscribe to a batch-specific channel
        this.stompClient.subscribe(`/topic/private`, this.onMessageReceived);
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

  // Prepare join message with batch number
  const joinMessage = JSON.stringify({
    sender: this.username,
    type: "JOIN",
  });

  if (this.isWebSocketOpen) {
    console.log("Web Socket is open to communicate");
    this.stompClient.publish({destination: '/app/chat.privateregister', body: joinMessage});
    this.$refs.connectingElement.classList.add("hidden");
  }
},
deleteMessage(messageId,messageElement){
    this.$api.delete(`api/deletePrivateMessage/${messageId}`)
    .then(response => {
        if (response.status===200) {
            this.showMsg(`Message deleted successfully`,'positive');
            messageElement.remove();
            const deleteMessagePayload = {
                action: 'DELETE_MESSAGE',
                messageId: messageId
            };
            this.stompClient.publish({
                destination: '/app/chat.private.send',
                body: JSON.stringify(deleteMessagePayload)
            });
        } else {
            this.showMsg('Failed to delete message','negative');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
  },
onMessageReceived() {
  // Handle message reception
  console.log("message received")
  this.getAllMessages();
  this.scrollToBottom();
},

  async uploadFile(file) {
    if(file.name.endsWith(".jpg")||file.name.endsWith(".png")){
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
          content: filePath, 
          batchNumber:this.batchNumber,
          time: new Date().toLocaleDateString(),
          type: "CHAT",
        };
        
        if (this.isWebSocketOpen) {
          this.stompClient.publish({ destination: '/app/chat.private.send', body: JSON.stringify(chatMessage) });
        }

        this.newMessage = ""; // Clear the message input
        filePath="";

  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  } finally {
    this.loading = false; // Ensure loading is set to false after completion
  }
    }
    else if(file.name.endsWith(".pdf")){
      try {

    // Proceed with uploading the file if validation passes
    const formData = new FormData();
    formData.append('file', file);

    const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
    const getFileUrl = baseUrl + 'ms/upload-file';

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
          content: filePath, 
          batchNumber:this.batchNumber,
          time: new Date().toLocaleDateString(),
          type: "CHAT",
        };
        
        if (this.isWebSocketOpen) {
          this.stompClient.publish({ destination: '/app/chat.private.send', body: JSON.stringify(chatMessage) });
        }

        this.newMessage = ""; // Clear the message input
        filePath="";

  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  } finally {
    this.loading = false; // Ensure loading is set to false after completion
  }
    }
},

sendMessage() {
console.log(this.newMessage)
if(this.uploadedFile&&(this.newMessage.endsWith(".jpg")||this.newMessage.endsWith(".png"))){
  this.uploadFile(this.uploadedFile)
}
else if(this.uploadedFile&&(this.newMessage.endsWith(".pdf"))){
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
        batchNumber:this.batchNumber,
        time: new Date().toLocaleDateString(),
        type: "CHAT",
      };

      this.stompClient.publish({ destination: '/app/chat.private.send', body: JSON.stringify(chatMessage) });
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
showMsg(message, type) {
        this.$q.notify({
          message: message || "Something Went Wrong!",
          type: type,
          position: 'top-right',
          actions: [
            { icon: 'close', color: 'white', handler: () => { } }
          ]
        });
      },
  }
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
/* Style for the close button */
.close-btn {
position: relative;
display: inline-block;
font-size: 1.5rem;
text-align: center;
line-height: 1.5rem; /* Aligns the "X" vertically */
width: 2rem; /* Adjust width for circle */
height: 2rem; /* Adjust height for circle */
border: 1px solid white;
border-radius: 50%;
color: white;
cursor: pointer;
user-select: none;
padding: 2px;
margin: 20px;
background-color: transparent; /* Optional: Make background transparent */
}


.close-btn:hover{
background-color: white;
color: black;
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
flex-direction: column;
align-items: center;
z-index: 1000;
}

/* Hide the container by default */
.hidden {
display: none;
}

/* Style for the image inside the view */
#viewImage {
max-width: 80%;
max-height: 80%;
margin-top: 75px;
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
/* Header Styles */
.header {
display: flex;
justify-content: space-between;
background-color: white;
padding-top: 40px;
padding-left: 40px;
color: #7289da;
width: 130vh;
flex-direction: row;
}

.header .channelbtn,
.header .mediabtn {
flex: 1;
text-align: center;
padding: 10px;
cursor: pointer;
font-weight: bold;
transition: background-color 0.3s, color 0.3s;
}

.header .channelbtn.active,
.header .mediabtn.active {
background-color: #7289da; /* Active tab color */
color: white;
border-radius: 20px;
}

.header .channelbtn:hover,
.header .mediabtn:hover {
background-color: #8899d8; /* Hover color */
color: white;
border-radius: 20px;
}

/* Channelbox and Mediabox Styles */
.channelbox,
.mediabox {
flex-grow: 1;
display: none;
}

.channelbox.active,
.mediabox.active {
display: block;
}

.container {
width: 130vh;
border: 1px solid #ccc;
border-radius: 20px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
padding: 20px;
background-color: #f9f9f9;
display: flex;
justify-content: space-between;
margin: 40px;
height: 68vh; 
flex-direction: column;
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

.chat-container {
 background-color:transparent;
 border-radius: 20px;
 max-height: 550px;
 visibility: visible;
 height: 1000px; /* Limit height to enable scrolling */
 overflow-y: auto; /* Enable vertical scrolling */
 width: 100%;/* Fixed width */
 position: relative; /* Establish positioning context */
}

.media-container {
 background-color:transparent;
 border-radius: 20px;
 max-height: 600px;
 visibility: visible;
 height: 1000px; /* Limit height to enable scrolling */
 overflow-y: auto; /* Enable vertical scrolling */
 width: 100%;/* Fixed width */
 position: relative; /* Establish positioning context */
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
.text {
flex: 1;
 /* Adjust as needed */
}


.input-container {
display: flex;
align-items: center;
margin-top: 10px;
 width: 100%;
 bottom: 0; 
}

.input-field {
 flex: 1;
 border-radius: 20px;
 outline: none;
 height: 40px;
 width: 300px;
 transition: border-color 0.3s ease;
}

.send-button {
 width: 40px; /* Adjust button width */
 height: 40px;
 margin: 10px;
 background-color: #5479F7;
 border-radius: 50%;
 border: none;
 color: white;
 cursor: pointer;
 display: flex; /* Use flexbox for layout */
 justify-content: center; /* Center icon horizontally */
 align-items: center; /* Center icon vertically */
}
.send-button:hover{
opacity: 0.8;
}
.upload-doc:hover {
opacity: 0.8;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); 
transform: scale(1.1);
transition: all 0.3s ease-in-out; 
}
.upload-assignment:hover{
opacity: 0.8;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); 
transform: scale(1.1);
transition: all 0.3s ease-in-out; 
}

.upload-doc {
 width: 40px; /* Adjust button width */
 height: 40px;
 border-radius: 50%;
 background-color: #1d3892;
 border: none;
 color: white;
 font-size: 1.5rem;
 cursor: pointer;
 display: flex; /* Use flexbox for layout */
 justify-content: center; /* Center icon horizontally */
 align-items: center; /* Center icon vertically */
}

.upload-assignment {
 width: 40px; /* Adjust button width */
 height: 40px;
 border-radius: 50%;
 margin:10px;
 font-size: 1.5rem;
 background-color: #df6c15;
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
