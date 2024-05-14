<template>
  <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow><span class="User_heading" >AI Training Arena</span></fin-portlet-heading>
      <!-- <fin-portlet-item>
        <q-btn label="Add Book" dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder" no-caps
          @click="createFile()" />
      </fin-portlet-item> -->
    </fin-portlet-header>
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
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";

export default {
  components: {
    DronaTraining,
    VedTraining,
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
  }
}
</script>

<style>
/* Add any custom styles as needed */
.container {
  margin-top: 20px;
}
.User_heading{
  color:#5479F7;
  margin-left:4%;
}
/* .outer {
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
} */
</style>
