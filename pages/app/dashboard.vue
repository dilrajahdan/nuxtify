<template>
  <div>
    <!-- Page Header -->
    <div class="d-flex justify-space-between align-center mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold mb-2">Welcome back, {{ firstName }}!</h1>
        <p class="text-body-1 text-medium-emphasis">Here's what's happening with your funnels today.</p>
      </div>
      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        to="/app/funnels/new"
      >
        New Funnel
      </v-btn>
    </div>

    <!-- Stats Cards -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="3">
        <v-card>
          <v-card-text>
            <div class="text-overline mb-1">TOTAL VISITORS</div>
            <div class="text-h4 mb-2">1,294</div>
            <div class="d-flex align-center text-success">
              <v-icon size="small" class="mr-1">mdi-arrow-up</v-icon>
              <span class="text-body-2">12.5% vs last week</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card>
          <v-card-text>
            <div class="text-overline mb-1">CONVERSION RATE</div>
            <div class="text-h4 mb-2">2.4%</div>
            <div class="d-flex align-center text-error">
              <v-icon size="small" class="mr-1">mdi-arrow-down</v-icon>
              <span class="text-body-2">0.3% vs last week</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card>
          <v-card-text>
            <div class="text-overline mb-1">ACTIVE FUNNELS</div>
            <div class="text-h4 mb-2">5</div>
            <div class="d-flex align-center text-success">
              <v-icon size="small" class="mr-1">mdi-arrow-up</v-icon>
              <span class="text-body-2">2 new this week</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card>
          <v-card-text>
            <div class="text-overline mb-1">TOTAL LEADS</div>
            <div class="text-h4 mb-2">31</div>
            <div class="d-flex align-center text-success">
              <v-icon size="small" class="mr-1">mdi-arrow-up</v-icon>
              <span class="text-body-2">8 new this week</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Recent Activity -->
    <v-card class="mb-6">
      <v-card-title class="text-h6">
        Recent Activity
      </v-card-title>
      <v-card-text>
        <v-timeline density="compact" align="start">
          <v-timeline-item
            v-for="activity in recentActivity"
            :key="activity.id"
            :dot-color="activity.color"
            size="small"
          >
            <div class="mb-2">
              <div class="text-body-2 font-weight-medium">{{ activity.title }}</div>
              <div class="text-caption text-medium-emphasis">{{ activity.time }}</div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>

    <!-- Quick Actions -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h6">
            Quick Actions
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-for="action in quickActions" :key="action.title" cols="6">
                <v-btn
                  block
                  :prepend-icon="action.icon"
                  :to="action.to"
                  variant="outlined"
                  class="mb-3"
                >
                  {{ action.title }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h6">
            Top Performing Funnel
          </v-card-title>
          <v-card-text>
            <v-list lines="two">
              <v-list-item
                title="Sales Funnel 2.0"
                subtitle="2,145 visitors • 3.2% conversion rate"
                prepend-icon="mdi-trophy"
              >
                <template v-slot:append>
                  <v-btn
                    variant="text"
                    color="primary"
                    to="/app/funnels/1"
                  >
                    View Details
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'app',
  middleware: ['auth']
})

const { user } = useAuth()

// Get first name for welcome message
const firstName = computed(() => {
  const fullName = user.value?.user_metadata?.full_name || ''
  return fullName.split(' ')[0]
})

// Mock data
const recentActivity = [
  {
    id: 1,
    title: 'New lead captured from Sales Funnel 2.0',
    time: '2 minutes ago',
    color: 'success'
  },
  {
    id: 2,
    title: 'Funnel "Product Launch" published',
    time: '1 hour ago',
    color: 'primary'
  },
  {
    id: 3,
    title: 'A/B Test completed for Landing Page',
    time: '3 hours ago',
    color: 'info'
  }
]

const quickActions = [
  {
    title: 'Create Funnel',
    icon: 'mdi-plus',
    to: '/app/funnels/new'
  },
  {
    title: 'View Analytics',
    icon: 'mdi-chart-bar',
    to: '/app/analytics'
  },
  {
    title: 'Manage Templates',
    icon: 'mdi-file-outline',
    to: '/app/templates'
  },
  {
    title: 'View Leads',
    icon: 'mdi-account-group',
    to: '/app/leads'
  }
]
</script> 