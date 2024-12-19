<template>
  <v-app-bar color="surface">
    <v-container class="d-flex align-center py-2">
      <!-- Logo/Brand -->
      <NuxtLink to="/" class="logo-link text-decoration-none">
        <div class="d-flex align-center">
          <img src="/logo.png" alt="Logo" height="24" class="mr-2" />
          <span class="text-body-1 font-weight-medium">Nuxtify</span>
        </div>
      </NuxtLink>

      <v-spacer />

      <!-- Navigation -->
      <div class="d-none d-md-flex gap-6">
        <v-btn 
          variant="text" 
          class="text-body-1 font-weight-medium" 
          to="/features"
          color="medium-emphasis"
        >
          Features
        </v-btn>
      </div>

      <!-- Auth Buttons -->
      <div class="d-flex align-center gap-3 ml-6">
        <v-btn 
          variant="text" 
          class="text-body-1 font-weight-medium" 
          to="/auth/login"
          color="medium-emphasis"
        >
          Login
        </v-btn>
        <v-btn 
          color="primary" 
          to="/auth/signup" 
          class="px-8"
          variant="flat"
          elevation="1"
        >
          Try Now
        </v-btn>
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

<style scoped>
.logo-link {
  color: inherit;
  display: flex;
  align-items: center;
}

.logo-link:hover {
  opacity: 0.9;
}
</style> 