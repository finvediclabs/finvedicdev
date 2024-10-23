<template>
  <fin-portlet style="background-color:transparent;margin-bottom:0px;max-height:100vh;">
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow ><span class="User_heading" >Users</span></fin-portlet-heading>
      <fin-portlet-item class="role_search">
        <q-select  v-model="roleSearch" :options="roleOptions"  label="Roles"  option-value="value" outlined class="fin-input" dense />
      </fin-portlet-item>
      <fin-portlet-item>
<q-btn @click="createUser()" >
  <q-img :src="usersIcon" alt="User Icon" style="width: 32px; height: 32px;" />
</q-btn>
<q-btn @click="openUploadExcelDialog()" label="Upload Excel" icon="upload" color="primary" flat />
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item class="table-scroll">
      <fin-table :columns="header" :data="usersList" select @reCall="getUsersData()" allowDelete :delete-url="deleteUrl"
        @editFun="editDataFun" :loading="loading" />
    </fin-portlet-item>
  </fin-portlet>
  <q-dialog v-model="uploadExcelDialog">
  <fin-portlet style="min-width: 400px; max-width: 600px;">
    <fin-portlet-header bordered>
      <fin-portlet-heading small>Upload Excel</fin-portlet-heading>
    </fin-portlet-header>
    <fin-portlet-item class="w-100">
      <q-form @submit="uploadExcelFile" class="formContent">
        <div class="row justify-center">
          <div class="col-12 col-md-12 q-px-sm q-py-xs">
            <!-- Replacing q-input with q-uploader -->
            <q-uploader
              accept=".xls,.xlsx"
              label="Upload Excel File"
              @added="handleFileUpload"
              :auto-upload="false"
              no-thumbnails
              style="width:100%"
            />
          </div>
          <div class="col-12 col-md-6 q-px-sm q-py-xs">
            <q-input
              v-model="batchLimit"
              type="number"
              label="Batch Limit"
              outlined
              required
            />
          </div>
          <div class="col-12 col-md-6 q-px-sm q-py-xs">
            <q-input
              v-model="organization"
              label="Organization"
              outlined
              required
            />
          </div>
          <div class="col-12 col-md-6 q-px-sm q-py-xs text-right q-pt-lg">
            <q-btn label="Close" v-close-popup type="reset" color="primary" flat class="q-mr-sm" no-caps />
            <q-btn label="Upload" type="submit" color="primary" :disable="submitLoading" no-caps>
              <q-spinner-ios size="xs" class="q-ml-sm" v-if="submitLoading" />
            </q-btn>
          </div>
        </div>
      </q-form>
    </fin-portlet-item>
  </fin-portlet>
