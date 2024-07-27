<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" back-arrow>Profile</fin-portlet-heading>
      <fin-portlet-item>
        <q-btn label="Edit" no-caps class="text-white sub-btn fin-br-8 q-px-xl" @click="disableEdit = false"
          v-if="disableEdit"/>
      </fin-portlet-item>
      <fin-portlet-item>
        <q-btn label="Reset Password" no-caps class="text-white sub-btn fin-br-8 q-px-xl" @click="showResetPasswordDialog" v-if="disableEdit" />
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item class="q-py-xl">
      <div class="row">
        <div class="col-12 col-md-3 text-center q-pb-lg column justify-center items-center">
          <q-avatar size="200px" style="background: #FF7F50" :class="{ 'rounded-borders': editProfile.profileBg == 'square' }" :square="editProfile.profileBg == 'square'">
            <q-img :src="imageUrl" class="fit" />
          </q-avatar>
          <div class="q-mt-md" v-if="!disableEdit">
                <label for="fileInput" class="profile-label">
                  Change Profile
                </label>
                <br><br>
                <input
                  id="fileInput"
                  name="file"
                  type="file"
                  class="hidden-input"
                  ref="file"
                  @change="onChange"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <p>Layout</p>
                <div class="flex flex-center">
                  <q-avatar size="50px" class="bg-grey cursor-pointer" @click="editProfile.profileBg = ''"></q-avatar>
                  <q-avatar square size="50px" class="bg-grey q-mx-sm cursor-pointer" @click="editProfile.profileBg = 'square'"></q-avatar>
                </div>
              </div>

        </div>
        <div class="col-md-1"></div>
        <div class="col-12 col-md-8">
          <q-form @submit="verifyData">
            <div class="row">
              <div class="col-5">
                <div class="col-12">
                  <q-input label="Name" borderless class="shadow-3 q-px-md fin-br-8" v-model="profile.name" :disable="disableEdit" />
                  <div class="errorMsgBox">
                    <span v-if="error.name && !profile.name">{{ error.name }}</span>
                  </div>
                </div>
                <div class="col-12">
                  <q-input label="Email" type="email" borderless class="shadow-3 q-px-md fin-br-8" v-model="profile.email" disable />
                  <div class="errorMsgBox">
                    <span v-if="error.email && !profile.email">{{ error.email }}</span>
                  </div>
                </div>
                <div class="col-12">
                      <q-input 
                        label="Phone Number" 
                        borderless 
                        class="shadow-3 q-px-md fin-br-8" 
                        v-model="profile.phoneNumber" 
                        :disable="disableEdit" 
                        :rules="[phoneNumberRules]"
                      />
                      <div class="errorMsgBox">
                        <span v-if="error.phoneNumber">{{ error.phoneNumber }}</span>
                      </div>
                    </div>
                <div class="col-12">
                  <q-select borderless class="shadow-3 q-px-md fin-br-8" v-model="profile.role" label="Role" :options="roles" option-value="id" option-label="name" disable />
                  <div class="errorMsgBox">
                    <span v-if="error.role && !profile.role">{{ error.role }}</span>
                  </div>
                </div>
                <div class="col-12">
                  <q-select 
                    label="Gender" 
                    borderless 
                    class="shadow-3 q-px-md fin-br-8" 
                    v-model="profile.gender"
                    :options="genders" 
                    option-value="value" 
                    option-label="label" 
                    :disable="disableEdit" 
                  />
                  <div class="errorMsgBox">
                    <span v-if="error.gender && !profile.gender">{{ error.gender }}</span>
                  </div>
                </div>
                <!-- <div class="col-12">
                    <q-input label="Date of Birth" type="date" borderless class="shadow-3 q-px-md fin-br-8" v-model="profile.dob" :disable="disableEdit" />
                    <div class="errorMsgBox">
                      <span v-if="error.dob && !profile.dob">{{ error.dob }}</span>
                    </div>
                  </div> -->
                  <div class="col-12">
                    <q-input 
                      label="Date of Birth" 
                      type="date" 
                      borderless 
                      class="shadow-3 q-px-md fin-br-8" 
                      v-model="profile.dob" 
                      :disable="disableEdit" 
                      :rules="[dateOfBirthRules]"
                    />
                    <div class="errorMsgBox">
                    <span v-if="error.dob && !profile.dob">{{ error.dob }}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-1"></div>
              <div class="col-5">
              
                <div class="col-12">
                  <q-input 
                    label="Highest Qualification" 
                    borderless 
                    class="shadow-3 q-px-md fin-br-8" 
                    v-model="profile.graduationDegree" 
                    :disable="disableEdit" 
                  />
                  <div class="errorMsgBox">
                    <span v-if="error.graduationDegree && !profile.graduationDegree">{{ error.graduationDegree }}</span>
                  </div>
                </div>
                <div class="col-12">
                  <div class="col-12 mt-4"> <!-- Added mt-4 for spacing -->
                    <q-input 
                      label="Qualification Year" 
                      borderless 
                      class="shadow-3 q-px-md fin-br-8" 
                      v-model="profile.qualificationYear"
                      :disable="disableEdit" 
                    />
                    <div class="errorMsgBox">
                      <span v-if="error.qualificationYear && !profile.qualificationYear">{{ error.qualificationYear }}</span> <!-- Updated v-if to error.qualificationYear -->
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <q-input 
                    label="Specialization" 
                    borderless 
                    class="shadow-3 q-px-md fin-br-8" 
                    v-model="profile.specialization" 
                    :disable="disableEdit" 
                  />
                  <div class="errorMsgBox">
                    <span v-if="error.specialization && !profile.specialization">{{ error.specialization }}</span>
                  </div>
                </div>
                <!-- <div class="col-12">
                  <q-uploader 
                    :label="uploadDocumentLabel" 
                    borderless 
                    class="shadow-3 q-px-md fin-br-8" 
                    style="width: 100%;" 
                    :disable="disableEdit" 
                    accept=".pdf" 
                    max-file-size="5242880"
                    @added="onPdfChange"
                   />
                  <div class="errorMsgBox">
                    <span v-if="error.uploadDocumentPath && !profile.uploadDocumentPath">{{ error.uploadDocumentPath }}</span>
                  </div>
                </div> -->
                <div class="q-pa-sm col-12 text-center" style="min-height:70px;">
                  <q-btn label="Cancel" no-caps color="red" class="fin-br-8" @click="cancelEdit()" size="md" v-if="!disableEdit" />
                  <q-btn color="primary" no-caps class="fin-br-8 q-ml-sm" size="md" style="min-width:150px" label="Update" type="submit" :disable="loading" v-if="!disableEdit">
                    <!-- <q-spinner-ios color="white" class="q-pl-sm" v-if="loading" /> -->
                  </q-btn>
                </div>
              </div>
            </div>
          </q-form>
        </div>
      </div>
    </fin-portlet-item>
    <!-- Reset Password Dialog -->
    <q-dialog v-model="showResetPassword" class="custom-dialog">
      <q-card class="custom-card">
        <q-card-section>
          <div class="text-h6">Reset Password</div>
        </q-card-section>

        <q-card-section>
          <q-input class="shadow-3 q-px-md fin-br-8 q-ma-md" v-model="resetPasswordForm.oldPassword" type="password" label="Enter Old Password" />
          <q-input class="shadow-3 q-px-md fin-br-8 q-ma-md" v-model="resetPasswordForm.newPassword" type="password" label="Enter New Password" />
          <q-input class="shadow-3 q-px-md fin-br-8 q-ma-md" v-model="resetPasswordForm.confirmNewPassword" type="password" label="Confirm New Password" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" class="custom-button " v-close-popup />
          <q-btn flat label="Submit" class="custom-button" @click="resetPassword"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
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
import { useRolesStore } from "src/stores/roles";
import axios from 'axios';

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
    };
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
        'Student',
      ],
      imageUrl: '',
      getUserUrl: '',
      showResetPassword: false,
      resetPasswordForm: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',  
      },
      genders: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female'}
      ]
    };
  },
  computed: {
    uploadDocumentLabel() {
      const fullPath = this.profile.uploadDocumentPath;
      const base64FileName = fullPath ? fullPath.split('/').pop() : '';
      try {
        const decodedFileName = atob(base64FileName);
        return decodedFileName;
      } catch (error) {
        return 'Upload Your Certificates (PDF only, max 5MB)';
      }
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
            gender: user.gender,
            dob: user.dob,
            graduationDegree: user.graduationDegree,
            qualificationYear: user.qualificationYear,
            specialization: user.specialization,
            phoneNumber: user.phoneNumber,
            uploadDocumentPath: user.uploadDocumentPath,
            role: this.user.roles ? this.user.roles[0] : []
          };
          this.imageUrl = user.photoPath;
          console.log('Upload Document Path:', this.profile.uploadDocumentPath);
        } else {
          this.showMsg(response.data.message, 'negative');
        }
      }).catch(error => {
        this.loading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      });
    },
    verifyData() {
      var errorCount = 0;
      this.profile.name ? '' : errorCount++;
      this.profile.email ? '' : errorCount++;
      this.profile.gender ? '' : errorCount++;
      this.profile.graduationDegree ? '' : errorCount++;
      this.profile.qualificationYear ? '' : errorCount++;
      this.profile.specialization ? '' : errorCount++;
      // this.profile.uploadDocumentPath ? '' : errorCount++;
      this.profile.phoneNumber ? '' : errorCount++;
      this.profile.role ? '' : errorCount++;
      if (!errorCount) {
        this.profile.file ? this.uploadImg() : this.updateProfile();
      } else {
        this.error = {
          name: "Name is required",
          email: "Email is required",
          gender: "Gender is required",
          dob: "DOB is required",
          graduationDegree: "Graduation degree is required",
          qualificationYear: "Qualification year is required",
          specialization: "Specialization is required",
          // uploadDocumentPath: "Upload document path is required",
          phoneNumber: "Phone number is required",
          role: "Role is required",
        };
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
        });
      }
    },
