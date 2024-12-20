<template>
  <v-container>
    <!-- Statistics Section -->
    <v-card class="mb-6">
      <v-card-title>Statistics</v-card-title>
      <v-card-text>
        <v-row>
          <!-- Time Filter -->
          <v-col cols="12" class="d-flex justify-end mb-4">
            <v-select
              v-model="timeFilter"
              :items="timeFilterOptions"
              density="compact"
              variant="outlined"
              hide-details
              class="stats-filter"
            />
          </v-col>

          <!-- Stats Grid -->
          <v-col cols="12" sm="6" md="3">
            <div class="stat-card pa-4 rounded-lg">
              <div class="text-subtitle-1 text-medium-emphasis mb-2">New Leads</div>
              <div class="text-h3 font-weight-bold primary--text">{{ stats.newLeads }}</div>
            </div>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <div class="text-subtitle-1 text-medium-emphasis">Replies Generated</div>
            <div class="text-h4 font-weight-bold">{{ stats.repliesGenerated }}</div>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <div class="text-subtitle-1 text-medium-emphasis">Emails You Sent</div>
            <div class="text-h4 font-weight-bold">{{ stats.emailsSent }}</div>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <div class="text-subtitle-1 text-medium-emphasis">Email Open Rate</div>
            <div class="text-h4 font-weight-bold">{{ stats.openRate }}%</div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Approve Emails for New Leads -->
    <v-card class="mb-6">
      <v-card-title>Approve Emails for New Leads</v-card-title>
      <v-card-text>
        <v-list class="integration-list">
          <v-list-item
            v-for="lead in newLeads"
            :key="lead.id"
            :title="`${lead.name} | ${lead.discProfile}`"
            :subtitle="lead.details"
            class="hover-effect"
            rounded="lg"
          >
            <!-- Left side with icons -->
            <template v-slot:prepend>
              <div class="d-flex align-center">
                <v-avatar 
                  color="primary-lighten"
                  size="42"
                  class="mr-3"
                >
                  <v-icon color="primary">mdi-account</v-icon>
                </v-avatar>
                <v-avatar 
                  color="primary-lighten"
                  size="42"
                >
                  <v-icon color="primary">mdi-email-outline</v-icon>
                </v-avatar>
              </div>
            </template>
            
            <!-- Right side with action button -->
            <template v-slot:append>
              <v-btn
                color="primary"
                variant="flat"
                class="integration-action-btn"
                @click="viewLead(lead)"
              >
                View Details
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <!-- Approve Email Replies -->
    <v-card class="mb-6">
      <v-card-title>Approve Email Replies</v-card-title>
      <v-card-text>
        <v-list class="integration-list">
          <v-list-item
            v-for="reply in emailReplies"
            :key="reply.id"
            :title="`${reply.name} | ${reply.discProfile}`"
            :subtitle="reply.details"
            class="hover-effect"
            rounded="lg"
          >
            <template v-slot:prepend>
              <div class="d-flex align-center">
                <v-avatar 
                  color="primary-lighten"
                  size="42"
                  class="mr-3"
                >
                  <v-icon color="primary">mdi-account</v-icon>
                </v-avatar>
                <v-avatar 
                  color="primary-lighten"
                  size="42"
                >
                  <v-icon color="primary">mdi-reply</v-icon>
                </v-avatar>
              </div>
            </template>
            
            <template v-slot:append>
              <v-btn
                color="primary"
                variant="flat"
                class="integration-action-btn"
                @click="viewReply(reply)"
              >
                View Reply
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <!-- Follow Up Email Opens -->
    <v-card>
      <v-card-title>Follow Up Email Opens</v-card-title>
      <v-card-text>
        <v-list class="integration-list">
          <v-list-item
            v-for="followUp in followUps"
            :key="followUp.id"
            :title="`${followUp.name} | ${followUp.discProfile}`"
            :subtitle="followUp.details"
            class="hover-effect"
            rounded="lg"
          >
            <template v-slot:prepend>
              <div class="d-flex align-center">
                <v-avatar 
                  color="primary-lighten"
                  size="42"
                  class="mr-3"
                >
                  <v-icon color="primary">mdi-account</v-icon>
                </v-avatar>
                <v-avatar 
                  color="primary-lighten"
                  size="42"
                >
                  <v-icon color="primary">mdi-eye-outline</v-icon>
                </v-avatar>
              </div>
            </template>
            
            <template v-slot:append>
              <v-btn
                color="primary"
                variant="flat"
                class="integration-action-btn"
                @click="viewFollowUp(followUp)"
              >
                Follow Up
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <!-- Email Composer Dialog -->
    <EmailComposer
      v-model="showEmailComposer"
      :lead="selectedLead"
      :type="emailComposerType"
      @submit="handleEmailSubmit"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import EmailComposer from '~/components/app/EmailComposer.vue'
import type { Lead } from '~/types/lead'

definePageMeta({
  layout: 'app',
  middleware: ['auth']
})

