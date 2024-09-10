<template>
  <q-layout view="hHh Lpr fFf  " :class="backgroundStyle" >
    <q-header>
      <q-toolbar class="text-black q-pa-sm q-pr-lg mainHeader">
        <q-item>
          <q-item-section avatar>
          <q-btn flat @click="toggleFunction" color="white" round dense icon="menu" v-if="showDrawer"/>
          <q-icon name="arrow_back" style="font-weight: bold;" class="cursor-pointer" @click="$router.go(-1)" v-if="!showDrawer" />
          </q-item-section>
          <q-item-section class="text-h5 text-weight-bolder logo">
            <svg xmlns="http://www.w3.org/2000/svg" :width="widthSVG" height="30" viewBox="0 0 197 30" fill="none">
              <path d="M197 25.0071H174.011V0.961853H185.507L185.532 13.5971H197V25.0071Z" fill="#ffff" />
              <path
                d="M196.042 25.9689H172.095V1.92365H184.206L184.232 14.4107H196.042V25.9689ZM172.374 25.6921H195.763V14.6954H183.956L183.93 2.20568H172.374V25.6921Z"
                fill="#fff" />
              <path
                d="M29.481 14.2939C29.481 20.2016 34.5146 25.0071 40.6986 25.0071H43.7152C50.1282 25.0071 55.344 20.0259 55.344 13.9022V1.92365H43.6058V12.9381C43.6058 13.0713 43.551 13.199 43.4534 13.2932C43.3558 13.3874 43.2234 13.4403 43.0853 13.4403H41.7267C41.5886 13.4403 41.4562 13.3874 41.3586 13.2932C41.261 13.199 41.2061 13.0713 41.2061 12.9381V1.92365H29.481V14.2939Z"
                fill="#fff" stroke="#fff" stroke-width="0.923855" stroke-miterlimit="10" />
              <path
                d="M41.6631 2.8855V3.02846H53.2855V15.3511C53.2855 21.6668 48.1307 26.7853 41.7725 26.7853H38.821C37.3693 26.7927 35.9302 26.5131 34.5862 25.9625C33.2421 25.4119 32.0192 24.601 30.9875 23.5762C29.9557 22.5514 29.1352 21.3328 28.5729 19.9898C28.0105 18.6469 27.7173 17.2059 27.71 15.7493V3.02846H39.3324V2.8855H27.5649V15.7493C27.5649 21.9144 32.6154 26.9308 38.821 26.9308H41.7699C48.1969 26.9308 53.428 21.7357 53.428 15.3511V2.8855H41.6631Z"
                fill="#fff" stroke="#fff" stroke-width="0.184771" stroke-miterlimit="10" />
              <path
                d="M86.4194 14.3038C86.4194 20.211 91.2636 25.0071 97.2205 25.0071H100.128C106.302 25.0071 111.325 20.025 111.325 13.9012V1.92365H100.02V12.9379C100.015 13.0699 99.9604 13.195 99.8669 13.2868C99.7734 13.3785 99.6485 13.4298 99.5186 13.4297H98.2104C98.0805 13.4298 97.9556 13.3785 97.8621 13.2868C97.7686 13.195 97.7138 13.0699 97.7092 12.9379V1.93129H86.4194V14.3038Z"
                fill="#fff" stroke="#fff" stroke-width="0.923855" stroke-miterlimit="10" />
              <path
                d="M98.6001 2.8855V3.028H110.221V15.3525C110.221 21.6689 105.067 26.7883 98.7095 26.7883H95.7584C89.6221 26.7883 84.6484 21.8476 84.6484 15.7514V3.028H96.2698V2.8855H84.5034V15.7514C84.5034 21.9176 89.5534 26.9308 95.7584 26.9308H98.7095C105.136 26.9308 110.366 21.7362 110.366 15.3525V2.8855H98.6001Z"
                fill="#fff" stroke="#fff" stroke-width="0.184771" stroke-miterlimit="10" />
              <path
                d="M143.572 14.3062C143.572 20.2121 148.603 25.0071 154.787 25.0071H157.809C164.22 25.0071 169.435 20.0261 169.435 13.9036V1.92365H157.697V12.938C157.696 13.0038 157.682 13.0688 157.656 13.1292C157.629 13.1896 157.59 13.2441 157.542 13.2897C157.493 13.3352 157.436 13.3709 157.373 13.3945C157.311 13.4181 157.244 13.4292 157.177 13.4272H155.821C155.686 13.4273 155.557 13.3764 155.46 13.2852C155.363 13.194 155.305 13.0696 155.3 12.938V1.92365H143.572V14.3062Z"
                fill="#fff" stroke="#fff" stroke-width="0.923855" stroke-miterlimit="10" />
              <path
                d="M155.752 2.8855V3.03057H167.387V15.3537C167.387 21.6668 162.232 26.7883 155.876 26.7883H152.91C146.775 26.7883 141.801 21.8456 141.801 15.7527V3.03057H153.421V2.8855H141.656V15.7527C141.656 21.9155 146.704 26.9308 152.91 26.9308H155.864C162.291 26.9308 167.519 21.7368 167.519 15.3537V2.8855H155.752Z"
                fill="#fff" stroke="#fff" stroke-width="0.184771" stroke-miterlimit="10" />
              <path
                d="M13.407 13.4331H15.3559C15.3694 13.4328 15.3828 13.4351 15.3953 13.4399C15.4078 13.4447 15.4192 13.452 15.4287 13.4612C15.4383 13.4704 15.4457 13.4814 15.4507 13.4935C15.4557 13.5056 15.4581 13.5186 15.4578 13.5316V15.2543C15.4581 15.2674 15.4557 15.2803 15.4507 15.2924C15.4457 15.3045 15.4383 15.3155 15.4287 15.3248C15.4192 15.334 15.4078 15.3412 15.3953 15.3461C15.3828 15.3509 15.3694 15.3532 15.3559 15.3528H11.1159C11.0889 15.3528 11.063 15.3425 11.0439 15.324C11.0247 15.3055 11.014 15.2805 11.014 15.2543V8.50999C11.0137 8.49286 11.0169 8.47584 11.0234 8.45992C11.0299 8.444 11.0397 8.42949 11.0521 8.41726C11.0645 8.40503 11.0793 8.39531 11.0956 8.38868C11.112 8.38205 11.1295 8.37864 11.1472 8.37864H25.2544C24.4359 5.94256 22.8406 3.81967 20.6972 2.31445C18.5538 0.809235 15.9725 -0.000979448 13.3234 8.88585e-07H12.5397C9.21395 8.88585e-07 6.02443 1.27741 3.67278 3.55123C1.32114 5.82504 0 8.909 0 12.1247V12.8824C0 16.0981 1.32114 19.1821 3.67278 21.4559C6.02443 23.7297 9.21395 25.0071 12.5397 25.0071H13.3234C16.6491 25.0071 19.8387 23.7297 22.1903 21.4559C24.5419 19.1821 25.8631 16.0981 25.8631 12.8824V12.1247C25.8617 11.6596 25.8338 11.1949 25.7795 10.7328H13.3966L13.407 13.4331Z"
                fill="#fff" />
              <mask id="path-10-inside-1_67_229" fill="white">
                <path
                  d="M12.8253 26.9308H12.0798C8.87684 26.9267 5.8062 25.5982 3.54158 23.2368C1.27695 20.8755 0.00328809 17.674 0 14.3349V13.5577C0.00328809 10.2186 1.27695 7.01717 3.54158 4.65581C5.8062 2.29445 8.87684 0.965986 12.0798 0.961871H12.8253C15.3771 0.957378 17.8643 1.7973 19.9289 3.36067C21.9934 4.92404 23.5288 7.13018 24.3137 9.66135L24.3759 9.86083H10.7702V16.708H14.704V15.0448H12.7533V11.967H24.8083L24.8232 12.1018C24.8769 12.5816 24.9043 13.0643 24.9052 13.5474V14.3246C24.9045 17.6655 23.632 20.8696 21.3671 23.2332C19.1022 25.5968 16.0301 26.9266 12.8253 26.9308ZM12.0798 1.25721C8.95461 1.26133 5.95857 2.55758 3.74893 4.86161C1.5393 7.16565 0.296522 10.2893 0.293234 13.5474V14.3246C0.296522 17.5826 1.5393 20.7063 3.74893 23.0103C5.95857 25.3143 8.95461 26.6106 12.0798 26.6147H12.8253C15.9506 26.6106 18.9466 25.3143 21.1563 23.0103C23.3659 20.7063 24.6087 17.5826 24.6119 14.3246V13.5474C24.6109 13.1216 24.5893 12.6962 24.5473 12.2727H13.0465V14.7261H14.7537C14.8197 14.7261 14.8829 14.7534 14.9295 14.802C14.9761 14.8506 15.0023 14.9165 15.0023 14.9852V16.752C15.0023 16.8207 14.9761 16.8866 14.9295 16.9352C14.8829 16.9838 14.8197 17.0111 14.7537 17.0111H10.7205C10.6546 17.0111 10.5914 16.9838 10.5448 16.9352C10.4982 16.8866 10.472 16.8207 10.472 16.752V9.82975C10.4723 9.79176 10.4799 9.75422 10.4942 9.71929C10.5085 9.68436 10.5293 9.65273 10.5554 9.62623C10.5815 9.59974 10.6124 9.5789 10.6463 9.56491C10.6802 9.55093 10.7164 9.54408 10.7528 9.54477H23.9733C23.179 7.1224 21.6769 5.02019 19.6779 3.53332C17.6789 2.04645 15.2835 1.24959 12.8278 1.25462L12.0798 1.25721Z" />
              </mask>
              <path
                d="M12.8253 26.9308H12.0798C8.87684 26.9267 5.8062 25.5982 3.54158 23.2368C1.27695 20.8755 0.00328809 17.674 0 14.3349V13.5577C0.00328809 10.2186 1.27695 7.01717 3.54158 4.65581C5.8062 2.29445 8.87684 0.965986 12.0798 0.961871H12.8253C15.3771 0.957378 17.8643 1.7973 19.9289 3.36067C21.9934 4.92404 23.5288 7.13018 24.3137 9.66135L24.3759 9.86083H10.7702V16.708H14.704V15.0448H12.7533V11.967H24.8083L24.8232 12.1018C24.8769 12.5816 24.9043 13.0643 24.9052 13.5474V14.3246C24.9045 17.6655 23.632 20.8696 21.3671 23.2332C19.1022 25.5968 16.0301 26.9266 12.8253 26.9308ZM12.0798 1.25721C8.95461 1.26133 5.95857 2.55758 3.74893 4.86161C1.5393 7.16565 0.296522 10.2893 0.293234 13.5474V14.3246C0.296522 17.5826 1.5393 20.7063 3.74893 23.0103C5.95857 25.3143 8.95461 26.6106 12.0798 26.6147H12.8253C15.9506 26.6106 18.9466 25.3143 21.1563 23.0103C23.3659 20.7063 24.6087 17.5826 24.6119 14.3246V13.5474C24.6109 13.1216 24.5893 12.6962 24.5473 12.2727H13.0465V14.7261H14.7537C14.8197 14.7261 14.8829 14.7534 14.9295 14.802C14.9761 14.8506 15.0023 14.9165 15.0023 14.9852V16.752C15.0023 16.8207 14.9761 16.8866 14.9295 16.9352C14.8829 16.9838 14.8197 17.0111 14.7537 17.0111H10.7205C10.6546 17.0111 10.5914 16.9838 10.5448 16.9352C10.4982 16.8866 10.472 16.8207 10.472 16.752V9.82975C10.4723 9.79176 10.4799 9.75422 10.4942 9.71929C10.5085 9.68436 10.5293 9.65273 10.5554 9.62623C10.5815 9.59974 10.6124 9.5789 10.6463 9.56491C10.6802 9.55093 10.7164 9.54408 10.7528 9.54477H23.9733C23.179 7.1224 21.6769 5.02019 19.6779 3.53332C17.6789 2.04645 15.2835 1.24959 12.8278 1.25462L12.0798 1.25721Z"
                fill="#fff" />
              <path
                d="M12.8253 26.9308V27.3927L12.8259 27.3927L12.8253 26.9308ZM12.0798 26.9308L12.0792 27.3927H12.0798V26.9308ZM0 14.3349H-0.461928L-0.461927 14.3354L0 14.3349ZM0 13.5577L-0.461928 13.5573V13.5577H0ZM12.0798 0.961871V0.499943L12.0792 0.499944L12.0798 0.961871ZM12.8253 0.961871V1.4238L12.8262 1.4238L12.8253 0.961871ZM24.3137 9.66135L23.8725 9.79818L23.8727 9.79871L24.3137 9.66135ZM24.3759 9.86083V10.3228H25.0035L24.8169 9.72348L24.3759 9.86083ZM10.7702 9.86083V9.3989H10.3083V9.86083H10.7702ZM10.7702 16.708H10.3083V17.1699H10.7702V16.708ZM14.704 16.708V17.1699H15.166V16.708H14.704ZM14.704 15.0448H15.166V14.5828H14.704V15.0448ZM12.7533 15.0448H12.2914V15.5067H12.7533V15.0448ZM12.7533 11.967V11.5051H12.2914V11.967H12.7533ZM24.8083 11.967L25.2674 11.9162L25.2219 11.5051H24.8083V11.967ZM24.8232 12.1018L24.364 12.1526L24.3641 12.1532L24.8232 12.1018ZM24.9052 13.5474H25.3671L25.3671 13.5465L24.9052 13.5474ZM24.9052 14.3246L25.3671 14.3247V14.3246H24.9052ZM12.0798 1.25721L12.0804 1.71914L12.0814 1.71914L12.0798 1.25721ZM0.293234 13.5474L-0.168693 13.5469V13.5474H0.293234ZM0.293234 14.3246H-0.168694L-0.168693 14.325L0.293234 14.3246ZM12.0798 26.6147L12.0792 27.0766H12.0798V26.6147ZM12.8253 26.6147V27.0766H12.826L12.8253 26.6147ZM24.6119 14.3246L25.0739 14.325V14.3246H24.6119ZM24.6119 13.5474H25.0739L25.0739 13.5462L24.6119 13.5474ZM24.5473 12.2727L25.007 12.2272L24.9657 11.8108H24.5473V12.2727ZM13.0465 12.2727V11.8108H12.5846V12.2727H13.0465ZM13.0465 14.7261H12.5846V15.188H13.0465V14.7261ZM10.472 9.82975L10.0101 9.82583V9.82975H10.472ZM10.7528 9.54477L10.7441 10.0067H10.7528V9.54477ZM23.9733 9.54477V10.0067H24.6109L24.4122 9.40084L23.9733 9.54477ZM12.8278 1.25462L12.8269 0.792691L12.8262 0.792693L12.8278 1.25462ZM12.8253 26.4688H12.0798V27.3927H12.8253V26.4688ZM12.0804 26.4688C9.0061 26.4649 6.05472 25.19 3.87497 22.9171L3.20819 23.5566C5.55768 26.0064 8.74758 27.3884 12.0792 27.3927L12.0804 26.4688ZM3.87497 22.9171C1.69459 20.6436 0.465101 17.5573 0.461927 14.3345L-0.461927 14.3354C-0.458525 17.7908 0.859318 21.1074 3.20819 23.5566L3.87497 22.9171ZM0.461928 14.3349V13.5577H-0.461928V14.3349H0.461928ZM0.461927 13.5582C0.465101 10.3353 1.69459 7.24906 3.87497 4.97554L3.20819 4.33608C0.859318 6.78528 -0.458525 10.1019 -0.461927 13.5573L0.461927 13.5582ZM3.87497 4.97554C6.05472 2.70267 9.0061 1.42775 12.0804 1.4238L12.0792 0.499944C8.74758 0.504224 5.55768 1.88622 3.20819 4.33608L3.87497 4.97554ZM12.0798 1.4238H12.8253V0.499943H12.0798V1.4238ZM12.8262 1.4238C15.2753 1.41949 17.6646 2.22553 19.65 3.72893L20.2077 2.99241C18.064 1.36908 15.4788 0.49527 12.8245 0.499944L12.8262 1.4238ZM19.65 3.72893C21.6357 5.23257 23.1154 7.35691 23.8725 9.79818L24.7549 9.52453C23.9421 6.90344 22.3512 4.6155 20.2077 2.99241L19.65 3.72893ZM23.8727 9.79871L23.9348 9.99819L24.8169 9.72348L24.7548 9.524L23.8727 9.79871ZM24.3759 9.3989H10.7702V10.3228H24.3759V9.3989ZM10.3083 9.86083V16.708H11.2321V9.86083H10.3083ZM10.7702 17.1699H14.704V16.246H10.7702V17.1699ZM15.166 16.708V15.0448H14.2421V16.708H15.166ZM14.704 14.5828H12.7533V15.5067H14.704V14.5828ZM13.2152 15.0448V11.967H12.2914V15.0448H13.2152ZM12.7533 12.429H24.8083V11.5051H12.7533V12.429ZM24.3491 12.0179L24.3641 12.1526L25.2823 12.0509L25.2674 11.9162L24.3491 12.0179ZM24.3641 12.1532C24.416 12.6162 24.4424 13.082 24.4433 13.5482L25.3671 13.5465C25.3662 13.0465 25.3379 12.547 25.2822 12.0503L24.3641 12.1532ZM24.4433 13.5474V14.3246H25.3671V13.5474H24.4433ZM24.4433 14.3245C24.4426 17.5491 23.2143 20.6379 21.0336 22.9136L21.7006 23.5528C24.0498 21.1012 25.3664 17.7819 25.3671 14.3247L24.4433 14.3245ZM21.0336 22.9136C18.8536 25.1886 15.9007 26.4649 12.8248 26.4688L12.8259 27.3927C16.1594 27.3884 19.3508 26.0049 21.7006 23.5528L21.0336 22.9136ZM12.0792 0.795284C8.82534 0.799568 5.71004 2.14936 3.41554 4.54188L4.08232 5.18134C6.20709 2.9658 9.08388 1.72308 12.0804 1.71914L12.0792 0.795284ZM3.41554 4.54188C1.12167 6.93375 -0.165288 10.1726 -0.168693 13.5469L0.755162 13.5478C0.758332 10.4061 1.95693 7.39754 4.08232 5.18134L3.41554 4.54188ZM-0.168693 13.5474V14.3246H0.755162V13.5474H-0.168693ZM-0.168693 14.325C-0.165288 17.6994 1.12167 20.9382 3.41554 23.33L4.08232 22.6906C1.95693 20.4744 0.758332 17.4659 0.755162 14.3241L-0.168693 14.325ZM3.41554 23.33C5.71004 25.7226 8.82534 27.0724 12.0792 27.0766L12.0804 26.1528C9.08388 26.1488 6.20709 24.9061 4.08232 22.6906L3.41554 23.33ZM12.0798 27.0766H12.8253V26.1528H12.0798V27.0766ZM12.826 27.0766C16.0798 27.0724 19.1951 25.7226 21.4896 23.33L20.8229 22.6906C18.6981 24.9061 15.8213 26.1488 12.8247 26.1528L12.826 27.0766ZM21.4896 23.33C23.7835 20.9382 25.0705 17.6994 25.0739 14.325L24.15 14.3241C24.1468 17.4659 22.9483 20.4744 20.8229 22.6906L21.4896 23.33ZM25.0739 14.3246V13.5474H24.15V14.3246H25.0739ZM25.0739 13.5462C25.0728 13.1057 25.0505 12.6654 25.007 12.2272L24.0877 12.3183C24.1282 12.727 24.149 13.1376 24.15 13.5485L25.0739 13.5462ZM24.5473 11.8108H13.0465V12.7347H24.5473V11.8108ZM12.5846 12.2727V14.7261H13.5084V12.2727H12.5846ZM13.0465 15.188H14.7537V14.2642H13.0465V15.188ZM14.7537 15.188C14.6908 15.188 14.6345 15.1618 14.5961 15.1218L15.2628 14.4822C15.1312 14.345 14.9485 14.2642 14.7537 14.2642V15.188ZM14.5961 15.1218C14.5584 15.0824 14.5403 15.0329 14.5403 14.9852H15.4642C15.4642 14.8 15.3938 14.6188 15.2628 14.4822L14.5961 15.1218ZM14.5403 14.9852V16.752H15.4642V14.9852H14.5403ZM14.5403 16.752C14.5403 16.7043 14.5584 16.6548 14.5961 16.6154L15.2628 17.255C15.3938 17.1184 15.4642 16.9372 15.4642 16.752H14.5403ZM14.5961 16.6154C14.6345 16.5754 14.6908 16.5492 14.7537 16.5492V17.473C14.9485 17.473 15.1312 17.3922 15.2628 17.255L14.5961 16.6154ZM14.7537 16.5492H10.7205V17.473H14.7537V16.5492ZM10.7205 16.5492C10.7835 16.5492 10.8398 16.5754 10.8781 16.6154L10.2114 17.255C10.343 17.3922 10.5257 17.473 10.7205 17.473V16.5492ZM10.8781 16.6154C10.9159 16.6548 10.9339 16.7043 10.9339 16.752H10.0101C10.0101 16.9372 10.0805 17.1184 10.2114 17.255L10.8781 16.6154ZM10.9339 16.752V9.82975H10.0101V16.752H10.9339ZM10.9339 9.83366C10.9337 9.8541 10.9297 9.87472 10.9216 9.89449L10.0668 9.54409C10.03 9.63371 10.0109 9.72942 10.0101 9.82583L10.9339 9.83366ZM10.9216 9.89449C10.9135 9.91428 10.9012 9.93348 10.8845 9.95045L10.2264 9.30201C10.1575 9.37198 10.1035 9.45443 10.0668 9.54409L10.9216 9.89449ZM10.8845 9.95045C10.8677 9.96745 10.8468 9.98188 10.8225 9.99191L10.4701 9.13792C10.378 9.17592 10.2954 9.23203 10.2264 9.30201L10.8845 9.95045ZM10.8225 9.99191C10.7982 10.002 10.7715 10.0071 10.7441 10.0066L10.7615 9.08292C10.6613 9.08104 10.5622 9.09991 10.4701 9.13792L10.8225 9.99191ZM10.7528 10.0067H23.9733V9.08284H10.7528V10.0067ZM24.4122 9.40084C23.5889 6.89011 22.031 4.70786 19.9536 3.16268L19.4022 3.90396C21.3228 5.33252 22.769 7.35468 23.5344 9.6887L24.4122 9.40084ZM19.9536 3.16268C17.8759 1.61728 15.3837 0.787459 12.8269 0.792692L12.8288 1.71654C15.1832 1.71173 17.4819 2.47563 19.4022 3.90396L19.9536 3.16268ZM12.8262 0.792693L12.0782 0.795287L12.0814 1.71914L12.8294 1.71654L12.8262 0.792693Z"
                fill="#fff" mask="url(#path-10-inside-1_67_229)" />
              <path
                d="M69.4684 24.2377L70.0267 25.0022H81.8139L75.1447 16.2205L75.3822 16.1982C76.606 15.9596 77.7943 15.5701 78.9189 15.039C81.9503 13.3884 81.9503 10.8195 81.9503 8.33738C81.9748 6.6388 81.3294 4.99679 80.1491 3.75544C79.5959 3.17608 78.9275 2.71455 78.1853 2.39945C77.4431 2.08435 76.6429 1.92241 75.8344 1.92365H59.9194V25.0071H68.9051L69.4634 24.2377H69.4684ZM68.324 10.0029V8.65509C68.324 8.58926 68.3507 8.52613 68.398 8.47958C68.4454 8.43303 68.5097 8.40688 68.5767 8.40688H71.9693C72.0363 8.40688 72.1006 8.43303 72.1479 8.47958C72.1953 8.52613 72.2219 8.58926 72.2219 8.65509V10.0029C72.2219 10.0687 72.1953 10.1318 72.1479 10.1784C72.1006 10.2249 72.0363 10.2511 71.9693 10.2511H68.5767C68.5097 10.2511 68.4454 10.2249 68.398 10.1784C68.3507 10.1318 68.324 10.0687 68.324 10.0029Z"
                fill="#fff" stroke="#fff" stroke-width="0.923855" stroke-miterlimit="10" />
              <path
                d="M58.1416 26.8042V3.01207H74.3999C77.8742 3.01207 80.7293 5.87472 80.7293 9.67894C80.7293 12.21 80.7293 14.9082 77.5902 16.6318C76.4346 17.1772 75.214 17.576 73.9573 17.8189L80.7395 26.7966H68.6155L68.7127 26.9308H80.9928L74.1825 17.9151C75.3815 17.6574 76.5458 17.2615 77.6516 16.7356C80.8649 14.9841 80.8649 12.1645 80.8649 9.6764C80.8887 7.87805 80.2085 6.1403 78.9666 4.82686C78.3797 4.21195 77.6717 3.72247 76.8863 3.38859C76.101 3.05471 75.2548 2.8835 74.3999 2.88552H58.0034V26.9308H67.1879L67.2851 26.7966L58.1416 26.8042Z"
                fill="#fff" stroke="#fff" stroke-width="0.184771" stroke-miterlimit="10" />
              <path
                d="M116.007 25.0071H125.678L126.206 24.2931L126.743 25.0071H139.954L131.475 13.4654L139.954 1.92365H126.743L126.206 2.64024L125.675 1.92365H116.007V25.0071Z"
                fill="#fff" stroke="#fff" stroke-width="0.923855" stroke-miterlimit="10" />
              <path d="M114.232 25.8349V3.01709H123.668L123.571 2.8855H114.091V25.969H123.571L123.67 25.8349H114.232Z"
                fill="#ffff" stroke="#ffff" stroke-width="0.184771" stroke-miterlimit="10" />
              <path
                d="M130.128 14.426L138.039 2.8855H125.679L125.588 3.01709H137.787L129.968 14.426L137.787 25.8349H125.586L125.679 25.969H138.039L130.128 14.426Z"
                fill="#ffff" stroke="#ffff" stroke-width="0.184771" stroke-miterlimit="10" />
            </svg>
          </q-item-section>
        </q-item>
        <q-space />
        <q-input  color="bg-finvedic" rounded outlined v-model="text" label="Search"  >
          <template v-slot:append>
          <q-icon name="search" />
        </template>
        </q-input>


        <q-btn icon="notifications_active" round class="bg-white2 text-white q-mx-lg" :size="isMobile ? 'sm' : 'md'">
          <q-menu class="fin-br-8 q-py-md shadow-0" min-width="120px"
            style="width:230px;background: transparent!important;" :offset="[-0, 10]" transition-show="flip-right"
            transition-hide="rotate">

            <div style="background-color: #EAEAEA;opacity:0.99" class="q-py-md shadow-2 fin-br-8">
              <div class="q-pa-sm absolute-top-right arrow" style="margin-top: -19px">
                <q-icon name="arrow_drop_up" size="xl" style="color: #EAEAEA"></q-icon>
              </div>
              <div class="q-px-md" v-if="nextOrLastEvent">
  <div class="full-width row items-center">
    {{ isNextEvent ? "Next Class" : "Last Class" }}
    <q-space />
    <q-icon name="calendar_month" size="20px" />
  </div>
  <div class="fill-width text-center items-center row justify-center text-body1 text-weight-bolder q-py-lg" style="align-items: center;">
    <div>{{ nextOrLastEvent.date.split('-')[1] }}</div>
    <!-- <div class="text-h5 q-px-md text-weight-bolder">{{ nextOrLastEvent.date.split('-')[2] }}</div> -->
    <div>{{ nextOrLastEvent.date.split('-')[0] }}</div>
  </div>
  <div class="full-width bg-finvedic row q-px-sm q-py-xs fin-br-8 text-white cursor-pointer">
    <a :href="nextOrLastEvent.link" target="_blank" style="text-decoration: none;">
  <div class="full-width bg-finvedic q-px-sm q-py-xs fin-br-8 text-white cursor-pointer">
    <div class="text-center">{{ nextOrLastEvent.topic }}</div>
    <div class="text-center" >Time: {{ nextOrLastEvent.start }}</div>
  </div>
