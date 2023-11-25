<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" back-arrow>Profile</fin-portlet-heading>
      <fin-portlet-item>
        <q-btn label="Edit" no-caps class="text-white sub-btn" flat icon-size="10px" @click="disableEdit = false"
          v-if="disableEdit"></q-btn>
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item>
      <div class="row justify-center ">
        <div class="col-12 col-md-3 text-center q-pb-lg">
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
          <q-form @submit="updateProfile">
            <div class="row">
              <div class="q-pa-sm col-12 col-md-6 ">
                <q-input outlined v-model="editProfile.fName" label="First Name" :disable="disableEdit" lazy-rules
                  :rules="[val => val && val.length > 0 || 'First Name is required']" />
              </div>
              <div class="q-pa-sm col-12 col-md-6 ">
                <q-input outlined v-model="editProfile.lName" label="First Name" :disable="disableEdit" lazy-rules
                  :rules="[val => val && val.length > 0 || 'Last Name is required']" />
              </div>
              <div class="q-pa-sm col-12">
                <q-input outlined v-model="editProfile.mail" label="Email Address" :disable="disableEdit" lazy-rules
                  :rules="[val => val && val.length > 0 || 'Email is required']" />
              </div>
              <!-- <div class="q-pa-sm col-12">
                <q-input v-model="password" outlined class="q-my-sm" label="Password" :type="isPwd ? 'password' : 'text'"
                  lazy-rules :rules="[val => val && val.length > 0 || 'Password is required']" :disable="disableEdit">
                  <template v-slot:append>
                    <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                      @click="isPwd = !isPwd" />
                  </template>
                </q-input>
              </div> -->
              <div class="q-pa-sm col-12">
                <q-select outlined v-model="editProfile.Usertype" :options="options" label="Type" :disable="disableEdit"
                  lazy-rules :rules="[val => val && val.length > 0 || 'Type is required']" />
              </div>
              <div class="q-pa-sm col-12 text-right" style="min-height:70px">
                <q-btn label="Cancel" no-caps color="red" @click="cancelEdit()" v-if="!disableEdit" />
                <q-btn color="primary" no-caps class="sub-btn q-ml-sm" style="min-width:150px" label="Update"
                  type="submit" :disable="loading" v-if="!disableEdit">
                  <q-spinner-ios color="white" class="q-pl-sm" v-if="loading" />
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
import { urls } from "src/pages/dashboard/urls";
import { useProfileStore } from "src/stores/profile";
import { storeToRefs } from "pinia";

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
    const { profile } = storeToRefs(profileStore);
    return {
      profile,
    }
  },
  data() {
    return {
      loading: false,
      disableEdit: true,
      profileData: {},
      editProfile: {
        mail: '',
        fName: '',
        lName: '',
        profile: '',
        Usertype: '',
      },
      options: [
        'Admin',
        'Faculty',
        'Student'
      ],
      imageUrl: '',
      getUserUrl: '',
    }
  },
  mounted() {
    if (this.profile) {
      this.getProfileData();
    }

  },
  watch: {
    profile() {
      this.getProfileData();
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
    getProfileData() {
      this.getUserUrl = urls.usersUrl + '/' + this.profile.id;
      this.loading = true;
      this.$api.get(this.getUserUrl).then(response => {
        if (response.data.success) {
          this.profileData = response.data.data;
          this.editProfile = {
            mail: this.profileData.email,
            fName: this.profileData.firstName,
            lName: this.profileData.lastName,
            profile: this.profileData.image,
            Usertype: this.profileData.type,
            profileBg: this.profileData.imgBgType,
          }
          this.imageUrl = this.editProfile.profile;
        } else {
          this.showMsg(response.data.message, 'negative');
        }
      }).catch(error => {
        this.loading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      });
    },
    updateProfile() {
      var formdata = new FormData();
      formdata.append('image', this.editProfile.profile);
      formdata.append('firstName', this.editProfile.fName);
      formdata.append('lastName', this.editProfile.lName);
      formdata.append('email', this.editProfile.mail);
      formdata.append('type', this.editProfile.Usertype);
      formdata.append('imgBgType', this.editProfile.profileBg);
      this.loading = true;
      this.$api.post(url, formdata).then(response => {
        if (response.data.success) {
          this.showMsg(response.data.message, 'positive');
          this.getProfileData();
        } else {
          this.showMsg(response.data.message, 'negative');
        }
      }).catch(error => {
        this.loading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      });
    },
    cancelEdit() {
      this.editProfile = {
        mail: this.profileData.email,
        fName: this.profileData.firstName,
        lName: this.profileData.lastName,
        profile: this.profileData.image,
        Usertype: this.profileData.type,
      }
      this.imageUrl = this.editProfile.profile;
      this.disableEdit = true;
    },
    onChange() {
      this.editProfile.profile = this.$refs.file.files.length ? this.$refs.file.files[0] : '';
      if (typeof this.editProfile.profile === 'object') {
        let fileSrc = URL.createObjectURL(this.editProfile.profile);
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
