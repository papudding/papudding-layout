import { rm } from 'fs/promises'
await rm('dist/logo.png', { recursive: true, force: true })
await rm('dist/logo-full.png', { recursive: true, force: true })