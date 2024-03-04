<template>
    <div class="container">
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-4">
          <!-- Include Drona.vue component here -->
          <DronaTraining />
        </div>
        <div class="col-md-2">
          <div class="divider"></div>
        </div>
        <div class="col-md-4">
            <VedTraining />
         
        </div>
        <div class="col-md-1">
          
        </div>
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
  .divider {
    width: 4px;
    border-radius: 2px;
    height: 80vh; /* Adjust height as needed */
    background-color: #5479F7; /* Or any other color you prefer */
    margin-left:auto;
    margin-right: auto; /* Adjust spacing between buttons and divider */
    
}
  </style>
  