<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow>Users</fin-portlet-heading>
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
      <fin-table :columns="header" :data="usersList" select @reCall="getUsersData()" allowDelete delete-url=""
        @editFun="editDataFun" :loading="loading"/>
    </fin-portlet-item>
  </fin-portlet>

  <q-dialog v-model="createUserDialog">
    <fin-portlet style="min-width: 400px;max-width: 600px;">
      <fin-portlet-header bordered>
        <fin-portlet-heading small>Create User</fin-portlet-heading>
      </fin-portlet-header>
      <fin-portlet-item class="w-100 createUserDialog">
        <q-form @submit="onSubmit" class="formContent" ref="form">
          <div class="row justify-center">
            <div class="col-12 col-md-6 q-px-sm q-py-xs">
              <q-input outlined v-model="user.fName" label="First Name *" lazy-rules
                :rules="[val => val && val.length > 0 || 'First Name Is required']" />
            </div>
            <div class="col-12 col-md-6 q-px-sm q-py-xs">
              <q-input outlined v-model="user.lName" label="Last Name *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Last Name Is required']" />
            </div>
            <div class="col-12  q-px-sm q-py-xs">
              <q-input outlined v-model="user.mail" type="email" label="Email *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Email Is required']" />
            </div>
            <div class="col-12 q-px-sm q-py-xs">
              <q-input outlined v-model="user.Number" type="number" label="Phonbe Nunber *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Phone Number Is required']" />
            </div>
            <div class="col-12 q-px-sm q-py-xs">
              <q-select outlined v-model="user.role" :options="ownerOptions" label="Owner *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Select option']" />
            </div>
            <div class="col-12 col-md-6 q-px-sm q-py-xs text-center q-pt-lg"></div>
            <div class="col-12 col-md-6 q-px-sm q-py-xs text-right q-pt-lg">
              <q-btn label="Close" v-close-popup type="reset" color="primary" flat class="q-mr-sm" no-caps />
              <q-btn label="Submit" type="submit" color="primary" :disable="submitLoading" no-caps>
                <q-spinner-facebook size="xs" class="q-ml-sm" v-if="submitLoading" />
              </q-btn>
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
import { urls } from "src/pages/dashboard/urls";
import moment from "moment"
import { useProfileStore } from "src/stores/profile";
import { storeToRefs } from "pinia";
export default {
  setup() {
    const profileStore = useProfileStore();
    const { profile } = storeToRefs(profileStore);
    return {
      profile
    }
  },
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
      isPwd: true,
      ownerOptions: ['position-1', 'position-2', 'position-3', 'position-4'],
      header: [
        { label: 'S.No', key: 'index', align: 'center' },
        { label: 'Name', key: 'firstName', align: 'start' },
        { label: 'Email Address', key: 'email', align: 'center' },
        { label: 'Role', key: 'owner', align: 'center' },
        { label: 'Date Added', key: 'createdAt', align: 'center' },
      ],
      usersList: [],
      submitLoading: false,
      user: {
        fName: '',
        lName: '',
        mail: '',
        Number: '',
        role: '',
        id: '',
      }
    }
  },
  mounted() {
    this.getUsersData();
  },
  watch: {
    roleSearch() {
      this.getUsersData();
    },
    programSearch() {
      this.getUsersData();
    }
  },
  methods: {
    createUser() {
      this.user = {};
      this.createUserDialog = true;
    },
    showMsg(message, type) {
      this.$q.notify({
        message: message || "Something Went Wrong!",
        type: type,
        position: 'top-right',
        actions: [
          { icon: 'close', color: 'white', handler: () => { } }
        ]
      });
    },
    getUsersData() {
      this.loading = true;
      this.$api.get(urls.usersUrl).then(response => {
        this.loading = false;
        if (response.data.success) {
          this.usersList = response.data.data.map((item, index) =>({ ...item, createdAt: moment(item.createdAt).format('YYYY-MM-DD') , index: index + 1 }));
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      }).catch(error => {
        this.loading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      });
    },
    onSubmit() {
      if (!this.submitLoading) {
        if (this.user.id) {
          this.updateUser();
        } else {
          this.createNewUser();
        }
      }
    },
    createNewUser() {
      this.submitLoading = true;
      let request = {
        accountId: this.profile?.id,
        firstName: this.user.fName,
        lastName: this.user.lName,
        email: this.user.mail,
        phoneNumber: this.user.Number,
        role: this.user.role,
        password: "Welcome@123",
      };
      this.$api.post(urls.usersUrl, request).then(response => {
        this.submitLoading = false;
        if (response.data.success) {
          this.showMsg(response.data?.message, 'positive');
          this.getUsersData();
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      }).catch(error => {
        this.submitLoading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      })
    },
    updateUser() {
      this.submitLoading = true;
      let request = {
        accountId: this.profile?.id,
        firstName: this.user.fName,
        lastName: this.user.lName,
        email: this.user.mail,
        phoneNumber: this.user.Number,
        role: this.user.role,
        id: this.user.id,
        password: "Welcome@123",
      };
      this.$api.put(urls.usersUrl, request).then(response => {
        this.submitLoading = false;
        if (response.data.success) {
          this.showMsg(response.data?.message, 'positive');
          this.getUsersData();
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      }).catch(error => {
        this.submitLoading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      })
    },
    closecreateUserDialog() {
      this.createUserDialog = false;
      this.$refs.form.reset();
    },
    editDataFun(val) {
      this.user = {
        fName: val.firstName,
        lName: val.lastName,
        mail: val.email,
        Number: val.phoneNumber,
        role: val.owner,
        id: val.id,
      };
      this.createUserDialog = true;
    }
  }
}
</script>
<style>
.createUserDialog {
  background-image: url("../../../assets/users.png");
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
