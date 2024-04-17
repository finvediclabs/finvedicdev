<template>
  <div class="container">
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-4">
        <!-- Include Drona.vue component here -->
        <DronaTraining />
      </div>
      <div class="col-md-2">
        <div class="outer">
<div class="inner"></div>
</div>
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
.outer {
width: 1px;
height: 60vh;
margin: auto;
position: relative;
overflow: hidden;
}
.inner {
position: absolute;
width:100%;
height: 60%;
background: #5479F7;
top: 30%;
box-shadow: 0px 0px 30px 20px #5479F7;
}
</style>
