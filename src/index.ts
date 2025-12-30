import type { App } from 'vue'
import PapuddingSkeleton from './components/skeleton/PapuddingSkeleton.vue'
import PapuddingTablePage from './components/table-page/PapuddingTablePage.vue'
import DefaultSearchLayout from './components/table-page/DefaultSearchLayout.vue'
import type { Tab, MenuItem  } from './components/skeleton/types.ts'
import type { PapuddingTablePageProps } from './components/table-page/types.ts'
import  { type LayoutState, key } from './components/store/types.ts'
import actions from './components/store/actions.ts'
import mutations from './components/store/mutations.ts'
import { loadState, saveState } from './components/util/statePersistence.ts'

const install = (app: App) => {
  app.component('PapuddingSkeleton', PapuddingSkeleton)
  app.component('PapuddingTablePage', PapuddingTablePage)
  app.component('DefaultSearchLayout', DefaultSearchLayout)
}

export { PapuddingTablePage, type PapuddingTablePageProps }
export { DefaultSearchLayout }
export { PapuddingSkeleton, type MenuItem, type Tab }
export { type LayoutState, actions, mutations, key }
export { loadState, saveState }
export default { install }