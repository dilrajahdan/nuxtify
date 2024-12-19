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

  // List of auth-only routes
  const authRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password']

  // If route is public, allow access
  if (publicRoutes.includes(to.path)) {
    // If user is authenticated and trying to access auth pages, redirect to dashboard
    if (user.value && authRoutes.includes(to.path)) {
      return navigateTo('/app/dashboard')
    }
    return
  }

  // If user is not authenticated and trying to access protected route, redirect to login
  if (!user.value && to.path.startsWith('/app')) {
    return navigateTo('/auth/login')
  }
}) 