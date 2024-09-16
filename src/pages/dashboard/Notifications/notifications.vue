<template>
    <fin-portlet>
      <fin-portlet-header>
        <fin-portlet-heading :loading="loading" backArrow>
          <span class="User_heading">Messages</span>
        </fin-portlet-heading>
        <fin-portlet-item>
          <q-btn
            label="Clear Notifications"
            dense
            color="negative"
            class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder q-mr-sm"
            no-caps
            @click="clearnotifications"
          />

          <q-btn
            label="Send Message"
            dense
            color="blue-15"
            class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder"
            no-caps
            @click="openDialog"
          />
        </fin-portlet-item>
      </fin-portlet-header>
      <fin-portlet-item class="table-scroll">
        <fin-table
          :columns="header"
          :data="messagesList"
          select
          @reCall="getMessagesData"
          allowDelete
          :delete-url="deleteUrl"
          @editFun="editDataFun"
          :loading="loading"
        />
      </fin-portlet-item>
  
      <!-- Q-Dialog for sending new message -->
      <q-dialog v-model="dialogOpen" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6">Send a New Message</div>
          </q-card-section>
  
          <q-card-section>
            <q-input
              v-model="newMessage"
              label="Message"
              type="text"
              autofocus
            />
          </q-card-section>
  
          <q-card-actions>
            <q-btn
              label="Send"
              color="primary"
              @click="sendMessageFromDialog"
            />
            <q-btn
              label="Cancel"
              color="secondary"
              @click="closeDialog"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </fin-portlet>
  </template>
  
  <script>
  import FinTable from "src/components/FinTable.vue";
  import axios from 'axios';
  import FinPortlet from "src/components/Portlets/FinPortlet.vue";
  import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
  import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
  import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
  import { storeToRefs } from "pinia";
import { useSessionStore } from "src/stores/session";
import { useProfileStore } from "src/stores/profile";
  import { urls } from "../Urls";
  import { Client } from '@stomp/stompjs';

  
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
  
    name: 'messages',
    components: {
      FinTable,
      FinPortlet,
      FinPortletHeader,
      FinPortletHeading,
      FinPortletItem,
    },
    data() {
      return {
        deleteUrl: urls.messagesDataUrl,
        loading: false,
        dialogOpen: false,
        newMessage: '',
        header: [
          { label: 'S.No', key: 'index', align: 'center' },
          { label: 'Sender', key: 'sender', align: 'start' },
          { label: 'Message', key: 'text', align: 'start', width: '250px' },
          { label: 'Timestamp', key: 'timestamp', align: 'start' },
        ],
        messagesList: [],
        stompClient: null,
        isWebSocketOpen: false,
        username: '' // Assuming you'll set this when connecting
      };
    },
    mounted() {
      // Initialize WebSocket connection with a dummy username, replace with actual logic
      this.getUserData();; // Replace with actual username as needed
    //   this.connect(this.username);
      this.getMessagesData();
    },
    methods: {
      clearnotifications() {
      
      let confirmed=confirm("Are you sure to clear Notifications?")
      if(confirmed){
        this.$api.delete('/api/clearnotifications')
          .then(() => {
            // Clear the notifications list on the frontend
            this.notificationList = [];
            this.getMessagesData();
            this.$q.notify({
              message: 'Notifications cleared successfully',
              color: 'positive',
              position: 'top-right',
            });
          })
          .catch((error) => {
            console.error('Error clearing notifications:', error);
            this.$q.notify({
              message: 'Failed to clear notifications',
              color: 'negative',
              position: 'top-right',
            });
          });
      }
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
      getUserData() {
      this.$api.get(`api/users/${this.user.id}`).then((response) => {
        if (response.data.success) {
          const user = response.data.data;
          this.connect(user.name);
          this.username=user.name;
        }
      });
    },
    async getMessagesData() {
  if (!this.loading) {
    this.loading = true;
    try {
      const response = await this.$api.get('/api/getnotifications');
      this.loading = false;

      // Log the API response
      //console.log("API Response:", response);

      if (response.data) {
        // Map through the response and handle potential null usernames
        this.messagesList = response.data.map((item, index) => ({
          ...item,
          index: index + 1,
          sender: item.username,
          text: item.content,
          timestamp:item.timestamp
        }));
      } else {
        this.showMsg(response.data?.message || "No data found", 'negative');
      }
    } catch (error) {
      this.loading = false;
      console.log("Error Response:", error);
      this.showMsg(error.response?.data.message || error.message, 'negative');
    }
  }
},
      openDialog() {
        this.dialogOpen = true;
      },
      closeDialog() {
        this.dialogOpen = false;
      },
      connect(username) {
      if (username) {
        this.username = username;
        let baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '');
        let wsurl = null;

        if (baseUrl.includes("http:")) {
            baseUrl = baseUrl.replace('http://', '');
            wsurl = 'ws://' + baseUrl + '/notification';
        } else {
            baseUrl = baseUrl.replace('https://', '');
            wsurl = 'wss://' + baseUrl + '/notification';
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
            this.stompClient.subscribe('/topic/notifications', this.onMessageReceived);
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
      sendMessageFromDialog() {
    // Log the message content for debugging
    //console.log(this.newMessage);
    const messageContent = this.newMessage.trim();
    
    if (messageContent && messageContent !== "") {
        //console.log(messageContent);

        if (this.isWebSocketOpen) {
            const chatMessage = {
                sender: this.username, // Ensure this is not null or undefined
                content: messageContent,
                time: new Date().toLocaleDateString(),
                type: "NOTIFY",
            };

            if (!this.username) {
                console.error('Username is not set.');
                this.showMsg("Username is required", 'negative');
                return;
            }

            //console.log("Sending message:", chatMessage);
            try {
                this.stompClient.publish({ destination: '/app/chat.notify', body: JSON.stringify(chatMessage) });
                this.newMessage = ""; // Clear the message input
                this.showMsg("Message sent successfully", 'positive');
                this.getMessagesData();
                this.closeDialog();
            } catch (error) {
                this.showMsg("Message sending failed: " + error.message, 'negative');
            }
        } else {
            this.showMsg("WebSocket connection is not open", 'negative');
        }
    } else {
        this.showMsg("Message content cannot be empty", 'negative');
    }
},
      onConnected() {
        // Optional: Handle any logic needed after connecting
      },
      onMessageReceived(message) {
        // Handle incoming WebSocket messages
        //console.log('Message received:', message.body);
        
      },
      editDataFun(val) {
 
  }
    }
  };
  </script>
  
  <style>
  .User_heading {
    color: #5479F7;
    margin-left: 4%;
  }
  
  .table-scroll {
    overflow-x: auto;
  }
  
  .fin-br-8 {
    border-radius: 8px;
  }
  </style>
  