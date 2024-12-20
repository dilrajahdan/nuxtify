<template>
  <v-container>
    <!-- Statistics Section -->
    <v-card class="mb-6">
      <v-card-title class="d-flex align-center justify-space-between">
        <span class="text-subtitle-1 text-md-h6">Statistics</span>
        <v-select
          v-model="timeFilter"
          :items="timeFilterOptions"
          density="compact"
          variant="outlined"
          hide-details
          class="stats-filter"
        />
      </v-card-title>
      
      <v-card-text>
        <v-row>
          <!-- Stats Grid -->
          <v-col cols="12" sm="6" md="3">
            <div class="stat-card pa-4 rounded-lg">
              <div class="text-subtitle-1 text-medium-emphasis mb-2">New Leads</div>
              <div class="text-h3 font-weight-bold">{{ stats.newLeads }}</div>
            </div>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <div class="stat-card pa-4 rounded-lg">
              <div class="text-subtitle-1 text-medium-emphasis mb-2">Replies Generated</div>
              <div class="text-h3 font-weight-bold">{{ stats.repliesGenerated }}</div>
            </div>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <div class="stat-card pa-4 rounded-lg">
              <div class="text-subtitle-1 text-medium-emphasis mb-2">Emails You Sent</div>
              <div class="text-h3 font-weight-bold">{{ stats.emailsSent }}</div>
            </div>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <div class="stat-card pa-4 rounded-lg">
              <div class="text-subtitle-1 text-medium-emphasis mb-2">Email Open Rate</div>
              <div class="text-h3 font-weight-bold">{{ stats.openRate }}%</div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Approve Emails for New Leads -->
    <v-card class="mb-6">
      <v-card-title class="text-subtitle-1 text-md-h6">Approve Emails for New Leads</v-card-title>
      <v-card-text>
        <v-list class="integration-list">
          <v-list-item
            v-for="lead in newLeads"
            :key="lead.id"
            :title="`${lead.name} | ${lead.discProfile}`"
            :subtitle="lead.details"
            class="text-caption text-md-subtitle-1"
            rounded="lg"
          >
            <!-- Left side with icons -->
            <template v-slot:prepend>
              <div class="d-flex align-center gap-3">
                <v-avatar 
                  color="primary-lighten"
                  size="42"
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
      <v-card-title class="text-subtitle-1 text-md-h6">Approve Email Replies</v-card-title>
      <v-card-text>
        <v-list class="integration-list">
          <v-list-item
            v-for="reply in emailReplies"
            :key="reply.id"
            :title="`${reply.name} | ${reply.discProfile}`"
            :subtitle="reply.details"
            class="text-caption text-md-subtitle-1"
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
      <v-card-title class="text-subtitle-1 text-md-h6">Follow Up Email Opens</v-card-title>
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
              <div class="d-flex align-center gap-3">
                <v-avatar 
                  color="primary-lighten"
                  size="42"
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
            
            <template v-slot:append>
              <v-btn
                color="primary"
                variant="flat"
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
  max-width: 180px;
  background-color: white;
}

/* Component specific overrides only */
:deep(.v-card-title) {
  border-bottom: 1px solid var(--v-card-border);
  background-color: white;
  color: var(--v-text-medium);
  font-size: 1rem;
  padding: 16px 20px;
}

:deep(.v-list-item-title) {
  font-weight: 500;
  font-size: 0.875rem;
  margin-bottom: 2px;
}

:deep(.v-list-item-subtitle) {
  color: var(--v-text-medium);
  font-size: 0.75rem;
}

/* Media query overrides */
@media (min-width: 960px) {
  :deep(.v-card-title) {
    font-size: 1.25rem;
    padding: 20px 24px;
  }

  :deep(.v-list-item-title) {
    font-size: 1.1rem;
    margin-bottom: 6px;
  }

  :deep(.v-list-item-subtitle) {
    font-size: 0.875rem;
  }
}

:deep(.v-list-item) {
  column-gap: var(--space-4);
}
</style> 