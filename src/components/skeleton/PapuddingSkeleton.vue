<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'

import Header from './parts/Header.vue'
import Aside from './parts/Aside.vue'
import Tabs from './parts/Tabs.vue'
import { type PapuddingSkeletonProps } from './types.ts'
import { useStore } from 'vuex'
import { key } from '../store/types.ts'

const store = useStore(key)

const props = defineProps<PapuddingSkeletonProps>()

//#region ROUTE_TABS
// tab标签集合
const tabList = computed(() => store.state.tabList)

// 当前激活的tab
const activeTab = computed(() => store.state.activeTab)
//#endregion ROUTE_TABS

//#region ASIDE
// 侧边导航栏是否收起
const isCollapse = ref(false)
//#endregion

//#region HEADER
// 面包屑集合
const breadcrumbItemList = computed(() => store.state.breadcrumbItemList)

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
  props.router.push({ path: store.state.activeTab })
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
        <Aside :is-collapse="isCollapse" :screen-height="screenHeight" :active-tab="activeTab" :pages-routes="pagesRoutes" :router="router" />
      </el-aside>
      <el-container>
        <el-header class="papudding-layout-header">
          <!-- 顶部导航条 -->
          <Header :breadcrumb-item-list="breadcrumbItemList" :is-collapse="isCollapse" :avatar-url="avatarUrl" :menu-items="menuItems"
            @handleSelect="handleHeaderSelect" />
        </el-header>
        <!-- 顶部tab页签 -->
        <Tabs :tab-list="tabList" :active-tab="activeTab" :router="router" />
        
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