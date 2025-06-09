<script setup lang="ts">
import { ref, onMounted } from 'vue'

defineProps<{
  tableName: string,
  page: number,
  pageSize: number,
  total: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableIcon?: any
}>()

onMounted(() => {
  const searchFormHeight = searchFormRef.value?.offsetHeight
  const middleBarHeight = middleBarRef.value?.offsetHeight
  const footBarHeight = footBarRef.value?.offsetHeight
  console.log('onMounted', searchFormHeight, middleBarHeight, footBarHeight)

  tableHeightStyleStr.value = `calc(100vh - ${searchFormHeight}px - ${middleBarHeight}px - ${footBarHeight}px - 150px)`
})

const searchFormRef = ref<HTMLElement>()
const middleBarRef = ref<HTMLElement>()
const footBarRef = ref<HTMLElement>()

const tableHeightStyleStr = ref<string>()

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
      <el-pagination :current-page="page" :page-size="pageSize" small :page-sizes="[10, 20, 50, 100]"
        :total="total" :background="true" layout="total, sizes, prev, pager, next, jumper" 
        @size-change="(incommingpagesize: number) => emit('handleSizeChange', incommingpagesize)"
        @current-change="(incommingPage:number) => emit('handleCurrentChange', incommingPage) " />
    </div>
  </el-space>
</template>

<style scoped>
.papudding-table-page-searchForm .el-card {
  background-color: #f8f9fc;
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
  font-size: 15px;
  font-weight: bold;
  color: #606266;
}

.papudding-table-page-foot-bar {
  margin-top: -9px;
  justify-content: center;
}

.papudding-table-page-table {
  background-color: #f8f9fc;
}

/* todo 消除样式 */
:deep(.el-table th){
  background-color: #d5e9ff;
  color: #606266;
}

:deep(.el-table__header-wrapper tr th.el-table-fixed-column--right){
  background-color: #d5e9ff;
  color: #606266;
}

:deep(.el-table__header-wrapper tr th.el-table-fixed-column--left){
  background-color: #d5e9ff;
  color: #606266;
}
</style>