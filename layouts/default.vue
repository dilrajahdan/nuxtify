<template>
  <v-layout>
    <!-- <AppHeader /> -->
    <v-main class="bg-background">
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-layout>
  <v-footer class="d-flex flex-column bg-surface border-t">
    <div class="px-4 py-2 text-center w-100">
      <span class="text-medium-emphasis">&copy; {{ new Date().getFullYear() }} Stop fucking around. Get into Action Mo.de</span>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
</script>

<style>
/* :root {
  --header-height: 64px;
}

.v-main {
  padding-top: var(--header-height) !important;
} */
</style>