// Time filter
const timeFilter = ref('Last 7 Days')
const timeFilterOptions = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'All Time']

// Mock statistics data
const stats = ref({
  newLeads: 150,
  repliesGenerated: 89,
  emailsSent: 500,
  openRate: 78,
  bounceRate: 3
})

// Mock data for leads - add proper typing
const newLeads = ref<Lead[]>([
  {
    id: 1,
    name: 'Dil Ahdan',
    discProfile: 'DISC',
    details: '$20k MRR, Security',
  },
  {
    id: 2,
    name: 'Dil Ahdan',
    discProfile: 'DISC',
    details: '$20k MRR, Security',
  }
])

// Mock data for email replies - add proper typing
const emailReplies = ref<Lead[]>([
  {
    id: 1,
    name: 'Dil Ahdan',
    discProfile: 'DISC',
    details: '$20k MRR, Security',
  },
  {
    id: 2,
    name: 'Dil Ahdan',
    discProfile: 'DISC',
    details: '$20k MRR, Security',
  }
])

// Mock data for follow ups - add proper typing
const followUps = ref<Lead[]>([
  {
    id: 1,
    name: 'Dil Ahdan',
    discProfile: 'DISC',
    details: '$20k MRR, Security',
  },
  {
    id: 2,
    name: 'Dil Ahdan',
    discProfile: 'DISC',
    details: '$20k MRR, Security',
  }
])

// Add these refs after the existing refs
const showEmailComposer = ref(false)
const selectedLead = ref<Lead | undefined>(undefined)
const emailComposerType = ref<'new' | 'reply' | 'view'>('new')

// Navigation functions
const viewLead = (lead: Lead) => {
  selectedLead.value = lead
  emailComposerType.value = 'new'
  showEmailComposer.value = true
}

const viewReply = (lead: Lead) => {
  selectedLead.value = lead
  emailComposerType.value = 'reply'
  showEmailComposer.value = true
}

const viewFollowUp = (lead: Lead) => {
  selectedLead.value = lead
  emailComposerType.value = 'view'
  showEmailComposer.value = true
}

// Add handler for email submission
const handleEmailSubmit = async (emailData: any) => {
  try {
    // Here you would typically make an API call to save the email
    console.log('Email data:', emailData)
    // Show success message
    // You might want to add a proper notification system
  } catch (error) {
    console.error('Failed to send email:', error)
    // Show error message
  }
}
</script>

<style scoped>
.stats-filter {
  max-width: 150px;
  background-color: white;
}

.stat-card {
  background: linear-gradient(135deg, var(--v-primary-lighten) 0%, white 100%);
  border: 1px solid var(--v-section-border);
  transition: all 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px -4px rgba(79, 110, 247, 0.1);
}

.integration-action-btn {
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0;
  border-radius: 6px;
  height: 40px;
}

:deep(.dashboard-card) {
  border: 1px solid var(--v-card-border);
  background: white;
  transition: all 0.2s ease;
}

:deep(.card-header) {
  background: linear-gradient(to bottom, white, #f8fafc);
  border-bottom: 1px solid var(--v-card-border);
}

:deep(.hover-elevate:hover) {
  transform: translateY(-2px);
  box-shadow: 0 12px 20px -10px rgba(79, 110, 247, 0.15);
}

:deep(.dashboard-list-item) {
  border: 1px solid var(--v-card-border);
  background: white;
  transition: all 0.2s ease;
  padding: 12px 16px;
  min-height: 72px;
}

:deep(.dashboard-list-item:hover) {
  border-color: var(--v-primary-base);
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

:deep(.v-card-title) {
  border-bottom: 1px solid var(--v-card-border);
  background-color: white;
  color: var(--v-text-medium);
  font-size: 1.25rem;
  padding: 20px 24px;
}

:deep(.v-card-text) {
  padding: 24px;
}

:deep(.v-list-item__content) {
  padding: 12px 0;
}

:deep(.v-list-item-title) {
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 4px;
}

:deep(.v-list-item-subtitle) {
  color: var(--v-text-medium);
  font-size: 0.875rem;
}

/* Remove any transform effects from buttons */
:deep(.v-btn:hover) {
  background-color: var(--v-primary-hover) !important;
}

/* Clean up transitions to exclude transforms */
:deep(.v-btn), :deep(.v-list-item) {
  transition: background-color 0.2s ease, color 0.2s ease;
}

@media (hover: hover) {
  .hover-effect {
    transition: all 0.2s ease;
  }
}

@media (min-width: 960px) {
  :deep(.dashboard-list-item) {
    min-height: 84px;
    padding: 16px 24px;
  }

  :deep(.v-avatar) {
    width: 48px !important;
    height: 48px !important;
  }

  :deep(.v-list-item-title) {
    font-size: 1.1rem;
    margin-bottom: 6px;
  }

  :deep(.integration-action-btn) {
    height: 44px;
    padding: 0 24px;
  }
}
</style> 