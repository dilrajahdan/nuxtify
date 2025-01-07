<template>
  <div class="lfg-page">
    <v-container class="py-16">
      <!-- Hero Section -->
      <v-row justify="center" align="center" class="text-center mb-16">
        <v-col cols="12" md="8">
          <div class="mb-6">
            <v-icon
              color="success"
              size="64"
              class="mb-4"
            >
              mdi-rocket-launch
            </v-icon>
          </div>
          <h1 class="text-h2 font-weight-bold mb-4">Let's Fucking Go! 🚀</h1>
          <p class="text-h5 text-medium-emphasis mb-0">
            You're officially on your way to becoming an unstoppable entrepreneur.
          </p>
        </v-col>
      </v-row>

      <!-- Next Steps -->
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="pa-6">
            <h2 class="text-h4 mb-6">Here's What Happens Next</h2>
            
            <div class="steps-container">
              <div v-for="(step, index) in steps" :key="index" class="step-item mb-8">
                <div class="d-flex align-start">
                  <div class="step-number mr-4">
                    <v-chip
                      color="primary"
                      size="large"
                    >
                      {{ index + 1 }}
                    </v-chip>
                  </div>
                  <div>
                    <h3 class="text-h6 mb-2">{{ step.title }}</h3>
                    <p class="text-body-1 text-medium-emphasis mb-0">
                      {{ step.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <v-divider class="my-6" />

            <div class="text-center">
              <p class="text-body-1 mb-4">
                Questions? Email us at support@actionmo.de
              </p>
              <v-btn
                color="primary"
                size="large"
                to="/"
                variant="flat"
              >
                Back to Home
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
const steps = [
  {
    title: 'Check Your Email',
    description: "We've sent you a welcome email with important information. If you don't see it, check your spam folder."
  },
  {
    title: 'Daily Focus Emails Begin Tomorrow',
    description: "Starting tomorrow morning, you'll receive your first personalized focus email based on your DISC profile."
  },
  {
    title: 'Respond & Improve',
    description: "After each daily email, simply reply with what worked and what didn't. We'll use your feedback to make each subsequent email more effective."
  },
  {
    title: 'Join Our Community',
    description: "You'll receive an exclusive invitation to join our private community of focused entrepreneurs."
  }
]

// Set page metadata
useHead({
  title: 'LFG - Welcome Aboard! | ActionMo.de',
  meta: [
    {
      name: 'description',
      content: 'Welcome to ActionMo.de - Your journey to focused entrepreneurship starts now!'
    }
  ]
})
</script>

<style scoped>
.lfg-page {
  min-height: 100vh;
  background: linear-gradient(135deg, rgb(var(--v-theme-surface)) 0%, rgb(var(--v-theme-background)) 100%);
}

.step-item:last-child {
  margin-bottom: 0 !important;
}

.step-number {
  flex-shrink: 0;
}
</style> 