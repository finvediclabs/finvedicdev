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
  getters: {

  },
  actions: {
    fetchCourses() {
      axios.get(baseUrl + 'api/courss').then(response => {
        this.courses = response.data.data;
        this.fetchTopics('1001');
        this.fetchBatches();
      })
    },
    fetchTopics(courseId) {
      axios.get(baseUrl + `api/topics/${courseId}`).then(response => {
        this.topics = response.data.data;
        // this.alltopics = Object.groupBy(response.data, tp => {
        //   return tp.courseid;
        // });
        
      })
    },
    fetchBatches(courseid) {
      axios.get(baseUrl + 'api/cycles').then(response => {
        this.batches = response.data.data;
        // this.alltopics = Object.groupBy(response.data, tp => {
        //   return tp.courseid;
        // });
        
      })
    },
    selectCourse(courseId) {
      this.selectedCourse = this.courses[courseId];
      this.topics = this.alltopics[courseId];
      //this.selectedTopic = {};
    }
    
  },
});
