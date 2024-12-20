<template>
  <div class="auth-container d-flex">
    <!-- Left side - Form Container -->
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

          <!-- Page Content -->
          <slot />
        </v-col>
      </v-row>
    </v-container>

    <!-- Right side - Image -->
    <div class="image-container d-none d-lg-flex">
      <div class="image-overlay pa-16">
        <slot name="image-content">
          <div class="text-h4 font-weight-bold text-white mb-4">
            Build High-Converting Funnels
          </div>
          <p class="text-body-1 text-white">
            Create, optimize, and scale your marketing funnels with our powerful platform.
          </p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
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