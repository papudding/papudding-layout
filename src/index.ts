import type { App } from 'vue'
import PapuddingSkeleton from './components/PapuddingSkeleton.vue'
import type { MenuItem, PapuddingSkeletonProps } from './components/skeleton/types'
const components = [PapuddingSkeleton]

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name || 'PapuddingSkeleton', component)
  })
}

export { PapuddingSkeleton, type PapuddingSkeletonProps, type MenuItem }
export default { install }