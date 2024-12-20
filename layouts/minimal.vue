<template>
<v-app>
    <!-- Minimal Header with Logo -->
    <v-app-bar
      color="white"
      elevation="1"
    >
      <v-container class="px-4">
        <NuxtLink to="/" class="text-decoration-none">
          <div class="d-flex align-center flex-column">
            <img src="/logo.png" alt="Logo" height="32" class="mr-2" />
            <span class="text-body-2 font-weight-bold text-black">Action Mo.de</span>
          </div>
        </NuxtLink>
      </v-container>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <slot />
    </v-main>

    <!-- Footer -->
    <v-footer class="d-flex flex-column px-4">
      <v-container class="px-4">
        <div class="d-flex flex-wrap justify-space-between align-center">
          <div class="d-flex align-center text-body-2 text-medium-emphasis">
            <span>© {{ new Date().getFullYear() }} Nuxtify</span>
            <v-divider vertical class="mx-4" />
            <NuxtLink to="/terms" class="text-decoration-none text-medium-emphasis mx-2">Terms</NuxtLink>
            <NuxtLink to="/privacy" class="text-decoration-none text-medium-emphasis mx-2">Privacy</NuxtLink>
            <NuxtLink to="/imprint" class="text-decoration-none text-medium-emphasis mx-2">Imprint</NuxtLink>
          </div>
          <div class="d-flex align-center">
            <v-btn
              variant="text"
              size="small"
              class="text-medium-emphasis"
              prepend-icon="mdi-translate"
            >
              English
            </v-btn>
          </div>
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
// Add any layout-specific logic here
</script>

<style scoped>
.v-footer {
  background-color: transparent !important;
}
</style> 