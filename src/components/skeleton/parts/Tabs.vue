<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus'
import { type Tab } from '../types.ts'
defineProps<{
  tabList: Tab[],
  activeTab: string
}>()
const emit = defineEmits<{
  (e: 'removeTabFromList', path: string): void;
  (e: 'setActiveTab', path: string): void;
}>()

</script>

<template>
  <el-tabs 
    :model-value="activeTab" 
    type="card" 
    closable 
    class="papudding-layout-tabs"
    @tab-remove="(targetName: string) => emit('removeTabFromList', targetName)"
    @tab-click="(pane: TabsPaneContext) => emit('setActiveTab', pane && pane.paneName ? pane.paneName + '' : '')">
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