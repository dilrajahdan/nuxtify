<template>
  <v-app>
    <!-- Navigation -->
    <nav class="navigation-container">
      <div class="navigation-wrapper">
        <!-- Logo -->
        <img 
          src="/logo.png"
          alt="Logo"
          class="navigation-logo"
        />

        <!-- Scrollable navigation links -->
        <div class="navigation-scroll">
          <div class="navigation-links">
            <nuxt-link 
              to="/app/dashboard" 
              class="nav-link"
              :class="{ active: activeRoute === 'dashboard' }"
            >
              <v-icon size="20">mdi-view-dashboard</v-icon>
              <span>Dashboard</span>
            </nuxt-link>

            <nuxt-link 
              to="/app/people" 
              class="nav-link"
              :class="{ active: activeRoute === 'people' }"
            >
              <v-icon size="20">mdi-account-group</v-icon>
              <span>People</span>
            </nuxt-link>

            <!-- Settings with Menu -->
            <div class="settings-wrapper">
              <v-menu
                v-model="settingsMenu"
                :close-on-content-click="false"
                location="top"
                offset="10"
              >
                <template v-slot:activator="{ props }">
                  <button 
                    class="nav-link"
                    :class="{ active: activeRoute === 'settings' || settingsMenu }"
                    v-bind="props"
                  >
                    <v-icon size="20">mdi-cog</v-icon>
                    <span>Settings</span>
                  </button>
                </template>

                <div class="settings-menu">
                  <nuxt-link to="/app/settings" class="menu-item">
                    <v-icon size="18" class="mr-2">mdi-cog-outline</v-icon>
                    Settings
                  </nuxt-link>
                  <button @click="handleLogout" class="menu-item">
                    <v-icon size="18" class="mr-2">mdi-logout</v-icon>
                    Logout
                  </button>
                </div>
              </v-menu>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const client = useSupabaseClient()

const settingsMenu = ref(false)

const activeRoute = computed(() => {
  const path = route.path
  if (path.includes('/dashboard')) return 'dashboard'
  if (path.includes('/people')) return 'people'
  if (path.includes('/settings')) return 'settings'
  return 'dashboard'
})

const handleLogout = async () => {
  try {
    await client.auth.signOut()
    settingsMenu.value = false
    router.push('/auth/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>

<style scoped>
.navigation-container {
  position: fixed;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 100;
  padding: 0 16px;
  top: 16px;
  transition: top 0.3s ease, bottom 0.3s ease;
}

.navigation-wrapper {
  background: linear-gradient(to right, #1a1a1a, #2d2d2d);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  padding: 8px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 520px;
  height: 72px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.navigation-logo {
  width: 28px;
  height: 28px;
  margin: 0 24px;
  flex-shrink: 0;
  opacity: 0.9;
}

.navigation-scroll {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  margin: 0 -20px;
  padding: 0 20px;
  mask-image: linear-gradient(to right, transparent, black 20px, black 90%, transparent);
}

.navigation-scroll::-webkit-scrollbar {
  display: none;
}

.navigation-links {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px;
  width: fit-content;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 100px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
}

.nav-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.08);
}

.nav-link.active {
  color: #000;
  background: white;
  font-weight: 600;
}

.nav-link.active .v-icon {
  color: #000 !important;
}

.nav-link span {
  font-size: 15px;
}

/* Mobile styles */
@media (max-width: 959px) {
  .navigation-container {
    top: unset;
    bottom: 16px;
    padding: 0 12px;
  }

  .navigation-wrapper {
    max-width: 420px;
    height: 64px;
    padding: 6px;
  }

  .navigation-logo {
    width: 24px;
    height: 24px;
    margin: 0 16px;
  }

  .navigation-scroll {
    margin: 0 -16px;
    padding: 0 16px;
  }

  .navigation-links {
    gap: 8px;
  }

  .nav-link {
    padding: 10px 16px;
  }

  .nav-link span {
    font-size: 14px;
  }

  .v-main {
    padding-bottom: 96px !important;
  }
}

/* Desktop styles */
@media (min-width: 960px) {
  .v-main {
    padding-top: 104px !important;
  }
}

.settings-menu {
  background: linear-gradient(to bottom, #1a1a1a, #2d2d2d);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 8px;
  min-width: 220px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.menu-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.2s ease;
  background: transparent;
  border: none;
  font-size: 14px;
  cursor: pointer;
  text-align: left;
  font-weight: 500;
}

.menu-item:hover {
  color: white;
  background: rgba(255, 255, 255, 0.08);
}

/* Mobile adjustments for menu */
@media (max-width: 959px) {
  .settings-menu {
    min-width: 200px;
  }

  .menu-item {
    padding: 10px 14px;
    font-size: 13px;
  }
}
</style> 
