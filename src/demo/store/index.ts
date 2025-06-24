import { createStore } from 'vuex'
import type { State } from '../../components/store/types.ts'
import mutations from '../../components/store/mutations.ts'
import actions from '../../components/store/actions.ts'

export const store = createStore<State>({
  state () {
    return {
      tabList: [{
        path: '/home',
        title: '首页',
        tabPath: ['首页']
      }],
      activeTab: '/home',
      breadcrumbItemList: ['首页']
    }
  },
  mutations: {
    ...mutations
  },
  actions: {
    ...actions
  }
})