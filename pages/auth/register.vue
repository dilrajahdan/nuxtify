<template>
  <v-container class="fill-height auth-container">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-8" elevation="8">
          <h1 class="text-h4 font-weight-bold mb-4 text-center">
            Create an account
          </h1>
          
          <v-form 
            @submit.prevent="handleRegister" 
            data-test="register-form"
          >
            <v-text-field
              v-model="form.fullName"
              label="Full Name"
              :rules="[rules.required]"
              data-test="fullname-input"
              class="mb-4"
            />

            <v-text-field
              v-model="form.email"
              label="Email"
              type="email"
              :rules="[rules.required, rules.email]"
              data-test="email-input"
              class="mb-4"
            />

            <v-text-field
              v-model="form.password"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              :rules="[rules.required, rules.password]"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"
              data-test="password-input"
              class="mb-4"
            />

            <v-checkbox
              v-model="form.terms"
              :rules="[rules.required]"
              label="I agree to the Terms and Privacy Policy"
              data-test="terms-checkbox"
              class="mb-4"
            />

            <v-btn
              block
              color="primary"
              size="large"
              type="submit"
              :loading="loading"
              data-test="register-button"
              class="mb-6"
            >
              Create Account
            </v-btn>

            <div class="text-center">
              <span class="text-body-2 text-medium-emphasis">Already have an account?</span>
              <v-btn 
                variant="text" 
                to="/auth/login" 
                class="text-none px-2"
                data-test="login-link"
              >
                Login
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'minimal'
})

const { register, loading } = useAuth()

const form = reactive({
  fullName: '',
  email: '',
  password: '',
  terms: false
})

const showPassword = ref(false)

const rules = {
  required: (v: any) => !!v || 'This field is required',
  email: (v: string) => /.+@.+\..+/.test(v) || 'Please enter a valid email',
  password: (v: string | null) => {
    if (!v) return 'Password is required'
    return v.length >= 8 || 'Password must be at least 8 characters'
  }
}

const handleRegister = async () => {
  await register(form.email, form.password, form.fullName)
}

// SEO
useHead({
  title: 'Register - Create your account',
  meta: [
    {
      name: 'description',
      content: 'Create your free account and start building your mobile funnels today.'
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
    url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80');
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

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #E5E7EB;
  color: #6B7280;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 8px;
}

.step-number.active {
  background-color: #0066FF;
  color: white;
}

.step-label {
  font-size: 14px;
  color: #6B7280;
}

.step-label.active {
  color: #0066FF;
  font-weight: 500;
}

/* Make dividers flex-grow */
.v-divider {
  flex-grow: 1;
}
</style> 