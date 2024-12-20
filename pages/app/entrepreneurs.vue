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
          <!-- Total Entrepreneurs -->
          <v-col cols="6" sm="6" md="3">
            <div class="stat-card pa-4 rounded-lg">
              <div class="stat-label text-medium-emphasis mb-2">Total Entrepreneurs</div>
              <div class="stat-value font-weight-bold">{{ stats.total }}</div>
            </div>
          </v-col>

          <!-- Active Goals -->
          <v-col cols="6" sm="6" md="3">
            <div class="stat-card pa-4 rounded-lg">
              <div class="stat-label text-medium-emphasis mb-2">Active Goals</div>
              <div class="stat-value font-weight-bold">{{ stats.activeGoals }}</div>
            </div>
          </v-col>

          <!-- Avg Response Time -->
          <v-col cols="6" sm="6" md="3">
            <div class="stat-card pa-4 rounded-lg">
              <div class="stat-label text-medium-emphasis mb-2">Avg Response Time</div>
              <div class="stat-value font-weight-bold">{{ stats.avgResponseTime }}h</div>
            </div>
          </v-col>

          <!-- Success Rate -->
          <v-col cols="6" sm="6" md="3">
            <div class="stat-card pa-4 rounded-lg">
              <div class="stat-label text-medium-emphasis mb-2">Goal Success Rate</div>
              <div class="stat-value font-weight-bold">{{ stats.successRate }}%</div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Entrepreneurs List -->
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        <span class="text-subtitle-1 text-md-h6">All Entrepreneurs</span>
        <div class="d-flex align-center gap-3">
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Search"
            density="compact"
            variant="outlined"
            hide-details
            class="search-field"
          />
          <v-btn
            prepend-icon="mdi-plus"
            color="primary"
            variant="flat"
          >
            Add New
          </v-btn>
        </div>
      </v-card-title>

      <v-card-text>
        <v-table>
          <thead>
            <tr>
              <th>Entrepreneur</th>
              <th>Email</th>
              <th>Goal</th>
              <th>Tags</th>
              <th>Last Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entrepreneur in filteredEntrepreneurs" :key="entrepreneur.id">
              <!-- Entrepreneur Info -->
              <td>
                <div 
                  class="d-flex align-center cursor-pointer"
                  @click="viewDetails(entrepreneur)"
                >
                  <v-avatar 
                    :image="entrepreneur.avatar" 
                    size="40" 
                    class="mr-3"
                  >
                    <v-icon size="20">mdi-account</v-icon>
                  </v-avatar>
                  <div>
                    <div class="font-weight-medium">{{ entrepreneur.name }}</div>
                    <v-chip
                      size="x-small"
                      color="primary-lighten-1"
                      variant="flat"
                      class="mt-1"
                    >
                      {{ entrepreneur.discProfile }}
                    </v-chip>
                  </div>
                </div>
              </td>

              <!-- Email -->
              <td>{{ entrepreneur.email }}</td>

              <!-- Goal -->
              <td>
                <div class="d-flex align-center">
                  <v-icon 
                    size="18" 
                    :color="entrepreneur.goalStatus === 'active' ? 'success' : 'grey'"
                    class="mr-2"
                  >
                    mdi-target
                  </v-icon>
                  {{ entrepreneur.goal }}
                </div>
              </td>

              <!-- Tags -->
              <td>
                <div class="d-flex gap-1 flex-wrap">
                  <v-chip
                    v-for="tag in entrepreneur.tags"
                    :key="tag"
                    size="x-small"
                    color="secondary"
                    variant="flat"
                  >
                    {{ tag }}
                  </v-chip>
                </div>
              </td>

              <!-- Last Contact -->
              <td>
                <div class="d-flex align-center text-medium-emphasis">
                  <v-icon size="18" class="mr-2">mdi-clock-outline</v-icon>
                  {{ useTimeAgo(entrepreneur.lastContactDate).value }}
                </div>
              </td>

              <!-- Actions -->
              <td>
                <div class="d-flex gap-2">
                  <v-btn
                    icon="mdi-email-outline"
                    size="small"
                    variant="text"
                    color="primary"
                    @click="sendEmail(entrepreneur)"
                  />
                  <v-btn
                    icon="mdi-eye-outline"
                    size="small"
                    variant="text"
                    @click="viewDetails(entrepreneur)"
                  />
                  <v-btn
                    icon="mdi-dots-vertical"
                    size="small"
                    variant="text"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>

    <!-- Email Composer Dialog -->
    <EmailComposer
      v-model="showEmailComposer"
      :lead="selectedEntrepreneur || undefined"
      @submit="handleEmailSubmit"
    />

    <!-- Entrepreneur Details Dialog -->
    <EntrepreneurDetails
      v-model="showDetails"
      :entrepreneur="selectedEntrepreneur"
      @send-email="handleSendEmail"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTimeAgo } from '@vueuse/core'