</q-dialog>
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
            <div class="col-12 col-md-12 q-px-sm q-py-xs">
              <q-input outlined v-model="user.password" label="Password *" lazy-rules
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
            <div class="col-12 q-px-sm q-py-xs">
            <q-input outlined v-model="user.startDateTime" type="datetime-local" label="Start Date & Time *" lazy-rules
              :rules="[val => val && val.length > 0 || 'Start Date & Time Is required']" />
          </div>
          <div class="col-12 q-px-sm q-py-xs">
            <q-input outlined v-model="user.endDateTime" type="datetime-local" label="End Date & Time *" lazy-rules
              :rules="[val => val && val.length > 0 || 'End Date & Time Is required']" />
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
      roleOptions: [],
      roles_new: [],
      uploadExcelDialog: false,  // Add this for tracking the Excel dialog
      batchLimit: null, // Initialize batchLimit
      organization: "",
      excelFile: null, 
      programSearch: '',
      loading: true,
      createUserDialog: false,
      isPwd: true,
      ownerOptions: ['position-1', 'position-2', 'position-3', 'position-4'],
      header: [
        { label: 'S.No', key: 'index', align: 'center' },
        { label: 'Name', key: 'name', align: 'start' },
        { label: 'Email Address', key: 'email', align: 'center' },
        { label: 'Organization', key: 'organization', align: 'center' },
        { label: 'End Date', key: 'endDateTime', align: 'center' },
        { label: 'Role', key: 'role', align: 'center' },
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
        roleValue: '',
        id: '',
        password: '',
        role: [],
         startDateTime: '',
      endDateTime: ''
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
    this.getRoleOptions();
  },
  watch: {
    roleSearch(newVal) {
      // console.log('Selected Role Value:', newVal);
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
    openUploadExcelDialog() {
      this.uploadExcelDialog = true;
    },
    // Handle file selection
    handleFileUpload(files) {
      if (files.length > 0) {
        this.excelFile = files[0];  // Assign the first file to excelFile
        console.log('Selected file:', this.excelFile);
      } else {
        console.log('No file selected');
      }
    },
    // Method to submit the form and upload the Excel file
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
    getRoleOptions() {
  this.$api.get(urls.usersUrl).then(response => {
    if (response.data.success) {
      // Extract unique roles from the main user data URL
      const roleMap = new Map();
      response.data.data.forEach(user => {
        if (user.role && user.role.length > 0 && user.role[0].id && user.role[0].name) {
          roleMap.set(user.role[0].id, user.role[0].name);
        }
      });

      // Add "All Users" option manually
      this.roleOptions = [
        { label: 'All Users', value: '' },
        ...Array.from(roleMap, ([value, label]) => ({
          label,
          value
        }))
      ];

      // console.log('Role Options:', this.roleOptions);
    } else {
      this.showMsg(response.data?.message, 'negative');
    }
  }).catch(error => {
    this.showMsg(error.response?.data.message || error.message, 'negative');
  });
},
    getUsersData() {
      this.loading = true;

      let url1 = urls.usersUrl;
      if (this.roleSearch && this.roleSearch.value) {
        url1 = `${urls.usersUrl}/role/${this.roleSearch.value}`;
        // console.log('Role Search Value:', this.roleSearch.value); // Log the roleSearch value
        // console.log('Constructed URL:', url1); // Log the URL
      }

      this.$api.get(url1).then(response => {
        this.loading = false;
        if (response.data.success) {
          this.usersList = response.data.data.map((item, index) => ({
            ...item,
            createdAt: moment(item.createdAt).format('YYYY-MM-DD'),
            index: index + 1,
            role: item.role.length > 0 ? item.role[0].name : 'No Role',
            roleValue: item.role.length > 0 ? item.role[0].id : 'No Id'
          }));
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      }).catch(error => {
        this.loading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      });
    },
    createUser() {
      this.user = {};
      this.createUserDialog = true;
      
    },
    uploadExcelFile() {
      if (!this.excelFile) {
        this.showMsg("Please select an Excel file!", "negative");
        return;
      }
      
      // Check for required fields
      if (!this.batchLimit || !this.organization) {
        this.showMsg("Please enter both Batch Limit and Organization!", "negative");
        return;
      }

      let formData = new FormData();
      formData.append("file", this.excelFile);
      formData.append("batchLimit", this.batchLimit); // Append batchLimit
      formData.append("organization", this.organization); // Append organization

      this.submitLoading = true;
      const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
      const url = `${baseUrl}api/users/xl`;
      // Axios POST request
      this.$api.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        this.submitLoading = false;
        if (response.data.success) {
          this.showMsg("Excel file uploaded successfully", "positive");
          this.uploadExcelDialog = false;  // Close the dialog after success
          this.getUsersData();  // Refresh the user data if necessary
        } else {
          this.showMsg(response.data.message, "negative");
        }
      })
      .catch(error => {
        this.submitLoading = false;
        this.showMsg(error.response?.data.message || error.message, "negative");
      });
    },
    showMsg(message, type) {
      this.$q.notify({
        message: message || "Something Went Wrong!",
        type: type,
        position: 'top-right',
        actions: [
          { icon: 'close', color: 'white', handler: () => {} }
        ]
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
    startDateTime: this.user.startDateTime,  // New field
    endDateTime: this.user.endDateTime,      // New field
    role: [this.user.role],
  };
  
  this.$api.post(urls.usersUrl, request).then(response => {
    this.submitLoading = false;
    if (response.data.success) {
      this.showMsg(response.data?.message || 'New User created', 'positive');
      this.getUsersData();
      this.closeCreateUserDialog();
    } else {
      this.showMsg(response.data?.message, 'negative');
    }
  }).catch(error => {
    this.submitLoading = false;
    this.showMsg(error.response?.data.message || error.message, 'negative');
  });
},

updateUser() {
  this.submitLoading = true;
  let request = {
    accountId: this.profile?.id,
    name: this.user.name,
    email: this.user.mail,
    phoneNumber: this.user.Number,
    isActive: this.user.isActive,
    owner: this.user.owner,
    id: this.user.id,
    password: this.user.password,
    startDateTime: this.user.startDateTime,  // New field
    endDateTime: this.user.endDateTime,      // New field
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
  });
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
        startDateTime: this.formatDate(val.startDateTime),  // Format the start date
        endDateTime: this.formatDate(val.endDateTime),        // New field
        password: val.password
      };
      console.log(this.user);
      console.log(val.startDateTime);
      this.createUserDialog = true;
    },
    formatDate(dateArray) {
  if (!Array.isArray(dateArray) || dateArray.length < 5) return ''; // Check if it's a valid array
  const year = dateArray[0];
  const month = String(dateArray[1]).padStart(2, '0'); // Ensure two-digit month
  const day = String(dateArray[2]).padStart(2, '0'); // Ensure two-digit day
  const hours = String(dateArray[3]).padStart(2, '0'); // Ensure two-digit hour
  const minutes = String(dateArray[4]).padStart(2, '0'); // Ensure two-digit minutes

  return `${year}-${month}-${day}T${hours}:${minutes}`; // Return formatted date string
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
