import { createMemoryHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import { HomeFilled, Notebook, Memo, Document } from '@element-plus/icons-vue'

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
    component: () => import('../components/skeleton/PapuddingSkeleton.vue'),
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