<script setup lang="ts">
import type { Router, RouteRecordRaw } from 'vue-router'
import type { Tab } from '../types.ts'
import buildTab from '../../util/tabBuilder.ts'
import { useStore } from 'vuex'
import { key } from '../../store/types.ts'

const store = useStore(key)

const logo: string = '/logo.png'
const logoFull: string = '/logo-full.png'

const props = defineProps<{
  screenHeight: number,
  isCollapse: boolean,
  activeTab: string
  pagesRoutes: RouteRecordRaw[],
  router: Router
}>()


const handleSelect = (key: string) => {
  // 获取当前页面路由list
  const tab: Tab = buildTab(key, props.pagesRoutes)
  
  // 增加tab标签集合值
  store.dispatch('switchPage', tab)
  props.router.push(key)
}

</script>
<template>
  <el-menu :style="{ height: screenHeight + 'px' }" :default-active="activeTab" class="layout-menu"
    :collapse="isCollapse" @select="handleSelect" background-color="#545c64" text-color="#fff">
    <div class="papudding-layout-logo"><img v-if="!isCollapse" :src="logoFull" /><img v-else :src="logo"/></div>
    <template v-for="page in pagesRoutes">
      <!--树枝-->
      <el-sub-menu v-if="page.children && page.children.length > 0" :key="page.path" :index="page.path"
        style="vertical-align: middle;">
        <template #title v-if="page.meta">
          <component :is="page.meta.icon" class="papudding-layout-menu-icon" :style="!isCollapse ? 'margin-right: 8px;' : '' " />
          <span>{{ page.meta.title }}</span>
        </template>
        <!--递归子菜单-->
        <el-menu-item v-for="sub in page.children" :key="sub.path" :index="sub.path">
          <component :is="sub.meta && sub.meta.icon" class="papudding-layout-menu-icon" style="margin-right: 8px;" />
          <template #title>
            {{ sub.meta && sub.meta.title }}
          </template>
        </el-menu-item>
      </el-sub-menu>
      <!--树叶 -->
      <el-menu-item v-else :key="'leaf_' + page.path" :index="page.path">
        <component :is="page.meta && page.meta.icon" class="papudding-layout-menu-icon" :style="!isCollapse ? 'margin-right: 8px;' : '' " />
        <template #title>
          {{ page.meta && page.meta.title }}
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<style>
.papudding-layout-logo {
  height: 56px;
  line-height: 56px;
}

.papudding-layout-logo img {
  height: 100%;
}

.papudding-layout-menu-icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
}
</style>