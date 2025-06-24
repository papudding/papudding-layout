import { type ActionContext } from 'vuex'
import { type State } from './types'
import { type Tab } from '../skeleton/types.ts'
export default {
  removeTab(context: ActionContext<State, State>, path: string) {
    if (context.state.tabList.length === 1) {
      return
    }
    context.commit('removeFromTabList', path)
  
    // 设置激活的tab
    if (path === context.state.activeTab) {
      const lastTab = context.state.tabList[context.state.tabList.length - 1]
      context.dispatch('switchPage', lastTab)
    }
  },
  switchPage (context: ActionContext<State, State>, tab: Tab) {
    if (context.state.activeTab !== tab.path) {
      context.commit('addTabToList', tab)
      context.commit('setActiveTab', tab.path)
      context.commit('setBreadcrumbItemList', tab.tabPath)
    }
  },
  switchTab (context: ActionContext<State, State>, path: string) {
    if (context.state.activeTab !== path) {
      context.commit('setActiveTab', path)
      const tab = context.state.tabList.find(item => item.path === path)
      if (tab) {
        context.commit('setBreadcrumbItemList', tab.tabPath)
      }
    }
  }
}