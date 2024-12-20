<template>
  <v-container>
    <!-- Statistics Section -->
    <v-card class="mb-6">
      <v-card-title class="text-h6">Statistics</v-card-title>
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
              style="max-width: 150px"
            />
          </v-col>

          <!-- Stats Grid -->
          <v-col cols="12" sm="6" md="3">
            <div class="text-subtitle-1 text-medium-emphasis">New Leads</div>
            <div class="text-h4 font-weight-bold">{{ stats.newLeads }}</div>
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
      <v-card-title class="text-h6">Approve Emails for New Leads</v-card-title>
      <v-card-text>
        <v-list class="integration-list">
          <v-list-item
            v-for="lead in newLeads"
            :key="lead.id"
            :title="`${lead.name} | ${lead.discProfile}`"
            :subtitle="lead.details"
            class="integration-list-item mb-3"
            rounded="lg"
          >
            <!-- Left side with icons -->
            <template v-slot:prepend>
              <div class="d-flex align-center">
                <v-avatar 
                  color="grey-lighten-4" 
                  size="42"
                  class="mr-3"
                >
                  <v-icon color="grey-darken-2">mdi-account</v-icon>
                </v-avatar>
                <v-avatar 
                  color="grey-lighten-4" 
                  size="42"
                >
                  <v-icon color="grey-darken-2">mdi-email-outline</v-icon>
                </v-avatar>
              </div>
            </template>
            
            <!-- Right side with action button -->
            <template v-slot:append>
              <v-btn
                color="black"
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
      <v-card-title class="text-h6">Approve Email Replies</v-card-title>
      <v-card-text>
        <v-list class="integration-list">
          <v-list-item
            v-for="reply in emailReplies"
            :key="reply.id"
            :title="`${reply.name} | ${reply.discProfile}`"
            :subtitle="reply.details"
            class="integration-list-item mb-3"
            rounded="lg"
          >
            <template v-slot:prepend>
              <div class="d-flex align-center">
                <v-avatar 
                  color="grey-lighten-4" 
                  size="42"
                  class="mr-3"
                >
                  <v-icon color="grey-darken-2">mdi-account</v-icon>
                </v-avatar>
                <v-avatar 
                  color="grey-lighten-4" 
                  size="42"
                >
                  <v-icon color="grey-darken-2">mdi-reply</v-icon>
                </v-avatar>
              </div>
            </template>
            
            <template v-slot:append>
              <v-btn
                color="black"
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
      <v-card-title class="text-h6">Follow Up Email Opens</v-card-title>
      <v-card-text>
        <v-list class="integration-list">
          <v-list-item
            v-for="followUp in followUps"
            :key="followUp.id"
            :title="`${followUp.name} | ${followUp.discProfile}`"
            :subtitle="followUp.details"
            class="integration-list-item mb-3"
            rounded="lg"
          >
            <template v-slot:prepend>
              <div class="d-flex align-center">
                <v-avatar 
                  color="grey-lighten-4" 
                  size="42"
                  class="mr-3"
                >
                  <v-icon color="grey-darken-2">mdi-account</v-icon>
                </v-avatar>
                <v-avatar 
                  color="grey-lighten-4" 
                  size="42"
                >
                  <v-icon color="grey-darken-2">mdi-eye-outline</v-icon>
                </v-avatar>
              </div>
            </template>
            
            <template v-slot:append>
              <v-btn
                color="black"
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
.integration-list {
  background: transparent;
}

.integration-list-item {
  border: 1px solid #E2E8F0;
  background: white;
  transition: all 0.2s ease;
  margin-bottom: 12px;
}

.integration-list-item:hover {
  border-color: #CBD5E1;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.integration-action-btn {
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0;
  border-radius: 6px;
  height: 40px;
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
  color: #64748B;
  font-size: 0.875rem;
}
</style> 