<template>
  <div class="row">
    <div class="col-6 grid-container" style="width: 50%; margin-right: auto;">
      <div class="button-grid">
        <div class="btn_container">
        <q-btn
          unelevated
          squared

          no-caps
          class="full-width"
          size="lg"
          :class="{ 'bg-finvedic text-white': selectedCategory === 'Button1' }"
          @click="selectCategory('Button1')"
        >
       
        <img src="https://gurukul.finvedic.com/images/attendance_user.png" alt="Attandance" style="width: 100%; height: 100%;" />
    
      </q-btn>
      
     <div class="button-label">Attendance</div>
    </div>
    <div class="btn_container">
        <q-btn
          unelevated
          squared
          no-caps
          class="full-width"
          size="lg"
          :class="{ 'bg-finvedic text-white': selectedCategory === 'Button2' }"
          @click="selectCategory('Button2')"
        >  
      <img src="https://gurukul.finvedic.com/images/assesment.png" alt="Assesment" style="width: 100%; height: 100%;" />
     
     
      </q-btn>
      <div class="button-label">Assesmemnt</div>
    </div>
    <div class="btn_container">
    
      <q-btn
          unelevated
          squared
          no-caps
          class="full-width"
          size="lg"
          :class="{ 'bg-finvedic text-white': selectedCategory === 'Button3' }"
          @click="selectCategory('Button3')"
        >
        <img src="https://gurukul.finvedic.com/images/engagement_report.png" alt="Engagemenmt_Report" style="width: 100%; height: 100%;" />
     
      </q-btn>
        <div class="button-label">Engagement Report</div>

        </div>
        <div class="btn_container">
    
        <q-btn
          unelevated
          squared
          no-caps
          class="full-width"
          size="lg"
          :class="{ 'bg-finvedic text-white': selectedCategory === 'Button4' }"
          @click="selectCategory('Button4')"
        >
        <img src="https://gurukul.finvedic.com/images/activity.png" alt="Activity" style="width: 120%; height: 120%;" />
     
        
      </q-btn>
        <div class="button-label">Activity</div>
        </div>

        <div class="btn_container">
    
        <q-btn
          unelevated
          squared
          no-caps
          class="full-width"
          size="lg"
          :class="{ 'bg-finvedic text-white': selectedCategory === 'Button5' }"
          @click="selectCategory('Button5')"
        >
        <img src="https://gurukul.finvedic.com/images/feedback.png" alt="Feedback" style="width: 100%; height: 100%;" />
      </q-btn>
        <div class="button-label">Feedback</div>
        </div>
        <div class="btn_container">
    
        <q-btn
          unelevated
          squared
          no-caps
          class="full-width"
          size="lg"
          :class="{ 'bg-finvedic text-white': selectedCategory === 'Button6' }"
          @click="selectCategory('Button6')"
        >
        <img src="https://gurukul.finvedic.com/images/labICON.png" alt="Feedback" style="width: 100%;" />
      
      </q-btn>
        <div class="button-label">Lab Usage</div>
        </div>

      </div>
    </div>
    <div class="col-6 right-container" style="width: 50%; margin-left: auto;">
      <!-- Add the component you want to display when Button1 is selected -->
      <DummyStudentAttendence v-if="selectedCategory === 'Button1'" />
      <DummyStudentAssesments v-if="selectedCategory === 'Button2'" />
      <DummyEngagement v-if="selectedCategory === 'Button3'" />
      <DummyActivity v-if = "selectedCategory === 'Button4'"/>
      <DummyFeedback v-if="selectedCategory === 'Button5'" />
      <StudentLab v-if="selectedCategory === 'Button6'"/>
    </div>
  </div> 
</template>

<script>
import DummyStudentAttendence from './components/Dummy/DummyStudentAttendence.vue';
import DummyStudentAssesments from './components/Dummy/DummyStudentAssesments.vue';
import DummyEngagement from './components/Dummy/DummyEngagement.vue';
import DummyActivity from './components/Dummy/DummyActivity.vue';
import DummyFeedback from './components/Dummy/DummyFeedback.vue';
import StudentLab from './components/Dummy/StudentLab.vue';
export default {
  components: {
    DummyStudentAttendence,
    DummyStudentAssesments,
    DummyEngagement,
    DummyActivity,
    DummyFeedback,
    StudentLab
  },
  data() {
    return {
      selectedCategory: 'Button1', // Button1 is initially selected
    };
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
      // Add your logic for category selection
    }
  }
};
</script>

<style scoped>
.grid-container {
  display: block;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-left: 10%;
  gap: 10px; /* Adjust gap between buttons */
}

.q-btn {
  width: 150px !important;
  height: 150px!important;
}
.button-label {
  text-align: center;
  transform: translateX(-20%);
  font-weight: 600;
  font-size: 24px;
}
</style>
