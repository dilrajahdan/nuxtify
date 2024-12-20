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
        <v-row class="stats-grid">
          <!-- New Entrepreneurs -->
          <v-col cols="6" sm="6" md="3">
            <div class="stat-card pa-4 rounded-lg">
              <div class="stat-label text-medium-emphasis mb-2">New Entrepreneurs</div>
              <div class="stat-value font-weight-bold">{{ stats.newLeads }}</div>
            </div>
          </v-col>

          <!-- Replies Generated -->
          <v-col cols="6" sm="6" md="3">
            <div class="stat-card pa-4 rounded-lg">
              <div class="stat-label text-medium-emphasis mb-2">Replies Generated</div>
              <div class="stat-value font-weight-bold">{{ stats.repliesGenerated }}</div>
            </div>
          </v-col>

          <!-- Emails Sent -->
          <v-col cols="6" sm="6" md="3">
            <div class="stat-card pa-4 rounded-lg">
              <div class="stat-label text-medium-emphasis mb-2">Emails You Sent</div>
              <div class="stat-value font-weight-bold">{{ stats.emailsSent }}</div>
            </div>
          </v-col>

          <!-- Email Open Rate -->
          <v-col cols="6" sm="6" md="3">
            <div class="stat-card pa-4 rounded-lg">
              <div class="stat-label text-medium-emphasis mb-2">Email Open Rate</div>
              <div class="stat-value font-weight-bold">{{ stats.openRate }}%</div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Approve Emails for New Leads -->
    <v-card class="mb-6">
      <v-card-title class="text-subtitle-1 text-md-h6">Approve Emails for New Entrepreneurs</v-card-title>
      <v-card-text>
        <v-list class="integration-list pa-0">
          <v-list-item
            v-for="lead in newLeads"
            :key="lead.id"
            class="hover-effect mb-3"
            rounded="lg"
          >
            <!-- Desktop Layout -->
            <template v-slot:prepend>
              <div class="d-none d-sm-flex align-center gap-3">
                <v-avatar color="primary-lighten" size="42">
                  <v-icon color="primary">mdi-account</v-icon>
                </v-avatar>
                <v-avatar color="primary-lighten" size="42">
                  <v-icon color="primary">mdi-email-outline</v-icon>
                </v-avatar>
              </div>
            </template>

            <!-- Content -->
            <div class="d-flex flex-column flex-sm-row align-sm-center">
              <!-- Left side info -->
              <div class="flex-grow-1">
                <!-- Name and DISC row -->
                <div class="d-flex align-center mb-1">
                  <div class="font-weight-medium">{{ lead.name }}</div>
                  <v-chip
                    size="x-small"
                    color="primary-lighten-1"
                    variant="flat"
                    class="ml-2"
                  >
                    {{ lead.discProfile }}
                  </v-chip>
                </div>

                <!-- Email and Goal row -->
                <div class="d-flex flex-column flex-sm-row align-sm-center gap-2">
                  <div class="text-body-2 text-medium-emphasis">{{ lead.email }}</div>
                  <div class="d-flex align-center text-body-2">
                    <v-icon size="16" color="success" class="mr-1">mdi-target</v-icon>
                    {{ lead.goal }}
                  </div>
                </div>
              </div>

              <!-- Right side - Tags and Button -->
              <div class="d-flex flex-column flex-sm-row align-sm-center gap-sm-4 mt-2 mt-sm-0">
                <div class="d-flex flex-wrap gap-1">
                  <v-chip
                    v-for="tag in lead.tags"
                    :key="tag"
                    size="x-small"
                    color="secondary"
                    variant="flat"
                  >
                    {{ tag }}
                  </v-chip>
                </div>
                <div class="d-flex justify-end mt-2 mt-sm-0">
                  <v-btn color="primary" variant="flat" size="small" @click="viewLead(lead)">
                    View Details
                  </v-btn>
                </div>
              </div>
            </div>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <!-- Approve Email Replies -->
    <v-card class="mb-6">
      <v-card-title class="text-subtitle-1 text-md-h6">Approve Email Replies</v-card-title>
      <v-card-text>
        <v-list class="integration-list pa-0">
          <v-list-item
            v-for="reply in emailReplies"
            :key="reply.id"
            class="hover-effect mb-3"
            rounded="lg"
          >
            <!-- Desktop Layout -->
            <template v-slot:prepend>
              <div class="d-none d-sm-flex align-center gap-3">
                <v-avatar color="primary-lighten" size="42">
                  <v-icon color="primary">mdi-account</v-icon>
                </v-avatar>
                <v-avatar color="primary-lighten" size="42">
                  <v-icon color="primary">mdi-reply</v-icon>
                </v-avatar>
              </div>
            </template>

            <!-- Content -->
            <div class="d-flex flex-column flex-sm-row align-sm-center">
              <!-- Left side info -->
              <div class="flex-grow-1">
                <!-- Name and DISC row -->
                <div class="d-flex align-center mb-1">
                  <div class="font-weight-medium">{{ reply.name }}</div>
                  <v-chip
                    size="x-small"
                    color="primary-lighten-1"
                    variant="flat"
                    class="ml-2"
                  >
                    {{ reply.discProfile }}
                  </v-chip>
                </div>

                <!-- Email and Goal row -->
                <div class="d-flex flex-column flex-sm-row align-sm-center gap-2">
                  <div class="text-body-2 text-medium-emphasis">{{ reply.email }}</div>
                  <div class="d-flex align-center text-body-2">
                    <v-icon size="16" color="success" class="mr-1">mdi-target</v-icon>
                    {{ reply.goal }}
                  </div>
                </div>
              </div>

              <!-- Right side - Tags and Button -->
              <div class="d-flex flex-column flex-sm-row align-sm-center gap-sm-4 mt-2 mt-sm-0">
                <div class="d-flex flex-wrap gap-1">
                  <v-chip
                    v-for="tag in reply.tags"
                    :key="tag"
                    size="x-small"
                    color="secondary"
                    variant="flat"
                  >
                    {{ tag }}
                  </v-chip>
                </div>
                <div class="d-flex justify-end mt-2 mt-sm-0">
                  <v-btn color="primary" variant="flat" size="small" @click="viewReply(reply)">
                    View Reply
                  </v-btn>
                </div>
              </div>
            </div>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <!-- Follow Up Email Opens -->
    <v-card>
      <v-card-title class="text-subtitle-1 text-md-h6">Follow Up Email Opens</v-card-title>
      <v-card-text>
        <v-list class="integration-list pa-0">
          <v-list-item
            v-for="followUp in followUps"
            :key="followUp.id"
            class="hover-effect mb-3"
            rounded="lg"
          >
            <!-- Desktop Layout (hidden on mobile) -->
            <template v-slot:prepend>
              <div class="d-none d-sm-flex align-center gap-3">
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

            <!-- Content -->
            <div class="d-flex flex-column flex-sm-row align-sm-center">
              <!-- Left side info -->
              <div class="flex-grow-1">
                <!-- Name and DISC row -->
                <div class="d-flex align-center mb-1">
                  <div class="font-weight-medium">{{ followUp.name }}</div>
                  <v-chip
                    size="x-small"
                    color="primary-lighten-1"
                    variant="flat"
                    class="ml-2"
                  >
                    {{ followUp.discProfile }}
                  </v-chip>
                </div>

                <!-- Email and Goal row -->
                <div class="d-flex flex-column flex-sm-row align-sm-center gap-2">
                  <div class="text-body-2 text-medium-emphasis">{{ followUp.email }}</div>
                  <div class="d-flex align-center text-body-2">
                    <v-icon size="16" color="success" class="mr-1">mdi-target</v-icon>
                    {{ followUp.goal }}
                  </div>
                </div>
              </div>

              <!-- Right side - Tags and Button -->
              <div class="d-flex flex-column flex-sm-row align-sm-center gap-sm-4 mt-2 mt-sm-0">
                <div class="d-flex flex-wrap gap-1">
                  <v-chip
                    v-for="tag in followUp.tags"
                    :key="tag"
                    size="x-small"
                    color="secondary"
                    variant="flat"
                  >
                    {{ tag }}
                  </v-chip>
                </div>
                <div class="d-flex justify-end mt-2 mt-sm-0">
                  <v-btn
                    color="primary"
                    variant="flat"
                    size="small"
                    @click="viewFollowUp(followUp)"
                  >
                    Follow Up
                  </v-btn>
                </div>
              </div>
            </div>
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
    email: 'dil@example.com',
    discProfile: 'DISC',
    goal: 'Reach $20k MRR',
    goalStatus: 'active',
    tags: ['Security'],
    lastContactDate: new Date(),
    details: '$20k MRR, Security',
  },
  {
    id: 2,
    name: 'Dil Ahdan',
    email: 'dil@example.com',
    discProfile: 'DISC',
    goal: 'Reach $20k MRR',
    goalStatus: 'active',
    tags: ['Security'],
    lastContactDate: new Date(),
    details: '$20k MRR, Security',
  }
])

