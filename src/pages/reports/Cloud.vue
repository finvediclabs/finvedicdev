<template>
  <div class="row">
    <div class="col-6 grid-container" style="width: 100%; float: left;">
     <UsageBasedCoastReports/>
    </div> 
  </div> 
</template>

<script>
import UsageBasedCoastReports from './components/Dummy/UsageBasedCoastReports.vue';
import ResourceAllocation from './components/Dummy/ResourceAllocation.vue';
import CostComparisionVM from './components/Dummy/CostComparisionVM.vue';
import IdleResource from './components/Dummy/IdleResource.vue';
import CloudProviderCost from './components/Dummy/CloudProviderCost.vue';
import CloudUsage from './components/Dummy/CloudUsage.vue';
export default {
  components: {
    UsageBasedCoastReports,
    ResourceAllocation,
    CostComparisionVM,
    IdleResource,
    CloudProviderCost,
    CloudUsage
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
.button-label {
  text-align: center;
  transform: translateX(-20%);
  font-weight: 600;
  font-size: 24px;
}


.q-btn {
  width: 150px !important;
  height: 150px!important;
}
</style>
