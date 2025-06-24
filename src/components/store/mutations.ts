import { type State } from './types'
import type { Tab } from '../skeleton/types.ts'

export default {
  setActiveTab (state: State, path: string) {
    state.activeTab = path
  },
  addTabToList (state: State, tab: Tab) {
    const isTabExist = state.tabList.some(item => item.path === tab.path)
    if (!isTabExist) {
      state.tabList.push(tab)
    }
  },
  removeFromTabList(state: State, path: string) {
    state.tabList = state.tabList.filter(item => item.path !== path)
  },
  setBreadcrumbItemList (state: State, pathNameList: string[]) {
    state.breadcrumbItemList = pathNameList
  },
  setAvatarUrl (state: State, avatarUrl: string) {
    state.avatarUrl = avatarUrl
  }
}