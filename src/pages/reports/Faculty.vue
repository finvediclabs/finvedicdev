<template>
    <div class="container">
      <q-btn-dropdown
        :label="selectedOption ? selectedOption.label : 'Select an option'"
        color="primary"
        class="full-width bg-finvedic text-white"
        v-close-popup
        style="margin-left: auto !important;margin-right: auto !important;"
      >
          <q-list link v-if="options.length">
            <q-item
              v-for="(option, index) in options"
              :key="index"
              clickable
              v-close-popup
              @click="selectOption(option)"
              class="custom-item"
            >
              <q-item-section>{{ option.label }}</q-item-section>
            </q-item>
          </q-list>
     
      </q-btn-dropdown>
    </div>
    <div class="Chart_container">
      <!-- Conditionally render DummyBar.vue based on selected option -->
      <FacultyBar v-if="selectedOption && selectedOption.value === 'option1'" />
      <ClassReports v-if="selectedOption && selectedOption.value === 'option2'" />
      <ProgressBar v-if="selectedOption && selectedOption.value === 'option3'" />
      <CourseHoursBar v-if="selectedOption && selectedOption.value === 'option4'" />
    </div>
  </template>
  
  <script>
  import FacultyBar from './components/Dummy/DummyFacultyAttendance.vue';
  import ClassReports from './components/Dummy/DummyClassReports.vue';
  import CourseHoursBar from './components/Dummy/CourseHours.vue';
  import ProgressBar from './components/Dummy/CourseProgressReports.vue';
 
  
  export default {
    components: {
      FacultyBar,
      ClassReports,
      ProgressBar,
      CourseHoursBar,
     
    },
    data() {
      return {
        selectedOption: { label: 'Attendance Reports', value: 'option1' },
        options: [
          { label: 'Attendance Reports', value: 'option1' },
          { label: 'Class Reports', value: 'option2' },
          { label: 'Course Progress Reports', value: 'option3' },
          { label: 'Course Hours Reports', value: 'option4' },
        ]
      };
    },
    methods: {
      selectOption(option) {
        this.selectedOption = option;
        this.$refs.menu.hide();
      }
    }
  };
  </script>
  
  <style scoped>
  .Chart_container {
    width: 80%;
    height: 100% !important;
    margin-left: auto;
    margin-right: auto;
  }
  .full-width {
    width: 360px!important;
    height: 60px !important;
    border-radius: 40px;
  }
  .container {
    position: relative;
    margin-top: 2%;
    margin-bottom: 2%;
    display: flex; /* Use flexbox */
    align-items: center; /* Center vertically */

  }
  
  .custom-item {
    width: 360px;
  }
  </style>
  