<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-8">
          <div class="text-center mb-8">
            <h1 class="text-h4 font-weight-bold mb-2">
              Reset password
            </h1>
            <p class="text-body-1 text-medium-emphasis">
              We'll send you an email to reset your password.
            </p>
          </div>

          <v-form @submit.prevent="handleResetPassword">
            <v-text-field
              v-model="email"
              label="Email address"
              :rules="[rules.required, rules.email]"
              prepend-inner-icon="mdi-email"
              variant="outlined"
              class="mb-4"
            />

            <v-btn
              block
              color="primary"
              size="large"
              type="submit"
              :loading="loading"
              class="mb-4"
            >
              Request email
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
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