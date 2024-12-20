<template>
  <v-app>
    <AppNavigation />
    
    <!-- Main content -->
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppNavigation from '~/components/app/AppNavigation.vue'
</script>

<style scoped>
/* Only main content padding styles needed */
@media (max-width: 959px) {
  .v-main {
    padding-bottom: 96px !important;
  }
}

@media (min-width: 960px) {
  .v-main {
    padding-top: 104px !important;
  }
}
</style> 
