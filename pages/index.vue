<template>
  <div>
    <!-- Hero Section -->
    <section class="section-y">
      <v-container>
        <v-row class="align-center">
          <v-col cols="12" md="6">
            <div class="stack-space-large">
              <h1 class="text-h2 font-weight-bold">{{ title }}</h1>
              <p class="text-body-1 text-medium-emphasis max-w-lg">
                {{ description }}
              </p>
              <div class="d-flex inline-space">
                <v-btn
                  color="primary"
                  size="x-large"
                  rounded="pill"
                  class="px-8"
                >
                  Get Started
                </v-btn>
                <v-btn
                  variant="outlined"
                  size="x-large"
                  rounded="pill"
                  class="px-8 py-3"
                >
                  View Demo
                </v-btn>
              </div>
            </div>
            
            <!-- Trusted By Section -->
            <div class="mt-20">
              <p class="text-caption text-medium-emphasis mb-6">
                Built with modern tools
              </p>
              <div class="d-flex inline-space">
                <v-img src="https://placehold.co/80x24/e9ecef/495057?text=Vue" width="80" height="24" />
                <v-img src="https://placehold.co/80x24/e9ecef/495057?text=Nuxt" width="80" height="24" />
                <v-img src="https://placehold.co/80x24/e9ecef/495057?text=Supabase" width="80" height="24" />
                <v-img src="https://placehold.co/80x24/e9ecef/495057?text=Vuetify" width="80" height="24" />
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="position-relative">
              <v-img
                src="https://placehold.co/800x600/e9ecef/495057?text=App+Preview"
                alt="App Preview"
                class="mt-8 mt-md-0 rounded-lg"
              />
              <!-- Decorative elements -->
              <div class="position-absolute" style="top: -10%; left: -15%; z-index: -1">
                <v-img src="/decorative/shape1.png" width="240" />
              </div>
              <div class="position-absolute" style="bottom: -5%; right: -10%; z-index: -1">
                <v-img src="/decorative/shape2.svg" width="200" />
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Features Section -->
    <section class="section-y bg-surface">
      <v-container>
        <div class="text-center stack-space mb-16">
          <h2 class="text-h3 font-weight-bold">
            Key Features
          </h2>
          <p class="text-body-1 text-medium-emphasis max-w-lg mx-auto">
            {{ featuresDescription }}
          </p>
        </div>
        <v-row>
          <v-col v-for="feature in features" :key="feature.title" cols="12" md="4">
            <v-card class="h-100 pa-6" variant="flat">
              <div class="mb-6">
                <v-icon :color="feature.color" size="32">{{ feature.icon }}</v-icon>
              </div>
              <h3 class="text-h6 font-weight-bold mb-2">{{ feature.title }}</h3>
              <p class="text-body-2 text-medium-emphasis">{{ feature.description }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Steps with Screenshots -->
    <div class="py-24">
      <v-row v-for="(step, i) in steps" :key="i" class="align-center mb-16">
        <v-col cols="12" md="5" :order="i % 2 === 0 ? 1 : 2">
          <div class="d-flex align-center mb-4">
            <v-chip
              color="primary"
              variant="flat"
              class="text-caption font-weight-bold mr-4"
            >
              STEP {{ i + 1 }}
            </v-chip>
          </div>
          <h3 class="text-h4 font-weight-bold mb-4">{{ step.title }}</h3>
          <p class="text-body-1 text-medium-emphasis mb-6">{{ step.description }}</p>
          <div class="d-flex gap-4">
            <v-btn
              variant="text"
              color="primary"
              class="px-0"
              append-icon="mdi-arrow-right"
            >
              Learn more
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" md="7" :order="i % 2 === 0 ? 2 : 1">
          <v-img
            :src="step.image"
            :alt="step.title"
            class="rounded-lg elevation-1"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Testimonials -->
    <div class="py-24 bg-surface">
      <h2 class="text-h3 text-center font-weight-bold mb-4">What developers say</h2>
      <p class="text-body-1 text-center text-medium-emphasis mb-16 max-w-lg mx-auto">
        Join thousands of developers who are already building amazing apps with our template
      </p>
      <v-row class="justify-center">
        <v-col cols="12" md="4" v-for="review in testimonials" :key="review.author">
          <v-card class="h-100 pa-6">
            <div class="d-flex mb-4">
              <v-rating
                :model-value="5"
                color="warning"
                density="compact"
                readonly
              />
            </div>
            <p class="text-body-1 mb-6">"{{ review.text }}"</p>
            <div class="d-flex align-center">
              <v-avatar size="40" class="mr-4">
                <v-img :src="review.avatar" />
              </v-avatar>
              <div>
                <div class="text-body-1 font-weight-medium">{{ review.author }}</div>
                <div class="text-caption text-medium-emphasis">{{ review.role }}</div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Resources Section -->
    <div class="py-24">
      <h2 class="text-h3 text-center font-weight-bold mb-4">Not sure where to start?</h2>
      <p class="text-body-1 text-center text-medium-emphasis mb-16">
        Check out our comprehensive guides and documentation
      </p>
      <v-row class="justify-center">
        <v-col cols="12" md="4" v-for="resource in resources" :key="resource.title">
          <v-card
            class="h-100 pa-6"
            :color="resource.color"
            variant="flat"
            @click="resource.action"
          >
            <h3 class="text-h6 font-weight-bold mb-2">{{ resource.title }}</h3>
            <p class="text-body-2 mb-4">{{ resource.description }}</p>
            <v-btn
              variant="tonal"
              size="small"
              :color="resource.buttonColor"
              class="text-none"
            >
              Learn more
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Stats Section -->
    <section class="section-y text-center">
      <h2 class="text-h4 font-weight-bold mb-16">
        Why Choose This Template?
      </h2>
      <v-row class="justify-center">
        <v-col 
          cols="12" 
          md="4" 
          v-for="stat in stats" 
          :key="stat.value"
          class="px-8"
        >
          <div class="text-center">
            <div class="text-h2 font-weight-black primary--text mb-6">
              {{ stat.value }}
            </div>
            <div class="text-body-1 text-medium-emphasis">
              {{ stat.label }}
            </div>
          </div>
        </v-col>
      </v-row>
    </section>

    <!-- Pricing Section -->
    <div class="py-24 bg-surface">
      <h2 class="text-h3 text-center font-weight-bold mb-4">Simple, Transparent Pricing</h2>
      <p class="text-body-1 text-center text-medium-emphasis mb-16">Start building for free, upgrade when you need to</p>
      
      <v-row class="justify-center">
        <v-col cols="12" md="4" v-for="plan in plans" :key="plan.name">
          <v-card class="h-100" :elevation="plan.popular ? 4 : 1">
            <v-card-item>
              <div class="d-flex flex-column align-center text-center">
                <div v-if="plan.popular" class="text-primary text-caption font-weight-bold mb-4">MOST POPULAR</div>
                <h3 class="text-h5 font-weight-bold mb-2">{{ plan.name }}</h3>
                <div class="d-flex align-baseline mb-4">
                  <span class="text-h3 font-weight-bold">${{ plan.price }}</span>
                  <span class="text-body-1 text-medium-emphasis">/month</span>
                </div>
                <p class="text-medium-emphasis mb-6">{{ plan.description }}</p>
                <v-btn
                  block
                  :color="plan.popular ? 'primary' : undefined"
                  :variant="plan.popular ? undefined : 'outlined'"
                  class="mb-6"
                >
                  Get Started
                </v-btn>
                <div class="text-left">
                  <div v-for="feature in plan.features" :key="feature" class="d-flex align-center mb-2">
                    <v-icon color="success" size="small" class="mr-2">mdi-check-circle</v-icon>
                    <span class="text-body-2">{{ feature }}</span>
                  </div>
                </div>
              </div>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- About Section -->
    <div class="py-24">
      <v-row class="align-center">
        <v-col cols="12" md="6">
          <h2 class="text-h3 font-weight-bold mb-4">Built by Developers, for Developers</h2>
          <p class="text-body-1 text-medium-emphasis mb-6">
            We understand the challenges of modern web development. That's why we've created a starter template
            that follows best practices and includes everything you need to build production-ready applications.
          </p>
          <v-row>
            <v-col v-for="stat in aboutStats" :key="stat.label" cols="6">
              <div class="mb-2">
                <v-icon :color="stat.color" size="32" class="mb-2">{{ stat.icon }}</v-icon>
              </div>
              <div class="text-h6 font-weight-bold mb-1">{{ stat.value }}</div>
              <div class="text-body-2 text-medium-emphasis">{{ stat.label }}</div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <v-img src="https://placehold.co/800x600/e9ecef/495057?text=About+Illustration" class="rounded-lg" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
const title = 'Create high-converting funnels in just 60 minutes'
const description = 'Build, launch, and optimize your mobile funnels with our intuitive platform. No coding required.'
const featuresDescription = 'Everything you need to create successful mobile funnels, from drag-and-drop building to advanced analytics.'

const stats = [
  { value: '100%', label: 'TypeScript Coverage' },
  { value: '50+', label: 'Built-in Components' },
  { value: '10x', label: 'Faster Development' }
]

const steps = [
  {
    title: 'Create your first funnel in 60 minutes. Headache-free.',
    description: 'Our drag-and-drop builder makes it simple to create professional funnels without any technical knowledge.',
    image: 'https://placehold.co/800x600/e9ecef/495057?text=Step+1'
  },
  {
    title: 'Integrate your favorite tools and share your funnel with the world.',
    description: 'Connect with your existing tools and publish your funnel with one click.',
    image: 'https://placehold.co/800x600/e9ecef/495057?text=Step+2'
  },
  {
    title: 'Analyze your target audience and achieve record results.',
    description: 'Get detailed analytics and insights to optimize your funnel performance.',
    image: 'https://placehold.co/800x600/e9ecef/495057?text=Step+3'
  }
]

const plans = [
  {
    name: 'Hobby',
    price: '0',
    description: 'Perfect for side projects and learning',
    features: [
      'Up to 3 projects',
      'Basic components',
      'Community support',
      'Basic analytics'
    ]
  },
  {
    name: 'Pro',
    price: '29',
    popular: true,
    description: 'Everything you need for a growing business',
    features: [
      'Unlimited projects',
      'Advanced components',
      'Priority support',
      'Advanced analytics',
      'Custom domains',
      'Team collaboration'
    ]
  },
  {
    name: 'Enterprise',
    price: '99',
    description: 'Advanced features for large teams',
    features: [
      'Everything in Pro',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
      'Advanced security',
      'Custom branding'
    ]
  }
]

const aboutStats = [
  {
    icon: 'mdi-github',
    value: '1000+',
    label: 'Github Stars',
    color: 'primary'
  },
  {
    icon: 'mdi-account-group',
    value: '500+',
    label: 'Active Users',
    color: 'success'
  },
  {
    icon: 'mdi-source-branch',
    value: '50+',
    label: 'Contributors',
    color: 'info'
  },
  {
    icon: 'mdi-package-variant',
    value: '99.9%',
    label: 'Uptime',
    color: 'warning'
  }
]

const features = [
  {
    title: 'Vue 3 & Nuxt 3',
    description: 'Latest Vue and Nuxt with Composition API and auto-imports',
    icon: 'mdi-vuejs',
    color: 'success'
  },
  {
    title: 'TypeScript & Vuetify',
    description: 'Type-safe development with beautiful UI components',
    icon: 'mdi-language-typescript',
    color: 'primary'
  },
  {
    title: 'Authentication Ready',
    description: 'Built-in Supabase authentication and user management',
    icon: 'mdi-shield-check',
    color: 'info'
  },
  {
    title: 'State Management',
    description: 'Pinia store with persistence and type safety',
    icon: 'mdi-database',
    color: 'warning'
  },
  {
    title: 'Testing Setup',
    description: 'Vitest and Cypress configured for unit and E2E testing',
    icon: 'mdi-test-tube',
    color: 'error'
  },
  {
    title: 'CI/CD Ready',
    description: 'Github Actions workflow for automated deployment',
    icon: 'mdi-rocket-launch',
    color: 'success'
  }
]

const testimonials = [
  {
    author: 'Sarah Chen',
    role: 'Senior Developer',
    avatar: 'https://placehold.co/100x100/e9ecef/495057?text=SC',
    text: 'This template saved us weeks of setup time. The architecture is clean and the documentation is excellent.'
  },
  {
    author: 'Michael Rodriguez',
    role: 'Tech Lead',
    avatar: 'https://placehold.co/100x100/e9ecef/495057?text=MR',
    text: 'Perfect balance of features and simplicity. TypeScript setup is particularly well done.'
  },
  {
    author: 'Emily Johnson',
    role: 'Full Stack Developer',
    avatar: 'https://placehold.co/100x100/e9ecef/495057?text=EJ',
    text: 'The best Nuxt starter template I\'ve used. Great attention to detail and best practices.'
  }
]

const resources = [
  {
    title: 'Documentation',
    description: 'Comprehensive guides and API reference',
    color: 'primary lighten-5',
    buttonColor: 'primary',
    action: () => navigateTo('/docs')
  },
  {
    title: 'Component Library',
    description: 'Browse our collection of pre-built components',
    color: 'success lighten-5',
    buttonColor: 'success',
    action: () => navigateTo('/components')
  },
  {
    title: 'Video Tutorials',
    description: 'Watch step-by-step setup and usage guides',
    color: 'info lighten-5',
    buttonColor: 'info',
    action: () => navigateTo('/tutorials')
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