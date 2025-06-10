import { type MenuItem } from '../../components/skeleton/types.ts'
import { type Router } from 'vue-router'
export const menuItemsBuilder = (router: Router): MenuItem[] => {
  return [
    {
      label: '个人中心',
      handler: () => {
        console.log('Home clicked')
      },
    },
    {
      label: 'About',
      handler: () => {
        console.log('About clicked')
      },
    },
    {
      label: '登出',
      handler: () => {
        router.push({ path: '/login' })
      },
      divided: true
    }
  ]
}