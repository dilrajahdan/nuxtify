<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-8">
          <div class="text-center mb-8">
            <h1 class="text-h4 font-weight-bold mb-2">
              Welcome back
            </h1>
            <p class="text-body-1 text-medium-emphasis">
              Sign in to your account to continue
            </p>
          </div>

          <v-form @submit.prevent="handleLogin">
            <v-text-field
              v-model="form.email"
              label="Email address"
              :rules="[rules.required, rules.email]"
              prepend-inner-icon="mdi-email"
              variant="outlined"
              class="mb-4"
            />

            <v-text-field
              v-model="form.password"
              label="Password"
              :rules="[rules.required]"
              prepend-inner-icon="mdi-lock"
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showPassword = !showPassword"
              variant="outlined"
              class="mb-2"
            />

            <div class="d-flex justify-end mb-6">
              <v-btn
                variant="text"
                to="/auth/forgot-password"
                class="text-none px-0"
                color="primary"
              >
                Forgot password?
              </v-btn>
            </div>

            <v-btn
              block
              color="primary"
              size="large"
              type="submit"
              :loading="loading"
              class="mb-4"
            >
              Sign in
            </v-btn>

            <div class="text-center">
              <span class="text-body-2 text-medium-emphasis">Don't have an account?</span>
              <v-btn variant="text" to="/auth/register" class="text-none px-2">Create account</v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const { login, loading } = useAuth()

const form = reactive({
  email: '',
  password: ''
})

const showPassword = ref(false)

const rules = {
  required: (v: any) => !!v || 'This field is required',
  email: (v: string) => /.+@.+\..+/.test(v) || 'Please enter a valid email'
}

const handleLogin = async () => {
  await login(form.email, form.password)
}

// SEO
useHead({
  title: 'Login - Access your account',
  meta: [
    {
      name: 'description',
      content: 'Sign in to your account to access your mobile funnels and analytics.'
    }
  ]
})
</script> 