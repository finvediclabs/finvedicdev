<template>
    <fin-portlet style="background-color:transparent;margin-bottom:0px;max-height:100vh;">
      <fin-portlet-header>
        <fin-portlet-heading :loading="loading" backArrow>
          <span class="User_heading">Profiles</span>
        </fin-portlet-heading>
        <fin-portlet-item>
          <q-btn
            label="Add Profile"
            dense
            color="blue-15"
            class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder"
            no-caps
            @click="openProfileDialog"
            style="margin-right: 16px;"
          />
        </fin-portlet-item>
      </fin-portlet-header>
  
      <!-- Table to display profiles -->
      <fin-portlet-item>
        <q-table
          :rows="profileList"
          :columns="columns"
          row-key="id"
          flat
          class="profile-table"
        >
          <!-- Action buttons (Edit, Delete) with 3-dots dropdown -->
          <template v-slot:body-cell-actions="props">
            <q-td :props="props"  class="table-actions-cell">
              <q-btn-dropdown icon="more_vert" flat dense class="table-actions-btn">
                <q-list>
                  <q-item clickable @click="editProfile(props.row)">
                    <q-item-section>Edit</q-item-section>
                  </q-item>
                  <q-item clickable @click="deleteProfile(props.row.id)">
                    <q-item-section>Delete</q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </q-td>
          </template>
  
          <!-- Toggle button for 'Is Active' column -->
          <template v-slot:body-cell-isActive="props">
            <q-td :props="props" align="center" class="table-is-active-cell">
              <q-toggle v-model="props.row.active" @update:model-value="toggleIsActive(props.row.id)" />
            </q-td>
          </template>
  
          <!-- Display roles for each profile -->
          <template v-slot:body-cell-roles="props">
            <q-td :props="props" class="roles-display-cell">
              <div class="roles-display">
                <span v-for="role in props.row.roles" :key="role.id" class="role-pill">{{ role.name }}</span>
              </div>
            </q-td>
          </template>
        </q-table>
      </fin-portlet-item>
  
      <!-- Dialog for adding/editing profiles -->
      <q-dialog v-model="profileDialog">
        <fin-portlet style="min-width: 400px; max-width: 600px;">
          <fin-portlet-header bordered>
            <fin-portlet-heading small>{{ isEditing ? 'Edit Profile' : 'Create Profile' }}</fin-portlet-heading>
          </fin-portlet-header>
          <fin-portlet-item>
            <q-form @submit="submitProfile">
              <q-input v-model="newProfile.profileName" label="Profile Name *" outlined />
              <q-input v-model="newProfile.profileCode" label="Profile Code *" outlined />
              <q-select
                v-model="newProfile.roles"
                :options="roleOptions"
                label="Roles *"
                multiple
                option-label="roleName"
                option-value="id"
                outlined
              />
              <q-toggle v-model="newProfile.active" label="Is Active" />
              <div class="dialog-actions">
                <q-btn label="Cancel" color="negative" v-close-popup flat />
                <q-btn label="Submit" type="submit" color="primary" />
              </div>
            </q-form>
          </fin-portlet-item>
        </fin-portlet>
      </q-dialog>
    </fin-portlet>
  </template>
  
  <script>
  import FinPortlet from "src/components/Portlets/FinPortlet.vue";
  import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
  import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
  import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
  import axios from "axios";
  
  export default {
    components: {
      FinPortlet,
      FinPortletHeader,
      FinPortletHeading,
      FinPortletItem,
    },
    data() {
      return {
        profileDialog: false,
        loading: false,
        profileList: [],
        newProfile: {
          profileName: '',
          profileCode: '',
          roles: [],
          active: false,
        },
        roleOptions: [],
        isEditing: false,
        currentProfileId: null,
        columns: [
          { name: 'profileName', label: 'Profile Name', align: 'left', field: 'profileName', style: 'width: 25%' },
          { name: 'profileCode', label: 'Profile Code', align: 'left', field: 'profileCode', style: 'width: 25%' },
          { name: 'roles', label: 'Roles', align: 'left', field: 'roles', style: 'width: 30%' },
          { name: 'isActive', label: 'Is Active', align: 'center', field: 'active', style: 'width: 10%' },
          { name: 'actions', label: 'Actions', align: 'center', field: 'actions', style: 'width: 10%' },
        ],
      };
    },
    mounted() {
      this.fetchProfiles();
      this.fetchRoles();
    },
    methods: {
      openProfileDialog() {
        this.isEditing = false;
        this.newProfile = {
          profileName: '',
          profileCode: '',
          roles: [],
          active: false,
        };
        this.profileDialog = true;
      },
      editProfile(profile) {
        this.isEditing = true;
        this.currentProfileId = profile.id;
        this.newProfile = {
          profileName: profile.profileName,
          profileCode: profile.profileCode,
          roles: profile.roles.map(role => ({ id: role.id, roleName: role.name })),
          active: profile.active,
        };
        this.profileDialog = true;
      },
      submitProfile() {
        const apiUrl = `${process.env.VUE_APP_CORE_URL}/userprofiles`;
        if (this.isEditing) {
          axios.put(`${apiUrl}/${this.currentProfileId}`, this.newProfile)
            .then(() => {
              this.fetchProfiles();
              this.profileDialog = false;
            })
            .catch(error => {
              console.error("Error updating profile:", error);
            });
        } else {
          axios.post(apiUrl, this.newProfile)
            .then(() => {
              this.fetchProfiles();
              this.profileDialog = false;
              console.log("profile:", this.newProfile);
            })
            .catch(error => {
              console.error("Error submitting profile:", error);
            });
        }
      },
      deleteProfile(profileId) {
        const apiUrl = `${process.env.VUE_APP_CORE_URL}/userprofiles`;
        axios.delete(`${apiUrl}/${profileId}`)
          .then(() => {
            this.fetchProfiles();
          })
          .catch(error => {
            console.error("Error deleting profile:", error);
          });
      },
      fetchProfiles() {
        const apiUrl = `${process.env.VUE_APP_CORE_URL}/userprofiles`;
        axios.get(apiUrl)
          .then(response => {
            this.profileList = response.data;
          })
          .catch(error => {
            console.error("Error fetching profiles:", error);
          });
      },
      fetchRoles() {
        const apiUrl = `${process.env.VUE_APP_CORE_URL}/api/roles`;
        axios.get(apiUrl)
          .then(response => {
            this.roleOptions = response.data.data.map(role => ({
              id: role.id,
              roleName: role.name,
            }));
          })
          .catch(error => {
            console.error("Error fetching roles:", error);
          });
      },
      toggleIsActive(profileId) {
        const profile = this.profileList.find(p => p.id === profileId);
        if (profile) {
          profile.active = !profile.active;
          const apiUrl = `${process.env.VUE_APP_CORE_URL}/userprofiles`;
          axios.put(`${apiUrl}/${profileId}`, profile)
            .then(() => {
              this.fetchProfiles();
            })
            .catch(error => {
              console.error("Error updating profile status:", error);
            });
        }
      },
    },
  };
  </script>
  
  
  <style>
  /* General table styling */
  .profile-table .q-table__grid {
    margin-top: 20px;
  }
  
  .profile-table .q-td {
    padding: 12px 16px;
    text-align: left;
  }
  
  /* Center content for Actions and IsActive columns */
  /* .table-actions-cell, .table-is-active-cell {
    display: flex;
    justify-content: center;
    align-items: center;
  } */
  
  /* Styles for the action button dropdown */
  .table-actions-btn {
    margin: 0 auto;
  }
  
  /* Role pills styling */
  .roles-display {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .role-pill {
    background-color: #e0e0e0;
    border-radius: 12px;
    padding: 2px 10px;
    font-size: 12px;
    color: #333;
  }
  
  .User_heading {
    color: #5479F7;
    margin-left: 4%;
    font-size: 24px;
    font-weight: bold;
  }
  
  /* Dialog form buttons */
  .dialog-actions {
    text-align: right;
    margin-top: 16px;
  }
  </style>
  