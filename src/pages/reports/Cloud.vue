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
      <UsageBar v-if="selectedOption && selectedOption.value === 'option1'" />
      <EfficiencyBar v-if="selectedOption && selectedOption.value === 'option2'" />
      <ComparisonBar v-if="selectedOption && selectedOption.value === 'option3'" />
      <IdleBar v-if="selectedOption && selectedOption.value === 'option4'" />
      <CloudBar v-if="selectedOption && selectedOption.value === 'option5'" />
      <CloudUsage v-if="selectedOption && selectedOption.value === 'option6'" />
    </div>
  </template>
  
  <script>
  import UsageBar from './components/Dummy/UsageBasedCoastReports.vue';
  import EfficiencyBar from './components/Dummy/ResourceAllocation.vue';
  import IdleBar from './components/Dummy/IdleResource.vue';
  import ComparisonBar from './components/Dummy/CostComparisionVM.vue';
  import CloudBar from './components/Dummy/CloudProviderCost.vue';
  import CloudUsage from './components/Dummy/CloudUsage.vue';

  
  export default {
    components: {
      UsageBar,
      EfficiencyBar,
      ComparisonBar,
      IdleBar,
      CloudBar,
      CloudUsage
      
    },
    data() {
      return {
        selectedOption: { label: 'Usage-Based Cost Analysis', value: 'option1' },
        options: [
          { label: 'Usage-Based Cost Analysis', value: 'option1' },
          { label: 'Resource Allocation Efficiency', value: 'option2' },
          { label: 'Cost Comparison Across VM Types', value: 'option3' },
          { label: 'Idle Resource Identification', value: 'option4' },
          { label: 'Cloud Provider Cost Management', value: 'option5' },
          { label: 'Cloud Service Usage Trends', value: 'option6' }
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
  