<template>
  <div class="full-width fin-table" :class="{ singleData: data.length == 1 }">
    <table class="table full-width rounded-borders shadow-6" borders="0">
      <thead>
        <tr>
          <th style="width: 50px" v-if="allowSelect"><q-checkbox v-model="allSelect" :val="data" dark /></th>
          <th v-for="(column, j) in columns" :key="column" :style="{ 'text-align': column.align }"
            class="vertical-middle">
            {{ column.label }}
          </th>
          <th v-if="showActions"></th>
        </tr>
      </thead>
      <tbody v-if="loading">
        <tr class="radius-10">
          <td :colspan="columns.length + 1" class=" radius-10 text-italic">
            <div style="min-height: 250px" class="q-pa-lg text-center row justify-center items-center">
              <q-spinner-facebook size="md"/>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-if="!loading && data.length">
        <tr v-for="(item, i) in data">
          <td v-if="allowSelect"><q-checkbox color="cyan" v-model="selectedItemsData" :val="item" /></td>
          <td v-for="(column, j) in columns" :key="column" :style="{ 'text-align': column.align }"
            class="vertical-middle q-py-sm">
            <span v-if="column.type === 'image'">
              <q-avatar size="40px" class="shadow-1">
                <img :src="item[column.key]" class="fit">
              </q-avatar>
            </span>
            <span v-else>
              {{ item[column.key] }}
            </span>
          </td>
          <td class="text-right" v-if="showActions">
            <q-icon name="more_horiz" class="bg- q-px-sm cursor-pointer" size="sm">
              <q-menu style="width:150px;background: transparent!important;" class="shadow-0">
                <div style="background-color: #EAEAEA;opacity:0.99" class="fin-br-8 q-mt-sm">
                  <div class="absolute-top-right" style="margin-top: -19px">
                    <q-icon name="arrow_drop_up" size="xl" style="color: #EAEAEA"></q-icon>
                  </div>
                  <div class="q-py-sm text-weight-bolder">
                    <q-list>

                      <q-item clickable v-close-popup @click="showChaptersList(item)" v-if="showChapters">
                        <q-item-section>
                          <q-item-label>Show Chapters</q-item-label>
                        </q-item-section>
                      </q-item>
                      <div class="justify-center flex" v-if="showChapters">
                        <q-separator style="width: 70%" />
                      </div>
                      <q-item clickable v-close-popup @click="editItem(item)">
                        <q-item-section>
                          <q-item-label>Edit</q-item-label>
                        </q-item-section>
                      </q-item>
                      <div class="justify-center flex" v-if="allowDelete">
                        <q-separator style="width: 70%" />
                      </div>
                      <q-item clickable v-close-popup @click="deleteItem(item)" v-if="allowDelete">
                        <q-item-section>
                          <q-item-label>Delete</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                </div>

              </q-menu>
            </q-icon>
          </td>
        </tr>
      </tbody>
      <tbody v-if="!loading && !data.length" class="radius-10">
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
    allowSelect: {
      type: Boolean,
      default: false,
    },
    deleteUrl: {
      type: String,
      default: null,
    },
    showActions: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: true,
    },
    showChapters: {
      type: Boolean,
      default: false
    }
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
    editItem(item) {
      this.$emit('editFun', item);
    },
    deleteItem(item) {
      this.$q.dialog({
        title: 'Confirm',
        message: `Are You sure want to delete ${item.name}`,
        persistent: true,
        cancel: {
          label: 'No',
          color: 'black',
          flat: true
        },
        ok: {
          label: 'Yes',
          color: 'red',
        },
      }).onOk(() => {
        this.$api.post(this.deleteUrl, {
          id: item.id
        }).then(response => {
          if (response.data.success) {
            this.showMsg(response.data.message, 'positive');
            this.$emit('reCall');
          } else {
            this.this.showMsg(respinse?.data.message, 'negative');
          }
        }).catch(error => {
          this.showMsg(error.respinse?.data.message || error.message, 'negative');
        });
      });
    },
    showChaptersList(item) {
      this.$emit('show-chapters', item)
    }
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
  border-radius: 10px 0px 0px 0px;
  overflow: hidden;
}

.table thead tr th:last-child {
  border-radius: 0px 10px 0px 0px;
  overflow: hidden;
}

.singleData .table tbody tr:first-child td:first-child {
  border-radius: 0px 0px 0px 10px;
  overflow: hidden;
}

.singleData .table tbody tr:first-child td:last-child {
  border-radius: 0px 10px 10px 0px;
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