// Mock data for email replies - add proper typing
const emailReplies = ref<Lead[]>([
  {
    id: 1,
    name: 'Dil Ahdan',
    email: 'dil@example.com',
    discProfile: 'DISC',
    goal: 'Reach $20k MRR',
    goalStatus: 'active',
    tags: ['Security'],
    lastContactDate: new Date(),
    details: '$20k MRR, Security',
  },
  {
    id: 2,
    name: 'Dil Ahdan',
    email: 'dil@example.com',
    discProfile: 'DISC',
    goal: 'Reach $20k MRR',
    goalStatus: 'active',
    tags: ['Security'],
    lastContactDate: new Date(),
    details: '$20k MRR, Security',
  }
])

// Mock data for follow ups - add proper typing
const followUps = ref<Lead[]>([
  {
    id: 1,
    name: 'Dil Ahdan',
    email: 'dil@example.com',
    discProfile: 'DISC',
    goal: 'Reach $20k MRR',
    goalStatus: 'active',
    tags: ['Security'],
    lastContactDate: new Date(),
    details: '$20k MRR, Security',
  },
  {
    id: 2,
    name: 'Dil Ahdan',
    email: 'dil@example.com',
    discProfile: 'DISC',
    goal: 'Reach $20k MRR',
    goalStatus: 'active',
    tags: ['Security'],
    lastContactDate: new Date(),
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

/* Add these styles */
.hover-effect {
  transition: all 0.2s ease;
  background-color: white;
  border: 1px solid var(--v-border-color);
}

.hover-effect:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

:deep(.v-list-item) {
  padding: 16px;
  background: white;
  border-bottom: 1px solid var(--v-border-color);
  margin-bottom: 12px;
}

:deep(.v-list-item:last-child) {
  border-bottom: none;
}

@media (max-width: 600px) {
  :deep(.v-list-item) {
    padding: 12px;
  }

  .text-body-2 {
    font-size: 0.8125rem;
  }
}

/* Update the list-item styles */
:deep(.v-list) {
  background: transparent;
}

:deep(.v-list-item) {
  padding: 16px;
  background: white;
}

/* Add these styles */
.gap-2 {
  gap: 8px;
}

.gap-sm-4 {
  gap: 16px;
}

@media (min-width: 600px) {
  :deep(.v-list-item) {
    padding: 12px 16px;
  }
}

/* Update your existing styles */
.stat-label {
  font-size: var(--text-sm);
  line-height: 1.2;
}

.stat-value {
  font-size: 2rem;
  line-height: 1;
}

@media (max-width: 600px) {
  .stat-value {
    font-size: 1.5rem;
  }
  
  .stat-label {
    font-size: var(--text-xs);
  }
  
  .stat-card {
    padding: var(--space-3) !important;
  }
}
</style> 