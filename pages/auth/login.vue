<template>
  <div class="auth-container d-flex">
    <!-- Left side - Login Form -->
    <v-container class="fill-height form-container">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="10" lg="8" xl="6">
          <!-- Logo -->
          <div class="mb-12">
            <NuxtLink to="/" class="logo-link text-decoration-none">
              <div class="d-flex align-center">
                <img src="/logo.png" alt="Logo" height="32" class="mr-2" />
                <span class="text-h5 font-weight-medium">Nuxtify</span>
              </div>
            </NuxtLink>
          </div>

          <!-- Login Form -->
          <div class="mb-8">
            <h1 class="text-h4 font-weight-bold mb-2">
              Welcome back
            </h1>
            <p class="text-body-1 text-medium-emphasis">
              Sign in to your account to continue building amazing funnels
            </p>
          </div>

          <v-form @submit.prevent="handleLogin">
            <!-- Social Login Buttons -->
            <div class="d-flex gap-4 mb-8">
              <v-btn
                block
                variant="outlined"
                color="surface-variant"
                @click="handleGoogleLogin"
                prepend-icon="mdi-google"
                :loading="googleLoading"
              >
                Google
              </v-btn>
              <v-btn
                block
                variant="outlined"
                color="surface-variant"
                @click="handleGithubLogin"
                prepend-icon="mdi-github"
                :loading="githubLoading"
              >
                GitHub
              </v-btn>
            </div>

            <!-- Divider -->
            <div class="d-flex align-center mb-8">
              <v-divider></v-divider>
              <span class="mx-4 text-medium-emphasis text-body-2">OR</span>
              <v-divider></v-divider>
            </div>

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

            <div class="d-flex justify-space-between align-center mb-6">
              <v-checkbox
                v-model="rememberMe"
                label="Remember me"
                hide-details
                density="compact"
              />
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
              class="mb-6"
            >
              Sign in to your account
            </v-btn>

            <div class="text-center">
              <span class="text-body-2 text-medium-emphasis">Don't have an account?</span>
              <v-btn variant="text" to="/auth/register" class="text-none px-2">Create a free account</v-btn>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>

    <!-- Right side - Image -->
    <div class="image-container d-none d-lg-flex">
      <div class="image-overlay pa-16">
        <div class="text-h4 font-weight-bold text-white mb-4">
          Build High-Converting Funnels
        </div>
        <p class="text-body-1 text-white">
          Create, optimize, and scale your marketing funnels with our powerful platform.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { login, loading } = useAuth()
const googleLoading = ref(false)
const githubLoading = ref(false)
const rememberMe = ref(false)

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

const handleGoogleLogin = async () => {
  googleLoading.value = true
  // Implement Google login
  googleLoading.value = false
}

const handleGithubLogin = async () => {
  githubLoading.value = true
  // Implement GitHub login
  githubLoading.value = false
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
    url('https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80');
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