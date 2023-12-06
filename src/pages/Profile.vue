<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" back-arrow>Profile</fin-portlet-heading>
      <fin-portlet-item>
        <q-btn label="Edit" no-caps class="text-white sub-btn fin-br-8 q-px-xl" @click="disableEdit = false"
          v-if="disableEdit" />
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item class="q-py-xl">
      <div class="row justify-center ">
        <div class="col-12 col-md-3 text-center q-pb-lg column justify-center items-center">
          <q-avatar size="200px" style="background: #FF7F50"
            :class="{ 'rounded-borders': editProfile.profileBg == 'square' }" :square="editProfile.profileBg == 'square'">
            <q-img :src="imageUrl" class="fit"></q-img>
          </q-avatar>
          <div class="q-mt-md" v-if="!disableEdit">
            <label for="fileInput" class="profile-label">
              Change Profile
            </label>
            <br><br>
            <input id="fileInput" name="file" type="file" class="hidden-input" ref="file" @change="onChange"
              accept=".pdf,.jpg,.jpeg,.png">
            <p>Layout</p>
            <div class="flex flex-center">
              <q-avatar size="50px" class="bg-grey cursor-pointer" @click="editProfile.profileBg = ''"></q-avatar>
              <q-avatar square size="50px" class="bg-grey q-mx-sm cursor-pointer"
                @click="editProfile.profileBg = 'square'"></q-avatar>
            </div>
          </div>
        </div>
        <div class="col-md-1"></div>
        <div class="col-12 col-md-5">
          <q-form @submit="verifyData">
            <div class="row">
              <div class="col-12">
                <q-input label="Name" borderless class="shadow-3 q-px-md fin-br-8" v-model="profile.name"
                  :disable="disableEdit" />
                <div class="errorMsgBox">
                  <span v-if="error.name && !profile.name">{{ error.name }}</span>
                </div>
              </div>

              <div class="col-12">
                <q-input label="Email" type="email" borderless class="shadow-3 q-px-md fin-br-8" v-model="profile.email"
                  disable />
                <div class="errorMsgBox">
                  <span v-if="error.email && !profile.email">{{ error.email }}</span>
                </div>
              </div>

              <div class="col-12">
                <q-input label="Phone Number" borderless class="shadow-3 q-px-md fin-br-8" v-model="profile.phoneNumber"
                  :disable="disableEdit" />
                <div class="errorMsgBox">
                  <span v-if="error.phoneNumber && !profile.phoneNumber">{{ error.phoneNumber }}</span>
                </div>
              </div>

              <div class="col-12">
                <q-select borderless class="shadow-3 q-px-md fin-br-8" v-model="profile.role" label="Role"
                  :options="roles" option-value="id" option-label="name" disable />
                <div class="errorMsgBox">
                  <span v-if="error.role && !profile.role">{{ error.role }}</span>
                </div>
              </div>

              <div class="q-pa-sm col-12 text-right" style="min-height:70px">
                <q-btn label="Cancel" no-caps color="red" class="fin-br-8" @click="cancelEdit()" size="md" v-if="!disableEdit" />
                <q-btn color="primary" no-caps class="fin-br-8 q-ml-sm" size="md" style="min-width:150px" label="Update"
                  type="submit" :disable="loading" v-if="!disableEdit">
                  <!-- <q-spinner-ios color="white" class="q-pl-sm" v-if="loading" /> -->
                </q-btn>
              </div>
            </div>
          </q-form>
        </div>
      </div>
    </fin-portlet-item>
  </fin-portlet>
</template>
<script>
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import profileImg from "src/assets/profile.png";
import { urls } from "src/pages/dashboard/Urls";
import { useProfileStore } from "src/stores/profile";
import { storeToRefs } from "pinia";
import { useRolesStore } from "src/stores/roles"

export default {
  name: 'profile',
  components: {
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
  },
  setup() {
    const profileStore = useProfileStore();
    const { user } = storeToRefs(profileStore);
    const { setUserData } = profileStore;
    const rolesStore = useRolesStore();
    const { roles } = storeToRefs(rolesStore);
    return {
      roles,
      user,
      setUserData
    }
  },
  data() {
    return {
      profile: {},
      error: {},

      loading: false,
      disableEdit: true,
      profileData: {},
      editProfile: {
        mail: '',
        fName: '',
        lName: '',
        profile: '',
        UserType: '',
      },
      options: [
        'Admin',
        'Faculty',
        'Student'//
      ],
      imageUrl: '',
      getUserUrl: '',
    }
  },
  mounted() {
    this.getUserData();
  },
  watch: {
    user() {
      this.getUserData();
    }
  },
  methods: {
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
    getUserData() {
      this.$api.get(`api/users/${this.user.id}`).then(response => {
        if (response.data.success) {
          var user = response.data.data;
          this.profile = {
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: this.user.roles ? this.user.roles[0] : [],
          }
          this.imageUrl = this.user.photoPath;
        } else {
          this.showMsg(response.data.message, 'negative');
        }
      }).catch(error => {
        this.loading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      })

    },
    verifyData() {
      var errorCount = 0;
      this.profile.name ? '' : errorCount++;
      this.profile.email ? '' : errorCount++;
      this.profile.phoneNumber ? '' : errorCount++;
      this.profile.role ? '' : errorCount++;
      if (!errorCount) {
        this.profile.file ? this.uploadImg() : this.updateProfile();
      } else {
        this.error = {
          name: "Name is required",
          email: "Email is required",
          phoneNumber: "phone Number is required",
          role: "Role is required",
        }
      }
    },
    uploadImg() {
      if (!this.loading) {
        this.loading = true;
        let formData = new FormData();
        formData.append('file', this.profile.file);
        this.$api.post('fs/upload-file', formData).then(response => {
          this.imageUrl = response.data.uri;
          this.updateProfile();
        }).catch(error => {
          this.showMsg(error.response?.data.message || error.message, 'negative');
        })
      }
    },

    updateProfile() {
      var user = this.user;
      var request = {
        user,
        name: this.profile.name,
        email: this.profile.email,
        phoneNumber: this.profile.phoneNumber,
        photoPath: this.imageUrl,
        password: this.user.password
      };
      this.$api.put(`api/users/${this.user.id}`, request).then(response => {
        if (response.data.success) {
          this.cancelEdit()
        } else {
          this.showMsg(response.data.message, 'negative');
        }
      }).catch(error => {
        this.loading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      })
    },
    cancelEdit() {
      this.getUserData();
      this.disableEdit = true;
    },
    onChange() {
      this.profile.file = this.$refs.file.files.length ? this.$refs.file.files[0] : '';
      if (typeof this.profile.file === 'object') {
        let fileSrc = URL.createObjectURL(this.profile.file);
        this.imageUrl = fileSrc;
      }
    },
  },

}
</script>
<style>
.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}

.profile-label {
  border-radius: 10px;
  border: 1px solid #5479F7;
  color: #5479F7;
  font-weight: bold;
  padding: 8px 16px;
}
</style>
