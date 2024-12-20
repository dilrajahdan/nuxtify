<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <!-- Progress Steps -->
        <div class="d-flex align-center justify-space-between mb-12">
          <div class="step-item">
            <div class="step-number active">1</div>
            <div class="step-label active">Register</div>
          </div>
          <v-divider class="mx-4"></v-divider>
          <div class="step-item">
            <div class="step-number">2</div>
            <div class="step-label">Confirm</div>
          </div>
          <v-divider class="mx-4"></v-divider>
          <div class="step-item">
            <div class="step-number">3</div>
            <div class="step-label">Build Funnel</div>
          </div>
        </div>

        <!-- Title and Description -->
        <div class="text-center mb-8">
          <h1 class="text-h4 font-weight-bold mb-2">
            Create your free account in 30 seconds
          </h1>
          <p class="text-body-1 text-medium-emphasis">
            Join thousands of businesses who are easily acquiring qualified appointments, employees and leads every day.
          </p>
        </div>

        <!-- Form Content -->
        <v-form @submit.prevent="handleRegister">
          <v-text-field
            v-model="form.fullName"
            label="First and last name"
            :rules="[rules.required]"
            prepend-inner-icon="mdi-account"
            variant="outlined"
            class="mb-4"
            density="comfortable"
            bg-color="surface"
          />

          <v-text-field
            v-model="form.email"
            label="Business email address"
            :rules="[rules.required, rules.email]"
            prepend-inner-icon="mdi-email"
            variant="outlined"
            class="mb-4"
            density="comfortable"
            bg-color="surface"
          />

          <v-text-field
            v-model="form.password"
            label="Password"
            :rules="[rules.required, rules.password]"
            prepend-inner-icon="mdi-lock"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
            variant="outlined"
            class="mb-6"
            density="comfortable"
            bg-color="surface"
          />

          <v-checkbox
            v-model="form.terms"
            :rules="[rules.required]"
            class="mb-6"
            density="comfortable"
          >
            <template #label>
              <span class="text-body-2">
                By creating an account you accept our
                <v-btn variant="text" to="/terms" class="px-1 text-primary text-decoration-underline">terms & conditions</v-btn>
                and our
                <v-btn variant="text" to="/privacy" class="px-1 text-primary text-decoration-underline">privacy policies</v-btn>
              </span>
            </template>
          </v-checkbox>

          <v-btn
            block
            color="primary"
            size="large"
            type="submit"
            :loading="loading"
            class="mb-6"
          >
            Next step
          </v-btn>

          <div class="text-center">
            <span class="text-body-2 text-medium-emphasis">Already have an account?</span>
            <v-btn variant="text" to="/auth/login" class="text-none px-2">Login</v-btn>
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