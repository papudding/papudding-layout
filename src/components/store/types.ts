import type { Tab, MenuItem } from '../skeleton/types.ts'
import { type InjectionKey } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import type { Store } from 'vuex'

export interface LayoutState {
  tabList: Tab[],
  activeTab: string,
  breadcrumbItemList: string[],
  menuItems: MenuItem[],
  pagesRoutes: RouteRecordRaw[],
  avatarUrl: string,
}

export const key: InjectionKey<Store<LayoutState>> = Symbol()