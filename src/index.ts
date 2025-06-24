import type { App } from 'vue'
import PapuddingSkeleton from './components/skeleton/PapuddingSkeleton.vue'
import PapuddingTablePage from './components/table-page/PapuddingTablePage.vue'
import DefaultSearchLayout from './components/table-page/DefaultSearchLayout.vue'
import type { Tab, MenuItem, PapuddingSkeletonProps } from './components/skeleton/types.ts'
import type { PapuddingTablePageProps } from './components/table-page/types.ts'
import  { type State, key } from './components/store/types.ts'
import actions from './components/store/actions.ts'
import mutations from './components/store/mutations.ts'
import buildTab from './components/util/tabBuilder.ts'

const install = (app: App) => {
  app.component('PapuddingSkeleton', PapuddingSkeleton)
  app.component('PapuddingTablePage', PapuddingTablePage)
  app.component('DefaultSearchLayout', DefaultSearchLayout)
}

export { PapuddingTablePage, type PapuddingTablePageProps }
export { DefaultSearchLayout }
export { PapuddingSkeleton, type PapuddingSkeletonProps, type MenuItem, type Tab }
export { type State, actions, mutations, key }
export { buildTab }
export default { install }