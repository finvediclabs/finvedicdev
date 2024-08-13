<template>
  <fin-portlet style="background-color: transparent">
  
  </fin-portlet>
  <div class="q-pa-xs row justify-center">
    <div class="col-12" style="margin-top: -4%;">
      <StudentEnroll />
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <fin-portlet style="background-color: transparent">
        <fin-portlet-header>
          <fin-portlet-heading :loading="masterLoading">
            <span class="User_heading">Master Class</span>
          </fin-portlet-heading>
          <fin-portlet-item>
            <q-btn @click="downloadExcel('masterList', masterList, masterheader)" label="Download Excel" dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder" no-caps />
          </fin-portlet-item>
        </fin-portlet-header>
        <fin-portlet-item class="table-scroll">
          <fin-table :columns="masterheader" :data="masterList" select @reCall="getMastersData()" :loading="masterLoading" />
        </fin-portlet-item>
      </fin-portlet>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <fin-portlet style="background-color: transparent">
        <fin-portlet-header>
          <fin-portlet-heading :loading="contactLoading">
            <span class="User_heading">Contact-Us</span>
            
          </fin-portlet-heading>
          <fin-portlet-item>
            <q-btn @click="downloadExcel1('contactList', contactList, contactheader)" label="Download Excel" dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder" no-caps />
          </fin-portlet-item>
        </fin-portlet-header>
        <fin-portlet-item class="table-scroll">
          <fin-table :columns="contactheader" :data="contactList" select @reCall="getContactUSData()" :loading="contactLoading" />
        </fin-portlet-item>
        
      </fin-portlet>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <fin-portlet style="background-color: transparent">
        <fin-portlet-header>
          <fin-portlet-heading :loading="inquiryLoading">
            <span class="User_heading">Inquiry</span>
          </fin-portlet-heading>
          <fin-portlet-item>
            <q-btn @click="downloadExcel2('inquiryList', inquiryList, inquiryheader)" label="Download Excel" dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder" no-caps />
          </fin-portlet-item>
        </fin-portlet-header>
        <fin-portlet-item class="table-scroll">
          <fin-table :columns="inquiryheader" :data="inquiryList" select @reCall="getInquiryData()" :loading="inquiryLoading" />
        </fin-portlet-item>
      </fin-portlet>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <fin-portlet style="background-color: transparent">
        <fin-portlet-header>
          <fin-portlet-heading :loading="enrollLoading">
            <span class="User_heading">Enrollment</span>
          </fin-portlet-heading>
          <fin-portlet-item>
            <q-btn @click="downloadExcel3('enrollList', enrollList, enrollheader)" label="Download Excel" dense color="blue-15" class="q-px-md fin-br-8 text-subtitle1 text-weight-bolder" no-caps />
          </fin-portlet-item>
        </fin-portlet-header>
        <fin-portlet-item class="table-scroll">
          <fin-table :columns="enrollheader" :data="enrollList" select @reCall="getEnrollData()" :loading="enrollLoading" />
        </fin-portlet-item>
      </fin-portlet>
    </div>
  </div>
</template>

