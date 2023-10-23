<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-item>
        <label>Role</label>
        <q-input v-model="role" dense borderless class="roleClass shadow-5 rounded-borders">
          <template v-slot:append>
            <q-icon name="unfold_more" class="bg-blue-15 text-white full-height rounded-borders q-px-sm" />
          </template>
        </q-input>
      </fin-portlet-item>
      <fin-portlet-item>
        <label>Program</label>
        <q-input v-model="program" dense borderless class="roleClass shadow-5 rounded-borders">
          <template v-slot:append>
            <q-icon name="unfold_more" class="bg-blue-15 text-white full-height rounded-borders q-px-sm" />
          </template>
        </q-input>
      </fin-portlet-item>
    </fin-portlet-header>
    <fin-portlet-item>
      <fin-table :columns="header" :data="usersList" select />
    </fin-portlet-item>
  </fin-portlet>
</template>
<script>
import FinTable from "src/components/FinTable.vue"
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
export default {
  components: {
    FinTable,
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
  },
  data() {
    return {
      loading: true,
      role: '',
      program: '',
      header: [
        { label: 'Name', key: 'name', align: 'start' },
        { label: 'Email Address', key: 'email', align: 'center' },
        { label: 'Role', key: 'role', align: 'center' },
        { label: 'Date Added', key: 'date', align: 'center' },
      ],
      usersList: [
        { name: 'Sandeep0', email: 'sandeepperikala212@gmail.com', role: 'developer', date: new Date().toDateString() },
        { name: 'Sandeep1', email: 'sandeepperikala212@gmail.com', role: 'developer', date: new Date().toDateString() },
        { name: 'Sandeep2', email: 'sandeepperikala212@gmail.com', role: 'developer', date: new Date().toDateString() },
        { name: 'Sandeep3', email: 'sandeepperikala212@gmail.com', role: 'developer', date: new Date().toDateString() },
        { name: 'Sandeep4', email: 'sandeepperikala212@gmail.com', role: 'developer', date: new Date().toDateString() },
        { name: 'Sandeep5', email: 'sandeepperikala212@gmail.com', role: 'developer', date: new Date().toDateString() },
        { name: 'Sandeep6', email: 'sandeepperikala212@gmail.com', role: 'developer', date: new Date().toDateString() },
        { name: 'Sandeep7', email: 'sandeepperikala212@gmail.com', role: 'developer', date: new Date().toDateString() },
      ]
    }
  }
}
</script>
<style>
.roleClass .q-field__control {
  padding-right: 0px !important;
}
</style>
