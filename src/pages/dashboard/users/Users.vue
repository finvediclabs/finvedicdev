<template>
  <fin-portlet style="background-color:transparent;margin-bottom:0px;max-height:100vh;">
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow ><span class="User_heading" >Users</span></fin-portlet-heading>
      <fin-portlet-item class="role_search">
        <q-select  v-model="roleSearch" :options="roleOptions"  label="Roles" outlined class="fin-input" dense />
      </fin-portlet-item>
      <!-- <fin-portlet-item class="program_search">
        <q-select  v-model="programSearch" :options="['trine', 'client']" outlined label="Programs" class="fin-input" 
          dense label-color="white" />
      </fin-portlet-item> -->
      <fin-portlet-item>
        <!-- <q-btn class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder" no-caps @click="createUser()">
</q-btn> -->
<q-btn @click="createUser()" >
  <q-img :src="usersIcon" alt="User Icon" style="width: 32px; height: 32px;" />
</q-btn>

      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item class="table-scroll">
      <fin-table :columns="header" :data="usersList" select @reCall="getUsersData()" allowDelete :delete-url="deleteUrl"
        @editFun="editDataFun" :loading="loading" />
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
            <div class="col-12 col-md-12 q-px-sm q-py-xs">
              <q-input outlined v-model="user.name" label="Name *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Name Is required']" />
            </div>
            <!-- <div class="col-12 col-md-6 q-px-sm q-py-xs">
              <q-input outlined v-model="user.lName" label="Last Name *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Last Name Is required']" />
            </div> -->
            <div class="col-12  q-px-sm q-py-xs">
              <q-input outlined v-model="user.mail" type="email" label="Email *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Email Is required']" />
            </div>
            <div class="col-12 q-px-sm q-py-xs">
              <q-input outlined v-model="user.Number" type="number" label="Phone Number *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Phone Number Is required']" />
            </div>
            <div class="col-12 q-px-sm q-py-xs">
    <!-- Change q-input to q-select and provide options 'y' and 'n' -->
    <q-select v-model="user.isActive" :options="isActiveOptions" label="Is Active *" outlined lazy-rules
      :rules="[val => val && val.length > 0 || 'Is Active Is required']" />
  </div>
            <div class="col-12 q-px-sm q-py-xs">
              <q-select outlined v-model="user.role" :options="rolesList"  option-label="name" lazy-rules
                />
            </div>
            <div class="col-12 col-md-6 q-px-sm q-py-xs text-center q-pt-lg"></div>
            <div class="col-12 col-md-6 q-px-sm q-py-xs text-right q-pt-lg">
              <q-btn label="Close" v-close-popup type="reset" color="primary" flat class="q-mr-sm" no-caps />
              <q-btn label="Submit" type="submit" color="primary" :disable="submitLoading" no-caps>
                <q-spinner-ios size="xs" class="q-ml-sm" v-if="submitLoading" />
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
import { urls } from "src/pages/dashboard/Urls";
import { useSessionStore } from "src/stores/session";
import moment from "moment"
import { useProfileStore } from "src/stores/profile";
import { storeToRefs } from "pinia";
import { useRolesStore } from "src/stores/roles";
import usersIcon from "../../../../src/assets/user.png"


export default {
  setup() {
    const profileStore = useProfileStore();
    const { profile } = storeToRefs(profileStore);
    const rolesStore = useRolesStore();
    const { roles } = storeToRefs(rolesStore);
    
    const session = useSessionStore();
    const { userType } = storeToRefs(session);
    return {
      profile,
      roles,
      userType
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
      isActiveOptions: ['Y', 'N'],
      deleteUrl: urls.usersUrl,
      tab: 'allUsers',
      usersIcon: usersIcon,
      roleSearch: '',
      roleOptions: ['Admin', 'Student','Faculty'],
      roles_new: [],
      programSearch: '',
      loading: true,
      createUserDialog: false,
      isPwd: true,
      ownerOptions: ['position-1', 'position-2', 'position-3', 'position-4'],
      header: [
        { label: 'S.No', key: 'index', align: 'center' },
        { label: 'Name', key: 'name', align: 'start' },
        { label: 'Email Address', key: 'email', align: 'center' },
        { label: 'Role', key: 'owner', align: 'center' },
        { label: 'Date Added', key: 'createdAt', align: 'center' },
        { label: 'Is Active', key: 'isActive', align: 'center' },
      ],
      usersList: [],
      rolesList: [],
      submitLoading: false,
      user: {
        name: '',
        lName: '',
        mail: '',
        Number: '',
        role: '',
        id: '',
        password: '',
        role: [],
      }
    }
  },
  mounted() {
   
    this.getUsersData();
    const labels = document.querySelectorAll('.q-field__label');

    labels.forEach(label => {
      if (label.textContent.trim() === 'Programs') {
        label.style.color = 'white';
      }
    });
    this.getRoles();
  },
  watch: {
    roleSearch() {
      this.getUsersData();
    },
    // programSearch() {
    //   this.getUsersData();
    // }
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
    getRoles() {
      this.loading = true;
      this.$api.get(urls.rolesUrl).then(response => {
        this.loading = false;
        if (response.data.success) {
          this.rolesList = response.data.data.map((item, index) => ({ ...item, createdAt: moment(item.createdAt).format('YYYY-MM-DD'), index: index + 1 }));
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      }).catch(error => {
        this.loading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      });
    },
    getUsersData() {
      this.loading = true;
      this.$api.get(urls.usersUrl).then(response => {
        this.loading = false;
        if (response.data.success) {
          this.usersList = response.data.data.map((item, index) => ({ ...item, createdAt: moment(item.createdAt).format('YYYY-MM-DD'), index: index + 1 }));
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
        name: this.user.name,
        email: this.user.mail,
        phoneNumber: this.user.Number,
        owner: this.user.owner,
        isActive: this.user.isActive,
        //password: "Welcome@123",
        role: [this.user.role],
      };
      this.$api.post(urls.usersUrl, request).then(response => {
        this.submitLoading = false;
        if (response.data.success) {
          this.showMsg(response.data?.message || 'new User created', 'positive');
          this.getUsersData();
          this.closeCreateUserDialog();
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
        name: this.user.name,
        email: this.user.mail,
        phoneNumber: this.user.Number,
        isActive:this.user.isActive,
        owner: this.user.owner,
        id: this.user.id,
        password: this.user.password,
        role: [this.user.role],
      };
      this.$api.put(`${urls.usersUrl}/${this.user.id}`, request).then(response => {
        this.submitLoading = false;
        if (response.data.success) {
          this.showMsg(response.data?.message, 'positive');
          this.getUsersData();
          this.closeCreateUserDialog();
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      }).catch(error => {
        this.submitLoading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      })
    },
    closeCreateUserDialog() {
      this.createUserDialog = false;
      this.$refs.form.reset();
    },
    editDataFun(val) {
      this.user = {
        name: val.name,
        lName: val.lastName,
        mail: val.email,
        Number: val.phoneNumber,
        owner: val.owner,
        id: val.id,
        isActive: val.isActive,
        password: val.password
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
.User_heading{
  color:#5479F7;
  margin-left:4%;
}
.formContent {
  background: #ffffff;
  opacity: 0.9;
}
.role_search{
  background-color:#ffff;
  border-radius:4px;
}
.program_search{
  background-color:#5479F7;
  /* color:white !important; */
  border-radius:4px;
}
.q-btn:before{
  box-shadow: none !important;
}
</style>
src/pages/dashboard/Urls
