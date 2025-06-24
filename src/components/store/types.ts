import type { Tab } from '../skeleton/types.ts'
import { type InjectionKey } from 'vue'
import { useStore as baseUseStore, Store } from 'vuex'

export interface State {
  tabList: Tab[],
  activeTab: string,
  breadcrumbItemList: string[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export function useStore () {
  return baseUseStore(key)
}