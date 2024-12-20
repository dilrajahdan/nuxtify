<template>
  <v-dialog v-model="dialog">
    <v-card class="entrepreneur-details">
      <!-- Header -->
      <v-toolbar class="email-composer-header">
        <div class="d-flex flex-column">
          <v-toolbar-title class="text-subtitle-1 text-md-h6 font-weight-medium">
            {{ entrepreneur?.name }}
          </v-toolbar-title>
          <div class="d-flex align-center mt-2">
            <v-chip
              color="primary-lighten-1"
              size="small"
              variant="flat"
              class="font-weight-medium mr-2 d-flex align-center"
            >
              <v-icon size="16" start class="mr-1">mdi-target</v-icon>
              {{ entrepreneur?.discProfile }}
            </v-chip>
            <v-chip
              v-for="tag in entrepreneurTags"
              :key="tag"
              color="secondary"
              size="small"
              variant="flat"
              class="font-weight-medium mr-2 d-flex align-center"
            >
              <v-icon size="16" start class="mr-1">mdi-pin</v-icon>
              {{ tag }}
            </v-chip>
          </div>
        </div>
        <v-spacer />
        <v-btn
          color="primary"
          variant="flat"
          prepend-icon="mdi-email-outline"
          class="mr-4"
          @click="sendEmail"
        >
          Send Email
        </v-btn>
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          color="medium-emphasis"
          @click="closeDialog"
        />
      </v-toolbar>

      <!-- Content -->
      <v-card-text class="pa-0">
        <v-tabs
          v-model="activeTab"
          color="primary"
          align-tabs="start"
          class="px-6 details-tabs"
        >
          <v-tab value="details">
            <v-icon start>mdi-account-details-outline</v-icon>
            Details
          </v-tab>
          <v-tab value="notes">
            <v-icon start>mdi-note-text-outline</v-icon>
            Notes
          </v-tab>
          <v-tab value="emails">
            <v-icon start>mdi-email-outline</v-icon>
            Emails
          </v-tab>
        </v-tabs>

        <v-window v-model="activeTab" class="px-6 py-4">
          <!-- Details Tab -->
          <v-window-item value="details">
            <div class="details-content">
              <div class="detail-section">
                <div class="text-subtitle-1 font-weight-medium mb-4">Contact Information</div>
                <div class="detail-item">
                  <v-icon size="20" color="medium-emphasis" class="mr-3">mdi-email-outline</v-icon>
                  <div>
                    <div class="detail-label">Email</div>
                    <div class="detail-value">{{ entrepreneur?.email }}</div>
                  </div>
                </div>
              </div>

              <v-divider class="my-6" />

              <div class="detail-section">
                <div class="text-subtitle-1 font-weight-medium mb-4">Goal Information</div>
                <div class="detail-item">
                  <v-icon 
                    size="20" 
                    :color="entrepreneur?.goalStatus === 'active' ? 'success' : 'medium-emphasis'"
                    class="mr-3"
                  >
                    mdi-target
                  </v-icon>
                  <div>
                    <div class="detail-label">Current Goal</div>
                    <div class="detail-value">{{ entrepreneur?.goal }}</div>
                  </div>
                </div>
              </div>
            </div>
          </v-window-item>

          <!-- Notes Tab -->
          <v-window-item value="notes">
            <div class="notes-content">
              <!-- Add Note Form -->
              <v-form @submit.prevent="addNote" class="mb-6">
                <v-textarea
                  v-model="newNote"
                  label="Add a note"
                  placeholder="Type your note here..."
                  variant="outlined"
                  rows="3"
                  hide-details
                  class="mb-3"
                />
                <div class="d-flex justify-end">
                  <v-btn
                    color="primary"
                    variant="flat"
                    type="submit"
                    :disabled="!newNote"
                  >
                    Add Note
                  </v-btn>
                </div>
              </v-form>

              <!-- Notes List -->
              <div class="notes-list">
                <div v-for="note in notes" :key="note.id" class="note-item">
                  <div class="d-flex justify-space-between align-start mb-2">
                    <div class="font-weight-medium">{{ note.author }}</div>
                    <div class="text-caption text-medium-emphasis">
                      {{ useTimeAgo(note.createdAt).value }}
                    </div>
                  </div>
                  <div class="note-content">{{ note.content }}</div>
                </div>
              </div>
            </div>
          </v-window-item>

          <!-- Emails Tab -->
          <v-window-item value="emails">
            <div class="emails-content">
              <div v-for="email in emails" :key="email.id" class="email-item">
                <div class="d-flex justify-space-between align-start mb-2">
                  <div class="font-weight-medium">{{ email.subject }}</div>
                  <div class="text-caption text-medium-emphasis">
                    {{ useTimeAgo(email.sentAt).value }}
                  </div>
                </div>
                <div class="email-preview text-medium-emphasis">
                  {{ email.preview }}
                </div>
                <div class="d-flex align-center mt-2">
                  <v-chip
                    size="x-small"
                    :color="email.status === 'opened' ? 'success' : 'secondary'"
                    variant="flat"
                  >
                    {{ email.status }}
                  </v-chip>
                  <v-spacer />
                  <v-btn
                    variant="text"
                    size="small"
                    color="primary"
                    @click="viewEmail(email)"
                  >
                    View Email
                  </v-btn>
                </div>
              </div>
            </div>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTimeAgo } from '@vueuse/core'
