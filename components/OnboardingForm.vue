<template>
  <v-card class="pa-4 pa-sm-6 pa-md-8">
    <h2 class="text-h5 font-weight-bold mb-6">Let's Get Started</h2>
    
    <div class="mt-4">
      <!-- Step 1: DISC Profile & Goals -->
      <div v-show="currentStep === 1">
        <v-form v-model="isStepOneValid" @submit.prevent>
          <div class="d-flex flex-column gap-8">
            <!-- DISC Profile Selection -->
            <v-select
              v-model="form.discProfile"
              :items="discProfiles"
              :rules="[rules.required]"
              item-title="title"
              item-value="value"
              variant="outlined"
              hide-details
              :menu-props="{ contentClass: 'select-menu' }"
              class="mb-4"
            >
              <template v-slot:append-inner>
                <v-tooltip location="top" text="Don't know your DISC profile?">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      v-bind="props"
                      color="primary"
                      class="ms-2"
                      @click.stop="handleInfoClick"
                    >
                      mdi-information
                    </v-icon>
                  </template>
                </v-tooltip>
              </template>
            </v-select>

            <!-- Current Situation -->
            <v-textarea
              v-model="form.currentSituation"
              :rules="[rules.required, rules.minLength]"
              placeholder="Current Situation"
              variant="outlined"
              rows="3"
              auto-grow
              hide-details
              class="mb-4"
            />

            <!-- Goal -->
            <v-textarea
              v-model="form.goal"
              :rules="[rules.required, rules.minLength]"
              placeholder="Your Goal"
              variant="outlined"
              rows="3"
              auto-grow
              hide-details
              class="mb-4"
            />

            <!-- Next Button -->
            <v-btn
              color="primary"
              size="large"
              block
              :disabled="!isStepOneValid"
              @click="currentStep = 2"
            >
              Continue
              <v-icon end icon="mdi-arrow-right" />
            </v-btn>
          </div>
        </v-form>
      </div>

      <!-- Step 2: Contact Information -->
      <div v-show="currentStep === 2">
        <v-form v-model="isStepTwoValid" @submit.prevent="handleSubmit">
          <div class="d-flex flex-column gap-8">
            <!-- Name Input -->
            <v-text-field
              v-model="form.name"
              :rules="[rules.required]"
              placeholder="Your Name"
              variant="outlined"
              hide-details
              class="mb-4"
              autocomplete="name"
            />

            <!-- Email Input -->
            <v-text-field
              v-model="form.email"
              :rules="[rules.required, rules.email]"
              placeholder="Email Address"
              variant="outlined"
              hide-details
              prepend-inner-icon="mdi-email-outline"
              class="mb-4"
              autocomplete="email"
            />

            <!-- Navigation Buttons -->
            <div class="d-flex gap-4">
              <v-btn
                variant="outlined"
                size="large"
                @click="currentStep = 1"
                :disabled="loading"
              >
                <v-icon start icon="mdi-arrow-left" />
                
              </v-btn>
              <v-spacer />
              <v-btn
                color="primary"
                size="large"
                type="submit"
                :loading="loading"
                :disabled="!isStepTwoValid"
                class="flex-grow-1"
              >
                Get into Action Mode
              </v-btn>
            </div>
          </div>
        </v-form>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
const currentStep = ref(1)
const isStepOneValid = ref(false)
const isStepTwoValid = ref(false)
const loading = ref(false)

const discProfiles = [
  { title: 'Select DISC Profile', value: '', disabled: true },
  { title: 'D - Dominant', value: 'D' },
  { title: 'I - Influential', value: 'I' },
  { title: 'S - Steady', value: 'S' },
  { title: 'C - Conscientious', value: 'C' },
  { title: 'Not Sure', value: 'unknown' }
]

const form = ref({
  name: '',
  email: '',
  discProfile: '',
  currentSituation: '',
  goal: ''
})

const rules = {
  required: (v: string) => !!v || 'This field is required',
  email: (v: string) => /.+@.+\..+/.test(v) || 'Please enter a valid email',
  minLength: (v: string) => v.length >= 20 || 'Please provide more detail (minimum 20 characters)'
}

const handleInfoClick = () => {
  // Open DISC profile information modal or navigate to info page
  console.log('Show DISC profile information')
}

const handleSubmit = async () => {
  try {
    loading.value = true
    // TODO: Implement form submission logic
    console.log('Form submitted:', form.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Reset form after successful submission
    form.value = {
      name: '',
      email: '',
      discProfile: '',
      currentSituation: '',
      goal: ''
    }
    currentStep.value = 1
    
    // Show success message
    // You might want to emit an event or use a toast notification here
  } catch (error) {
    console.error('Error submitting form:', error)
    // Handle error (show error message)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
:deep(.v-field) {
  border-radius: 16px !important;
  border: 1px solid #CBD5E1 !important;
  background-color: #F8FAFC !important;
}

:deep(.v-field--focused) {
  border-color: var(--v-theme-primary) !important;
  background-color: #FFFFFF !important;
}

:deep(.v-field__outline) {
  display: none;
}

:deep(.v-field__input) {
  min-height: 56px !important;
  padding: 12px 16px !important;
  color: #1E293B !important;
}

:deep(.v-text-field .v-field__input),
:deep(.v-textarea .v-field__input) {
  padding-top: 12px !important;
  padding-bottom: 12px !important;
}

:deep(.v-label) {
  display: none;
}

:deep(.v-field input::placeholder),
:deep(.v-field textarea::placeholder) {
  color: #94A3B8 !important;
  opacity: 1;
  font-size: 16px;
}

:deep(.v-btn) {
  text-transform: none !important;
  font-weight: 500 !important;
  letter-spacing: 0 !important;
}

:deep(.v-field__prepend-inner) {
  padding-right: 8px;
  opacity: 0.7;
}

:deep(.v-field__append-inner) {
  padding-left: 8px;
}

:deep(.v-select .v-field__input) {
  color: #94A3B8 !important; /* Placeholder color */
}

:deep(.v-select .v-field__input:has(.v-select__selection)) {
  color: #1E293B !important; /* Selected value color */
}

:deep(.select-menu) {
  border-radius: 16px !important;
  margin-top: 4px !important;
}

:deep(.v-list-item) {
  min-height: 44px !important;
}

:deep(.v-list-item-title) {
  font-size: 16px !important;
  color: #1E293B !important;
}

@media (max-width: 600px) {
  :deep(.v-field__input) {
    font-size: 14px !important;
  }

  :deep(.v-field input::placeholder),
  :deep(.v-field textarea::placeholder) {
    font-size: 14px;
  }

  :deep(.v-btn) {
    width: 100%;
  }
}

@media (max-width: 400px) {
  :deep(.d-flex.gap-4) {
    flex-direction: column;
    gap: 16px !important;
  }
}
</style> 