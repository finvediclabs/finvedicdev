<template>
  <fin-portlet style="background-color:transparent;margin-bottom:0px;max-height:100vh;">
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow><span class="User_heading" >Roles</span></fin-portlet-heading>
      <fin-portlet-item>
        <q-btn @click="createRole()"
        label="Add Role"
        dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder"
            no-caps
        />
      </fin-portlet-item>
    </fin-portlet-header>
    
    <fin-portlet-item class="table-scroll" style="white-space: nowrap;">
      <fin-table :columns="header" :data="rolesList" select @reCall="getRolesData()" allowDelete delete-url=""
        @editFun="editDataFun" :showActions="false" :loading="loading" />
        
    </fin-portlet-item>

  </fin-portlet>
  
  <q-dialog v-model="createRoleDialog">
    <fin-portlet style="min-width: 400px;max-width: 600px;">
      <fin-portlet-header bordered>
        <fin-portlet-heading small>Create Role</fin-portlet-heading>
      </fin-portlet-header>
      <fin-portlet-item class="w-100 createRoleDialog">
        <q-form @submit="onSubmit" class="formContent" ref="form">
          <div class="row justify-center">
            <div class="col-12 q-px-sm q-py-xs">
              <q-input
                outlined
                v-model="roles.name"
                label="Role Name *"
                lazy-rules
                :rules="[val => val && val.length > 0 || 'Name Is required']"
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
import moment from "moment"
import { useProfileStore } from "src/stores/profile";
import { useRolesStore } from "src/stores/roles"
import { storeToRefs } from "pinia";
import usersIcon from "../../../src/assets/user.png";

export default {
  setup() {
    const profileStore = useProfileStore();
    const { profile } = storeToRefs(profileStore);
    const rolesStore = useRolesStore();
    const { roles } = storeToRefs(rolesStore);
    return {
      profile,
      roles
    }
  },
  components: {
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
    FinTable
  },
  data() {
    return {
      header: [
        { label: 'Id', key: 'id', align: 'center' },
        { label: 'Name', key: 'name', align: 'start' },
        { label: 'Created At', key: 'createdAt', align: 'center' },
        { label: 'Updated At', key: 'updatedAt', align: 'center' }
      ],
      rolesList: [],
      createRoleDialog: false,
      loading: false,
      usersIcon: usersIcon,
    }
  },
  watch: {
    roles() {
      this.getRolesData();
    }
  },
  mounted() {
    this.getRolesData();
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
    createRole() {
      this.user = {};
      this.createRoleDialog = true;
    },
    async onSubmit() {
  this.submitLoading = true;
  const now = moment().toISOString(); // Get current time in ISO format

  try {
    const response = await fetch('http://localhost:8087/api/roles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.roles.name,
        createdAt: now,
        updatedAt: now,
        createdBy: null,
        updatedBy: null
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create role');
    }

    const result = await response.json();
    this.showMsg('Role created successfully!', 'positive');
    this.createRoleDialog = false;
    this.getRolesData(); // Refresh roles list
  } catch (error) {
    this.showMsg(error.message, 'negative');
  } finally {
    this.submitLoading = false;
  }
},
    getRolesData() {
      this.rolesList = this.roles.map((role, index) => {
        return {
          index: index + 1,
          id: role.id,
          name: role.name,
          createdBy: role.createdBy,
          updatedBy: role.updatedBy,
          createdAt: moment(role.createdAt).format('YYYY-MM-DD HH:MM:SS'),
          updatedAt: moment(role.updatedAt).format('YYYY-MM-DD HH:MM:SS'),
        }

      });
    }
  }
}
</script>
<style>
.User_heading{
  color:#5479F7;
  margin-left:4%;
}
</style>