import type { Lead, Note, Email } from '~/types/lead'

interface Props {
  modelValue: boolean
  entrepreneur: Lead | null
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'send-email'])

// Dialog control
const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Tabs
const activeTab = ref('details')

// Computed
const entrepreneurTags = computed(() => {
  return props.entrepreneur?.details.split(',').map(tag => tag.trim()) || []
})

// Notes functionality
const newNote = ref('')
const notes = ref<Note[]>([
  {
    id: 1,
    content: 'Had a great call discussing growth strategy',
    author: 'John Doe',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
  }
])

// Emails list
const emails = ref<Email[]>([
  {
    id: 1,
    subject: 'Welcome to our community!',
    preview: 'Hi there! Welcome to our entrepreneurship community...',
    status: 'opened',
    sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  }
])

// Methods
const closeDialog = () => {
  dialog.value = false
}

const sendEmail = () => {
  emit('send-email', props.entrepreneur)
}

const addNote = () => {
  if (!newNote.value) return

  notes.value.unshift({
    id: Date.now(),
    content: newNote.value,
    author: 'Current User', // Replace with actual user name
    createdAt: new Date()
  })
  newNote.value = ''
}

const viewEmail = (email: Email) => {
  console.log('View email:', email)
  // Implement email viewing logic
}
</script>

<style scoped>
:deep(.email-composer-header) {
  border-bottom: 1px solid var(--v-section-border-color);
  background: linear-gradient(to bottom, white, #f8fafc) !important;
  padding: 20px 24px !important;
}

:deep(.email-composer-header .v-toolbar-title) {
  color: var(--v-text-medium);
  font-size: 1rem;
}

@media (min-width: 960px) {
  :deep(.email-composer-header .v-toolbar-title) {
    font-size: 1.25rem;
  }
}

.entrepreneur-details {
  border-radius: 16px;
  overflow: hidden;
}

:deep(.details-tabs) {
  border-bottom: 1px solid var(--v-border-color);
  background: white;
}

.details-content,
.notes-content,
.emails-content {
  max-width: 100%;
}

.detail-section:not(:last-child) {
  margin-bottom: 24px;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  padding: 12px 16px;
  background-color: var(--v-theme-surface);
  border-radius: 8px;
  border: 1px solid var(--v-border-color);
}

.detail-label {
  font-size: 0.75rem;
  color: var(--v-medium-emphasis);
  margin-bottom: 4px;
}

.detail-value {
  font-size: 0.875rem;
  font-weight: 500;
}

.note-item,
.email-item {
  padding: 16px;
  background-color: var(--v-theme-surface);
  border-radius: 8px;
  border: 1px solid var(--v-border-color);
  margin-bottom: 12px;
}

.note-content,
.email-preview {
  font-size: 0.875rem;
  line-height: 1.5;
}

:deep(.v-field) {
  border-radius: 8px;
  background-color: white !important;
  border: 1px solid #E2E8F0;
}

:deep(.v-field--focused) {
  border-color: rgb(var(--v-theme-primary)) !important;
  border-width: 1px !important;
}

:deep(.v-dialog--active) {
  border-radius: 16px;
  overflow: hidden;
}

:deep(.v-card) {
  border-radius: 16px;
  overflow: hidden;
}

:deep(.v-toolbar) {
  border-bottom: 1px solid var(--v-border-color);
}
</style> 