import { useSupabaseClient, useSupabaseUser } from '#imports'
import { useErrorStore } from '~/stores/error'

export const useAuth = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const errorStore = useErrorStore()
  const router = useRouter()
  const loading = ref(false)

  // Register new user
  const register = async (email: string, password: string, fullName: string) => {
    loading.value = true
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      })

      if (error) throw error

      // Redirect to confirmation page
      router.push('/auth/confirm')
    } catch (error) {
      if (error instanceof Error) {
        errorStore.setError(error.message)
      }
    } finally {
      loading.value = false
    }
  }

  // Login user
  const login = async (email: string, password: string) => {
    loading.value = true
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      // Redirect to dashboard
      router.push('/app/dashboard')
    } catch (error) {
      if (error instanceof Error) {
        errorStore.setError(error.message)
      }
    } finally {
      loading.value = false
    }
  }

  // Reset password
  const resetPassword = async (email: string) => {
    loading.value = true
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`
      })

      if (error) throw error

      return true
    } catch (error) {
      if (error instanceof Error) {
        errorStore.setError(error.message)
      }
      return false
    } finally {
      loading.value = false
    }
  }

  // Logout user
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      // Clear any auth-related state
      router.push('/auth/login')
    } catch (error) {
      if (error instanceof Error) {
        errorStore.setError(error.message)
      }
    }
  }

  return {
    user,
    loading,
    register,
    login,
    logout,
    resetPassword
  }
} 