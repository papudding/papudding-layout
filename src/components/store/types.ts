import type { Tab, MenuItem } from '../skeleton/types.ts'
import { type InjectionKey } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { useStore as baseUseStore, Store } from 'vuex'

export interface State {
  tabList: Tab[],
  activeTab: string,
  breadcrumbItemList: string[],
  menuItems: MenuItem[],
  pagesRoutes: RouteRecordRaw[],
  avatarUrl: string,
}

export const key: InjectionKey<Store<State>> = Symbol()

export function useStore () {
  return baseUseStore(key)
}