import { type LayoutState } from './types'
import type { Tab } from '../skeleton/types.ts'

export default {
  setActiveTab (state: LayoutState, path: string) {
    state.activeTab = path
  },
  addTabToList (state: LayoutState, tab: Tab) {
    const isTabExist = state.tabList.some(item => item.path === tab.path)
    if (!isTabExist) {
      state.tabList.push(tab)
    }
  },
  removeFromTabList(state: LayoutState, path: string) {
    state.tabList = state.tabList.filter(item => item.path !== path)
  },
  setBreadcrumbItemList (state: LayoutState, pathNameList: string[]) {
    state.breadcrumbItemList = pathNameList
  },
  setAvatarUrl (state: LayoutState, avatarUrl: string) {
    state.avatarUrl = avatarUrl
  }
}