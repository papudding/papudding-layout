<script setup lang="ts">
import { CaretRight } from '@element-plus/icons-vue'
import { defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'reportCollapse', isCollapse: boolean): void;
}>()

</script>
<template>
  <div class="papudding-default-search-layout">
    <div class="papudding-default-search-layout-search-content">
      <slot name="searchContent"></slot>   
    </div>
   
    <div class="papudding-default-search-layout-button-group">
      <slot name="searchButton"></slot>
    </div>
  </div>
  
  <div class="papudding-default-search-layout-collapse">
    <el-collapse @change="(activeNames: string) => emit('reportCollapse', activeNames.length > 0)">
      <el-collapse-item title="更多" name="1" :icon="CaretRight">
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
.papudding-default-search-layout-collapse {
  margin-top: -25px;
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