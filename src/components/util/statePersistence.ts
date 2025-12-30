import type { Store } from 'vuex'
import type { LayoutState } from '../store/types.ts'

/**
 * 从 localStorage 加载状态
 * @param key localStorage 键名
 * @param defaultLayoutState 默认状态
 * @returns 加载的状态或默认状态
 */
export function loadState(key: string, defaultLayoutState: LayoutState): LayoutState {
  try {
    const savedState = localStorage.getItem(key)
    if (savedState) {
      const loadedState = JSON.parse(savedState) as LayoutState
      return { ...loadedState, menuItems: [...defaultLayoutState.menuItems] }
    }
  } catch (error) {
    console.error('Failed to load layout state from localStorage:', error)
  }
  return defaultLayoutState
}

/**
 * 保存状态到 localStorage
 * @param key localStorage 键名
 * @param store Vuex store 实例
 */
export function saveState(key: string, store: Store<LayoutState>) {
  store.subscribe((mutation: { type: string }, state: LayoutState) => {
    const mutationTypes = ['setActiveTab', 'addTabToList', 'removeFromTabList', 'setBreadcrumbItemList', 'setAvatarUrl']
    if (mutationTypes.includes(mutation.type)) {
      try {
        localStorage.setItem(key, JSON.stringify(state))
      } catch (error) {
        console.error('Failed to save layout state to localStorage:', error)
      }
    }
  })
}