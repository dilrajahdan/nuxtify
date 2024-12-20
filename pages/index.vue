<template>
  <div>
    <!-- Hero Section -->
    <section class="">
      <v-container class="pa-0 pa-sm-2 pa-md-6">
        <v-row class="align-start align-md-center">
          <!-- Text Column -->
          <v-col
            cols="12"
            md="6"
            class="px-4 px-sm-6"
          >
            <div class="stack-space-large">
              <!-- logo -->
              <div class="d-flex align-center mb-6">
                <img
                  src="/logo.png"
                  alt="Logo"
                  height="52"
                  width="auto"
                  class="mr-2"
                />
                <h1 class="text-h6">{{ title }}</h1>
              </div>
              <p class="text-h3 text-md-h2 font-weight-bold max-w-lg">
                {{ description }}
              </p>
              <!-- <div class="d-flex flex-column flex-sm-row gap-4">
                <v-btn
                  color="primary"
                  size="x-large"
                  rounded="pill"
                  class="px-8 flex-grow-1 flex-sm-grow-0"
                >
                  Get Started
                </v-btn>
                <v-btn
                  variant="outlined"
                  size="x-large"
                  rounded="pill"
                  class="px-8 py-3 flex-grow-1 flex-sm-grow-0"
                >
                  View Demo
                </v-btn>
              </div> -->
            </div>
          </v-col>

          <!-- Form Column -->
          <v-col
            cols="12"
            md="6"
            class="px-0 px-sm-6"
            :class="{ 'd-none': isFormExpanded }"
          >
            <OnboardingForm 
              class="mt-8 mt-md-0" 
              @expand="handleFormExpand"
            />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- After the Hero Section and before Features Section -->
    <section class="section-y bg-surface">
      <v-container>
        <h2 class="text-h3 text-center font-weight-bold mb-8">
          A Letter From The Founder
        </h2>
        <v-card
          class="pa-8 mx-auto"
          max-width="800"
        >
          <p class="text-body-1 mb-4">Dear Founder,</p>
          <p class="text-body-1 mb-4">
            From the Caribbean somewhere south of Miami
          </p>
          <p class="text-body-1 mb-4">
            The greatest cost for any entrepreneur isn't your team, your
            advertising budget, or the courses or programs you buy. The greatest
            cost comes from not knowing where to put your focus.
          </p>
          <p class="text-body-1 mb-4">
            I've had the privilege of teaching over 2,000 students how to become
            successful founders and those students have gone on to sell over
            $1,000,000,000 in revenue by understanding this;
          </p>
          <p class="text-body-1 font-weight-bold mb-4">
            How to focus on the right thing at the right time (even with ADHD).
          </p>
          <p class="text-body-1 mb-4">
            Here's how this free service works. You'll tell us our DISC profile
            and email. We will ask you a few more questions about what your
            goals are, and then send you a simple three line email tailored to
            your personality type to keep you focused each day.
          </p>
          <p class="text-body-1 mb-4">That's it.</p>
          <p class="text-body-1 mb-4">
            You'll be able to reply to each email telling us if it helped or it
            didn't so we can get better at serving you in the next messages.
          </p>
          <p class="text-body-1 mb-4">
            If you'd like to go deeper, you can invest in a full 26 factor
            assessment that will diagnose what's blocking your potential.
          </p>
          <p class="text-body-1 mb-8">
            If you have any questions, email me personally,
          </p>
          <div class="text-body-1">
            <p>--</p>
            <p>Dane Maxwell</p>
            <p>Co founder - ActionMo.de</p>
            <p>dane@actionmo.de</p>
          </div>
        </v-card>
      </v-container>
    </section>

    <!-- Features Section -->
    <section class="section-y bg-surface mt-16">
      <v-container>
        <div class="text-center stack-space mb-16">
          <h2 class="text-h3 font-weight-bold">Key Features</h2>
          <p class="text-body-1 text-medium-emphasis max-w-lg mx-auto">
            {{ featuresDescription }}
          </p>
        </div>
        <v-row>
          <v-col
            v-for="feature in features"
            :key="feature.title"
            cols="12"
            md="4"
          >
            <v-card
              class="h-100 pa-6"
              variant="flat"
            >
              <div class="mb-6">
                <v-icon
                  :color="feature.color"
                  size="32"
                  >{{ feature.icon }}</v-icon
                >
              </div>
              <h3 class="text-h6 font-weight-bold mb-2">{{ feature.title }}</h3>
              <p class="text-body-2 text-medium-emphasis">
                {{ feature.description }}
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Steps with Screenshots -->
    <div class="py-24 mt-16">
      <v-row
        v-for="(step, i) in steps"
        :key="i"
        class="align-center mb-16"
      >
        <v-col
          cols="12"
          md="5"
          :order="i % 2 === 0 ? 1 : 2"
        >
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
          <p class="text-body-1 text-medium-emphasis mb-6">
            {{ step.description }}
          </p>
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
        <v-col
          cols="12"
          md="7"
          :order="i % 2 === 0 ? 2 : 1"
        >
          <v-img
            :src="step.image"
            :alt="step.title"
            class="rounded-lg elevation-1"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import OnboardingForm from '~/components/OnboardingForm.vue';

