import Category from '@/pages/Category'
import Forum from '@/pages/Forum'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import Profile from '@/pages/Profile'
import ThreadCreate from '@/pages/ThreadCreate'
import ThreadEdit from '@/pages/ThreadEdit'
import ThreadShow from '@/pages/ThreadShow'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/me',
    name: 'Profile',
    component: Profile,
    meta: { toTop: true, smoothScroll: true }
  },
  {
    path: '/me/edit',
    name: 'ProfileEdit',
    component: Profile,
    props: { edit: true }
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    component: Forum,
    props: true
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: Category,
    props: true
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: ThreadShow,
    props: true
    // beforeEnter (to, from, next) {
    //   // check if thread exists
    //   const threadExists = sourceData.threads.find(thread => thread.id === to.params.id)
    //   // if exists continue
    //   if (threadExists) {
    //     return next()
    //   } else {
    //     next({
    //       name: 'NotFound',
    //       params: { pathMach: to.path.substring(1).split('/') },
    //       // preserve existing query and hash
    //       query: to.query,
    //       hash: to.hash
    //     })
    //   }
    // }
  },
  {
    path: '/form/:forumId/thread/create',
    name: 'ThreadCreate',
    component: ThreadCreate,
    props: true
  },
  {
    path: '/thread/:id/edit',
    name: 'ThreadEdit',
    component: ThreadEdit,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to) {
    if (to.meta.toTop) scroll.top = 0
    if (to.meta.smoothScroll) scroll.behavior = 'smooth'
    return scroll
  }

})
