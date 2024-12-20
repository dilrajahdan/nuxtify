<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <!-- Title and Description -->
        <div class="text-center mb-8">
          <h1 class="text-h4 font-weight-bold mb-2">
            Reset password
          </h1>
          <p class="text-body-1 text-medium-emphasis">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
        </div>

        <!-- Form Content -->
        <v-form @submit.prevent="handleResetPassword">
          <v-text-field
            v-model="email"
            label="Email address"
            :rules="[rules.required, rules.email]"
            prepend-inner-icon="mdi-email"
            variant="outlined"
            class="mb-6"
          />

          <v-btn
            block
            color="primary"
            size="large"
            type="submit"
            :loading="loading"
            class="mb-6"
          >
            Send reset instructions
          </v-btn>

          <div class="text-center">
            <v-btn
              variant="text"
              to="/auth/login"
              prepend-icon="mdi-arrow-left"
              class="text-none"
            >
              Back to login
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'minimal'
})

const { resetPassword, loading } = useAuth()
const router = useRouter()
const email = ref('')

const rules = {
  required: (v: any) => !!v || 'This field is required',
  email: (v: string) => /.+@.+\..+/.test(v) || 'Please enter a valid email'
}

const handleResetPassword = async () => {
  const success = await resetPassword(email.value)
  if (success) {
    // Show success message and redirect
    router.push('/auth/login')
  }
}

// SEO
useHead({
  title: 'Reset Password',
  meta: [
    {
      name: 'description',
      content: 'Reset your password to regain access to your account.'
    }
  ]
})
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
}

.form-container {
  flex: 1;
  max-width: 800px;
}

.image-container {
  flex: 1;
  background: linear-gradient(rgba(0, 102, 255, 0.8), rgba(0, 102, 255, 0.8)),
    url('https://images.unsplash.com/photo-1555421689-d68471e189f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80');
  background-size: cover;
  background-position: center;
  position: relative;
}

.image-overlay {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.logo-link {
  color: inherit;
}

.logo-link:hover {
  opacity: 0.9;
}
</style> 