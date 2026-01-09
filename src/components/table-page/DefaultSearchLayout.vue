<script setup lang="ts">
import { ref } from 'vue'
import { CaretRight, CaretBottom } from '@element-plus/icons-vue'

withDefaults(defineProps<{
  showMore?: boolean;
}>(), {
  showMore: false
})

const emit = defineEmits<{
  (e: 'reportCollapse', isCollapse: boolean): void;
}>()

const collapseActiveNames = ref<string[]>([])

const toggleCollapse = () => {
  if (collapseActiveNames.value.length > 0) {
    collapseActiveNames.value = []
  } else {
    collapseActiveNames.value = ['1']
  }
  emit('reportCollapse', collapseActiveNames.value.length > 0)
}
</script>
<template>
  <div class="papudding-default-search-layout">
    <div class="papudding-default-search-layout-search-content">
      <slot name="searchContent"></slot>   
    </div>
   
    <div class="papudding-default-search-layout-button-group">
      <slot name="searchButton"></slot>
      <el-button v-if="showMore" @click="toggleCollapse" :text="true" size="small">
        {{ collapseActiveNames.length > 0 ? '收起' : '更多' }}
        <el-icon v-if="collapseActiveNames.length > 0" class="el-icon--right"><CaretBottom /></el-icon>
        <el-icon v-else class="el-icon--right"><CaretRight /></el-icon>
      </el-button>
    </div>
  </div>
  
  <div v-if="showMore" class="papudding-default-search-layout-collapse">
    <el-collapse v-model="collapseActiveNames" @change="(activeNames: string) => emit('reportCollapse', activeNames.length > 0)">
      <el-collapse-item name="1">
        <slot name="searchContentMore"></slot>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<style>
.papudding-default-search-layout {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
.papudding-default-search-layout-search-content {
  flex-grow: 1;
}
.papudding-default-search-layout-button-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
  justify-content: center;
}
.papudding-default-search-layout-button-group .el-button {
  margin-left: 0px;
}
.papudding-default-search-layout-collapse {
  margin-top: 0px;
}
.papudding-default-search-layout-collapse .el-collapse {
  border: none;
}
.papudding-default-search-layout-collapse .el-collapse-item__title {
  height: 20px;
  line-height: 20px;
  text-align: right;
  background-color: #f8f9fc;
}
.papudding-default-search-layout-collapse .el-collapse-item__header {
  display: none;
  height: 20px;
  font-size: 12px;
  background-color: #f8f9fc;
  border: none;
}
.papudding-default-search-layout-collapse .el-collapse-item__content {
  padding-top: 10px;
  padding-bottom: 0px;
  background-color: #f8f9fc;
  border: none;
}
.papudding-default-search-layout-collapse .el-collapse-item__wrap {
  border-bottom: none;
}
</style>