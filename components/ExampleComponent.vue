<template>
  <div>
    <v-btn 
      @click="handleAction"
      :loading="loading"
    >
      Do Something
    </v-btn>
    
    <v-snackbar
      v-model="showError"
      color="error"
      timeout="3000"
    >
      {{ errorMessage }}
    </v-snackbar>
  </div>
</template>

<script setup>
const loading = ref(false)
const showError = ref(false)
const errorMessage = ref('')

const handleAction = async () => {
  loading.value = true
  showError.value = false
  
  try {
    // Your async action here
    await someAction()
  } catch (err) {
    errorMessage.value = err?.message || 'Something went wrong'
    showError.value = true
  } finally {
    loading.value = false
  }
}
</script> 