const title = 'New Service For Entrepreneurs & Founders!';
const description = 'Unlock The Next Level of Your Journey With Tailored AI.';
const featuresDescription =
  'Personalized guidance based on your DISC profile and entrepreneurial goals.';

const stats = [
  { value: '2000+', label: 'Students Taught' },
  { value: '$1B+', label: 'Student Revenue' },
  { value: '26', label: 'Diagnostic Factors' },
];

const steps = [
  {
    title: "Let's Start With Your DISC Profile",
    description:
      'Take the first step towards personalized guidance by sharing your DISC profile.',
    image: 'https://placehold.co/800x600/e9ecef/495057?text=DISC+Profile',
  },
  {
    title: 'Receive Daily Tailored Focus Emails',
    description:
      'Get simple three-line emails customized to your personality type to keep you focused each day.',
    image: 'https://placehold.co/800x600/e9ecef/495057?text=Daily+Emails',
  },
  {
    title: 'Improve Through Feedback',
    description:
      'Reply to each email to help us better serve you with future messages.',
    image: 'https://placehold.co/800x600/e9ecef/495057?text=Feedback',
  },
];

const plans = [
  {
    name: 'Free Focus Service',
    price: '0',
    description: 'Daily personalized focus guidance',
    features: [
      'DISC profile analysis',
      'Daily focus emails',
      'Email response tracking',
      'Basic guidance',
    ],
  },
  {
    name: '26 Factor Diagnostic',
    price: '97',
    popular: true,
    description: 'Complete entrepreneurial assessment',
    features: [
      'Everything in Free tier',
      '26 factor analysis',
      'Detailed diagnostic report',
      'Personalized roadmap',
      'Priority support',
      'Advanced recommendations',
    ],
  },
];

const aboutStats = [
  {
    icon: 'mdi-github',
    value: '1000+',
    label: 'Github Stars',
    color: 'primary',
  },
  {
    icon: 'mdi-account-group',
    value: '500+',
    label: 'Active Users',
    color: 'success',
  },
  {
    icon: 'mdi-source-branch',
    value: '50+',
    label: 'Contributors',
    color: 'info',
  },
  {
    icon: 'mdi-package-variant',
    value: '99.9%',
    label: 'Uptime',
    color: 'warning',
  },
];

const features = [
  {
    title: 'DISC Profile Integration',
    description: 'Personalized guidance based on your unique personality type',
    icon: 'mdi-account-check',
    color: 'success',
  },
  {
    title: 'Daily Focus Emails',
    description: 'Three-line actionable emails tailored to your goals',
    icon: 'mdi-email-outline',
    color: 'primary',
  },
  {
    title: 'Interactive Feedback',
    description: 'Continuous improvement through your responses',
    icon: 'mdi-message-reply',
    color: 'info',
  },
];

const testimonials = [
  {
    author: 'Dane Maxwell',
    role: 'Co-founder - Arena',
    avatar: 'https://placehold.co/100x100/e9ecef/495057?text=DM',
    text: "The greatest cost for any entrepreneur isn't your team, your advertising budget, or the courses or programs you buy. The greatest cost comes from not knowing where to put your focus.",
  },
];

const resources = [
  {
    title: 'Documentation',
    description: 'Comprehensive guides and API reference',
    color: 'primary lighten-5',
    buttonColor: 'primary',
    action: () => navigateTo('/docs'),
  },
  {
    title: 'Component Library',
    description: 'Browse our collection of pre-built components',
    color: 'success lighten-5',
    buttonColor: 'success',
    action: () => navigateTo('/components'),
  },
  {
    title: 'Video Tutorials',
    description: 'Watch step-by-step setup and usage guides',
    color: 'info lighten-5',
    buttonColor: 'info',
    action: () => navigateTo('/tutorials'),
  },
];

useHead({
  title: 'Create Mobile Funnels',
  meta: [
    {
      name: 'description',
      content:
        'Create high-converting mobile funnels in minutes with our intuitive platform',
    },
  ],
});

const isFormExpanded = ref(false);

const handleFormExpand = () => {
  isFormExpanded.value = true;
};
</script>

<style scoped>
.border {
  border: 1px solid #e5e7eb;
}

@media (max-width: 600px) {
  .text-h3 {
    font-size: 2rem !important;
    line-height: 1.2 !important;
  }

  .section-y {
    padding: 16px 0;
  }
}

.v-col {
  transition: opacity 0.3s ease;
}

.d-none {
  opacity: 0;
  pointer-events: none;
}
</style>
