<template>
  <fin-portlet>
    <fin-portlet-header>
      <fin-portlet-item>
        <label>City</label>
        <q-input v-model="city" dense borderless class="roleClass shadow-5 rounded-borders">
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
      city: '',
      header: [
        { label: 'Name', key: 'name', align: 'start' },
        { label: 'City', key: 'city', align: 'center' },
        { label: 'Phone', key: 'phone', align: 'center' },
      ],
      usersList: [
        { name: 'Sandeep0', city: 'New York', phone: '1234567890' },
        { name: 'Sandeep1', city: 'New York', phone: '1234567890' },
        { name: 'Sandeep2', city: 'New York', phone: '1234567890' },
        { name: 'Sandeep3', city: 'New York', phone: '1234567890' },
        { name: 'Sandeep4', city: 'New York', phone: '1234567890' },
        { name: 'Sandeep5', city: 'New York', phone: '1234567890' },
        { name: 'Sandeep6', city: 'New York', phone: '1234567890' },
        { name: 'Sandeep7', city: 'New York', phone: '1234567890' },
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
