export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  // List of public routes that don't require authentication
  const publicRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/confirm',
    '/auth/update-password',
    '/'
  ]

  // List of auth-only routes (pages that should redirect to dashboard if user is logged in)
  const authOnlyRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password'
  ]

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (user.value && authOnlyRoutes.includes(to.path)) {
    return navigateTo('/app/dashboard')
  }

  // If route is public, allow access
  if (publicRoutes.includes(to.path)) {
    return
  }

  // If user is not authenticated and trying to access protected route, redirect to login
  if (!user.value && to.path.startsWith('/app')) {
    return navigateTo('/auth/login')
  }
}) 