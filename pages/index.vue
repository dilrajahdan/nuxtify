<template>
  <div class="py-24">
    <!-- Hero Section -->
    <v-row class="align-center mb-24">
      <v-col cols="12" md="7">
        <h1 class="text-h2 font-weight-bold mb-4">
          Build production-ready Nuxt apps in minutes
        </h1>
        <p class="text-body-1 mb-8 text-medium-emphasis max-w-lg">
          A battle-tested starter template with Vue 3, TypeScript, Vuetify, and Supabase.
          Everything you need to build modern SaaS applications.
        </p>
        <div>
          <v-btn
            color="primary"
            size="x-large"
            to="/auth/signup"
            class="px-8 py-3"
          >
            Get Started
          </v-btn>
        </div>
        <!-- Trusted By Section -->
        <div class="mt-24">
          <p class="text-caption text-medium-emphasis mb-6">Built with modern tools</p>
          <div class="d-flex gap-8 align-center opacity-75">
            <v-img src="/logos/vue.svg" width="80" height="24" />
            <v-img src="/logos/nuxt.svg" width="80" height="24" />
            <v-img src="/logos/supabase.svg" width="80" height="24" />
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="5">
        <div class="position-relative">
          <v-img
            src="/hero-funnel.png"
            alt="Mobile Funnel Preview"
            class="mt-8 mt-md-0 rounded-lg"
          />
          <!-- Decorative elements -->
          <div class="position-absolute" style="top: -10%; left: -15%; z-index: -1">
            <v-img src="/decorative/shape1.svg" width="240" />
          </div>
          <div class="position-absolute" style="bottom: -5%; right: -10%; z-index: -1">
            <v-img src="/decorative/shape2.svg" width="200" />
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Stats Section -->
    <div class="py-24 text-center">
      <h2 class="text-h4 font-weight-bold mb-16">
        Why Choose This Template?
      </h2>
      <v-row class="justify-center">
        <v-col cols="12" md="4" v-for="stat in stats" :key="stat.value">
          <div class="text-center">
            <div class="text-h2 font-weight-black primary--text mb-3">
              {{ stat.value }}
            </div>
            <div class="text-body-2 text-medium-emphasis">
              {{ stat.label }}
            </div>
          </div>
        </v-col>
      </v-row>
    </div>

    <!-- Steps Section -->
    <div class="py-16">
      <v-row class="align-center" v-for="(step, i) in steps" :key="i">
        <v-col cols="12" md="6" :order="i % 2 === 0 ? 1 : 2">
          <h3 class="text-h4 font-weight-bold mb-4">{{ step.title }}</h3>
          <p class="text-body-1 text-medium-emphasis mb-6">{{ step.description }}</p>
        </v-col>
        <v-col cols="12" md="6" :order="i % 2 === 0 ? 2 : 1">
          <v-img :src="step.image" :alt="step.title" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
const stats = [
  { value: '100%', label: 'TypeScript Coverage' },
  { value: '50+', label: 'Built-in Components' },
  { value: '10x', label: 'Faster Development' }
]

const steps = [
  {
    title: 'Create your first funnel in 60 minutes. Headache-free.',
    description: 'Our drag-and-drop builder makes it simple to create professional funnels without any technical knowledge.',
    image: '/step1.png'
  },
  {
    title: 'Integrate your favorite tools and share your funnel with the world.',
    description: 'Connect with your existing tools and publish your funnel with one click.',
    image: '/step2.png'
  },
  {
    title: 'Analyze your target audience and achieve record results.',
    description: 'Get detailed analytics and insights to optimize your funnel performance.',
    image: '/step3.png'
  }
]

useHead({
  title: 'Create Mobile Funnels',
  meta: [
    {
      name: 'description',
      content: 'Create high-converting mobile funnels in minutes with our intuitive platform'
    }
  ]
})
</script>

<style scoped>
.border {
  border: 1px solid #E5E7EB;
}
</style>