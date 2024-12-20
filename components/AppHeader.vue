<template>
  <v-app-bar color="surface" elevation="1">
    <v-container class="d-flex align-center py-2">
      <!-- Logo/Brand -->
      <NuxtLink to="/" class="logo-link text-decoration-none">
        <div class="d-flex align-center flex-column">
          <img src="/logo.png" alt="Logo" height="32" class="mr-2" />
          <span class="text-body-2 font-weight-bold">Action Mo.de</span>
        </div>
      </NuxtLink>

      <v-spacer />

      <!-- Public Navigation (shown when not logged in) -->
      <template v-if="!user">
        <!-- <div class="d-none d-md-flex gap-6">
          <v-btn 
            variant="text" 
            class="text-body-1 font-weight-medium" 
            to="/features"
            color="medium-emphasis"
          >
            Features
          </v-btn>
          <v-btn 
            variant="text" 
            class="text-body-1 font-weight-medium" 
            to="/pricing"
            color="medium-emphasis"
          >
            Pricing
          </v-btn>

        </div> -->

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
            to="/auth/register" 
            class="px-8"
            variant="flat"
          >
            Start Free
          </v-btn>
        </div>
      </template>

      <!-- Authenticated Navigation -->
      <template v-else>
       
          <!-- Dashboard -->
          <v-btn to="/app/dashboard" prepend-icon="mdi-view-dashboard" variant="text" class="text-body-1 font-weight-medium">
            Dashboard
          </v-btn>
          <!-- User Menu -->
          <v-menu location="bottom end" transition="slide-y-transition">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="text"
                class="user-menu-btn"
              >
                <v-avatar size="32" color="primary" class="mr-2">
                  <span class="text-h6 text-white">{{ userInitials }}</span>
                </v-avatar>
                <span class="hidden-sm-and-down">{{ userName }}</span>
                <v-icon right class="hidden-sm-and-down">mdi-chevron-down</v-icon>
              </v-btn>
            </template>

            <v-list width="200" elevation="2">
              <v-list-item prepend-icon="mdi-account-outline" to="/app/profile">
                Profile
              </v-list-item>
              <v-list-item prepend-icon="mdi-cog-outline" to="/app/settings">
                Settings
              </v-list-item>
              <v-list-item prepend-icon="mdi-help-circle-outline" to="/app/help">
                Help Center
              </v-list-item>
              <v-divider class="my-2"></v-divider>
              <v-list-item
                prepend-icon="mdi-logout"
                @click="handleLogout"
                color="error"
              >
                Logout
              </v-list-item>
            </v-list>
          </v-menu>
       
      </template>

      <!-- Mobile Menu Button -->
      <v-btn
        class="d-md-none ml-2"
        icon
        variant="text"
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
      <template v-if="!user">
        <v-list-item to="/features" title="Features" />
        <v-list-item to="/pricing" title="Pricing" />
        <v-list-item to="/templates" title="Templates" />
        <v-divider class="my-2" />
        <v-list-item to="/auth/login" title="Login" />
        <v-list-item to="/auth/register" title="Start Free" />
      </template>
      <template v-else>
        <v-list-item>
          <v-text-field
            v-model="search"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="compact"
            hide-details
          />
        </v-list-item>
        <v-divider class="my-2" />
        <v-list-item to="/app/dashboard" prepend-icon="mdi-view-dashboard" title="Dashboard" />
        <v-list-item to="/app/funnels" prepend-icon="mdi-filter" title="Funnels" />
        <v-list-item to="/app/analytics" prepend-icon="mdi-chart-bar" title="Analytics" />
        <v-list-item to="/app/leads" prepend-icon="mdi-account-group" title="Leads" />
        <v-divider class="my-2" />
        <v-list-item to="/app/profile" prepend-icon="mdi-account" title="Profile" />
        <v-list-item to="/app/settings" prepend-icon="mdi-cog" title="Settings" />
        <v-list-item to="/app/help" prepend-icon="mdi-help-circle" title="Help Center" />
        <v-divider class="my-2" />
        <v-list-item @click="handleLogout" prepend-icon="mdi-logout" title="Logout" />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const { user, logout } = useAuth()
const mobileMenu = ref(false)
const search = ref('')
const router = useRouter()
const unreadNotifications = ref(2)

// User info
const userName = computed(() => {
  if (!user.value?.user_metadata?.full_name) return 'User'
  return user.value.user_metadata.full_name
})

const userInitials = computed(() => {
  if (!user.value?.user_metadata?.full_name) return 'U'
  return user.value.user_metadata.full_name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

// Handle logout
const handleLogout = async () => {
  await logout()
  mobileMenu.value = false
}

// Close mobile menu when route changes
watch(() => router.currentRoute.value.path, () => {
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

.search-field {
  max-width: 300px;
}

.search-field :deep(.v-field__input) {
  min-height: 36px !important;
  padding-top: 0 !important;
}

.user-menu-btn {
  height: 40px;
}

.v-navigation-drawer {
  max-width: 300px;
}
</style> 