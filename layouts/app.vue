<template>
  <v-layout>
    <AppHeader />
    
    <!-- Sidebar -->
    <v-navigation-drawer
      permanent
      location="left"
      :rail="rail"
      @click="rail = false"
    >
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        :title="userName"
        :subtitle="userEmail"
      >
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider class="my-2"></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.title"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main class="bg-background">
      <v-container fluid class="h-100 pa-6">
        <slot />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
const { user } = useAuth()
const rail = ref(false)

// User info
const userName = computed(() => user.value?.user_metadata?.full_name || 'User')
const userEmail = computed(() => user.value?.email || '')

// Menu items
const menuItems = [
  {
    title: 'Dashboard',
    to: '/app/dashboard',
    icon: 'mdi-view-dashboard'
  },
  {
    title: 'Funnels',
    to: '/app/funnels',
    icon: 'mdi-filter'
  },
  {
    title: 'Analytics',
    to: '/app/analytics',
    icon: 'mdi-chart-bar'
  },
  {
    title: 'Settings',
    to: '/app/settings',
    icon: 'mdi-cog'
  }
]
</script>

<style scoped>
.v-navigation-drawer {
  top: var(--header-height) !important;
  height: calc(100vh - var(--header-height)) !important;
}
</style> 