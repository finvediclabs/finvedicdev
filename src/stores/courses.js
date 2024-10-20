import { defineStore } from 'pinia';
import axios from 'axios';
import { useSessionStore } from "src/stores/session";

const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';

export const useCouseStore = defineStore('coursesnew', {
  state: () => ({
    courses: [],
    topics: [],
    batches: [],
    alltopics: [],
    selectedCourse: {},
    selectedTopic: {},
  }),
  actions: {
    fetchCourses() {
      const sessionStore = useSessionStore(); // Get the session store
      const token = sessionStore.token; // Retrieve the token

      const headers = {
        Authorization: `Bearer ${token}`, // Attach the token in the request headers
      };
      axios.get(baseUrl + 'api/courss',{ headers }).then(response => {
        this.courses = response.data.data;
        this.fetchBatches();
        this.courses.forEach(course => {
          console.log(course.courseDesc);
        });
      });
    },
    fetchTopics() {
      const sessionStore = useSessionStore(); // Get the session store
      const token = sessionStore.token; // Retrieve the token

      const headers = {
        Authorization: `Bearer ${token}`, // Attach the token in the request headers
      };
      axios.get(baseUrl + `api/topics`,{ headers }).then(response => {
        this.topics = response.data.data;
        this.topics.forEach(topic=>{
          console.log('Fetched topics:', topic.topicName);
        });
      });
    },
    fetchBatches(courseid) {
      const sessionStore = useSessionStore(); // Get the session store
      const token = sessionStore.token; // Retrieve the token

      const headers = {
        Authorization: `Bearer ${token}`, // Attach the token in the request headers
      };
      axios.get(baseUrl + 'api/cycles',{ headers }).then(response => {
        this.batches = response.data.data;
      });
    },
    selectCourse(course) {
      this.selectedCourse = course;
      this.selectedTopic = {};
    },
    selectTopic(course, topic) {
      this.selectedCourse = course;
      this.selectedTopic = topic;
    }
  },
});
