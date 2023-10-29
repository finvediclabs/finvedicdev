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
      <fin-table :columns="header" :data="organizations" select @reCall="getOrganizations()" @editFun="editDataFun"
        delete-url="api/organization/delete" />
    </fin-portlet-item>
  </fin-portlet>
  <q-dialog v-model="createOrganizationDialog">
    <fin-portlet style="min-width: 400px;max-width:600px">
      <fin-portlet-header bordered>
        <fin-portlet-heading small>Create Organization</fin-portlet-heading>
      </fin-portlet-header>
      <fin-portlet-item>
        <q-form @submit="onSubmit" class="createUserDialog">
          <div class="row formContent">
            <div class="q-px-sm q-py-xs col-12">
              <q-input outlined v-model="editOrganization.name" label="First Name *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Name Is required']" />
            </div>

            <div class="q-px-sm q-py-xs col-12">
              <q-input outlined v-model="editOrganization.email" type="email" label="Email *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Email Is required']" />
            </div>
            <div class="q-px-sm q-py-xs col-12">
              <q-input outlined v-model="editOrganization.number" type="number" label="Phonbe Nunber *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Phone Number Is required']" />
            </div>
            <div class="q-px-sm q-py-xs col-12">
              <q-input outlined v-model="editOrganization.address" label="Address *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Address Is required']" />
            </div>
            <div class="q-px-sm q-py-xs col-6">
              <q-input outlined v-model="editOrganization.city" label="City *" lazy-rules
                :rules="[val => val && val.length > 0 || 'City Is required']" />
            </div>

            <div class="q-px-sm q-py-xs col-6">
              <q-input outlined v-model="editOrganization.state" label="Province/State *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Province/State Is required']" />
            </div>

            <div class="q-px-sm q-py-xs col-6">
              <q-select outlined v-model="editOrganization.country" :options="countryOptions" label="Country *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Select Country']" />
            </div>

            <div class="q-px-sm q-py-xs col-6">
              <q-input outlined v-model="editOrganization.postalCode" label="Postal code *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Postal Code Is required']" />
            </div>
            <div class="col-12 q-px-md text-right q-pt-lg">
              <q-btn label="Close" v-close-popup type="reset" color="primary" flat class="q-mr-sm" />
              <q-btn label="Submit" type="submit" color="primary" />
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
      countryOptions: [],
      header: [
        { label: 'S.No', key: 'index', align: 'center' },
        { label: 'Name', key: 'name', align: 'start' },
        { label: 'City', key: 'city', align: 'center' },
        { label: 'Phone', key: 'phone', align: 'center' },
      ],
      organizations: [],
      editOrganization: {}
    }
  },
  mounted() {
    this.getOrganizations();
  },
  methods: {
    createOrganizationFun() {
      this.editOrganization = {};
      this.createOrganizationDialog = true;
    },
    getOrganizations() {
      this.loading = true;
      this.organizations = [
        { index: 1, id: 1, name: (Math.random() + 1).toString(36).substring(2), city: (Math.random() + 1).toString(36).substring(2), phone: '1234567890' },
        { index: 2, id: 2, name: (Math.random() + 1).toString(36).substring(2), city: (Math.random() + 1).toString(36).substring(2), phone: '1234567890' },
        { index: 3, id: 3, name: (Math.random() + 1).toString(36).substring(2), city: (Math.random() + 1).toString(36).substring(2), phone: '1234567890' },
        { index: 4, id: 4, name: (Math.random() + 1).toString(36).substring(2), city: (Math.random() + 1).toString(36).substring(2), phone: '1234567890' },
        { index: 5, id: 5, name: (Math.random() + 1).toString(36).substring(2), city: (Math.random() + 1).toString(36).substring(2), phone: '1234567890' },
        { index: 6, id: 6, name: (Math.random() + 1).toString(36).substring(2), city: (Math.random() + 1).toString(36).substring(2), phone: '1234567890' },
        { index: 7, id: 7, name: (Math.random() + 1).toString(36).substring(2), city: (Math.random() + 1).toString(36).substring(2), phone: '1234567890' },
        { index: 8, id: 8, name: (Math.random() + 1).toString(36).substring(2), city: (Math.random() + 1).toString(36).substring(2), phone: '1234567890' },
      ];
      this.loading = false;
    },
    editDataFun(val) {
      this.editOrganization = {
        name: val.name,
        email: val.email,
        number: val.number,
        address: val.address,
        city: val.city,
        state: val.state,
        country: val.country,
        postalCode: val.postalCode,
      }
      this.createOrganizationDialog = true;
    },
  }
}
</script>
<style>
.createUserDialog {
  background-image: url("../../../assets/organizations.png");
  background-repeat: no-repeat;
  /* background-origin: content-box; */
  background-position: center;
  background-size: 100% 100%;
}

.formContent {
  background: #ffffff;
  opacity: 0.9;
}
</style>
