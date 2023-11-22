
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue')
      }
    ]
  },
  {
    path: '/',
    meta: { title: 'Reading Pages', module: 'reading' },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'watch-video',
        component: () => import('components/WatchVideo.vue'),
        meta: { item: '' }
      },
      {
        path: 'read-pdf',
        component: () => import('components/ReadPdf.vue'),
        meta: { item: '' }
      },
      {
        path: 'watch-ppt',
        component: () => import('components/WatchPPT.vue'),
        meta: { item: '' }
      },
    ]
  },
  {
    path: '/login',
    meta: { title: 'landing', module: 'login' },
    component: () => import('layouts/LandingLayout.vue'),
  },
  {
    path: '/admin',
    meta: { title: 'Administration', module: 'admin' },
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/dashboard/MainDashboard.vue'),
        meta: { item: '' }
      },
      {
        path: 'users',
        component: () => import('pages/dashboard/users/Users.vue'),
        meta: { item: 'users' }
      },
      {
        path: 'roles',
        component: () => import('pages/dashboard/Roles.vue'),
        meta: { item: 'roles' }
      },
      {
        path: 'organizations',
        component: () => import('pages/dashboard/organizations/Organizations.vue'),
        meta: { item: 'organizations' }
      },
      {
        path: 'vm-setup',
        component: () => import('pages/dashboard/VmSetup.vue'),
        meta: { item: 'vm-setup' }
      },
      {
        path: 'books',
        component: () => import('pages/dashboard/books/books.vue'),
        meta: { item: 'books' }
      },
      {
        path: 'create',
        component: () => import('components/createFiles.vue'),
        meta: { item: '' }
      },
      {
        path: 'books/chapter/:id',
        component: () => import('pages/dashboard/books/chapters.vue'),
        meta: { item: 'chapters' }
      },
      {
        path: 'videos',
        component: () => import('pages/dashboard/videos/videos.vue'),
        meta: { item: 'books' }
      },
      {
        path: 'videos/chapter/:id',
        component: () => import('pages/dashboard/videos/chapters.vue'),
        meta: { item: 'chapters' }
      },
      {
        path: 'prasentations',
        component: () => import('src/pages/dashboard/prasentations/Prasentations.vue'),
        meta: { item: 'prasentations' }
      },
      {
        path: 'prasentations/chapter/:id',
        component: () => import('pages/dashboard/prasentations/chapters.vue'),
        meta: { item: 'chapters' }
      },
      {
        path: 'class-room',
        component: () => import('pages/dashboard/CalanderEvents/List.vue'),
        meta: { items: 'class-room' }
      },
      {
        path: 'class-room/create',
        component: () => import('pages/dashboard/CalanderEvents/CreateEvent.vue'),
        meta: { items: 'class-room' }
      }
    ],
  },

  {
    path: '/labs',
    meta: { title: 'Labs', module: 'labs' },
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/labs/Index.vue'),
        meta: { item: '' }
      },
    ]
  },

  {
    path: '/library',
    meta: { title: 'Library', module: 'library' },
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: 'books',
        component: () => import('pages/libraries/books.vue'),
        meta: { item: 'books' }
      },
      {
        path: 'videos',
        component: () => import('pages/libraries/videos.vue'),
        meta: { item: 'videos' }
      },
      {
        path: 'prasentations',
        component: () => import('pages/libraries/prasentations.vue'),
        meta: { item: 'prasentations' }
      },
      {
        path: 'class-room',
        component: () => import('pages/libraries/CalanderEvents.vue'),
        meta: { item: 'class-room' }
      }
    ]
  },
  {
    path: '/profile',
    meta: { title: 'profile', module: 'profile' },
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Profile.vue'),
        meta: { item: '' }
      },

    ]
  },

  {
    path: '/Home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
