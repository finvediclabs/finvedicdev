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
      <DummyBar v-if="selectedOption && selectedOption.value === 'option1'" />
      <AssessmentBar v-if="selectedOption && selectedOption.value === 'option2'" />
      <EngagementBar v-if="selectedOption && selectedOption.value === 'option3'" />
      <ActivityBar v-if="selectedOption && selectedOption.value === 'option4'" />
      <FeedbackBar v-if="selectedOption && selectedOption.value === 'option5'" />
      <LabBar v-if="selectedOption && selectedOption.value === 'option6'" />
    </div>
  </template>
  
  <script>
  import DummyBar from './components/Dummy/DummyStudentAttendence.vue';
  import AssessmentBar from './components/Dummy/DummyStudentAssesments.vue';
  import ActivityBar from './components/Dummy/DummyActivity.vue';
  import EngagementBar from './components/Dummy/DummyEngagement.vue';
  import LabBar from './components/Dummy/StudentLab.vue';
  import FeedbackBar from './components/Dummy/DummyFeedback.vue';
  
  export default {
    components: {
      DummyBar,
      AssessmentBar,
      EngagementBar,
      ActivityBar,
      FeedbackBar,
      LabBar
    },
    data() {
      return {
        selectedOption: { label: 'Attendance Reports', value: 'option1' },
        options: [
          { label: 'Attendance Reports', value: 'option1' },
          { label: 'Assessment Reports', value: 'option2' },
          { label: 'Engagement Reports', value: 'option3' },
          { label: 'Activity Reports', value: 'option4' },
          { label: 'Feedback Reports', value: 'option5' },
          { label: 'Student Lab Reports', value: 'option6' }
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
  