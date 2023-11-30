
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
        component: () => import('pages/dashboard/books/Books.vue'),
        meta: { item: 'books' }
      },
      {
        path: 'books/chapter/:id',
        component: () => import('pages/dashboard/books/Chapters.vue'),
        meta: { item: 'chapters' }
      },
      {
        path: 'videos',
        component: () => import('pages/dashboard/videos/Videos.vue'),
        meta: { item: 'books' }
      },
      {
        path: 'videos/chapter/:id',
        component: () => import('pages/dashboard/videos/Chapters.vue'),
        meta: { item: 'chapters' }
      },
      {
        path: 'presentations',
        component: () => import('src/pages/dashboard/presentations/Presentations.vue'),
        meta: { item: 'presentations' }
      },
      {
        path: 'presentations/chapter/:id',
        component: () => import('pages/dashboard/presentations/Chapters.vue'),
        meta: { item: 'chapters' }
      },
      {
        path: 'create',
        component: () => import('components/CreateFiles.vue'),
        meta: { item: '' }
      },
      {
        path: 'class-room',
        component: () => import('pages/dashboard/CalenderEvents/List.vue'),
        meta: { items: 'class-room' }
      },
      {
        path: 'class-room/create',
        component: () => import('pages/dashboard/CalenderEvents/CreateEvent.vue'),
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
        component: () => import('pages/libraries/Books.vue'),
        meta: { item: 'books' }
      },
      {
        path: 'videos',
        component: () => import('pages/libraries/Videos.vue'),
        meta: { item: 'videos' }
      },
      {
        path: 'presentations',
        component: () => import('pages/libraries/Presentations.vue'),
        meta: { item: 'presentations' }
      },
      {
        path: 'class-room',
        component: () => import('pages/libraries/CalenderEvents.vue'),
        meta: { item: 'class-room' }
      }
    ]
  },
  {
    path: '/reports',
    meta: { title: 'Reports', module: 'reports' },
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/reports/Index.vue'),
        meta: { item: '' }
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
