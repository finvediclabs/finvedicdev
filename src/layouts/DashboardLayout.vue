<template>
  <q-layout view="hHh Lpr fFf">
    <q-header>
      <q-toolbar class="bg-white text-black shadow-4 q-pa-sm">
        <q-item>
          <q-item-section avatar>
            <q-btn flat @click="toggleFunction" round dense icon="menu" />
          </q-item-section>
          <q-item-section class="text-h5 text-weight-bolder">
            <svg xmlns="http://www.w3.org/2000/svg" width="180" height="35" viewBox="0 0 241 41" fill="#303030">
              <path d="M236.176 34.0211H207.469V4.91602H221.824L221.855 20.2101H236.176V34.0211Z" />
              <path
                d="M234.278 35.7434H205.232V6.29297H219.923L219.954 21.5871H234.278V35.7434ZM205.571 35.4043H233.939V21.9357H219.619L219.587 6.6384H205.571V35.4043Z" />
              <path
                d="M39.2988 20.9608C39.2988 28.4177 45.3552 34.4834 52.7958 34.4834H56.4253C64.1414 34.4834 70.4171 28.1959 70.4171 20.4665V5.34668H56.2938V19.2495C56.2938 19.4176 56.2278 19.5788 56.1103 19.6977C55.9929 19.8166 55.8336 19.8834 55.6675 19.8834H54.0328C53.8667 19.8834 53.7074 19.8166 53.5899 19.6977C53.4725 19.5788 53.4065 19.4176 53.4065 19.2495V5.34668H39.2988V20.9608Z"
                stroke-miterlimit="10" />
              <path
                d="M54.225 6.54297V6.72044H68.5299V22.0177C68.5299 29.8581 62.1854 36.2121 54.3596 36.2121H50.727C48.9402 36.2213 47.169 35.8742 45.5147 35.1907C43.8604 34.5072 42.3554 33.5006 41.0855 32.2284C39.8156 30.9562 38.8057 29.4434 38.1136 27.7762C37.4215 26.1091 37.0606 24.3204 37.0515 22.5121V6.72044H51.3565V6.54297H36.873V22.5121C36.873 30.1655 43.0892 36.3927 50.727 36.3927H54.3565C62.2668 36.3927 68.7053 29.9436 68.7053 22.0177V6.54297H54.225Z"
                stroke-miterlimit="10" />
              <path
                d="M68.3506 6.89817V22.018C68.3506 29.7474 62.0875 36.0349 54.3589 36.0349H50.7263C43.2857 36.0349 37.2293 29.9692 37.2293 22.5123V6.89817H51.3557V6.7207H37.0508V22.5123C37.0598 24.3206 37.4207 26.1094 38.1128 27.7765C38.805 29.4436 39.8148 30.9565 41.0847 32.2287C42.3546 33.5008 43.8597 34.5074 45.514 35.1909C47.1683 35.8745 48.9394 36.2216 50.7263 36.2124H54.3557C62.1846 36.2124 68.526 29.8583 68.526 22.018V6.7207H54.2242V6.89817H68.3506Z"
                stroke-miterlimit="10" />
              <path
                d="M105.428 21.1474C105.428 28.4934 111.481 34.4577 118.925 34.4577H122.557C130.273 34.4577 136.549 28.2621 136.549 20.6467V5.75195H122.423V19.4488C122.417 19.613 122.348 19.7686 122.232 19.8827C122.115 19.9968 121.959 20.0606 121.796 20.0604H120.162C119.999 20.0606 119.843 19.9968 119.726 19.8827C119.61 19.7686 119.541 19.613 119.535 19.4488V5.76146H105.428V21.1474Z"
                stroke-miterlimit="10" />
              <path
                d="M120.354 6.96191V7.13622H134.659V22.2116C134.659 29.9379 128.314 36.2001 120.489 36.2001H116.856C109.303 36.2001 103.18 30.1566 103.18 22.6997V7.13622H117.485V6.96191H103.002V22.6997C103.002 30.2421 109.218 36.3744 116.856 36.3744H120.489C128.399 36.3744 134.837 30.0203 134.837 22.2116V6.96191H120.354Z"
                stroke-miterlimit="10" />
              <path
                d="M134.482 7.31321V22.208C134.482 29.8138 128.218 36.0189 120.49 36.0189H116.857C109.413 36.0189 103.36 30.042 103.36 22.7087V7.31321H117.487V7.13574H103.182V22.6992C103.182 30.1561 109.304 36.1996 116.857 36.1996H120.49C128.319 36.1996 134.66 29.9374 134.66 22.2112V7.13574H120.355V7.31321H134.482Z"
                stroke-miterlimit="10" />
              <path
                d="M172.92 21.0942C172.92 28.4402 178.973 34.4045 186.414 34.4045H190.05C197.763 34.4045 204.038 28.2089 204.038 20.5935V5.69238H189.915V19.3924C189.914 19.4742 189.897 19.5551 189.865 19.6302C189.833 19.7053 189.786 19.7732 189.728 19.8299C189.67 19.8866 189.601 19.9309 189.525 19.9602C189.45 19.9896 189.369 20.0034 189.289 20.0009H187.657C187.495 20.001 187.34 19.9377 187.223 19.8243C187.106 19.7109 187.037 19.5561 187.031 19.3924V5.69238H172.92V21.0942Z"
                stroke-miterlimit="10" />
              <path
                d="M187.845 6.9043V7.08177H202.165V22.1572C202.165 29.8803 195.821 36.1456 187.998 36.1456H184.347C176.797 36.1456 170.675 30.099 170.675 22.6452V7.08177H184.976V6.9043H170.496V22.6452C170.496 30.1845 176.709 36.3199 184.347 36.3199H187.983C195.893 36.3199 202.328 29.9659 202.328 22.1572V6.9043H187.845Z"
                stroke-miterlimit="10" />
              <path
                d="M201.973 7.24363V22.1384C201.973 29.7443 195.709 35.9494 187.984 35.9494H184.348C176.908 35.9494 170.854 29.9724 170.854 22.6391V7.24363H184.978V7.06934H170.676V22.6455C170.676 30.0992 176.798 36.1459 184.348 36.1459H187.984C195.813 36.1459 202.151 29.8805 202.151 22.1574V7.08201H187.846V7.24363H201.973Z"
                stroke-miterlimit="10" />
              <path
                d="M20.9266 20.1433H23.2627C23.2789 20.1429 23.295 20.1458 23.31 20.1518C23.325 20.1579 23.3386 20.167 23.35 20.1786C23.3615 20.1901 23.3705 20.2039 23.3764 20.2191C23.3824 20.2343 23.3853 20.2506 23.3849 20.2669V22.4282C23.3853 22.4446 23.3824 22.4609 23.3764 22.4761C23.3705 22.4912 23.3615 22.505 23.35 22.5166C23.3386 22.5282 23.325 22.5373 23.31 22.5433C23.295 22.5494 23.2789 22.5523 23.2627 22.5518H18.1802C18.1478 22.5518 18.1168 22.5388 18.0939 22.5156C18.071 22.4925 18.0581 22.461 18.0581 22.4282V13.9667C18.0577 13.9452 18.0615 13.9239 18.0693 13.9039C18.0772 13.8839 18.0889 13.8657 18.1037 13.8504C18.1186 13.8351 18.1364 13.8229 18.1559 13.8146C18.1755 13.8062 18.1966 13.8019 18.2178 13.8019H35.1282C34.1471 10.7456 32.2348 8.08223 29.6654 6.19377C27.0961 4.30531 24.0019 3.28881 20.8264 3.29004H19.8869C15.9003 3.29004 12.077 4.89269 9.25808 7.74544C6.43913 10.5982 4.85547 14.4673 4.85547 18.5017V19.4525C4.85547 23.4869 6.43913 27.356 9.25808 30.2087C12.077 33.0615 15.9003 34.6642 19.8869 34.6642H20.8264C24.813 34.6642 28.6363 33.0615 31.4552 30.2087C34.2742 27.356 35.8578 23.4869 35.8578 19.4525V18.5017C35.8562 17.9183 35.8228 17.3353 35.7576 16.7556H20.9141L20.9266 20.1433Z" />
              <path
                d="M18.7635 36.4341H17.824C13.7878 36.4291 9.91828 34.804 7.0645 31.9154C4.21072 29.0268 2.60571 25.1106 2.60156 21.0259V20.0752C2.60571 15.9905 4.21072 12.0743 7.0645 9.18571C9.91828 6.29712 13.7878 4.67205 17.824 4.66701H18.7635C21.9791 4.66152 25.1134 5.68898 27.715 7.6014C30.3167 9.51383 32.2515 12.2125 33.2407 15.3089L33.319 15.5529H16.1737V23.9288H21.1309V21.8943H18.6727V18.1294H33.8638L33.8826 18.2942C33.9504 18.8811 33.9849 19.4716 33.986 20.0625V21.0133C33.9851 25.1001 32.3816 29.0196 29.5275 31.9109C26.6733 34.8022 22.8019 36.4291 18.7635 36.4341ZM17.824 5.0283C13.8858 5.03333 10.1103 6.619 7.3258 9.43747C4.54132 12.2559 2.97523 16.077 2.97108 20.0625V21.0133C2.97523 24.9987 4.54132 28.8198 7.3258 31.6383C10.1103 34.4568 13.8858 36.0424 17.824 36.0475H18.7635C22.7018 36.0424 26.4773 34.4568 29.2617 31.6383C32.0462 28.8198 33.6123 24.9987 33.6164 21.0133V20.0625C33.6151 19.5417 33.588 19.0213 33.535 18.5033H19.0422V21.5045H21.1936C21.2766 21.5045 21.3563 21.5379 21.415 21.5973C21.4737 21.6567 21.5067 21.7373 21.5067 21.8214V23.9827C21.5067 24.0667 21.4737 24.1474 21.415 24.2068C21.3563 24.2662 21.2766 24.2996 21.1936 24.2996H16.1111C16.028 24.2996 15.9484 24.2662 15.8896 24.2068C15.8309 24.1474 15.7979 24.0667 15.7979 23.9827V15.5149C15.7983 15.4684 15.8078 15.4225 15.8259 15.3797C15.8439 15.337 15.8701 15.2983 15.903 15.2659C15.9359 15.2335 15.9749 15.208 16.0176 15.1909C16.0603 15.1738 16.1059 15.1654 16.1518 15.1663H32.8116C31.8107 12.203 29.9178 9.63145 27.3988 7.81261C24.8798 5.99376 21.8611 5.01898 18.7666 5.02512L17.824 5.0283Z" />
              <path
                d="M86.0287 33.8652L86.7207 34.8413H101.333L93.0653 23.629L93.3596 23.6005C94.8767 23.2959 96.3498 22.7986 97.7438 22.1205C101.502 20.0131 101.502 16.7331 101.502 13.564C101.532 11.3952 100.732 9.29875 99.2689 7.71381C98.5831 6.9741 97.7545 6.38482 96.8345 5.9825C95.9144 5.58019 94.9225 5.37342 93.9202 5.37501H74.1914V34.8477H85.3303L86.0224 33.8652H86.0287ZM84.6101 15.6904V13.9696C84.6101 13.8856 84.6431 13.805 84.7018 13.7455C84.7605 13.6861 84.8402 13.6527 84.9232 13.6527H89.1289C89.212 13.6527 89.2916 13.6861 89.3503 13.7455C89.4091 13.805 89.4421 13.8856 89.4421 13.9696V15.6904C89.4421 15.7745 89.4091 15.8551 89.3503 15.9145C89.2916 15.974 89.212 16.0073 89.1289 16.0073H84.9232C84.8402 16.0073 84.7605 15.974 84.7018 15.9145C84.6431 15.8551 84.6101 15.7745 84.6101 15.6904Z"
                stroke-miterlimit="10" />
              <path
                d="M71.9503 36.5574V6.76785H91.8514C96.104 6.76785 99.5988 10.3521 99.5988 15.1153C99.5988 18.2844 99.5988 21.6626 95.7564 23.8208C94.3418 24.5036 92.8478 25.003 91.3096 25.3071L99.6113 36.5479H84.7709L84.8899 36.7159H99.9214L91.5852 25.4275C93.0528 25.1048 94.478 24.6092 95.8316 23.9507C99.7648 21.7577 99.7648 18.2273 99.7648 15.1121C99.7939 12.8604 98.9613 10.6846 97.4412 9.0401C96.7228 8.27019 95.8562 7.65733 94.8948 7.23928C93.9335 6.82124 92.8977 6.60687 91.8514 6.6094H71.7812V36.7159H83.0235L83.1425 36.5479L71.9503 36.5574Z"
                stroke-miterlimit="10" />
              <path
                d="M72.1183 36.3997V6.92699H91.8471C92.8481 6.92587 93.8387 7.13256 94.7576 7.5343C95.6765 7.93603 96.5042 8.52426 97.1895 9.26262C98.6526 10.8476 99.4528 12.9441 99.4223 15.1128C99.4223 18.2819 99.4223 21.5619 95.6645 23.6694C94.2704 24.3474 92.7974 24.8447 91.2803 25.1493L90.9859 25.1779L99.2626 36.3997H84.6508L84.7698 36.5644H99.5977L91.3085 25.3078C92.8515 25.0007 94.3499 24.497 95.7678 23.8088C99.6102 21.6506 99.6102 18.2724 99.6102 15.1033C99.6102 10.3496 96.1154 6.75586 91.8628 6.75586H71.9492V36.5454H83.1414L83.2572 36.3806L72.1183 36.3997Z"
                stroke-miterlimit="10" />
              <path d="M84.9056 36.7412H84.9023L84.9056 36.7477V36.7412Z" stroke-miterlimit="10" />
              <path
                d="M140.322 34.1124H151.837L152.466 33.2218L153.105 34.1124H168.835L158.739 19.7183L168.835 5.32422H153.105L152.466 6.21791L151.834 5.32422H140.322V34.1124Z"
                stroke-miterlimit="10" />
              <path d="M138.082 35.8321V6.708H149.647L149.528 6.54004H137.91V36.0032H149.528L149.65 35.8321H138.082Z"
                stroke-miterlimit="10" />
              <path
                d="M157.091 21.27L167.425 6.54004H151.278L151.159 6.708H167.096L156.881 21.27L167.096 35.8321H151.156L151.278 36.0032H167.425L157.091 21.27Z"
                stroke-miterlimit="10" />
              <path
                d="M166.767 6.87597L156.671 21.27L166.767 35.6641H151.037L151.156 35.8321H167.096L156.881 21.27L167.096 6.70801H151.159L151.037 6.87597H166.767Z"
                stroke-miterlimit="10" />
              <path d="M138.254 35.6641V6.87597H149.766L149.647 6.70801H138.082V35.8321H149.65L149.769 35.6641H138.254Z"
                stroke-miterlimit="10" />
            </svg>
          </q-item-section>
        </q-item>
        <q-space />

        <q-avatar size="50px" class="shadow-4">
          <q-img src="../assets/profile.png"
            class="profileImg cursor-pointer rounded full-width full-height bg-blue-grey-4" />
          <q-menu :offset="[-5, 5]" max-width="300px" transition-show="flip-right" transition-hide="rotate">
            <q-list style="min-width: 200px">
              <q-item clickable>
                <q-item-section class="text-weight-bolder text-subtitle1">Name Name Name Name</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-ripple @click="$router.push('/profile')">
                <q-item-section>Profile Settings</q-item-section>
                <q-item-section avatar>
                  <q-icon name="settings" />
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-ripple @click="logout">
                <q-item-section>Log Out</q-item-section>
                <q-item-section avatar>
                  <q-icon name="bluetooth" />
                </q-item-section>
              </q-item>
            </q-list>
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

    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { storeToRefs } from "pinia";
import { useSessionStore } from "src/stores/session";
import { setToken } from "src/boot/axios"
export default {
  name: 'dashboard-layout',
  setup() {
    const session = useSessionStore();
    const { token, userType } = storeToRefs(session);
    const { setSessionToken, setUserType } = session;
    return {
      token,
      userType,
      setSessionToken,
      setUserType,
    }
  },
  data() {
    return {
      profileMenu: false,
      CurrentDate: new Date().toDateString(),
      selectedModule: {},
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
  mounted() {
    if (this.token) {
      // setToken(this.token);
    } else {
      this.$router.push('/');
    }

    this.selectedModule = {
      module: this.$route.meta.module,
      item: this.$route.meta.item
    }
  },
  watch: {
    token() {
      if (this.token) {
        // setToken(this.token);
      } else {
        this.$router.push('/');
      }
    }
  },
  methods: {
    toggleFunction() {
      if (screen.width < 576) {
        this.drawerLeft = !this.drawerLeft;
      } else {
        this.miniState = !this.miniState;
      }
    },
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
    },
    logout() {
      sessionStorage.clear();
      this.setSessionToken();
      this.setUserType();
      this.$router.push('/');
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
