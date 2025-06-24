# papudding-layout

一个基于 Vue3 + TypeScript + Vite 的 SPA 开发骨架库，依赖 Element-Plus UI 组件与 Vuex4 进行状态管理，提供开箱即用的导航栏、侧边栏布局，适合中后台管理系统的快速原型开发。

<img width="996" alt="image" src="https://github.com/user-attachments/assets/7038f88d-24d7-4b31-8106-d8d1027f8332" />
<img width="788" alt="image" src="https://github.com/user-attachments/assets/a30bd700-9794-46dc-9586-2cfb294aca16" />


## 特性
- 🚀 Vue3 + Typescript + Vite
- 📦 基于 Element-Plus 组件库
- 🔧 Vuex4 进行状态管理
- 🎨 提供开箱即用的组件

## 安装

```bash
npm install papudding-layout

# or

yarn add papudding-layout
```

## 使用
前提：项目已安装好下列依赖：
- `vue3`
- `vuex4`
- `vue-router`
- `element-plus`
- `@element-plus/icons-vue`
- `papudding-layout`

### 1.修改App.vue
```js
<template>
  <router-view />
</template>
<style>
body {
  margin: 0;
}
</style>
```
### 2.新建或修改router.ts
```js
import { createMemoryHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import { HomeFilled, Notebook, Memo, Document } from '@element-plus/icons-vue'
import { PapuddingSkeleton } from 'papudding-layout'
import { markRaw } from 'vue'

export const pagesRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    component: () => import('./pages/HelloWorld.vue'),
    meta: {
      icon: markRaw(HomeFilled),
      title: '首页'
    }
  },
  {
    path: '/tools',
    meta: {
      icon: markRaw(Notebook),
      title: '工作'
    },
    children: [
      {
        path: '/task',
        component: () => import('./pages/TestPage.vue'),
        meta: {
          icon: markRaw(Memo),
          title: '工作任务'
        }
      },
      {
        path: '/log',
        component: () => import('./pages/TestTablePage.vue'),
        meta: {
          icon: markRaw(Document),
          title: '工作日志'
        }
      },
    ]
  }
]

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: PapuddingSkeleton,
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
```
### 3.新建utils/menuItemBuilder.ts
```js
import { type MenuItem } from 'papudding-layout'
import { type Router } from 'vue-router'
export const menuItemsBuilder = (router: Router): MenuItem[] => {
  return [
    {
      label: '个人中心',
      handler: () => {
        console.log('Home clicked')
      },
    },
    {
      label: 'About',
      handler: () => {
        console.log('About clicked')
      },
    },
    {
      label: '登出',
      handler: () => {
        router.push({ path: '/login' })
      },
      divided: true
    }
  ]
}
```

### 4.新建或修改store/index.ts
```js
import { createStore } from 'vuex'
import { actions, mutations, type State } from 'papudding-layout'
import { menuItemsBuilder } from '../utils/menuItemBuilder.ts'
import { useRouter } from 'vue-router'
import router, { pagesRoutes } from '../router'

const menuItems = menuItemsBuilder(router)

export const store = createStore<State>({
  state () {
    return {
      tabList: [{
        path: '/home',
        title: '首页',
        tabPath: ['首页']
      }],
      activeTab: '/home',
      breadcrumbItemList: ['首页'],
      menuItems: menuItems,
      pagesRoutes: pagesRoutes,
      avatarUrl: 'https://avatars.githubusercontent.com/u/10262924?v=4',
    }
  },
  mutations: {
    ...mutations
  },
  actions: {
    ...actions
  }
})
```

### 5.修改main.ts
```js
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

import 'papudding-layout/dist/style.css'
import { store } from './store/index.ts'
import { key } from 'papudding-layout'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(store, key)
app.use(ElementPlus, { locale: zhCn })
app.mount('#app')
```

## 具体使用参考
`src/demo/*`

## 参与贡献

1. Fork 本仓库
2. 创建新的分支 (`git checkout -b feature/your-feature`)
3. 提交更改 (`git commit -am 'Add some feature'`)
4. 推送分支 (`git push origin feature/your-feature`)
5. 创建新的 Pull Request