import type { App } from 'vue'
import PapuddingSkeleton from './components/skeleton/PapuddingSkeleton.vue'
import PapuddingTablePage from './components/table-page/PapuddingTablePage.vue'
import DefaultSearchLayout from './components/table-page/DefaultSearchLayout.vue'
import type { MenuItem, PapuddingSkeletonProps } from './components/skeleton/types.ts'
import type { PapuddingTablePageProps } from './components/table-page/types.ts'

const install = (app: App) => {
  app.component('PapuddingSkeleton', PapuddingSkeleton)
  app.component('PapuddingTablePage', PapuddingTablePage)
  app.component('DefaultSearchLayout', DefaultSearchLayout)
}

export { PapuddingTablePage, type PapuddingTablePageProps }
export { DefaultSearchLayout }
export { PapuddingSkeleton, type PapuddingSkeletonProps, type MenuItem }
export default { install }