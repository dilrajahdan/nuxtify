<template>
  <div class="auth-container d-flex">
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

          <div class="text-center">
            <v-icon
              color="success"
              size="64"
              class="mb-4"
            >
              mdi-email-check
            </v-icon>
            
            <h1 class="text-h4 font-weight-bold mb-2">
              Check your email
            </h1>
            <p class="text-body-1 text-medium-emphasis mb-6">
              We've sent a confirmation link to your email address. Please click the link to verify your account.
            </p>

            <v-btn
              variant="text"
              to="/auth/login"
              prepend-icon="mdi-arrow-left"
              class="text-none"
            >
              Back to login
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Confirm Email',
  meta: [
    {
      name: 'description',
      content: 'Confirm your email address to complete registration.'
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

.logo-link {
  color: inherit;
}

.logo-link:hover {
  opacity: 0.9;
}
</style> 