<template>
  <v-app-bar flat color="surface" class="border-b">
    <v-container class="d-flex align-center py-2">
      <!-- Logo/Brand -->
      <div class="d-flex align-center">
        <img src="/logo.png" alt="Logo" height="24" class="mr-2" />
        <span class="text-body-1 font-weight-medium">Nuxtify</span>
      </div>

      <v-spacer />

      <!-- Navigation -->
      <div class="d-none d-md-flex gap-6">
        <v-btn variant="text" class="text-body-1 font-weight-medium" to="/features">Features</v-btn>
        <v-btn variant="text" class="text-body-1 font-weight-medium" to="/pricing">Pricing</v-btn>
        <v-btn variant="text" class="text-body-1 font-weight-medium" to="/about">About</v-btn>
      </div>

      <!-- Auth Buttons -->
      <div class="d-flex align-center gap-3 ml-6">
        <v-btn variant="text" class="text-body-1 font-weight-medium" to="/auth/login">Login</v-btn>
        <v-btn color="primary" to="/auth/signup" class="px-6">Try Now</v-btn>
      </div>

      <!-- Mobile Menu -->
      <v-btn
        class="d-md-none"
        icon
        @click="mobileMenu = !mobileMenu"
      >
        <v-icon>{{ mobileMenu ? 'mdi-close' : 'mdi-menu' }}</v-icon>
      </v-btn>
    </v-container>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer
    v-model="mobileMenu"
    location="right"
    temporary
  >
    <v-list>
      <v-list-item to="/features" title="Features" />
      <v-list-item to="/pricing" title="Pricing" />
      <v-list-item to="/about" title="About" />
      <v-divider class="my-2" />
      <v-list-item to="/auth/login" title="Login" />
      <v-list-item to="/auth/signup" title="Sign Up" />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const mobileMenu = ref(false)

// Close mobile menu when route changes
const route = useRoute()
watch(() => route.path, () => {
  mobileMenu.value = false
})
</script> 