</a>
  </div>
</div>

            </div>
          </q-menu>
        </q-btn>

        <q-avatar class="shadow-4" :size="isMobile ? '40px' : '50px'">
          <q-img :src="imageUrl || profileImg" class="profileImg cursor-pointer rounded full-width full-height" />
          <q-menu :offset="[-5, 5]" max-width="300px" style="width:230px;background: transparent!important;"
            class="fin-br-8 q-py-md shadow-0" transition-show="flip-right" transition-hide="rotate">
            <div style="background-color: #EAEAEA;opacity:0.99" class="q-py-md shadow-2 fin-br-8">
              <div class="q-pa-sm absolute-top-right arrow" style="margin-top: -19px">
                <q-icon name="arrow_drop_up" size="xl" style="color: #EAEAEA"></q-icon>
              </div>
              <q-list style="min-width: 200px" class="text-weight-bold">
                <q-item @click="$router.push('/profile')" clickable v-close-popup>
                  <q-item-section>Profile</q-item-section>
                </q-item>
                <q-item @click="logout" clickable v-close-popup>
                  <q-item-section>Log Out</q-item-section>
                  <q-item-section>
                    <svg width="27" height="9" viewBox="0 0 27 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path id="Arrow 3"
                        d="M26.3536 4.85355C26.5488 4.65829 26.5488 4.34171 26.3536 4.14644L23.1716 0.964464C22.9763 0.769202 22.6597 0.769202 22.4645 0.964464C22.2692 1.15973 22.2692 1.47631 22.4645 1.67157L25.2929 4.5L22.4645 7.32843C22.2692 7.52369 22.2692 7.84027 22.4645 8.03553C22.6597 8.23079 22.9763 8.23079 23.1716 8.03553L26.3536 4.85355ZM4.37114e-08 5L26 5L26 4L-4.37114e-08 4L4.37114e-08 5Z"
                        fill="black" />
                    </svg>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-menu>
        </q-avatar>


      </q-toolbar>
    </q-header>

    <q-drawer v-if="showDrawer" v-model="drawerLeft" show-if-above :mini="miniState" width=180 :breakpoint="900"
      class="text-white fin-drawer-style shadow-2">
      <q-scroll-area class="fit q-pl-md q-pt-md bg-finvedic q-pt-xl" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list>
          <div class="left-drawer">
            <template v-for="(module, index ) in modules">
              <q-item class="module-select q-my-xs" :class="getActiveModuleClass(module)" :clickable="!module.menu"
                :v-ripple="!module.menu" @click="changeLocation(module)">

                <span class="flex" v-if="!module.menu" >
                  <q-item-section avatar>
                    <q-icon  :name="module.icon" />
                  </q-item-section>
                  <q-item-section class="text-body2">
                    {{ module.label }}
                  </q-item-section>
                </span>
                

                <q-expansion-item v-if="module.menu" class="q-pa-none full-width module-select" :content-inset-level="0.2"
                  expand-icon-class="text-white" v-model="expand[module.value]" :icon="module.icon" :label="module.label">
                  <q-item v-for="(item, i) in module.menu" :key="item" clickable v-ripple
                    class="module-select q-my-sm q-px-md" :class="getActiveMenuItemClass(module, item)"
                    @click="changeLocation(module, item)">
                    <q-item-section avatar >
                      <q-icon :name="item.icon" />
                    </q-item-section>
                    <q-item-section class="text-body2">
                      {{ item.label }}
                    </q-item-section>
                  </q-item>
                </q-expansion-item>
              </q-item>
            </template>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container >
      <q-page >
        <router-view style="background-color: rgba(255, 255, 255, 0); " v-if="token" />
        <chatbot/>
        <chatbox/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { storeToRefs } from "pinia";