//     updateProfile() {
//   var user = this.user;
//   this.uploadFile(this.profile.file) // Call uploadFile to get file path
//     .then(filePath => {
//       var request = {
//         user,
//         name: this.profile.name,
//         email: this.profile.email,
//         gender: this.profile.gender.value,
//         dob: this.profile.dob,
//         graduationDegree: this.profile.graduationDegree,
//         qualificationYear: this.profile.qualificationYear,
//         specialization: this.profile.specialization,
//         uploadDocumentPath: filePath, // Use the file path here
//         phoneNumber: this.profile.phoneNumber,
//         photoPath: this.imageUrl,
//         password: this.user.password,
//       };

//       return this.$api.put(`api/users/${this.user.id}`, request);
//     })
//     .then(response => {
//       if (response.data.success) {
//         this.cancelEdit();
//       } else {
//         this.showMsg(response.data.message, 'negative');
//       }
//     })
//     .catch(error => {
//       this.loading = false;
//       this.showMsg(error.response?.data.message || error.message, 'negative');
//     });
// },
//     onChange() {
//       this.profile.file = this.$refs.file.files.length ? this.$refs.file.files[0] : '';
//       if (typeof this.profile.file === 'object') {
//         let fileSrc = URL.createObjectURL(this.profile.file);
//         this.imageUrl = fileSrc;
//       }
//     },
    showResetPasswordDialog() {
      this.showResetPassword = true;
    },
    resetPassword() {
      if (this.resetPasswordForm.newPassword !== this.resetPasswordForm.confirmNewPassword) {
        this.showMsg("New passwords do not match", 'negative');
        return;
      }
      if (!this.resetPasswordForm.newPassword) {
       this.showMsg("New password cannot be empty", 'negative');
       return;
        }

      if (this.resetPasswordForm.newPassword !== this.resetPasswordForm.confirmNewPassword) {
       this.showMsg("New passwords do not match", 'negative');
       return;
        }

      if (!this.isStrongPassword(this.resetPasswordForm.newPassword)) {
        this.showMsg("New password is not strong enough", 'negative');
       return;
        }

       this.loading = true;
       const request = {
        userId: this.user.id,
        oldPassword: this.resetPasswordForm.oldPassword,
        newPassword: this.resetPasswordForm.newPassword,
      };

       this.$api.put('api/users/reset-password', request).then(response => {
        this.loading = false;
        if (response.data.success) {
          this.showMsg("Your password is updated successfully", 'positive');
          this.showResetPassword = false;
        } else {
          this.showMsg(response.data.message, 'negative');
        }
      }).catch(error => {
        this.loading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      });
    },
    isStrongPassword(password) {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
    },
    // onChange(event) {
    //   const file = event.target.files[0];
    //   if (file) {
    //     this.uploadFile(file);
    //   }
    // },
    async onPdfChange(files) {
      if (files.length > 0) {
        const file = files[0];
        try {
          const filePath = await this.uploadFile(file);
          this.profile.uploadDocumentPath = filePath;
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    },
    async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      
      const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
      const getFileUrl = baseUrl + 'fs/upload-file';
      const response = await fetch(getFileUrl, {
     
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      const filePath = data.uri;
      console.log('File uploaded:', filePath);
      return filePath; // Return the file path
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  // Method to update profile
  getUserData() {
    this.$api.get(`api/users/${this.user.id}`).then(response => {
      if (response.data.success) {
        var user = response.data.data;
        this.profile = {
          name: user.name,
          email: user.email,
          gender: user.gender,
          dob: user.dob,
          graduationDegree: user.graduationDegree,
          qualificationYear: user.qualificationYear,
          specialization: user.specialization,
          phoneNumber: user.phoneNumber,
          uploadDocumentPath: user.uploadDocumentPath,
          role: this.user.roles ? this.user.roles[0] : []
        };
        this.imageUrl = user.photoPath;
        console.log('Upload Document Path:', this.profile.uploadDocumentPath);
      } else {
        this.showMsg(response.data.message, 'negative');
      }
    }).catch(error => {
      this.loading = false;
      this.showMsg(error.response?.data.message || error.message, 'negative');
    });
  },
  updateProfile() {
    if (this.profile.file) { 
      this.uploadFile(this.profile.file)
        .then(filePath => {
          // Construct request with updated file path
          var request = {
            user: this.user,
            name: this.profile.name,
            email: this.profile.email,
            gender: this.profile.gender.value,
            dob: this.profile.dob,
            graduationDegree: this.profile.graduationDegree,
            qualificationYear: this.profile.qualificationYear,
            specialization: this.profile.specialization,
            uploadDocumentPath: filePath, // Use the file path here
            phoneNumber: this.profile.phoneNumber,
            photoPath: this.imageUrl,
            password: this.user.password,
          };

          // Make PUT request to update user profile
          return this.$api.put(`api/users/${this.user.id}`, request);
        })
        .then(response => {
          if (response.data.success) {
            this.cancelEdit();
          } else {
            this.showMsg(response.data.message, 'negative');
          }
        })
        .catch(error => {
          this.loading = false;
          this.showMsg(error.response?.data.message || error.message, 'negative');
        });
    } else {
      // If no new file, update profile without uploading file
      var request = {
        user: this.user,
        name: this.profile.name,
        email: this.profile.email,
        gender: this.profile.gender.value,
        dob: this.profile.dob,
        graduationDegree: this.profile.graduationDegree,
        qualificationYear: this.profile.qualificationYear,
        specialization: this.profile.specialization,
        uploadDocumentPath: this.profile.uploadDocumentPath, // Use existing file path
        phoneNumber: this.profile.phoneNumber,
        photoPath: this.imageUrl,
        password: this.user.password,
      };

      // Make PUT request to update user profile
      this.$api.put(`api/users/${this.user.id}`, request)
        .then(response => {
          if (response.data.success) {
            this.cancelEdit();
          } else {
            this.showMsg(response.data.message, 'negative');
          }
        })
        .catch(error => {
          this.loading = false;
          this.showMsg(error.response?.data.message || error.message, 'negative');
        });
    }
  },
  cancelEdit() {
    this.disableEdit = true;
    this.getUserData(); // Fetch the latest user data from the database
  },
  // Method to handle file input change
  onChange(event) {
    const file = event.target.files[0];
    if (file) {
      this.profile.file = file; // Update profile.file with the new file
      let fileSrc = URL.createObjectURL(file);
      this.imageUrl = fileSrc; // Update image preview if necessary
    }
  },
    
  validatePhoneNumber(phoneNumber) {
      const phoneNumberRegex = /^[0-9]{10}$/;
      return phoneNumberRegex.test(phoneNumber);
    },
    phoneNumberRules(val) {
      return this.validatePhoneNumber(val) || "Please enter a valid 10-digit phone number.";
    },
    dateOfBirthRules(val) {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const inputDate = new Date(val);

  // Check if the date is in the future
  if (val > todayStr) {
    return "Date of Birth cannot be in the future.";
  }

  // Check if the date is in the current year
  const currentYear = today.getFullYear();
  const inputYear = inputDate.getFullYear();
  if (inputYear === currentYear) {
    return "Date of Birth cannot be in the current year.";
  }

  // Check if the age is at least 18
  const age = currentYear - inputYear;
  const monthDifference = today.getMonth() - inputDate.getMonth();
  const dayDifference = today.getDate() - inputDate.getDate();

  if (age < 18 || (age === 18 && (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)))) {
    return "You must be at least 18 years old.";
  }

  return true;
}

  }
};
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
.custom-dialog .q-card {
  width: 500px;
  max-width: 90vw; 
}

.custom-button {
  transition: background-color 0.3s, color 0.3s;
}

.custom-button:hover {
  background-color: #5479F7; 
  color: white; 
}
</style>
