import type { RouteRecordRaw, Router } from 'vue-router'

export interface Tab {
    path: string
    title: string
    tabPath: string[]
}

export interface MenuItem {
  label: string
  handler: () => void
  divided?: boolean
}

export interface PapuddingSkeletonProps {
  pagesRoutes: RouteRecordRaw[]
  router: Router
  avatarUrl: string
  menuItems: MenuItem[]
}