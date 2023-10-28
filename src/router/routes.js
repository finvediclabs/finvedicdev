
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/login',
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
        path: 'books/create',
        component: () => import('pages/dashboard/books/createBook.vue'),
        meta: { item: 'books' }
      },
      {
        path: 'videos',
        component: () => import('pages/dashboard/videos/videos.vue'),
        meta: { item: 'books' }
      },
      {
        path: 'videos/create',
        component: () => import('pages/dashboard/videos/createVideo.vue'),
        meta: { item: 'books' }
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
