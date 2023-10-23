<template>
  <div class="full-width fin-table" :class="{ singleData: data.length == 1 }">
    <table class="table full-width rounded-borders" borders="0">
      <thead class="shadow-4">
        <tr>
          <th style="width: 50px"><q-checkbox v-model="allSelect" :val="data" dark /></th>
          <th v-for="column in columns" :key="column" :style="{ 'text-align': column.align }" class="vertical-middle">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tr>
        <td style="padding: 10px"></td>
      </tr>
      <tbody v-if="data.length" class="shadow-5">
        <tr v-for="(item, index) in data">
          <td><q-checkbox color="cyan" v-model="selectedItemsData" :val="item" /></td>
          <td v-for="column in columns" :key="column" :style="{ 'text-align': column.align }" class="vertical-middle">
            <span v-if="column.type === 'image'">
              <q-avatar size="40px">
                <img :src="item[column.key]" class="fit">
              </q-avatar>
            </span>
            <span v-else>
              {{ item[column.key] }}
            </span>
          </td>
        </tr>
      </tbody>
      <tbody v-else class="radius-10">
        <tr class="radius-10">
          <td :colspan="columns.length + 1" class=" radius-10 text-italic">
            <div style="min-height: 250px" class="q-pa-lg">
              No Data Found
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      default: function () { return []; }
    },
    data: {
      type: Array,
      default: function () { return []; }
    },
    select: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      allSelect: [],
      selectedItem: [],
      selectedItemsData: [],
    }
  },
  watch: {
    allSelect() {
      this.selectedItemsData = this.allSelect.length ? this.allSelect[0] : [];
    }
  },
  methods: {

  }
}
</script>
<style>
.fin-table {
  min-height: 400px;
}

.fin-table .table thead {
  position: sticky !important;
  top: 0;
}

.table {
  --bs-table-bg: transparent;
  --bs-table-accent-bg: transparent;
  --bs-table-striped-color: #212529;
  --bs-table-striped-bg: rgba(0, 0, 0, 0.05);
  --bs-table-active-color: #212529;
  --bs-table-active-bg: rgba(0, 0, 0, 0.1);
  --bs-table-hover-color: #212529;
  --bs-table-hover-bg: rgba(0, 0, 0, 0.075);
  width: 100%;
  color: #212529;
  vertical-align: top;
  border-color: #dee2e6;
}

table {
  caption-side: bottom;
  border-collapse: collapse;
}

.table thead {
  overflow: hidden;
}

.table>thead {
  vertical-align: bottom;
}

thead,
tr {
  border-color: inherit;
  border-style: solid;
  border-width: 0;
  border-radius: 10px;
}

thead {
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
  padding-top: 6px;
  padding-bottom: 6px;

}

.table>tbody {
  vertical-align: inherit;
}

tbody,
td,
tfoot,
th,
thead,
tr {
  border-color: inherit;
  border-style: solid;
  border-width: 0;
  padding: 10px;
}

td {
  padding: 5px
}

*,
::after,
::before {
  box-sizing: border-box;
}

tbody {
  display: table-row-group;
  vertical-align: middle;
  border-color: inherit;
  background-color: #F5F5F5;
}

.table thead {
  background-color: #5479F7;
  color: #ffffff;
}

.table thead tr th:first-child {
  border-radius: 10px 0px 0px 10px;
}

.table thead tr th:last-child {
  border-radius: 0px 10px 10px 0px;
}

.singleData .table tbody tr:first-child td:first-child {
  border-radius: 10px 0px 0px 10px;
  overflow: hidden;
}

.singleData .table tbody tr:first-child td:last-child {
  border-radius: 0px 10px 10px 0px;
  overflow: hidden;
}


.table tbody tr:first-child td:first-child {
  border-radius: 10px 0px 0px 0px;
  overflow: hidden;
}

.table tbody tr:first-child td:last-child {
  border-radius: 0px 10px 0px 0px;
  overflow: hidden;
}

.table tbody tr:last-child td:first-child {
  border-radius: 0px 0px 0px 10px;
  overflow: hidden;
}

.table tbody tr:last-child td:last-child {
  border-radius: 0px 0px 10px 0px;
  overflow: hidden;
}

.radius-10 {
  border-radius: 10px !important;
}
</style>
