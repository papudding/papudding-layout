<script setup lang="ts">
import { type MenuItem } from '../types.ts'

defineProps<{
  isCollapse: boolean,
  breadcrumbItemList: string[]
  menuItems: MenuItem[]
  avatarUrl: string
}>()

const emit = defineEmits<{
  (e: 'handleSelect', key: string): void;
}>()

</script>

<template>
  <el-menu class="papudding-layout-bar-menu" mode="horizontal" :ellipsis="false"
    @select="(key: string) => emit('handleSelect', key)">
    <!-- 侧边折叠 -->
    <el-menu-item index="1" class="papudding-layout-bar-menu-item">
      <el-icon class="papudding-layout-bar-icon" v-if="isCollapse">
        <Expand class="papudding-layout-bar-icon-icon" />
      </el-icon>
      <el-icon class="papudding-layout-bar-icon" v-else>
        <Fold class="papudding-layout-bar-icon-icon" />
      </el-icon>
    </el-menu-item>
    <!-- 面包屑 -->
    <el-breadcrumb :style="{marginLeft:'5px'}">
      <el-breadcrumb-item :style="{height: '56px'}" v-for="(item, index) in breadcrumbItemList" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="papudding-layout-flex-grow" />
    <!-- 头像 -->
    <el-dropdown>
    <span class="papudding-layout-dropdown-link">
      <div class="papudding-layout-avatarContainer">
        <el-avatar :src="avatarUrl" />
      </div>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(item, index) in menuItems" :key="index" :divided="item.divided" @click="item.handler">
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
    </el-dropdown>
  </el-menu>
</template>

<style>
.papudding-layout-flex-grow {
  flex-grow: 1;
}
.papudding-layout-bar-icon {
  height: 56px;
}
.papudding-layout-bar-icon-icon {
  width: 2em;
  color: #409eff;
}
.papudding-layout-avatarContainer{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.papudding-layout-dropdown-link {
  display: flex;
  margin-right: 8px;
}
.papudding-layout-bar-menu-item {
  width: 20px;
}
.papudding-layout-bar-menu .is-active {
  border-bottom: none!important;
}
</style>