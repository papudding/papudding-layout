import { createMemoryHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import { HomeFilled, Notebook, Memo, Document } from '@element-plus/icons-vue'
import { h } from 'vue'
import PapuddingSkeleton from '../components/skeleton/PapuddingSkeleton.vue'
import { menuItemsBuilder } from './utils/menuItemBuilder'

export const pagesRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    component: () => import('./pages/HelloWorld.vue'),
    meta: {
      icon: HomeFilled,
      title: '首页'
    }
  },
  {
    path: '/tools',
    meta: {
      icon: Notebook,
      title: '工作'
    },
    children: [
      {
        path: '/task',
        component: () => import('./pages/TestPage.vue'),
        meta: {
          icon: Memo,
          title: '工作任务'
        }
      },
      {
        path: '/log',
        component: () => import('./pages/TestTablePage.vue'),
        meta: {
          icon: Document,
          title: '工作日志'
        }
      },
    ]
  }
]

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => h(PapuddingSkeleton, {
      pagesRoutes: pagesRoutes,
      router: router,
      avatarUrl: 'https://avatars.githubusercontent.com/u/10262924?v=4',
      menuItems: menuItemsBuilder(router)
    }),
    children: pagesRoutes
  },
  {
    path: '/login',
    component: () => import('./pages/Login.vue'),
    meta: {
      title: '登录'
    }
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router