<script>
import FinTable from "src/components/FinTable.vue";
import FinPortlet from "src/components/Portlets/FinPortlet.vue";
import FinPortletHeader from "src/components/Portlets/FinPortletHeader.vue";
import FinPortletHeading from "src/components/Portlets/FinPortletHeading.vue";
import axios from 'axios';
import { urls } from "../Urls";
import FinPortletItem from "src/components/Portlets/FinPortletItem.vue";
import StudentEnroll from "./studentEnroll.vue";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default {
  data() {
    return {
      masterheader: [
        { label: 'S.No', key: 'index', align: 'center' },
        { label: 'Name', key: 'name', align: 'start' },
        { label: 'Qualification', key: 'qualification', align: 'start' },
        { label: 'Graduation Year', key: 'graduationYear', align: 'start' },
        { label: 'Work Experience', key: 'workExperience', align: 'start' },
        { label: 'Job Role', key: 'jobRole', align: 'start' },
        { label: 'Email', key: 'email', align: 'start' },
        { label: 'Contact', key: 'contact', align: 'start' },
        { label: 'Location', key: 'location', align: 'start' },
      ],
      masterList: [],
      contactheader: [
        { label: 'S.No', key: 'index', align: 'center' },
        { label: 'Full Name', key: 'fullName', align: 'start' },
        { label: 'Contact', key: 'contact', align: 'start' },
        { label: 'Email', key: 'email', align: 'start' },
        { label: 'Company Name', key: 'companyName', align: 'start' },
        { label: 'Message', key: 'message', align: 'start' },
      ],
      contactList: [],
      inquiryheader: [
        { label: 'S.No', key: 'index', align: 'center' },
        { label: 'Full Name', key: 'fullName', align: 'start' },
        { label: 'Contact', key: 'contact', align: 'start' },
        { label: 'Email', key: 'email', align: 'start' },
      ],
      inquiryList: [],
      enrollheader: [
        { label: 'S.No', key: 'index', align: 'center' },
        { label: 'First Name', key: 'firstName', align: 'start' },
        { label: 'Last Name', key: 'lastName', align: 'start' },
        { label: 'Contact', key: 'phoneNo', align: 'start' },
        { label: 'About Me', key: 'aboutMe', align: 'start' },
        { label: 'Email', key: 'email', align: 'start' },
        { label: 'Profession', key: 'profession', align: 'start' },
      ],
      enrollList: [],

      masterLoading: false,
      contactLoading: false,
      inquiryLoading: false,
      enrollLoading: false,
    };
  },
  components: {
    StudentEnroll,
    FinTable,
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
  },
  methods: {
    getMastersData() {
      if (!this.masterLoading) {
        this.masterLoading = true;

        const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
        const getMastersUrl = baseUrl + 'api/forms/master-class';

        axios.get(getMastersUrl)
          .then(response => {
            this.masterLoading = false;

            if (response.data.success) {
              this.masterList = response.data.data.map((item, index) => ({ ...item, index: index + 1 }));

            } else {
              this.showMsg(response.data?.message, 'negative');
            }
          })
          .catch(error => {
            this.masterLoading = false;
            // console.error('Master data error:', error);
            this.showMsg(error.response?.data.message || error.message, 'negative');
          });
      }
    },
    getContactUSData() {
      if (!this.contactLoading) {
        this.contactLoading = true;
        const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
        const getContactUrl = baseUrl + 'api/forms/contact-us';

        axios.get(getContactUrl)
          .then(response => {
            this.contactLoading = false;

            if (response.data.success) {
              this.contactList = response.data.data.map((item, index) => ({ ...item, index: index + 1 }));

            } else {
              this.showMsg(response.data?.message, 'negative');
            }
          })
          .catch(error => {
            this.contactLoading = false;
            // console.error('Contact data error:', error);
            this.showMsg(error.response?.data.message || error.message, 'negative');
          });
      }
    },
    getInquiryData() {
      if (!this.inquiryLoading) {
        this.inquiryLoading = true;
        const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
        const getInquiryUrl = baseUrl + 'api/forms/inquiry';

        axios.get(getInquiryUrl)
          .then(response => {
            this.inquiryLoading = false;

            if (response.data.success) {
              this.inquiryList = response.data.data.map((item, index) => ({ ...item, index: index + 1 }));

            } else {
              this.showMsg(response.data?.message, 'negative');
            }
          })
          .catch(error => {
            this.inquiryLoading = false;
            // console.error('Inquiry data error:', error);
            this.showMsg(error.response?.data.message || error.message, 'negative');
          });
      }
    },
    getEnrollData() {
      if (!this.enrollLoading) {
        this.enrollLoading = true;
        const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
        const getEnrollUrl = baseUrl + 'api/web-enrolls';

        axios.get(getEnrollUrl)
          .then(response => {
            this.enrollLoading = false;

            if (response.data.success) {
              this.enrollList = response.data.data.map((item, index) => ({ ...item, index: index + 1 }));

            } else {
              this.showMsg(response.data?.message, 'negative');
            }
          })
          .catch(error => {
            this.enrollLoading = false;
            // console.error('Enroll data error:', error);
            this.showMsg(error.response?.data.message || error.message, 'negative');
          });
      }
    },
    showMsg(message, type = 'positive') {
      this.$q.notify({
        type: type,
        position: 'top-right',
        timeout: 3000,
        message: message,
      });
    },
    downloadExcel(fileName, data, columns) {
      const formattedData = data.map(row => {
        const formattedRow = {};
        columns.forEach(column => {
          formattedRow[column.label] = row[column.key];
        });
        return formattedRow;
      });

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, `${fileName}.xlsx`);
    },
    downloadExcel1(fileName, data, columns) {
      const formattedData = data.map(row => {
        const formattedRow = {};
        columns.forEach(column => {
          formattedRow[column.label] = row[column.key];
        });
        return formattedRow;
      });

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, `${fileName}.xlsx`);
    },
    downloadExcel2(fileName, data, columns) {
      const formattedData = data.map(row => {
        const formattedRow = {};
        columns.forEach(column => {
          formattedRow[column.label] = row[column.key];
        });
        return formattedRow;
      });

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, `${fileName}.xlsx`);
    },
    downloadExcel3(fileName, data, columns) {
      const formattedData = data.map(row => {
        const formattedRow = {};
        columns.forEach(column => {
          formattedRow[column.label] = row[column.key];
        });
        return formattedRow;
      });

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, `${fileName}.xlsx`);
    },
  },
  
  created() {
    this.getMastersData();
    this.getContactUSData();
    this.getInquiryData();
    this.getEnrollData();
  }
};
</script>

<style scoped>
.User_heading {
  color: #5479F7;
  margin-left: 4%;
}
</style>
