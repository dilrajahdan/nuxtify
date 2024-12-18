<template>
  <div class="py-16">
    <h1 class="text-h3 text-center font-weight-bold mb-16">
      Everything You Need for Modern SaaS
    </h1>
    
    <v-row>
      <v-col v-for="(category, index) in features" :key="index" cols="12" class="mb-16">
        <h2 class="text-h4 font-weight-bold mb-8">{{ category.title }}</h2>
        <v-row>
          <v-col v-for="feature in category.items" :key="feature.title" cols="12" md="4">
            <v-card height="100%">
              <v-card-item>
                <v-icon :color="feature.color" size="32" class="mb-4">
                  {{ feature.icon }}
                </v-icon>
                <v-card-title class="font-weight-bold">{{ feature.title }}</v-card-title>
                <v-card-text class="text-medium-emphasis">
                  {{ feature.description }}
                </v-card-text>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const features = [
  {
    title: 'Core Features',
    items: [
      {
        title: 'Vue 3 & Nuxt 3',
        description: 'Latest Vue and Nuxt with Composition API and auto-imports',
        icon: 'mdi-vuejs',
        color: 'success'
      },
      {
        title: 'TypeScript',
        description: 'Basic type safety without complexity',
        icon: 'mdi-language-typescript',
        color: 'info'
      },
      {
        title: 'Vuetify 3',
        description: 'Modern UI components with material design',
        icon: 'mdi-view-dashboard',
        color: 'primary'
      }
    ]
  },
  {
    title: 'Authentication & Data',
    items: [
      {
        title: 'Supabase Integration',
        description: 'Built-in authentication and database management',
        icon: 'mdi-database',
        color: 'success'
      },
      {
        title: 'State Management',
        description: 'Pinia store with persistence and type safety',
        icon: 'mdi-state-machine',
        color: 'warning'
      },
      {
        title: 'API Integration',
        description: 'Type-safe API clients with proper error handling',
        icon: 'mdi-api',
        color: 'error'
      }
    ]
  },
  {
    title: 'Developer Experience',
    items: [
      {
        title: 'Testing Setup',
        description: 'Vitest for unit tests and Cypress for E2E',
        icon: 'mdi-test-tube',
        color: 'success'
      },
      {
        title: 'Performance',
        description: 'Lazy loading, caching, and asset optimization',
        icon: 'mdi-rocket-launch',
        color: 'primary'
      },
      {
        title: 'CI/CD',
        description: 'Github Actions workflow for testing and deployment',
        icon: 'mdi-git',
        color: 'info'
      }
    ]
  }
]

useHead({
  title: 'Features',
  meta: [
    {
      name: 'description',
      content: 'Explore the features of our Nuxt 3 starter template'
    }
  ]
})
</script> 