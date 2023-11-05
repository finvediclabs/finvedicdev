<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-heading :loading="loading" backArrow>
        Roles
      </fin-portlet-heading>
    </fin-portlet-header>
    <fin-portlet-item>
      <fin-table :columns="header" :data="rolesList" select @reCall="getRolesData()" delete-url="api/role/delete"
        @editFun="editDataFun" :showActions="false" :loading="loading"/>
    </fin-portlet-item>
  </fin-portlet>
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
      this.$api.get(urls.getRolesUrl).then(response => {
        this.loading = false;
        if (response.data.success) {
          let rolesList = response.data.data;
          this.rolesList = rolesList.map((role, index) => {
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
        } else {
          this.showMsg(response.data?.message, 'negative');
        }
      }).catch(error => {
        this.loading = false;
        this.showMsg(error.response?.data.message || error.message, 'negative');
      });
    }
  }
}
</script>
