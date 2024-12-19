<template>
  <v-layout>
    <AppHeader />
    <v-main class="bg-background">
      <v-container>
        <slot />
      </v-container>
    </v-main>
    <v-footer app class="d-flex flex-column bg-surface border-t">
      <div class="px-4 py-2 text-center w-100">
        <span class="text-medium-emphasis">&copy; {{ new Date().getFullYear() }} SaaS App. All rights reserved.</span>
      </div>
    </v-footer>
  </v-layout>
</template>

<script setup lang="ts">
</script>

<style>
:root {
  --header-height: 64px;
}

.v-main {
  padding-top: var(--header-height) !important;
}
</style>