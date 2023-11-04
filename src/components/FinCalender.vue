<template>
  <fin-portlet-item class=" items-center q-pl-xl q-pa-md">
    <q-btn icon="navigate_before" dense color="grey-2" class="text-black" round @click="onClickMoveButton(-1)" />
    <q-btn icon="chevron_right" dense color="grey-2" class="text-black q-mx-md" round @click="onClickMoveButton(1)" />
    <span class="date-range text-body1">{{ dateRangeText }}</span>
  </fin-portlet-item>
  <fin-portlet-item>
    <div ref="container" class="toastui-vue-calendar" style="min-height:500px ;height: calc((100vh - 220px))" />
  </fin-portlet-item>
</template>
<script>
import FinPortlet from './Portlets/FinPortlet.vue';
import FinPortletHeader from './Portlets/FinPortletHeader.vue';
import FinPortletHeading from './Portlets/FinPortletHeading.vue';
import FinPortletItem from './Portlets/FinPortletItem.vue';
import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
export default {
  name: 'fin-calander',
  components: {
    Calendar,
    FinPortlet,
    FinPortletHeader,
    FinPortletHeading,
    FinPortletItem,
  },
  props: {
    view: {
      type: String,
      default: "week"
    },
    useFormPopup: {
      type: Boolean,
      default: false,
    },
    useDetailPopup: {
      type: Boolean,
      default: true,
    },
    isReadOnly: {
      type: Boolean,
      default: false,
    },
    usageStatistics: {
      type: Boolean,
      default: true,
    },
    week: {
      type: Object,
      default: () => {
        return {
          showTimezoneCollapseButton: true,
          timezonesCollapsed: false,
          eventView: true,
          taskView: false,
          hourStart: 5,
          hourEnd: 23,
          startDayOfWeek:1,
        }
      }
    },
    month: {
      type: Object,
      default: () => { return {} }
    },
    gridSelection: {
      type: [Object, Boolean],
      default: false,
    },
    timezone: {
      type: Object,
      default: () => { return {} }
    },
    theme: {
      type: Object,
      default: () => { return {} }
    },
    template: {
      type: Object,
      default: () => { return {} }
    },
    calendars: {
      type: Array,
      default: () => { return []; }
    },
    events: {
      type: Array,
      default: () => { return []; }
    },
  },
  data() {
    return {
      calendarInstance: null,
    };
  },
  data() {
    return {
      dateRangeText: '',
    }
  },
  watch: {
    view() {
      this.calendarInstance.changeView(this.view);
    },
    useFormPopup() {
      this.calendarInstance.setOptions({ useFormPopup: this.useFormPopup });
    },
    useDetailPopup() {
      this.calendarInstance.setOptions({ useDetailPopup: this.useDetailPopup });
    },
    isReadOnly() {
      this.calendarInstance.setOptions({ isReadOnly: this.isReadOnly });
    },
    // eventFilter() {
    //   this.calendarInstance.setOptions({ eventFilter: this.eventFilter });
    // },
    week() {
      this.calendarInstance.setOptions({ week: this.week });
    },
    month() {
      this.calendarInstance.setOptions({ month: this.month });
    },
    gridSelection() {
      this.calendarInstance.setOptions({ gridSelection: this.gridSelection });
    },
    timezone() {
      this.calendarInstance.setOptions({ timezone: this.timezone });
    },
    theme() {
      this.calendarInstance.setTheme(this.theme);
    },
    template() {
      this.calendarInstance.setOptions({ template: this.template });
    },
    calendars() {
      this.calendarInstance.setCalendars(this.calendars);
    },
    events() {
      this.calendarInstance.clear();
      this.calendarInstance.createEvents(this.events);
    },
  },
  mounted() {
    this.calendarInstance = new Calendar(this.$refs.container, {
      defaultView: this.view,
      useFormPopup: this.useFormPopup,
      useDetailPopup: this.useDetailPopup,
      isReadOnly: this.isReadOnly,
      usageStatistics: this.usageStatistics,
      // eventFilter: this.eventFilter,
      week: this.week,
      month: this.month,
      gridSelection: this.gridSelection,
      timezone: this.timezone,
      theme: this.theme,
      template: this.template,
      calendars: this.calendars,
    });
    // this.addEventListeners();
    this.calendarInstance.createEvents(this.events);
    this.setDateRangeText();
  },
  beforeDestroy() {
    this.calendarInstance.off();
    this.calendarInstance.destroy();
  },
  methods: {
    addEventListeners() {
      // console.log(this.$listeners, 'Object.keys(this.$listeners)');
      // Object.keys(this.$listeners).forEach((eventName) => {
      //   this.calendarInstance.on(eventName, (...args) => this.$emit(eventName, ...args));
      // });
    },
    getRootElement() {
      return this.$refs.container;
    },
    getInstance() {
      return this.calendarInstance;
    },
    onClickMoveButton(offset) {
      this.calendarInstance.move(offset);
      this.setDateRangeText();
    },
    setDateRangeText() {
      const date = this.calendarInstance.getDate();
      const start = this.calendarInstance.getDateRangeStart();
      const end = this.calendarInstance.getDateRangeEnd();

      const options = { year: 'numeric', month: 'long', day: 'numeric' };

      const startYear = start.getFullYear();
      const endYear = end.getFullYear();

      switch (this.selectedView) {
        case 'month':
          this.dateRangeText = `${new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}`;

          return;
        case 'day':
          this.dateRangeText = `${new Date(date).toLocaleDateString('en-US', options)}`;

          return;
        default:
          this.dateRangeText = `${new Date(start).toLocaleDateString('en-US', options)} - ${new Date(end).toLocaleDateString('en-US', options)}`;
      }
    },
  }
}
</script>
<style>
.toastui-calendar-week-view .toastui-calendar-panel:not(.toastui-calendar-time) {
  overflow-y: hidden;
}

.toastui-calendar-day-name__date {
  font-weight: 900;
}

.toastui-calendar-panel.toastui-calendar-time::-webkit-scrollbar {
  width: 2px;
  border-radius: 10%;
}

.toastui-calendar-panel.toastui-calendar-time::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.toastui-calendar-panel.toastui-calendar-time::-webkit-scrollbar-thumb {
  background: #888;
}

.toastui-calendar-panel.toastui-calendar-time::-webkit-scrollbar-thumb:hover {
  background: #555;
  border-radius: 10px;
}

.toastui-calendar-day-names,
.toastui-calendar-week,
.toastui-calendar-panel-grid,
.toastui-calendar-panel-title,
.toastui-calendar-column {
  border: inherit !important;
}
/*
.toastui-calendar-allday {
  display: none
} */

.toastui-calendar-panel-resizer {
  border: inherit !important;
  box-shadow: 0px 1px 1px 0px rgb(106, 106, 106);
}

.toastui-calendar-week-view-day-names {
  border: none !important;
}
</style>
