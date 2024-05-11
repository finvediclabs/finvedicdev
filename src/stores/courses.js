import { defineStore } from 'pinia';
import axios from 'axios'

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
      axios.get(baseUrl + 'api/courss').then(response => {
        this.courses = response.data.data;
        this.fetchBatches();
        this.courses.forEach(course => {
          console.log(course.courseDesc);
        });
      });
    },
    fetchTopics() {
      axios.get(baseUrl + `api/topics`).then(response => {
        this.topics = response.data.data;
        this.topics.forEach(topic=>{
          console.log('Fetched topics:', topic.topicName);
        });
      });
    },
    fetchBatches(courseid) {
      axios.get(baseUrl + 'api/cycles').then(response => {
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
