<template>
  <div class="chatbot" :class="{ open: isOpen }">
    <!-- Chat interface -->
    <img src="https://gurukul.finvedic.com/images/monk.png" alt="" class="monk-image">
    <div class="chat-container">
      <!-- Welcome message -->

      <div v-if="isOpen" class="welcome-message" style="z-index: 999999;">
        <p>Hi! I'm Drona, your AI virtual assistant.<br> Ask me about Fintech?</p>
      </div>
      <!-- Messages -->
      <div class="messages">
        <div v-for="message in messages" :key="message.id" :class="message.type">
          {{ message.text }}
        </div>
      </div>
      <!-- Input field for user to type messages -->
      <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Enter your Query..." class="input-field" style="float: right;">
     
    </div>
    <!-- Button to toggle chatbot visibility -->
    <button class="toggle-button" @click="toggleChatbot">
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
      messages: []
    };
  },
  methods: {
    toggleChatbot() {
      this.isOpen = !this.isOpen;
    },
    sendMessage() {
      const message = this.newMessage.trim();
      if (!message) return; // Don't send empty messages
      // Push the outgoing message to the messages array immediately
      const outgoingMessage = { text: message, type: 'outgoing', id: Date.now() };
      this.messages.push(outgoingMessage);
      console.log('Outgoing message:', outgoingMessage); // Log outgoing message
      this.newMessage = ''; // Clear the input field
      // Send the message to the API
      const formData = new FormData();
      formData.append('query', message); // Append the query parameter
      formData.append('source', 'PORTAL'); // Append the source parameter
      fetch('https://fnbackend.finvedic.com/api/bot/query', {
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
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          // Optionally, you can add an error message to the messages array
          const errorMessage = { text: 'Error sending message', type: 'incoming', id: Date.now() };
          this.messages.push(errorMessage);
          console.log('Error message:', errorMessage); // Log error message
        });
    }
  }
};
</script>

<style scoped>
  .chatbot {
    position: fixed;
    bottom: 100px;
    right: 20px;
    z-index: 9999;
  }

  .chat-container {
    display: none;
    background-color: #fff;
    border: 4px solid #5479F7;
    border-radius: 20px;
    max-height: 400px; /* Limit height to enable scrolling */
    overflow-y: auto; /* Enable vertical scrolling */
    width: 300px; /* Fixed width */
    height: 400px; /* Fixed height */
    position: relative; /* Establish positioning context */
    padding-bottom: 40px; /* Ensure space for the image */
  }

  .chatbot.open .chat-container {
    display: block;
  }
  .chatbot.open .monk-image{
    display: block;
  }

  .welcome-message {
    padding-top: 10px;
    margin-bottom: 10px;
    text-align: center;
    background-color: #5479f7;
    width: 100%;
    color: #fff;
    font-weight: 600;
    position: fixed; /* Position the input field */
    width: 294px;
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
  }

  .messages {
    margin-bottom: 10px;
    margin-top: 75px;
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
    color: white;
    padding: 14px 18px;
    line-height: 18px;
    font-size: 14px;
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

  .input-field {
    position: fixed; /* Position the input field */
    width: 294px;
    bottom: 32px; /* Align to the bottom */
    margin: 72px 0px; /* Add margin for better spacing */
    border: 2px solid #5479F7;
    border-radius: 15px;
    outline: none;
    height: 40px;
    transition: border-color 0.3s ease;
  }

  .input-field:focus {
    border-color: #007bff; /* Change border color on focus */
  }

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
