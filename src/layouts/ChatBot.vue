<template>
    <div class="chatbot" :class="{ open: isOpen }">
      <!-- Chat interface -->
      <div class="chat-container">
        <!-- Welcome message -->
        <div v-if="isOpen" class="welcome-message">
          <p>Welcome! I'm Dhruv, your virtual assistant. How can I assist you today?</p>
        </div>
  
        <!-- Messages -->
        <div class="messages">
          <div v-for="message in messages" :key="message.id" :class="message.type">
            {{ message.text }}
          </div>
        </div>
  
        <!-- Input field for user to type messages -->
        <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." class="input-field" style="float: right;">
      </div>
  
      <!-- Button to toggle chatbot visibility -->
      <button class="toggle-button" @click="toggleChatbot">
        <template v-if="isOpen">👴</template> <!-- Monk icon -->
        <template v-else>👤</template> <!-- Person icon -->
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
  formData.append('source', 'WEBSITE'); // Append the source parameter
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
    bottom: 20px;
    right: 20px;
    z-index: 9999;
  }
  
  .chat-container {
    display: none;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  max-height: 500px; /* Limit height to enable scrolling */
  overflow-y: auto; /* Enable vertical scrolling */
  width: 300px; /* Fixed width */
  height: 500px; /* Fixed height */
  position: relative; /* Establish positioning context */
  }
  
  .chatbot.open .chat-container {
    display: block;
  }
  
  .welcome-message {
    margin-bottom: 10px;
    text-align: center;
  }
  
  .messages {
    margin-bottom: 10px;
  }
  
  .messages div {
    margin: 5px 0;
    padding: 5px 10px;
    border-radius: 5px;
  }
  
  .messages .incoming {
    background-color: #f0f0f0; /* Incoming message background color */
    text-align: left;
    width: 60%;
    margin-right: auto;
     /* Align left for incoming messages */
  }
  
  .messages .outgoing {
    background-color: #d4e1ff; /* Outgoing message background color */
    text-align: right;
    width: 60%;
    margin-left: auto;
    
    /* Align right for outgoing messages */
  }
  
  .toggle-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 20px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
  }
  
  .input-field {
    position: absolute; /* Position the input field */
    width: 100%;
  bottom: 0; /* Align to the bottom */
  width: calc(100% - 20px); /* Adjust width to fit container with padding */
  margin: 60px 0px; /* Add margin for better spacing */
  }
  </style>
  