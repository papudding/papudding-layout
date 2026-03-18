# papudding-layout

一个基于 Vue3 + TypeScript + Vite 的 SPA 开发骨架库，依赖 Element-Plus UI 组件与 Vuex4 进行状态管理，提供开箱即用的导航栏、侧边栏布局，适合中后台管理系统的快速原型开发。

<img width="996" alt="image" src="https://github.com/user-attachments/assets/7038f88d-24d7-4b31-8106-d8d1027f8332" />
<img width="788" alt="image" src="https://github.com/user-attachments/assets/a30bd700-9794-46dc-9586-2cfb294aca16" />


## 特性
- 🚀 Vue3 + Typescript + Vite
- 📦 基于 Element-Plus 组件库
- 🔧 Vuex4 进行状态管理
- 🎨 提供开箱即用的框架组件

## 快速开始
### 1.使用vite初始化新项目
```bash
pnpm create vite
```
> choose vue
> choose TypeScript
### 1.1 删除style.css
删除根目录的style.css文件

### 2.安装依赖
```bash
pnpm add vuex
pnpm add vue-router 
pnpm add @vueuse/core
pnpm add element-plus 
pnpm add @element-plus/icons-vue 
pnpm add papudding-layout
```

### 3.修改App.vue
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
### 4.在`src`目录下新建`router.ts`
```js
import { createMemoryHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import { PapuddingSkeleton } from 'papudding-layout'

export const pagesRoutes: RouteRecordRaw[] = [
  // 你的框架内的页面路由配置
  // ......
]

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: PapuddingSkeleton,
    children: pagesRoutes
  },
  // 你的框架外的路由配置（例如登录页）
  // ......
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
```
`router.ts` 完整配置参考[这里](https://github.com/papudding/papudding-layout-demo/blob/main/src/router.ts)

### 3.在`src/utils`目录下新建`menuItemBuilder.ts`
这里配置右上角头像下拉菜单
```js
import { type MenuItem } from 'papudding-layout'

export const menuItemsBuilder = (): MenuItem[] => {
  return [
    {
      label: 'About',
      handler: () => {
        console.log('About clicked')
      },
    },
    {
      label: '登出',
      handler: () => {
        console.log('Logout clicked')
        localStorage.removeItem('papudding-layout-state')
        window.location.href = '/login'
      },
      divided: true
    }
  ]
}
```

### 4.在`src/store`目录下新建`papuddingLayout.ts`
这里配置`papudding-layout`布局内部使用的store
```js
import { createStore } from 'vuex'
import { actions, mutations, loadState, type LayoutState, saveState } from 'papudding-layout'
import { menuItemsBuilder } from '../utils/menuItemBuilder.ts'
import { pagesRoutes } from '../router.ts'

const layoutStateKey = 'papudding-layout-state'

// 定义默认状态
const defaultState: LayoutState = {
  tabList: [{
    path: '/home',
    title: '首页',
    tabPath: ['首页']
  }],
  activeTab: '/home',
  breadcrumbItemList: ['首页'],
  menuItems: menuItemsBuilder(),
  pagesRoutes: pagesRoutes,
  avatarUrl: 'https://avatars.githubusercontent.com/u/10262924?v=4',
}

// 创建 store 实例
export const store = createStore<LayoutState>({
  state: () => loadState(layoutStateKey, defaultState),
  mutations: {
    ...mutations,
  },
  actions: {
    ...actions
  }
})

// 监听更新持久化到localStorage
saveState(layoutStateKey, store)
```

### 5.解决编译和资源报错 在`tsconfig.app.json`的`compilerOptions`中添加
```
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "vuex": ["./node_modules/vuex/types/"]
    }
```

### 6.在`src`目录下新建`variables.css`
内容复制[这里](https://github.com/papudding/papudding-layout/blob/main/src/variables.css)

### 7.修改main.ts
引入布局配置及依赖UI组件
```js
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import App from './App.vue'
import router from './router'

import './variables.css'
import 'papudding-layout/dist/style.css'
import { store as layoutStore } from './store/papuddingLayout.ts'
import { key as layoutKey } from 'papudding-layout'
// 多store示例
// import { store as appStore, key as appKey } from './store/index.ts'
import { useDark } from '@vueuse/core'

useDark()
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(layoutStore, layoutKey)
// 多store示例
// app.use(appStore, appKey)
app.use(ElementPlus, { locale: zhCn })
app.mount('#app')
```

### 8. 在public目录下定义静态图片
导航图片

- `logo.png`
- `logo-full.png`

可选(demo使用)
- `nav/home.svg`
- `nav/work.svg`
- `nav/work_task.svg`
- `nav/work_log.svg`


## 本地调试
### 1 链接本地库
```bash
pnpm link
```
### 2 调试完成后取消链接
```bash
pnpm unlink
```


## 具体使用参考Demo
[papudding-layout-demo](https://github.com/papudding/papudding-layout-demo)

## 参与贡献

1. Fork 本仓库
2. 创建新的分支 (`git checkout -b feature/your-feature`)
3. 提交更改 (`git commit -am 'Add some feature'`)
4. 推送分支 (`git push origin feature/your-feature`)
5. 创建新的 Pull Request
