<template>
    <div class="container">
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-4">
          <!-- Include Drona.vue component here -->
          <DronaTraining />
        </div>
        <div class="col-md-2"></div>
        <div class="col-md-4">
            <VedTraining />
         
        </div>
        <div class="col-md-1"></div>
      </div>
    </div>
  </template>
  
  <script>
  // Import the Drona.vue component
  import DronaTraining from './DronaTraining.vue';
  import VedTraining from './VedTraining.vue';
  
  export default {
    components: {
      DronaTraining,
      VedTraining
    }
  }
  </script>
  
  <style>
  /* Add any custom styles as needed */
  .container {
    margin-top: 20px;
  }
  </style>
  