<script setup lang="ts">
import { ref } from 'vue'
import { Postcard } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import PapuddingTablePage from '../../components/table-page/PapuddingTablePage.vue'
import DefaultSearchLayout from '../../components/table-page/DefaultSearchLayout.vue'

const tableName = ref<string>('demo表格')
const page = ref(1)
const pageSize = ref(10)
const total = ref(100)

const list = ref([
  {
    id: 1,
    taskType: '任务类型1',
    firstClass: '一级分类1',
    secondClass: '二级分类1',
    demand: '需求名称1',
    demandDetail: '工作内容1',
    priority: '优先级1',
    planManDay: 10,
    realStartTime: '2023-01-01',
    realFinishTime: '2023-01-02'
  }, {
    id: 2,
    taskType: '任务类型2',
    firstClass: '一级分类2',
    secondClass: '二级分类2',
    demand: '需求名称2',
    demandDetail: '工作内容2',
    priority: '优先级2',
    planManDay: 20,
    realStartTime: '2023-01-03',
    realFinishTime: '2023-01-04'
  }
])
const formRef = ref<FormInstance>()
const formMoreRef = ref<FormInstance>()
const searchCollapse = ref(false)
const onReset = () => {
  console.log('reset', formRef.value, formMoreRef.value)
  formRef.value?.resetFields()
  formMoreRef.value?.resetFields()
}

const searchTerm = ref({
  taskType: '',
  firstClass: '',
  secondClass: '',
  demand: '',
  demandDetail: '',
  priority: '',
  planManDay: '',
  realStartTime: '',
  realFinishTime: ''
})


</script>
<template>
  <PapuddingTablePage :table-icon="Postcard" :table-name="tableName" :page="page" :page-size="pageSize" :total="total"
    :search-collapse="searchCollapse" @handle-current-change="inPage => page = inPage"
    @handle-size-change="inPageSize => pageSize = inPageSize">
    <template #searchForm>
      <DefaultSearchLayout @report-collapse="isCollapse => searchCollapse = isCollapse">
        <template #searchContent>
          <el-form ref="formRef" :model="searchTerm" :inline="true" :label-position="'top'">
            <el-row style="width: 100%;">
              <el-col :span="12">
                <el-form-item label="工作类型" prop="taskType">
                  <el-select v-model="searchTerm.taskType" style="width: 100%;" placeholder="请选择工作类型" clearable>
                    <el-option label="dicName" value="dicCode" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="二级分类" prop="firstClass">
                  <el-input v-model="searchTerm.firstClass" placeholder="请输入二级分类" />
                </el-form-item>
              </el-col>

            </el-row>
            <el-row style="width: 100%;">
              <el-col :span="6">
                <el-form-item label="工作类型" prop="taskType">
                  <el-select style="width: 100%;" placeholder="请选择工作类型" clearable>
                    <el-option label="dicName" value="dicCode" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="二级分类" prop="demand">
                  <el-input v-model="searchTerm.demand" placeholder="请输入二级分类" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="工作类型" prop="taskType">
                  <el-select style="width: 100%;" placeholder="请选择工作类型" clearable>
                    <el-option label="dicName" value="dicCode" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="工作类型" prop="taskType">
                  <el-select style="width: 100%;" placeholder="请选择工作类型" clearable>
                    <el-option label="dicName" value="dicCode" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>

        <template #searchButton>
          <el-button type="primary">查询</el-button><span />
          <el-button @click="onReset">重置</el-button>
        </template>

        <template #searchContentMore>
          <el-form ref="formMoreRef" :model="searchTerm" :inline="true" :label-position="'top'">
            <el-row style="width: 100%;">
              <el-col :span="12">
                <el-form-item label="工作类型" prop="taskType">
                  <el-select style="width: 100%;" placeholder="请选择工作类型" clearable>
                    <el-option label="dicName" value="dicCode" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="二级分类" prop="secondClass">
                  <el-input v-model="searchTerm.secondClass" placeholder="请输入二级分类" />
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </template>
      </DefaultSearchLayout>

    </template>
    <template #middleBarButton>
      <el-button type="primary" size="small">新增</el-button>
      <el-button type="primary" size="small">导出</el-button>
    </template>

    <template #table>
      <el-table :data="list" style="width: 100%" border stripe row-key="id">
        <el-table-column fixed type="index" label="序号" align="center" width="60" />
        <el-table-column prop="taskType" label="工作类型" align="center" min-width="100" />
        <el-table-column prop="" label="所属系统" align="center" min-width="150"/>
        <el-table-column prop="firstClass" label="一级分类" align="center" min-width="120" />
        <el-table-column prop="secondClass" label="二级分类" align="center" min-width="120" />
        <el-table-column prop="demand" label="需求名称" align="center" min-width="200" :show-overflow-tooltip="true" />
        <el-table-column prop="demandDetail" label="工作内容" align="center" min-width="200" :show-overflow-tooltip="true" />
        <el-table-column prop="priority" label="优先级" align="center" min-width="80" />
        <el-table-column prop="planManDay" label="预计人天" align="center" min-width="100" />
        <el-table-column prop="realStartTime" label="实际开始时间" align="center" min-width="160" />
        <el-table-column prop="realFinishTime" label="实际结束时间" align="center" min-width="160" />
        <el-table-column prop="realManDay" label="实际人天" align="center" min-width="100" />
        <el-table-column prop="remark" label="备注" align="center" min-width="150" :show-overflow-tooltip="true" />
        <el-table-column prop="progress" label="完成情况" align="center" min-width="100" />
        <el-table-column prop="createTime" label="创建时间" align="center" min-width="160" />
        <el-table-column prop="" label="操作" align="center" fixed="right" min-width="180">
          <template #default>
            <el-button link type="primary">修改</el-button>
            <el-divider direction="vertical" />
            <el-dropdown :style="{ paddingTop: '3px' }">
              <span class="el-dropdown-link">
                <span>更多</span><el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>详情</el-dropdown-item>
                  <el-dropdown-item style="color:red">删除</el-dropdown-item>
                  <el-dropdown-item divided>添加记录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </PapuddingTablePage>
</template>
<style scoped></style>