import type { Lead } from '~/types/lead'
import EntrepreneurDetails from '~/components/app/EntrepreneurDetails.vue'

definePageMeta({
  layout: 'app',
  middleware: ['auth']
})

// Time filter
const timeFilter = ref('Last 7 Days')
const timeFilterOptions = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'All Time']

// Search
const search = ref('')
const showDetails = ref(false)
const showEmailComposer = ref(false)
const selectedEntrepreneur = ref<Lead | null>(null)

// Stats data
const stats = ref({
  total: 156,
  activeGoals: 89,
  avgResponseTime: 3.2,
  successRate: 78
})

// Mock entrepreneurs data
const entrepreneurs = ref<Lead[]>([
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    avatar: '',
    discProfile: 'DISC',
    goal: 'Reach $50k MRR',
    goalStatus: 'active',
    tags: ['SaaS', 'B2B', 'Early Stage'],
    lastContactDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
    details: 'SaaS, B2B, Early Stage'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: '',
    discProfile: 'DISC',
    goal: 'Launch MVP',
    goalStatus: 'active',
    tags: ['E-commerce', 'B2C', 'Pre-launch'],
    lastContactDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    details: 'E-commerce, B2C, Pre-launch'
  }
])

// Filtered entrepreneurs based on search
const filteredEntrepreneurs = computed(() => {
  if (!search.value) return entrepreneurs.value
  
  const searchLower = search.value.toLowerCase()
  return entrepreneurs.value.filter(e => 
    e.name.toLowerCase().includes(searchLower) ||
    e.email.toLowerCase().includes(searchLower) ||
    e.goal.toLowerCase().includes(searchLower) ||
    e.tags.some(tag => tag.toLowerCase().includes(searchLower))
  )
})

// Methods
const sendEmail = (entrepreneur: Lead) => {
  selectedEntrepreneur.value = entrepreneur
  showEmailComposer.value = true
}

const viewDetails = (entrepreneur: Lead) => {
  console.log('Opening details for:', entrepreneur)
  selectedEntrepreneur.value = entrepreneur
  showDetails.value = true
}

const handleEmailSubmit = async (emailData: any) => {
  try {
    console.log('Email submitted:', emailData)
    // Implement email submission logic
  } catch (error) {
    console.error('Failed to send email:', error)
  }
}

const handleSendEmail = (entrepreneur: Lead) => {
  showDetails.value = false
  showEmailComposer.value = true
}
</script>

<style scoped>
.stats-filter {
  max-width: 180px;
  background-color: white;
}

.search-field {
  width: 280px;
}

.stat-label {
  font-size: var(--text-sm);
  line-height: 1.2;
}

.stat-value {
  font-size: var(--text-3xl);
  line-height: 1;
}

@media (max-width: 600px) {
  .stat-value {
    font-size: var(--text-2xl);
  }
  
  .stat-label {
    font-size: var(--text-xs);
  }
  
  .stat-card {
    padding: var(--space-3) !important;
  }

  .v-card-title {
    flex-direction: column;
    align-items: stretch !important;
    gap: 16px;
  }

  .search-field {
    width: 100%;
  }

  .stats-filter {
    max-width: 140px;
  }
}

:deep(.v-table) {
  background-color: transparent;
}

:deep(.v-table th) {
  font-size: 0.875rem;
  color: var(--v-medium-emphasis);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

:deep(.v-table td) {
  font-size: 0.875rem;
  height: 72px;
}

.cursor-pointer {
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.cursor-pointer:hover {
  opacity: 0.8;
}
</style> 