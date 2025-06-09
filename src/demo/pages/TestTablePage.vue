<script setup lang="ts">
import { ref } from 'vue'
import { Postcard } from '@element-plus/icons-vue'
import PapuddingTablePage from '../../components/table-page/PapuddingTablePage.vue'
const tableName = ref<string>('demo表格')
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)

</script>
<template>
  <PapuddingTablePage :table-icon="Postcard" :table-name="tableName" :page="page" :page-size="pageSize" :total="total">

    <template #searchForm>
      <div style="display: flex; flex-direction: row;">
      <el-form ref="formRef" :inline="true" :label-position="'top'">
        <!-- <el-row > -->
          <!-- <el-col :span="8"> -->
            <el-form-item label="工作类型" prop="taskType">
              <el-select style="width: 100%;" placeholder="请选择工作类型" clearable>
                <el-option label="dicName" value="dicCode" />
              </el-select>
            </el-form-item>
          <!-- </el-col> -->

          <!-- <el-col :span="8"> -->
            <el-form-item label="二级分类" prop="secondClass">
              <el-input placeholder="请输入二级分类" />
            </el-form-item>
          <!-- </el-col> -->
          
        <!-- </el-row> -->

      </el-form>
      <div style="flex-grow: 1;"></div>
      <div style="display: flex; flex-direction: column; gap: 7px;" >
        <el-button type="primary">查询</el-button><span/>
        <el-button>重置</el-button>
      </div>
      </div>
    </template>

  </PapuddingTablePage>
</template>
<style scoped></style>