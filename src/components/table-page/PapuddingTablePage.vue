<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { PapuddingTablePageProps } from './types.ts'

const props = defineProps<PapuddingTablePageProps>()

onMounted(() => {
  tableHeightStyleStr.value = tableHeightStyleStrCalc()
})

const searchFormRef = ref<HTMLElement>()
watch(
  () => props.searchCollapse,
  () => {
    setTimeout(() => {
      tableHeightStyleStr.value = tableHeightStyleStrCalc()
    }, 500)
  },
)
const middleBarRef = ref<HTMLElement>()
const footBarRef = ref<HTMLElement>()

const tableHeightStyleStr = ref<string>()

const tableHeightStyleStrCalc = () => {
  const searchFormHeight = searchFormRef.value?.offsetHeight
  const middleBarHeight = middleBarRef.value?.offsetHeight
  const footBarHeight = footBarRef.value?.offsetHeight
  return `calc(100vh - ${searchFormHeight}px - ${middleBarHeight}px - ${footBarHeight}px - 150px)`
}

const emit = defineEmits<{
  (e: 'handleSizeChange', incommingPageSize: number): void;
  (e: 'handleCurrentChange', incommingPage: number): void;
}>()

</script>
<template>
  <el-space class="papudding-table-page" direction="vertical" style="align-items: normal; width: 100%;">
    <!-- 搜索框区域 -->
    <div ref="searchFormRef" class="papudding-table-page-searchForm">
      <el-card shadow="always">
        <slot name="searchForm"></slot>
      </el-card>
    </div>

    <!-- 中间分隔栏区域 -->
    <div ref="middleBarRef" class="papudding-table-page-middle-bar">
      <component :is="tableIcon" class="papudding-table-page-table-icon" style="width: 25px" />
      <p class="papudding-table-page-table-name">{{ tableName }}</p>
      <div class="papudding-table-page-middle-bar-button">
        <slot name="middleBarButton"></slot>
      </div>
    </div>

    <!-- 表格区域 -->
    <el-card class="papudding-table-page-table" shadow="always" :style="{height: tableHeightStyleStr}">
      <slot name="table"></slot>
    </el-card>

    <!-- 页脚区域 -->
    <div ref="footBarRef" class="papudding-table-page-foot-bar papudding-table-page-middle-bar" >
      <el-pagination :current-page="page" :page-size="pageSize" size="small" :page-sizes="[10, 20, 50, 100]"
        :total="total" :background="true" layout="total, sizes, prev, pager, next, jumper" 
        @size-change="(incommingpagesize: number) => emit('handleSizeChange', incommingpagesize)"
        @current-change="(incommingPage:number) => emit('handleCurrentChange', incommingPage) " />
    </div>
  </el-space>
</template>

<style>
.papudding-table-page-searchForm .el-card__body {
  background-color: #f8f9fc;
  padding-bottom: 10px;
  overflow: hidden;
}

.papudding-table-page-middle-bar {
  height: 40px;
  width: 100%;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: -9px;
  z-index: 100;
  background-color: white;
  border-radius: 3px;
  display: flex;
}

.papudding-table-page-middle-bar-button {
  margin-left: auto;
  display: flex;
  align-items: center;
  margin-right: 21px;
}

.papudding-table-page-table-icon {
  color: #909399;
  width: 25px;
  height: 100%;
  margin: 0px 10px 0px 10px;
}

.papudding-table-page-table-name {
  line-height: 13px;
  font-size: 14px;
  font-weight: bold;
  color: #606266;
}

.papudding-table-page-foot-bar {
  margin-top: -9px;
  justify-content: center;
}

.papudding-table-page-table {
  background-color: #f8f9fc;
  overflow-y: scroll;
}

.papudding-table-page-table .el-table th {
  background-color: #d5e9ff;
  color: #606266;
}
.papudding-table-page-table .el-table__header-wrapper tr th.el-table-fixed-column--right {
  background-color: #d5e9ff;
  color: #606266;
}
.papudding-table-page-table .el-table__header-wrapper tr th.el-table-fixed-column--left {
  background-color: #d5e9ff;
  color: #606266;
}
</style>