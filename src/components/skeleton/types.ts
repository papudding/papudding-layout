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
