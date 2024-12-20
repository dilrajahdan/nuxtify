<template>
  <v-dialog v-model="dialog">
    <v-card class="email-composer">
      <!-- Header -->
      <v-toolbar
        class="px-6 py-4"
        color="white"
        density="comfortable"
      >
        <v-toolbar-title class="text-h6 font-weight-medium">
          {{ dialogTitle }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          color="medium-emphasis"
          @click="closeDialog"
        />
      </v-toolbar>

      <!-- Content -->
      <v-card-text class="px-6 py-4">
        <!-- Lead Info -->
        <div class="mb-8">
          <div class="d-flex align-center mb-4">
            <v-avatar 
              :image="props.lead?.avatar" 
              size="48" 
              class="mr-4 elevation-1"
            >
              <v-icon size="24" color="grey-darken-2">mdi-account</v-icon>
            </v-avatar>
            <div>
              <div class="text-h6 font-weight-medium mb-1">{{ props.lead?.name }}</div>
              <div class="d-flex align-center">
                <v-chip
                  color="primary"
                  size="small"
                  variant="flat"
                  class="font-weight-medium mr-2"
                >
                  {{ props.lead?.discProfile }}
                </v-chip>
                <v-chip
                  v-for="tag in leadTags"
                  :key="tag"
                  color="secondary"
                  size="small"
                  variant="flat"
                  class="font-weight-medium mr-2"
                >
                  {{ tag }}
                </v-chip>
              </div>
            </div>
          </div>
        </div>

        <!-- Email Form -->
        <v-form ref="form" @submit.prevent="handleSubmit" class="email-form">
          <!-- Subject -->
          <v-text-field
            v-model="emailData.subject"
            label="Subject Line"
            placeholder="Enter attention-grabbing subject"
            :readonly="props.type === 'view'"
            class="mb-6"
            variant="outlined"
            bg-color="white"
          />

          <!-- Formatting Tools -->
          <div class="formatting-tools pa-4 mb-4 rounded-lg">
            <v-btn-group class="mr-4">
              <v-btn
                v-for="format in ['H1', 'H2', 'B']"
                :key="format"
                size="small"
                :color="activeFormat === format ? 'primary' : undefined"
                variant="tonal"
                @click="applyFormat(format)"
              >
                {{ format }}
              </v-btn>
            </v-btn-group>
            
            <v-btn
              prepend-icon="mdi-video"
              size="small"
              :color="showVideoInput ? 'primary' : undefined"
              variant="tonal"
              @click="insertVideo"
            >
              Add Video
            </v-btn>
          </div>

          <!-- Email Body -->
          <v-textarea
            v-model="emailData.body"
            label="Email Body"
            placeholder="Write your message here..."
            :rows="8"
            class="mb-6"
            :readonly="props.type === 'view'"
            variant="outlined"
            bg-color="white"
          />

          <!-- Optional Video Section -->
          <v-expand-transition>
            <div v-if="showVideoInput" class="mb-6">
              <v-text-field
                v-model="emailData.videoUrl"
                label="Video URL"
                placeholder="Paste your video URL here"
                append-inner-icon="mdi-close"
                variant="outlined"
                bg-color="white"
                @click:append-inner="showVideoInput = false"
              />
            </div>
          </v-expand-transition>

        </v-form>
      </v-card-text>

      <!-- Actions -->
      <v-card-actions class="px-6 py-4 actions-border">
        <v-spacer />
        <v-btn
          variant="tonal"
          size="large"
          class="px-6"
          @click="closeDialog"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          size="large"
          class="ml-3 px-6"
          @click="handleSubmit"
        >
          {{ submitButtonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { Lead } from '~/types/lead'

interface Props {
  modelValue: boolean
  lead?: Lead
  type?: 'new' | 'reply' | 'view'
}

interface EmailData {
  subject: string
  body: string
  videoUrl: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'new'
})

const emit = defineEmits(['update:modelValue', 'submit'])

// Dialog control
const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Form data
const emailData = ref<EmailData>({
  subject: '',
  body: '',
  videoUrl: '',
})

const showVideoInput = ref(false)

// Computed lead tags from details
const leadTags = computed(() => {
  return props.lead?.details.split(',').map(tag => tag.trim()) || []
})

// Methods
const closeDialog = () => {
  dialog.value = false
  resetForm()
}

const resetForm = () => {
  emailData.value = {
    subject: '',
    body: '',
    videoUrl: '',

  }
  showVideoInput.value = false
}

const activeFormat = ref('')

const applyFormat = (format: string) => {
  activeFormat.value = format
  const formats: Record<string, string> = {
    'H1': '# ',
    'H2': '## ',
    'B': '**'
  }
  emailData.value.body += formats[format]
}

const insertVideo = () => {
  showVideoInput.value = true
}

const handleSubmit = () => {
  emit('submit', {
    leadId: props.lead?.id,
    ...emailData.value
  })
  closeDialog()
}

// Add these computed properties
const dialogTitle = computed(() => {
  const titles = {
    new: `Approve Email for ${props.lead?.name}`,
    reply: `Review Reply for ${props.lead?.name}`,
    view: `View Email for ${props.lead?.name}`
  }
  return titles[props.type] || titles.new
})

const submitButtonText = computed(() => {
  const buttons = {
    new: 'Send Email',
    reply: 'Send Reply',
    view: 'Send Follow Up'
  }
  return buttons[props.type] || buttons.new
})
</script>

<style scoped>
.email-composer {
  border-radius: 16px;
  overflow: hidden;
  background-color: #F8FAFC;
}

.email-form {
  max-width: 100%;
}

.formatting-tools {
  background-color: white;
  border: 1px solid #E2E8F0;
}

.actions-border {
  border-top: 1px solid #E2E8F0;
  background-color: white;
}

:deep(.v-field) {
  border-radius: 8px;
  background-color: white !important;
}

:deep(.v-field__input) {
  padding: 12px 16px;
  min-height: 48px;
}

:deep(.v-label) {
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748B;
}

:deep(.v-btn--size-small) {
  height: 36px;
  min-width: 36px;
  padding: 0 12px;
  letter-spacing: 0.5px;
  font-weight: 500;
}

:deep(.v-btn--size-large) {
  height: 48px;
  min-width: 120px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

:deep(.v-toolbar) {
  border-bottom: 1px solid #E2E8F0;
}

:deep(.v-chip) {
  font-size: 0.75rem;
  font-weight: 500;
}

:deep(.v-chip--size-small) {
  --v-chip-size: 24px;
}

:deep(.v-field--focused) {
  border-color: #4F6EF7 !important;
}

:deep(.v-field:hover) {
  border-color: #CBD5E1;
}
</style> 