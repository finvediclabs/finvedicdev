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
        
        <img src="https://gurukul.finvedic.com/images/faculty_attendance.png" alt="Attendance" style="width: 100%; height: 100%;" />
  
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
        <img src="https://gurukul.finvedic.com/images/classroom_icon.png" alt="ClassRoom" style="width: 100%; height: 100%;" />
    
      </q-btn>
      <div class="button-label">Class Room Reports</div>
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
        <img src="https://gurukul.finvedic.com/images/course_progress.png" alt="CourseProgress" style="width: 100%; height: 100%;" />
    
      </q-btn>
      <div class="button-label">Course Progress</div>
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
        <img src="https://gurukul.finvedic.com/images/course_hour.png" alt="CourseProgress" style="width: 100%; height: 100%;" />
    
      </q-btn>
      <div class="button-label">Course Hours</div>
      </div>
      </div>
    </div>
    <div class="col-6 right-container" style="width: 50%; margin-left: auto;">
      <!-- Add the component you want to display when Button1 is selected -->
      <DummyFacultyAttendence v-if="selectedCategory === 'Button1'" />
      <DummyClassReports v-if="selectedCategory === 'Button2'" />
      <CourseProgressReports v-if="selectedCategory === 'Button3'" />
      <CourseHours v-if ="selectedCategory === 'Button4'" />
      
    </div>
  </div> 
</template>

<script>
import DummyFacultyAttendence from './components/Dummy/DummyFacultyAttendance.vue';
import DummyClassReports from './components/Dummy/DummyClassReports.vue';
import CourseProgressReports from './components/Dummy/CourseProgressReports.vue';
import CourseHours from './components/Dummy/CourseHours.vue';

export default {
  components: {
    DummyFacultyAttendence,
    DummyClassReports,
    CourseProgressReports,
    CourseHours
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
