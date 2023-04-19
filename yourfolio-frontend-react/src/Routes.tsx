import { RootRoute, Route, Router } from '@tanstack/router'
let rootRoute = new RootRoute()

const indexRoute = new Route({ getParentRoute: () => rootRoute, path: '/' })
const blogRoute = new Route({ getParentRoute: () => rootRoute, path: 'blog' })
const postRoute = new Route({ getParentRoute: () => blogRoute, path: '$slug' })

const routeTree = rootRoute.addChildren([
  indexRoute,
  blogRoute.addChildren([postRoute]),
])

const router = new Router({ routeTree })

declare module '@tanstack/router' {
  interface Register {
    router: typeof router
  }
}