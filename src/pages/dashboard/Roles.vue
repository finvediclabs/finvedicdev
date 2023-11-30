<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow>Roles</fin-portlet-heading>
    </fin-portlet-header>
    <fin-portlet-item class="table-scroll" style="white-space: nowrap;">
      <fin-table :columns="header" :data="rolesList" select @reCall="getRolesData()" allowDelete delete-url=""
        @editFun="editDataFun" :showActions="false" :loading="loading" />
    </fin-portlet-item>
  </fin-portlet>
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
        { label: 'S.No', key: 'index', align: 'center' },
        { label: 'Name', key: 'name', align: 'start' },
        { label: 'Created By', key: 'createdBy', align: 'center' },
        { label: 'Updated By', key: 'updatedBy', align: 'center' },
        { label: 'Created At', key: 'createdAt', align: 'center' },
        { label: 'Updated At', key: 'updatedAt', align: 'center' }
      ],
      rolesList: [],
      loading: false,
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
