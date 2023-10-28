<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow>
        Organizations
      </fin-portlet-heading>
      <fin-portlet-item>
        <q-btn label="Add New" icon="add" color="blue-15" class="fin-br-8 text-subtitle1 text-weight-bolder q-px-md" dense
          no-caps @click="createOrganizationFun" />
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item>
      <fin-table :columns="header" :data="usersList" select />
    </fin-portlet-item>
  </fin-portlet>
  <q-dialog v-model="createOrganizationDialog">
    <fin-portlet style="min-width: 400px;max-width: 80vw">
      <fin-portlet-header bordered>
        <fin-portlet-heading small>Create User</fin-portlet-heading>
      </fin-portlet-header>
      <fin-portlet-item>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <div class="row q-gutter-y-md">
            <div class="col-sm-12 col-md-6 q-px-md">
              <q-input outlined v-model="name" label="First Name *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Name Is required']" />
            </div>

            <div class="col-sm-12 col-md-6 q-px-md">
              <q-input outlined v-model="email" type="email" label="Email *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Email Is required']" />
            </div>
          </div>
          <div class="row q-gutter-y-md">
            <div class="col-sm-12 col-md-6 q-px-md">
              <q-input outlined v-model="address" label="Address *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Last Name Is required']" />
            </div>
          </div>
          <div class="row q-gutter-y-md">

            <div class="col-sm-12 col-md-6 q-px-md">
              <q-input outlined v-model="phoneNumber" type="number" label="Phonbe Nunber *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Phone Number Is required']" />
            </div>

            <div class="col-sm-12 col-md-6 q-px-md">
              <q-input outlined v-model="city" label="City *" lazy-rules
                :rules="[val => val && val.length > 0 || 'City Is required']" />
            </div>

            <div class="col-sm-12 col-md-4 q-px-md">
              <q-input outlined v-model="state" label="Province/State *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Province/State Is required']" />
            </div>

            <div class="col-sm-12 col-md-4 q-px-md">
              <q-select outlined v-model="country" :options="countryOptions" label="Country *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Select Country']" />
            </div>

            <div class="col-sm-12 col-md-4 q-px-md">
              <q-input outlined v-model="postalCode" label="Postal code *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Postal Code Is required']" />
            </div>


            <div class="col-sm-12 col-md-6 q-px-md text-center q-pt-lg"></div>
            <div class="col-sm-12 col-md-6 q-px-md text-right q-pt-lg">
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn label="Close" v-close-popup type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </div>
        </q-form>
      </fin-portlet-item>
    </fin-portlet>
  </q-dialog>
</template>
<script>
import FinTable from "src/components/FinTable.vue"
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
export default {
  components: {
    FinTable,
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
  },
  data() {
    return {
      tab: 'all',
      loading: true,
      createOrganizationDialog: false,
      css: ['assets/normalize.css'],
      name: '',
      email: '',
      address: '',
      phoneNumber: '',
      city: '',
      state: '',
      country: '',
      countryOptions: [],
      postalCode: '',
      header: [
        { label: 'Name', key: 'name', align: 'start' },
        { label: 'City', key: 'city', align: 'center' },
        { label: 'Phone', key: 'phone', align: 'center' },
      ],
      usersList: [
        { name: (Math.random() + 1).toString(36).substring(2), city: (Math.random() + 1).toString(36).substring(2), phone: '1234567890' },
        { name: (Math.random() + 1).toString(36).substring(2), city: (Math.random() + 1).toString(36).substring(2), phone: '1234567890' },
        { name: (Math.random() + 1).toString(36).substring(2), city: (Math.random() + 1).toString(36).substring(2), phone: '1234567890' },
        { name: (Math.random() + 1).toString(36).substring(2), city: (Math.random() + 1).toString(36).substring(2), phone: '1234567890' },
        { name: (Math.random() + 1).toString(36).substring(2), city: (Math.random() + 1).toString(36).substring(2), phone: '1234567890' },
        { name: (Math.random() + 1).toString(36).substring(2), city: (Math.random() + 1).toString(36).substring(2), phone: '1234567890' },
        { name: (Math.random() + 1).toString(36).substring(2), city: (Math.random() + 1).toString(36).substring(2), phone: '1234567890' },
        { name: (Math.random() + 1).toString(36).substring(2), city: (Math.random() + 1).toString(36).substring(2), phone: '1234567890' },
      ]
    }
  },
  methods: {
    createOrganizationFun() {
      this.createOrganizationDialog = true;
    }
  }
}
</script>
