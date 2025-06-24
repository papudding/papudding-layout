import { createStore } from 'vuex'
import type { State } from '../../components/store/types.ts'
import mutations from '../../components/store/mutations.ts'
import actions from '../../components/store/actions.ts'
import { menuItemsBuilder } from '../utils/menuItemBuilder.ts'
import { useRouter } from 'vue-router'
import { pagesRoutes } from '../router'

const router = useRouter()

const menuItems = menuItemsBuilder(router)

export const store = createStore<State>({
  state () {
    return {
      tabList: [{
        path: '/home',
        title: '首页',
        tabPath: ['首页']
      }],
      activeTab: '/home',
      breadcrumbItemList: ['首页'],
      menuItems: menuItems,
      pagesRoutes: pagesRoutes,
      avatarUrl: 'https://avatars.githubusercontent.com/u/10262924?v=4',
    }
  },
  mutations: {
    ...mutations
  },
  actions: {
    ...actions
  }
})