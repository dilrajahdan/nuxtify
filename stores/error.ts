import { defineStore } from 'pinia'

interface ErrorState {
  message: string | undefined
  code: string | number | undefined
  showError: boolean
}

export const useErrorStore = defineStore('error', {
  state: (): ErrorState => ({
    message: undefined,
    code: undefined,
    showError: false
  }),
  
  actions: {
    setError(message: string, code?: string | number) {
      this.message = message
      this.code = code
      this.showError = true
    },
    
    clearError() {
      this.message = undefined
      this.code = undefined
      this.showError = false
    }
  },

  getters: {
    hasError: (state) => state.showError && !!state.message
  }
}) 