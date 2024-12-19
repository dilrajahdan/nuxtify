<template>
  <div class="pb-32">
    <h1 class="display-1 text-center font-weight-black mb-32 px-4">
      Everything You Need for Modern SaaS
    </h1>
    
    <v-container>
      <div v-for="(category, index) in features" :key="index" class="mb-32">
        <h2 class="text-h2 font-weight-black mb-16 px-4">{{ category.title }}</h2>
        <v-row class="gap-8">
          <v-col 
            v-for="feature in category.items" 
            :key="feature.title" 
            cols="12" 
            md="4"
          >
            <div class="feature-card pa-8 rounded-lg">
              <div class="mb-6">
                <v-img 
                  :src="feature.icon"
                  width="48"
                  height="48"
                  class="feature-icon"
                />
              </div>
              <h3 class="text-h5 font-weight-bold mb-2">{{ feature.title }}</h3>
              <p class="text-body-1 text-medium-emphasis">{{ feature.description }}</p>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
const features = [
  {
    title: 'Core Features',
    items: [
      {
        title: 'Vue 3 & Nuxt',
        description: 'Latest Vue and Nuxt with Composition API and auto-imports',
        icon: 'https://placehold.co/48x48/e9ecef/495057?text=Vue',
      },
      {
        title: 'TypeScript',
        description: 'Basic type safety without complexity',
        icon: 'https://placehold.co/48x48/e9ecef/495057?text=TS',
      },
      {
        title: 'Vuetify 3',
        description: 'Modern UI components with material design',
        icon: 'https://placehold.co/48x48/e9ecef/495057?text=Vuetify',
      }
    ]
  },
  {
    title: 'Authentication & Data',
    items: [
      {
        title: 'Supabase Integration',
        description: 'Built-in authentication and database management',
        icon: 'https://placehold.co/48x48/e9ecef/495057?text=Supabase',
      },
      {
        title: 'State Management',
        description: 'Pinia store with persistence and type safety',
        icon: 'https://placehold.co/48x48/e9ecef/495057?text=Pinia',
      },
      {
        title: 'API Integration',
        description: 'Type-safe API clients with proper error handling',
        icon: 'https://placehold.co/48x48/e9ecef/495057?text=API',
      }
    ]
  }
]

useHead({
  title: 'Features - Nuxtify',
  meta: [
    {
      name: 'description',
      content: 'Explore the features of our Nuxt 3 starter template'
    }
  ]
})
</script>

<style scoped>
.feature-card {
  background: white;
  border: 1px solid #E5E7EB;
  transition: all 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.feature-icon {
  filter: grayscale(1);
  opacity: 0.8;
  transition: all 0.2s ease;
}

.feature-card:hover .feature-icon {
  filter: grayscale(0);
  opacity: 1;
}
</style> 