<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-8">
          <div class="text-center mb-8">
            <h1 class="text-h4 font-weight-bold mb-2">
              Create your free account
            </h1>
            <p class="text-body-1 text-medium-emphasis">
              Join thousands of businesses who are easily acquiring qualified appointments, employees and leads every day.
            </p>
          </div>

          <v-form @submit.prevent="handleRegister">
            <v-text-field
              v-model="form.fullName"
              label="First and last name"
              :rules="[rules.required]"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              class="mb-4"
            />

            <v-text-field
              v-model="form.email"
              label="Business email address"
              :rules="[rules.required, rules.email]"
              prepend-inner-icon="mdi-email"
              variant="outlined"
              class="mb-4"
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
              class="mb-4"
            />

            <v-checkbox
              v-model="form.terms"
              :rules="[rules.required]"
              class="mb-4"
            >
              <template #label>
                By creating an account you accept our
                <v-btn variant="text" to="/terms" class="px-1">terms & conditions</v-btn>
                and our
                <v-btn variant="text" to="/privacy" class="px-1">privacy policies</v-btn>
              </template>
            </v-checkbox>

            <v-btn
              block
              color="primary"
              size="large"
              type="submit"
              :loading="loading"
              class="mb-4"
            >
              Next step
            </v-btn>

            <div class="text-center">
              <span class="text-body-2 text-medium-emphasis">Already have an account?</span>
              <v-btn variant="text" to="/auth/login" class="text-none px-2">Login</v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
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
  password: (v: string) => v.length >= 8 || 'Password must be at least 8 characters'
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