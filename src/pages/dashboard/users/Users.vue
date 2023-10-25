<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading">
        <q-icon name="arrow_back" class="text-grey-8 cursor-pointer" @click="$router.go(-1)" />
        Users
      </fin-portlet-heading>
      <fin-portlet-item>
        <q-select v-model="roleSearch" :options="roleOptions" label="Roles" outlined class="fin-input" dense />
      </fin-portlet-item>
      <fin-portlet-item>
        <q-select v-model="programSearch" :options="['trinee', 'client']" outlined label="Programs" class="fin-input"
          dense />
      </fin-portlet-item>
      <fin-portlet-item>
        <q-btn label="Add New" icon="add" dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder"
          no-caps @click="createUser()" />
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item>
      <fin-table :columns="header" :data="usersList" select />
    </fin-portlet-item>
  </fin-portlet>



  <q-dialog v-model="createUserDialog">
    <fin-portlet style="min-width: 400px;max-width: 80vw">
      <fin-portlet-header bordered>
        <fin-portlet-heading small>Create User</fin-portlet-heading>
      </fin-portlet-header>
      <fin-portlet-item>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <div class="row justify-center q-gutter-y-md">
            <div class="col-sm-12 col-md-6 q-px-md">
              <q-input outlined v-model="firstName" label="First Name *" lazy-rules
                :rules="[val => val && val.length > 0 || 'First Name Is required']" />
            </div>
            <div class="col-sm-12 col-md-6 q-px-md">
              <q-input outlined v-model="lastName" label="Last Name *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Last Name Is required']" />
            </div>
            <div class="col-sm-12 col-md-6 q-px-md">
              <q-input v-model="password" outlined :type="isPwd ? 'password' : 'text'" label="password" lazy-rules
                :rules="[val => val && val.length > 0 || 'Password Is required']">
                <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="isPwd = !isPwd" />
                </template>
              </q-input>
            </div>
            <div class="col-sm-12 col-md-6 q-px-md">
              <q-input outlined v-model="email" type="email" label="Email *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Email Is required']" />
            </div>
            <div class="col-sm-12 col-md-6 q-px-md">
              <q-input outlined v-model="phoneNumber" type="number" label="Phonbe Nunber *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Phone Number Is required']" />
            </div>
            <div class="col-sm-12 col-md-6 q-px-md">
              <q-select outlined v-model="owner" :options="ownerOptions" label="Owner *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Select option']" />
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
    FinPortletItem
  },
  data() {
    return {
      tab: 'allUsers',
      roleSearch: '',
      roleOptions: ['trinee', 'client'],
      programSearch: '',
      loading: true,
      createUserDialog: false,
      firstName: '',
      lastName: '',
      isPwd: true,
      password: '',
      email: '',
      phoneNumber: '',
      owner: '',
      ownerOptions: ['position-1', 'position-2', 'position-3', 'position-4'],
      header: [
        { label: 'Name', key: 'name', align: 'start' },
        { label: 'Email Address', key: 'email', align: 'center' },
        { label: 'Role', key: 'role', align: 'center' },
        { label: 'Date Added', key: 'date', align: 'center' },
      ],
      usersList: [
        { name: (Math.random() + 1).toString(36).substring(2), email: (Math.random() + 1).toString(36).substring(2) + '@gmail.com', role: (Math.random() + 1).toString(36).substring(2), date: new Date().toDateString() },
        { name: (Math.random() + 1).toString(36).substring(2), email: (Math.random() + 1).toString(36).substring(2) + '@gmail.com', role: (Math.random() + 1).toString(36).substring(2), date: new Date().toDateString() },
        { name: (Math.random() + 1).toString(36).substring(2), email: (Math.random() + 1).toString(36).substring(2) + '@gmail.com', role: (Math.random() + 1).toString(36).substring(2), date: new Date().toDateString() },
        { name: (Math.random() + 1).toString(36).substring(2), email: (Math.random() + 1).toString(36).substring(2) + '@gmail.com', role: (Math.random() + 1).toString(36).substring(2), date: new Date().toDateString() },
        { name: (Math.random() + 1).toString(36).substring(2), email: (Math.random() + 1).toString(36).substring(2) + '@gmail.com', role: (Math.random() + 1).toString(36).substring(2), date: new Date().toDateString() },
        { name: (Math.random() + 1).toString(36).substring(2), email: (Math.random() + 1).toString(36).substring(2) + '@gmail.com', role: (Math.random() + 1).toString(36).substring(2), date: new Date().toDateString() },
        { name: (Math.random() + 1).toString(36).substring(2), email: (Math.random() + 1).toString(36).substring(2) + '@gmail.com', role: (Math.random() + 1).toString(36).substring(2), date: new Date().toDateString() },
        { name: (Math.random() + 1).toString(36).substring(2), email: (Math.random() + 1).toString(36).substring(2) + '@gmail.com', role: (Math.random() + 1).toString(36).substring(2), date: new Date().toDateString() },
      ]
    }
  },
  methods: {
    createUser() {
      this.createUserDialog = true;
    }
  }
}
</script>
