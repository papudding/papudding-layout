<script setup lang="ts">
import { onMounted, onUnmounted, ref, reactive } from 'vue'

import Header from './parts/Header.vue'
import Aside from './parts/Aside.vue'
import Tabs from './parts/Tabs.vue'
import { type Tab, type PapuddingSkeletonProps } from './types'


const initalRoute = reactive<Tab>({
  path: '/home',
  title: '首页',
  tabPath: ['首页']
})

const props = defineProps<PapuddingSkeletonProps>()

//#region ROUTE_TABS
// tab标签集合
const tabList = ref<Tab[]>([initalRoute])
// 增加tab标签集合
const addTabToList = (value: Tab) => {
  let isTabExist = tabList.value.some(item => item.path === value.path)
  if (!isTabExist) {
    tabList.value = [...tabList.value, value]
  }
}
// 从tab标签集合中移除tab
const removeTabFromList = (path: string) => {
  // 如果只剩最后一个tab，则不再处理
  if (tabList.value.length === 1) {
    return
  }
  // 移除
  tabList.value = tabList.value.filter(item => item.path !== path)
  // 设置激活的tab
  const lastTab = tabList.value[tabList.value.length - 1]
  setActiveTab(lastTab ? lastTab.path : initalRoute.path)
}
// 当前激活的tab
const activeTab = ref(initalRoute.path)
// 设置当前激活的tab
const setActiveTab = (path: string) => {
  console.log('setActiveTab', 'before', activeTab.value, 'after', path)
  // 如果当前已是目标tab，则不再处理
  if (activeTab.value !== path) {
    activeTab.value = path
    // 路由跳转
    console.log('setActiveTab', 'router push',props.router, path)
    props.router.push({ path: path })
    // 当前激活的导航
    activeIndex.value = path
    // 设置面包屑
    tabList.value.forEach(item => {
      if (item.path == path) {
        breadcrumbItemList.value = item.tabPath
      }
    })
  }
}
//#endregion ROUTE_TABS

//#region ASIDE
// 侧边导航栏是否收起
const isCollapse = ref(false)
// 当前激活的导航
const activeIndex = ref(initalRoute.path)
//#endregion

//#region HEADER
// 面包屑集合
const breadcrumbItemList = ref<string[]>([initalRoute.title])
// 顶部导航选择事件
const handleHeaderSelect = (key: string) => {
  // console.log(key, keyPath)
  switch (key) {
  case '1': {
    isCollapse.value = !isCollapse.value
  }
  }
}
//#endregion

// 自适应调整：屏幕高度
const screenHeight = ref(window.innerHeight)
const adjustHeight = () => {
  screenHeight.value = window.innerHeight
}

// 在页面挂载时监视窗口的改变
onMounted(() => {
  props.router.push({ path: initalRoute.path })
  window.addEventListener('resize', adjustHeight)
})
onUnmounted(() => {
  window.removeEventListener('resize', adjustHeight)
})

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="papudding-layout-asid">
        <!-- 侧边导航栏 -->
        <Aside :is-collapse="isCollapse" :screen-height="screenHeight" :active-index="activeIndex" :pages-routes="pagesRoutes" 
          @addTabToList='addTabToList' @setActiveTab='setActiveTab' />
      </el-aside>
      <el-container>
        <el-header class="papudding-layout-header">
          <!-- 顶部导航条 -->
          <Header :breadcrumb-item-list="breadcrumbItemList" :is-collapse="isCollapse" :avatar-url="avatarUrl" :menu-items="menuItems"
            @handleSelect="handleHeaderSelect" />
        </el-header>
        <!-- 顶部tab页签 -->
        <Tabs :tab-list="tabList" :active-tab="activeTab" @removeTabFromList="removeTabFromList"
          @setActiveTab="setActiveTab" />
        
        <el-main class="papudding-layout-main" :style="{ height: screenHeight - 100 + 'px' }">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.papudding-layout-header {
  padding: 0px;
  height: 58px;
}

.papudding-layout-asid {
  width: auto;
}

.papudding-layout-main {
  background-color: #f0f2f7;
  overflow: 'auto',
}
</style>