import { useSessionStore } from "src/stores/session";
import { setToken } from "src/boot/axios"
import { useProfileStore } from "src/stores/profile";
import profileImg from "src/assets/profile.png";
import Chatbot from "src/layouts/ChatBot.vue";
//import Chatbox from "../pages/dashboard/channel/ChatBox.vue";
export default {
  components: {
    Chatbot,
    //Chatbox
  },
  name: 'dashboard-layout',
  setup() {
    const session = useSessionStore();
    const { token, userType } = storeToRefs(session);
    
    const { setUserType, setSessionToken } = session;
    const profileStore = useProfileStore();
    const { user } = storeToRefs(profileStore);
    // console.log("Upload Document Path", user.value.uploadDocumentPath);
  
    return {
      token,
      userType,
      setUserType,
      setSessionToken,
      user
    
    }
  },
  data() {
    return {
      backgroundStyle: '',
      profileImg: profileImg,
      imageUrl: '', 
      profileMenu: false,
      CurrentDate: new Date().toDateString(),
      selectedModule: {},
      drawerLeft: window.innerWidth < 600 ? false : true,
      isMobile: window.innerWidth > 600 ? false : true,
      miniState: false,
      modulesList: [
        { icon: 'person', label: 'Administration', value: 'admin' },
        { icon: 'groups', label: 'Labs', value: 'labs' },
        {
          icon: 'library_books', label: 'Libraries', value: 'library', menu: [
            { label: "Books", value: 'books', icon: 'menu_book' },
            { label: "Videos", value: "videos", icon: 'switch_video' },
            { label: "Presentations", value: "presentations", icon: 'newspaper' },
            { label: "Class Room", value: "class-room", icon: 'reduce_capacity' }
          ]
        },
      //   {
      //      icon: 'summarize', label: 'Reports', value: 'reports', 
         
      //  },
      {
           icon: 'chat', label: 'Channel', value: 'channel', 
         
       },
      
        {
           icon: 'help', label: 'Help', value: 'help', 
         
       }
    
      ],
      expand: {},
      userOwner:'' ,
      adminAccess: ["admin", "labs",  "library", "reports"],
      studentsAccess: ["labs", "library"],
      facultyAccess: ["admin","labs", "library", "reports"],
      defaultPath: "/library/books",
      guestAccess: [ "library"],
      userAccess: [ "labs", "library"],
      allAccess:["watch-video","read-pdf","watch-ppt","channel","profile","help"]
    }
  },
  computed: {
    widthSVG() { return window.innerWidth > 600 ? 197 : 150 },
    modules() {
      var userAccess = [];
      if(this.userType == 'Admin') {
        userAccess = this.adminAccess;
      } else if(this.userType == 'Faculty' ) {
        userAccess = this.facultyAccess;
      } else if(this.userType == 'Guest' ) {
        userAccess = this.guestAccess;
      } else {
        userAccess = this.studentsAccess;
      }
      this.userAccess = userAccess;
      this.userAccess.push(...this.allAccess);
      return this.modulesList.filter(mode => userAccess.includes(mode.value) );
      //return  this.modulesList ;
    }
  },
  props: {
    showDrawer: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    if (!this.token) {  
        this.$router.push('/');
    }

    if (this.userType === 'Guest') {
      document.body.classList.add('guest');
    } else {
      document.body.classList.remove('guest');
    }
    this.getUserData();
    this. getEventsDataNotification();
    this.selectedModule = {
        module: this.$route.meta.module,
        item: this.$route.meta.item
    };
    this.updateBackgroundStyle();
    this.knowModuleFunction();
    this.checkAccess();
    // console.log("User Type:", this.userType);
    // console.log("User Specialization:", this.user.specialization);
    // Check if uploadDocumentPath is null and redirect to /profile if needed

//     if (this.userType !== 'Admin' && this.userType !== 'Guest' && !this.user.specialization) {
//     this.$router.push('/profile');
// }

},

 watch: {
  token(newVal, oldVal) {
    if (!newVal) {
      this.$router.push('/');
    }

  },
  user() {
    this.getUserData();
  },
  $route(to, from) {
    this.updateBackgroundStyle();
    this.checkAccess();
  }
},
  methods: {
    checkAccess() {
       let path = this.$route.path;
       let access = this.userAccess.filter(value => path.startsWith("/"+value));
       if( access && access.length == 0) {
          this.$router.push({path:this.defaultPath});
       }
       
    },
    getEventsDataNotification() {
  var request = {
    categoryId: this.selectedCategory?.id,
    subCategoryId: this.selectedSubCategory?.id
  };
  this.loading = true;
  const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
  const getEvents = baseUrl + 'api/calendarEvents';

  this.$api.get(getEvents, {
    params: request
  }).then(response => {
    this.loading = false;
    if (response.data.success) {
      let events = response.data.data;

      // Map and sort events by date and start time
      events = events.map(event => ({
        title: event.title,
        date: event.date,
        start: event.start,
        end: event.end,
        link: event.link,
        topic: event.topic,
        color: 'white',
       // backgroundColor: colorHash.hex(event.title),
        width: '100%',
        height: '50px'
      })).sort((a, b) => new Date(`${a.date} ${a.start}`) - new Date(`${b.date} ${b.start}`));

      const now = new Date();
      let nextEvent = null;
      let lastEvent = null;

      // Find the next event
      nextEvent = events.find(event => new Date(`${event.date} ${event.start}`) > now);

      // Find the most recent past event if no next event is found
      if (!nextEvent) {
        lastEvent = events.reverse().find(event => new Date(`${event.date} ${event.start}`) <= now);
      }

      this.events = events;
      this.nextOrLastEvent = nextEvent || lastEvent;
      this.isNextEvent = !!nextEvent; // true if next event, false if last event
      // console.log("events:", this.events);
      // console.log("nextOrLastEvent:", this.nextOrLastEvent);
    } else {
      this.showMsg(response.data?.message, 'negative');
    }
  }).catch(error => {
    this.loading = false;
    this.showMsg(error.response?.data.message || error.message, 'negative');
  });
},
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
    updateBackgroundStyle() {
      // Check if the current route is '/library/books'
      if (this.$route.path === '/library/books') {
        this.backgroundStyle = 'booksBackgroundStyle'; // Apply the background style class
      } 
      else if (this.$route.path === '/library/videos') {
        this.backgroundStyle = 'booksBackgroundStyle'; // Apply the background style class
      } 
      else if (this.$route.path === '/library/presentations') {
        this.backgroundStyle = 'booksBackgroundStyle'; // Apply the background style class
      } 
      else if (this.$route.path === '/library/class-room') {
        this.backgroundStyle = 'Lib_CL_Room_BackgroundStyle'; // Apply the background style class
      } 
      else if (this.$route.path === '/admin/uploadpdfbot') {
        this.backgroundStyle = 'AI_Setup_BackgroundStyle'; // Apply the background style class
      } 
      
      else if (this.$route.path === '/admin/users') {
        this.backgroundStyle = 'Users_BackgroundStyle'; // Apply the background style class
      } 
      
      else if (this.$route.path === '/admin/books') {
        this.backgroundStyle = 'Users_BackgroundStyle'; // Apply the background style class
      } 
      else if (this.$route.path === '/admin/videos') {
        this.backgroundStyle = 'Users_BackgroundStyle'; // Apply the background style class
      } 
      else if (this.$route.path === '/labs') {
        this.backgroundStyle = 'Users_BackgroundStyle'; // Apply the background style class
      } 
      else if (this.$route.path === '/admin/roles') {
        this.backgroundStyle = 'Users_BackgroundStyle'; // Apply the background style class
      } 
      
      else if (this.$route.path === '/admin/presentations') {
        this.backgroundStyle = 'Users_BackgroundStyle'; // Apply the background style class
      } 
      else if (this.$route.path === '/admin/presentations') {
        this.backgroundStyle = 'Users_BackgroundStyle'; // Apply the background style class
      } 
      else if(this.$route.path === '/admin/vm-setup'){
        this.backgroundStyle = 'Users_BackgroundStyle';
      }
      else if(this.$route.path === '/admin/class-room'){
        this.backgroundStyle = 'Users_BackgroundStyle';
      }
       else if(this.$route.path === '/admin/forms'){
        this.backgroundStyle = 'Users_BackgroundStyle';
      }
      else if (this.$route.path === '/admin/studentRegister') {
        this.backgroundStyle = 'Users_BackgroundStyle'; // Apply the background style class
      } 
      else if(this.$route.path === '/help'){
        this.backgroundStyle = 'help_backgroundStyle';
      }
      else {
        this.backgroundStyle = ''; // Do not apply any background style
      }
    },
    getUserData() {
  this.$api.get(`api/users/${this.user.id}`).then(response => {
    if (response.data.success) {
      const user = response.data.data;
      this.profile = {
          name: user.name,
          dob:user.dob,
          graduationDegree: user.graduationDegree,
          qualificationYear: user.qualificationYear,
          specialization:user.specialization,
          gender:user.gender,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: this.user.roles ? this.user.roles[0] : [],
          //owner: user.owner,
      };
//console.log(this.profile);
   if (this.userType === 'Student'&& Object.values(this.profile).some(value => value === null || value === undefined)) {
           this.$router.push('/profile');
    }

     //console.log(this.profile)

      const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';
      const removeImagePath = baseUrl + 'fs/download/';

      //Check if uploadDocumentPath is not null or undefined
      if (user.uploadDocumentPath) {
        const filename = user.uploadDocumentPath.replace(removeImagePath, '');

        // Post the filename to get the image blob
        const formData = new FormData();
        formData.append('filename', filename);
        const ImagePath = baseUrl + 'fs/download';

        this.$api.post(ImagePath, formData, {
          responseType: 'blob'
        }).then(response => {
          const url = URL.createObjectURL(response.data);
          this.imageUrl = url;
        }).catch(error => {
          this.showMsg(error.response?.data.message || error.message, 'negative');
        });
      } else {
        this.imageUrl = ''; // Set imageUrl to an empty string if uploadDocumentPath is null
      }

    } else {
      this.showMsg(response.data.message, 'negative');
    }
  }).catch(error => {
    this.loading = false;
    this.showMsg(error.response?.data.message || error.message, 'negative');
  });
},

    
    knowModuleFunction() {
      var filteredModule = this.modulesList.filter(module => module.menu);
      filteredModule.forEach(module => {
        this.expand[module.value] = this.selectedModule.module == module.value;
      });
    },
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
      return this.selectedModule.module === module.value;
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
      this.$q.dialog({
        title: 'Are You Sure Want To Log Out?',
        cancel: {
          label: 'No',
          color: 'black',
          flat: true
        },
        ok: {
          label: 'Yes',
          color: 'red',
          // flat: true,
        },
        persistent: true
      }).onOk(() => {
        sessionStorage.clear();
        this.setSessionToken();
        this.setUserType();
        this.$router.push('/');
      });
    }
  }
}
</script>
<style>
.module-select {
  border-radius: 10px 0px 0px 10px;
}
.booksBackgroundStyle {
  background-image: url('/src/assets/BG_New.png');
  background-repeat: no-repeat;
  background-size: 100vw 70vh;
 
}
.Lib_CL_Room_BackgroundStyle{
  background-image: url('/src/assets/BG_New.png');
  background-repeat: no-repeat;
  background-size: 100vw 40%;
}
.help_backgroundStyle{
  background-image: url('/src/assets/BackImg.png');
  background-repeat: no-repeat;
  background-size: 100vw 55vh;
  position: absolute;
  top: 72px
}
.module-select-active {
  background: #fff;
  color: #5479F7;
}
.bg-white2{
  background-color: #0A004B;
}
.AI_Setup_BackgroundStyle{
  background-image: url('/src/assets/ai_set_bg.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top:3%;
}
.Users_BackgroundStyle{
  background-image: url('/src/assets/ai_set_bg.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top:3%;
}
.Classroom_BackgroundStyle{
  background-image: url('/src/assets/classroom_bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top:3%;
}
.menu-class {
  padding: 0px 0px !important;
}

.fin-profile-bg {
  background: #E6E6E6;
}

.profileImg {
  background: #FF7F50;
}
.adminBackgroundStyle{
  background-color: #D0DFFA;
}

.left-drawer {
  min-height: 300px;
  height: calc(100vh - 345px);

}

.fin-drawer-style {
  margin-top: 40px;
  border: none !important;
  border-radius: 0px 20px 0px 0px;
  /* padding-top: 40px; */
  background: transparent!important;
}
.q-field--outlined.q-field--rounded .q-field__control {
    /* border-radius: 28px; */
    background-color: white;

}
.q-drawer {
  background-color: transparent;
}

.mainHeader {
  background: #5479F7;
  backdrop-filter: blur(19px);
}

.guest .chapters_show > div:nth-child(1),
.guest .chapter_right > div:nth-child(2){
    /* Styles for first, second, and last child divs */
    cursor: pointer; /* Change cursor to indicate it's clickable */
}
.guest .chapters_show> div:not(:nth-child(1)),
.guest .chapter_right > div:not(:nth-child(2)) {
    /* Styles for other child divs */
    pointer-events: none; /* Disable click events *//* Optionally reduce opacity to indicate non-clickable */
}


.q-item__section--avatar {
  min-width: inherit !important;
}
@media only screen and (max-width:576px){
  .logo{
    display: none !important;
  }
}
@media screen and (min-width: 1920px){
  .booksBackgroundStyle {
  background-image: url('/src/assets/BG_New.png');
  background-repeat: no-repeat;
  background-size: 100vw 60%;
 
}
}
</style>
