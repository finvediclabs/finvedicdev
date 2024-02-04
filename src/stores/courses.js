import { defineStore } from 'pinia';
import axios from 'axios'
const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
export const useCouseStore = defineStore('coursesnew', {
  state: () => ({
    courses: [],
    topics: [],
    alltopics: [],
    selectedCourse: {},
    selectedTopic: {},
  }),
  getters: {

  },
  actions: {
    fetchCourses() {
      axios.get(baseUrl + 'api/courss').then(response => {
        this.courses = response.data;
        this.fetchTopics();
      })
    },
    fetchTopics() {
      axios.get(baseUrl + 'api/topics').then(response => {
        this.alltopics = Object.groupBy(response.data, tp => {
          return tp.courseid;
        });
        
      })
    },
    selectCourse(courseId) {
      this.selectedCourse = this.courses[courseId];
      this.topics = this.alltopics[courseId];
      //this.selectedTopic = {};
    }
    
  },
});
