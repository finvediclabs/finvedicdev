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
        <img src="https://gurukul.finvedic.com/images/cost.png" alt="Windows" style="width: 100%; height: 100%;" />
      </q-btn>
      <div class="button-label">User Based<br>Analysis</div>
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
         <img src="https://gurukul.finvedic.com/images/resource.png" alt="Windows" style="width: 100%; height: 100%;" />
    
      </q-btn>
      <div class="button-label">Resource Allocation<br>Efficiency</div>
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
        <img src="https://gurukul.finvedic.com/images/cost_comparision.png" alt="Windows" style="width: 100%; height: 100%;" />
      </q-btn>
      <div class="button-label">Cost Comparison<br>Across VM Types</div>
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
        <img src="https://gurukul.finvedic.com/images/identification.png" alt="Windows" style="width: 100%; height: 100%;" />
      
      </q-btn>
     <div class="button-label">Idle Resource<br>Identification</div>
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
        <img src="https://gurukul.finvedic.com/images/cloud_provider.png" alt="Windows" style="width: 100%; height: 100%;" />
      
      </q-btn>
        <div class="button-label">Cloud Provider<br>Cost Management</div>
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
        <img src="https://gurukul.finvedic.com/images/cloud_service.png" alt="Windows" style="width: 100%; height: 100%;" />
      
      </q-btn>
        <div class="button-label">Cloud Service<br>Usage Trends</div>
        </div>
      </div>
    </div>
    <div class="col-6 right-container" style="width: 50%; margin-left: auto;">
      <!-- Add the component you want to display when Button1 is selected -->
      <UsageBasedCoastReports v-if="selectedCategory === 'Button1'" />
      <ResourceAllocation v-if="selectedCategory === 'Button2'" />
      <CostComparisionVM v-if="selectedCategory === 'Button3'" />
      <IdleResource v-if = "selectedCategory === 'Button4'"/>
      <CloudProviderCost v-if="selectedCategory === 'Button5'" />
      <CloudUsage v-if="selectedCategory === 'Button6'"/>
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
</style>
