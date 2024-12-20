<template>
  <v-layout>
    <AppHeader />
    
    <!-- Main Content -->
    <v-main class="bg-background">
      <v-container fluid class="h-100 pa-6">
        <slot />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">

</script>
<style scoped>
.v-navigation-drawer {
  top: var(--header-height) !important;
  height: calc(100vh - var(--header-height)) !important;
}
</style> 
