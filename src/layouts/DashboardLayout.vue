<template>
  <q-layout view="hHh Lpr fFf">
    <q-header>
      <q-toolbar class="bg-finvedic shadow-1 q-pa-sm">
        <q-item>
          <q-item-section avatar>
            <q-btn flat @click="miniState = !miniState" round dense icon="menu" />
          </q-item-section>
          <q-item-section class="text-h5 text-weight-bolder">GURUKUL</q-item-section>
        </q-item>
        <q-space />

        <q-avatar size="80px">
          <q-img src="../assets/profile.png" class="profileImg cursor-pointer bg-white rounded" />
          <q-menu :offset="[-50, 0]">
            <q-item class="q-pa-none right-drawer fin-profile-bg">
              <div class="full-height full-width">
                <div class="text-center">
                  <q-img src="../assets/profile.png" class="profileImg-drawer q-mt-lg cursor-pointer" />
                  <div class="text-h6 text-weight-bolder">{{ userName }}</div>
                </div>

                <div class="full-width q-my-xl">
                  <q-list>
                    <q-item class="full-width">
                      <q-item-section style="width:25%" avatar> B1</q-item-section>
                      <q-item-section style="width:25%" avatar>Booking</q-item-section>
                      <q-item-section>
                        <div class=" bg-dark full-width " style="border: 1px solid purple" />
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section style="width:25%" avatar> C1</q-item-section>
                      <q-item-section style="width:25%" avatar>SMB</q-item-section>
                      <q-item-section>
                        <div class=" bg-dark full-width " style="border: 1px solid purple" />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>

                <div class="full-width q-my-xl">
                  <q-list>
                    <q-item>
                      <q-item-section class="text-weight-bolder text-body1">Reminders</q-item-section>
                      <q-item-section avatar>
                        <q-icon name="notifications">
                          <q-badge floating color="red" rounded />
                        </q-icon>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>



              </div>
            </q-item>
            <div class="row justify-center q-my-lg">
              <q-btn icon-right="logout" flat
                label="log out &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" />
            </div>
          </q-menu>
        </q-avatar>


      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerLeft" show-if-above :mini="miniState" width="250" breakpoint="576" bordered
      class="bg-finvedic text-white">
      <q-scroll-area class="fit q-pl-md q-pt-md" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list>
          <div class="left-drawer">
            <q-item v-for="(module, index ) in modulesList" :key="module" class="module-select q-my-xs"
              :class="getActiveModuleClass(module)" :clickable="!module.menu" :v-ripple="!module.menu"
              @click="changeLocation(module)">

              <span class="flex" v-if="!module.menu">
                <q-item-section avatar class="">
                  <q-icon :name="module.icon" />
                </q-item-section>
                <q-item-section class="text-body1">
                  {{ module.label }}
                </q-item-section>
              </span>

              <q-expansion-item v-if="module.menu" class="q-pa-none full-width module-select"
                :default-opened="getExpansionBoolean(module)" :icon="module.icon" :label="module.label">
                <q-item v-for="(item, i) in module.menu" :key="item" clickable v-ripple class="module-select q-my-sm"
                  :class="getActiveMenuItemClass(module, item)" @click="changeLocation(module, item)">
                  <q-item-section avatar class="" />
                  <q-item-section class="text-body1">
                    {{ item.label }}
                  </q-item-section>
                </q-item>
              </q-expansion-item>

            </q-item>
          </div>

        </q-list>

        <q-item v-if="!miniState">
          <div class="text-center full-width q-py-md">
            <small>Upgrade To</small><br>
            <div class="items-center row justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="25" viewBox="0 0 48 30" fill="none">
                <g clip-path="url(#clip0_155_11686)">
                  <path
                    d="M43.6791 -0.0149451H26.539L24.147 3.52077C24.1184 3.56338 24.0799 3.59832 24.0347 3.62245C23.9895 3.64659 23.9392 3.65917 23.888 3.65917C23.8369 3.65917 23.7865 3.64659 23.7413 3.62245C23.6962 3.59832 23.6576 3.56338 23.629 3.52077L21.2446 -0.0149451H4.09695C4.04018 -0.015027 3.98446 0.000455922 3.93579 0.0298037C3.88711 0.0591514 3.84732 0.101258 3.82069 0.151625C3.79405 0.201992 3.78159 0.258675 3.78463 0.315626C3.78767 0.372577 3.8061 0.427648 3.83795 0.474862L23.6442 29.8473C23.6728 29.8899 23.7114 29.9248 23.7566 29.949C23.8017 29.9731 23.8521 29.9857 23.9032 29.9857C23.9544 29.9857 24.0048 29.9731 24.0499 29.949C24.0951 29.9248 24.1337 29.8899 24.1623 29.8473L43.9686 0.474862C44.0023 0.425487 44.0213 0.367417 44.0233 0.307545C44.0253 0.247673 44.0101 0.188467 43.9797 0.136958C43.9492 0.0854483 43.9048 0.0437866 43.8515 0.0168648C43.7982 -0.0100569 43.7384 -0.0210912 43.6791 -0.0149451Z"
                    fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_155_11686">
                    <rect width="47" height="30" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
              <span class="text-h6 text-weight-bolder">Pro</span>
            </div>
            <small>for More resources</small><br>
            <q-btn label="upgrade" class="fin-text-blue bg-white q-px-lg q-my-sm" />
          </div>
        </q-item>

      </q-scroll-area>
    </q-drawer>

    <!-- <q-drawer side="right" v-model="drawerRight" width="250" bordered class="fin-profile-bg">
      <q-btn flat round color="black" icon="close" class="absolute-top-right q-ma-sm" style="z-index: 1"
        @click="drawerRight = false" />
          </q-drawer> -->

    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'dashboard-layout',
  setup() {
    return {

    }
  },
  data() {
    return {
      profileMenu: false,
      CurrentDate: new Date().toDateString(),
      selectedModule: { module: 'admin', item: '' },
      drawerLeft: true,
      drawerRight: true,
      miniState: false,
      modulesList: [
        { icon: 'person', label: 'Administration', value: 'admin' },
        { icon: 'groups', label: 'Labs', value: 'labs' },
        {
          icon: 'library_books', label: 'Libraries', value: 'library', menu: [
            { label: "Books", value: 'books' }, { label: "Videos", value: "videos" }
          ]
        },
        { icon: 'summarize', label: 'Reports', value: 'reports' },
      ],
      expanded: false,
      userName: 'Sandeep Perikala'
    }
  },
  methods: {
    getActiveModuleClass(module) {
      return {
        "module-select-active inset-shadow shadow-5": module.value == this.selectedModule.module && !module.menu,
        "menu-class": module.menu
      }
    },

    getActiveMenuItemClass(module, item) {
      return {
        "module-select-active inset-shadow shadow-5": this.selectedModule.module === module.value && this.selectedModule.item == item.value
      }
    },

    getExpansionBoolean(module) {
      return this.selectedModule.module === module.value && this.selectedModule.item;
    },

    changeLocation(module, item) {
      let url;
      this.selectedModule = { module: module.value, item: item?.value };
      if (item) {
        url = `/${module.value}/${item.value}`;
        this.$router.push({ path: url })
      } else {
        url = `/${module.value}`;
        this.$router.push({ path: url })
      }
    }

  }
}
</script>
<style>
.module-select {
  border-radius: 10px 0px 0px 10px;
}

.module-select-active {
  background: #fff;
  color: #5479F7;
}

.menu-class {
  padding: 0px 0px !important;
}

.fin-profile-bg {
  background: #E6E6E6;
}

.profileImg {
  width: 100px;
  height: 100px;
}

.profileImg-drawer {
  width: 120px;
  height: 120px;
}

.left-drawer {
  min-height: 300px;
  height: calc(100vh - 295px);

}

.right-drawer {
  min-height: 500px;
  width: 300px;
}
</style>
