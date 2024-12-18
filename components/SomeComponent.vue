<script setup lang="ts">
const errorStore = useErrorStore()

const doSomething = async () => {
  try {
    // ... some code that might fail
  } catch (error) {
    if (error instanceof Error) {
      errorStore.setError(error.message)
    } else {
      errorStore.setError('An unexpected error occurred')
    }
  }
}
</script> 