<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus'
import { type Tab } from '../types.ts'
import { useStore } from 'vuex'
import { key } from '../../store/types.ts'
import { useRouter } from 'vue-router'

const store = useStore(key)
const router = useRouter()

defineProps<{
  tabList: Tab[],
  activeTab: string,
}>()

const onTabClick = (pane: TabsPaneContext) => {
  const path = pane && pane.paneName ? pane.paneName + '' : ''
  store.dispatch('switchTab', path)
  router.push(path)
}

const onTabRemove = (targetName: string) => {
  store.dispatch('removeTab', targetName).then(
    () => {
      router.push(store.state.activeTab)
    }
  )
}

</script>

<template>
  <el-tabs 
    :model-value="activeTab" 
    type="card" 
    closable 
    class="papudding-layout-tabs"
    @tab-remove="onTabRemove"
    @tab-click="onTabClick">
    <el-tab-pane v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path"/>
  </el-tabs>
  
</template>
<style>
.papudding-layout-tabs .el-tabs__header {
  margin: 0;
}
.papudding-layout-tabs .is-active {
  background-color: #f0f2f7;
  border-bottom-color: #f0f2f7!important;
}
</style>