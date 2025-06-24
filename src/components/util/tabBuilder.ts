import type { Tab } from '../skeleton/types'
import type { RouteRecordRaw } from 'vue-router'

export default function buildTab (path: string, pagesRoutes: RouteRecordRaw[]): Tab {
  // 当前页面路由list容器
  let currentRoutePathList: string[] = []
  
  // 按路由找到并构建面包屑
  for (let i = 0; i < pagesRoutes.length; i++) {
    const item = pagesRoutes[i]
    currentRoutePathList = [item.meta?.title as string]
    if (path === item.path) {
      break
    }
    const matchedChild = item.children?.find(sub => sub.path === path)
    if (matchedChild) {
      currentRoutePathList.push(matchedChild.meta?.title as string)
      break
    }
  }

  // 增加tab标签集合值
  const tabTitle: string = currentRoutePathList[currentRoutePathList.length - 1]
  return {
    path: path,
    title: tabTitle,
    tabPath: currentRoutePathList
  }
}