<template>
  <div class="onboarding-form">
    <!-- Initial Question Card -->
    <v-card
      v-if="!isExpanded"
      class="question-card pa-6"
    >
      <div class="question-content">
        <h2 class="text-h5 font-weight-bold mb-6">
          What's the main thing holding you back in your business right now?
        </h2>
        <v-radio-group
          v-model="form.mainChallenge"
          class="option-group"
          hide-details
        >
          <v-radio
            v-for="option in challengeOptions"
            :key="option.value"
            :value="option.value"
            :label="option.label"
            color="primary"
            class="option-item mb-4"
            
          />
        </v-radio-group>

        <v-expand-transition>
          <v-textarea
            v-if="form.mainChallenge === 'other'"
            v-model="form.mainChallengeOther"
            placeholder="Tell us more..."
            variant="outlined"
            rows="3"
            auto-grow
            hide-details
            class="mt-4 other-input"
          />
        </v-expand-transition>
      </div>
    </v-card>

    <!-- Main Dialog -->
    <v-dialog
      v-model="isExpanded"
      fullscreen
      transition="dialog-bottom-transition"
      persistent
    >
      <v-card class="dialog-card">
        <!-- Header -->
        <v-toolbar
          class="email-composer-header"
          color="white"
          density="comfortable"
          flat
        >
          <div class="expanded-header">
            <v-toolbar-title
              class="text-subtitle-1 text-md-h6 font-weight-medium"
            >
              Unlock The Next Level of Your Journey With Tailored AI
            </v-toolbar-title>
          </div>
          <v-spacer />
          <v-btn
            icon="mdi-close"
            variant="text"
            size="small"
            color="medium-emphasis"
            @click="handleClose"
          />
        </v-toolbar>

        <!-- Progress Bar -->
        <v-progress-linear
          v-model="progress"
          color="primary"
          height="3"
          class="progress-bar"
        />

        <!-- Main Content -->
        <div class="dialog-content">
          <v-card
            class="question-card mx-auto"
            :class="{
              'pa-4 pa-sm-6 pa-md-8': true,
            }"
          >
            <v-window
              v-model="currentStep"
              class="fill-height"
            >
              <!-- Step 1: Hook Question -->
              <v-window-item :value="1">
                <transition
                  name="fade-slide"
                  mode="out-in"
                >
                  <div class="question-content">
                    <h2 class="text-h5 font-weight-bold mb-6">
                      What's the main thing holding you back in your business
                      right now?
                    </h2>
                    <v-radio-group
                      v-model="form.mainChallenge"
                      class="option-group"
                    >
                      <v-radio
                        v-for="option in challengeOptions"
                        :key="option.value"
                        :value="option.value"
                        :label="option.label"
                        color="primary"
                        class="option-item mb-4"
                      />
                    </v-radio-group>

                    <v-expand-transition>
                      <v-textarea
                        v-if="form.mainChallenge === 'other'"
                        v-model="form.mainChallengeOther"
                        placeholder="Tell us more..."
                        variant="outlined"
                        rows="3"
                        auto-grow
                        hide-details
                        class="mt-4 other-input"
                      />
                    </v-expand-transition>
                  </div>
                </transition>
              </v-window-item>

              <!-- Step 2: Business Stage -->
              <v-window-item :value="2">
                <transition
                  name="fade-slide"
                  mode="out-in"
                >
                  <div class="question-content">
                    <h2 class="text-h5 font-weight-bold mb-6">
                      Which best describes where you're at?
                    </h2>
                    <v-radio-group
                      v-model="form.businessStage"
                      class="option-group"
                    >
                      <v-radio
                        v-for="option in businessStageOptions"
                        :key="option.value"
                        :value="option.value"
                        :label="option.label"
                        color="primary"
                        class="option-item mb-4"
                      />
                    </v-radio-group>
                  </div>
                </transition>
              </v-window-item>

              <!-- Step 3: Business Type -->
              <v-window-item :value="3">
                <transition
                  name="fade-slide"
                  mode="out-in"
                >
                  <div class="question-content">
                    <h2 class="text-h5 font-weight-bold mb-6">
                      What type of business are you building?
                    </h2>
                    <v-radio-group
                      v-model="form.businessType"
                      class="option-group"
                    >
                      <v-radio
                        v-for="option in businessTypeOptions"
                        :key="option.value"
                        :value="option.value"
                        :label="option.label"
                        color="primary"
                        class="option-item mb-4"
                      />
                    </v-radio-group>

                    <v-expand-transition>
                      <v-textarea
                        v-if="form.businessType === 'other'"
                        v-model="form.businessTypeOther"
                        placeholder="Tell us more about your business..."
                        variant="outlined"
                        rows="3"
                        auto-grow
                        hide-details
                        class="mt-4 other-input"
                      />
                    </v-expand-transition>
                  </div>
                </transition>
              </v-window-item>

              <!-- Step 4: Goals -->
              <v-window-item :value="4">
                <transition
                  name="fade-slide"
                  mode="out-in"
                >
                  <div class="question-content">
                    <h2 class="text-h5 font-weight-bold mb-6">
                      What's your biggest goal for the next 12 months?
                    </h2>
                    <v-radio-group
                      v-model="form.goal"
                      class="option-group"
                    >
                      <v-radio
                        v-for="option in goalOptions"
                        :key="option.value"
                        :value="option.value"
                        :label="option.label"
                        color="primary"
                        class="option-item mb-4"
                      />
                    </v-radio-group>

                    <v-expand-transition>
                      <v-textarea
                        v-if="form.goal === 'other'"
                        v-model="form.goalOther"
                        placeholder="Tell us about your goal..."
                        variant="outlined"
                        rows="3"
                        auto-grow
                        hide-details
                        class="mt-4 other-input"
                      />
                    </v-expand-transition>
                  </div>
                </transition>
              </v-window-item>

              <!-- New Step: Goal Meaning -->
              <v-window-item :value="5">
                <transition
                  name="fade-slide"
                  mode="out-in"
                >
                  <div class="question-content">
                    <h2 class="text-h5 font-weight-bold mb-6">
                      What would achieving this goal mean for you?
                    </h2>
                    <v-textarea
                      v-model="form.goalMeaning"
                      placeholder="Share how achieving this goal would impact your life and business..."
                      variant="outlined"
                      rows="4"
                      auto-grow
                      hide-details
                      class="meaning-input"
                    />
                  </div>
                </transition>
              </v-window-item>

              <!-- Contact Info -->
              <v-window-item :value="6">
                <transition
                  name="fade-slide"
                  mode="out-in"
                >
                  <div class="question-content">
                    <h2 class="text-h5 font-weight-bold mb-6">
                      Let's create your personalized action plan.
                    </h2>
                    <div class="d-flex flex-column gap-4">
                      <v-text-field
                        v-model="form.name"
                        placeholder="First Name"
                        variant="outlined"
                        hide-details
                        required
                        class="mb-4"
                        autocomplete="given-name"
                      />
                      <v-text-field
                        v-model="form.email"
                        placeholder="Email Address"
                        variant="outlined"
                        hide-details
                        required
                        type="email"
                        autocomplete="email"
                      />
                    </div>
                  </div>
                </transition>
              </v-window-item>

              <!-- After contact info step -->
              <!-- Step 6: DISC Profile Knowledge -->
              <v-window-item :value="7">
                <transition
                  name="fade-slide"
                  mode="out-in"
                >
                  <div class="question-content">
                    <h2 class="text-h5 font-weight-bold mb-4">
                      Do you know your DISC profile?
                    </h2>
                    <v-radio-group
                      v-model="form.discProfile"
                      class="option-group"
                    >
                      <v-radio
                        v-for="option in discKnowledgeOptions"
                        :key="option.value"
                        :value="option.value"
                        :label="option.label"
                        color="primary"
                        class="option-item mb-2"
                      />
                    </v-radio-group>

                    <v-expand-transition>
                      <div
                        v-if="form.discProfile === 'yes'"
                        class="mt-4"
                      >
                        <h3 class="text-h6 font-weight-medium mb-3">
                          What's your profile?
                        </h3>

                        <!-- Primary Style -->
                        <div class="mb-3">
                          <div class="text-subtitle-1 mb-2">Primary Style</div>
                          <v-radio-group
                            v-model="form.discPrimary"
                            class="option-group"
                          >
                            <v-radio
                              v-for="option in discStyleOptions"
                              :key="option.value"
                              :value="option.value"
                              :label="option.label"
                              color="primary"
                              class="option-item mb-2"
                            />
                          </v-radio-group>
                        </div>

                        <!-- Secondary Style -->
                        <div>
                          <div class="text-subtitle-1 mb-2">
                            Secondary Style
                          </div>
                          <v-radio-group
                            v-model="form.discSecondary"
                            class="option-group"
                          >
                            <v-radio
                              v-for="option in discStyleOptions"
                              :key="option.value"
                              :value="option.value"
                              :label="option.label"
                              color="primary"
                              class="option-item mb-2"
                            />
                          </v-radio-group>
                        </div>
                      </div>
                    </v-expand-transition>
                  </div>
                </transition>
              </v-window-item>

              <!-- DISC Assessment Questions - Only show if doesn't know DISC -->
              <v-window-item
                v-for="(q, index) in discAssessmentQuestions"
                :key="index"
                :value="index + 8"
                v-if="
                  form.discProfile === 'no' || form.discProfile === 'not_sure'
                "
              >
                <transition
                  name="fade-slide"
                  mode="out-in"
                >
                  <div class="question-content">
                    <h2 class="text-h5 font-weight-bold mb-4">
                      {{ q.question }}
                    </h2>
                    <v-radio-group
                      v-model="form.discQuestions[`q${index + 1}`]"
                      class="option-group"
                    >
                      <v-radio
                        v-for="option in q.options"
                        :key="option.value"
                        :value="option.value"
                        :label="option.label"
                        color="primary"
                        class="option-item mb-2"
                      />
                    </v-radio-group>
                  </div>
                </transition>
              </v-window-item>

              <!-- Summary Step -->
              <v-window-item :value="totalSteps">
                <transition
                  name="fade-slide"
                  mode="out-in"
                >
                  <div class="question-content">
                    <h2 class="text-h5 font-weight-bold mb-6">
                      Here's a summary of your responses
                    </h2>

                    <div class="summary-list">
                      <!-- Main Challenge -->
                      <div class="summary-item">
                        <div class="summary-label">Main Challenge:</div>
                        <div class="summary-value">
                          {{
                            challengeOptions.find(
                              (o) => o.value === form.mainChallenge
                            )?.label
                          }}
                          {{
                            form.mainChallenge === 'other'
                              ? `- ${form.mainChallengeOther}`
                              : ''
                          }}
                        </div>
                      </div>

                      <!-- Business Stage -->
                      <div class="summary-item">
                        <div class="summary-label">Business Stage:</div>
                        <div class="summary-value">
                          {{
                            businessStageOptions.find(
                              (o) => o.value === form.businessStage
                            )?.label
                          }}
                        </div>
                      </div>

                      <!-- Business Type -->
                      <div class="summary-item">
                        <div class="summary-label">Business Type:</div>
                        <div class="summary-value">
                          {{
                            businessTypeOptions.find(
                              (o) => o.value === form.businessType
                            )?.label
                          }}
                          {{
                            form.businessType === 'other'
                              ? `- ${form.businessTypeOther}`
                              : ''
                          }}
                        </div>
                      </div>

                      <!-- Goal -->
                      <div class="summary-item">
                        <div class="summary-label">12-Month Goal:</div>
                        <div class="summary-value">
                          {{
                            goalOptions.find((o) => o.value === form.goal)
                              ?.label
                          }}
                          {{
                            form.goal === 'other' ? `- ${form.goalOther}` : ''
                          }}
                        </div>
                      </div>

                      <!-- Goal Meaning -->
                      <div class="summary-item">
                        <div class="summary-label">Goal Impact:</div>
                        <div class="summary-value">{{ form.goalMeaning }}</div>
                      </div>

                      <!-- DISC Profile -->
                      <div class="summary-item">
                        <div class="summary-label">DISC Profile:</div>
                        <div class="summary-value">
                          <template v-if="form.discProfile === 'yes'">
                            Primary: {{ form.discPrimary }}, Secondary:
                            {{ form.discSecondary }}
                          </template>
                          <template
                            v-else-if="
                              form.discProfile === 'no' ||
                              form.discProfile === 'not_sure'
                            "
                          >
                            <div class="disc-profile-result">
                              <div class="mb-2">Based on your answers:</div>
                              <div class="d-flex align-center gap-2">
                                <v-chip
                                  color="primary"
                                  size="small"
                                  variant="flat"
                                >
                                  Primary: {{ discProfile.primary }}
                                </v-chip>
                                <v-chip
                                  color="secondary"
                                  size="small"
                                  variant="flat"
                                >
                                  Secondary: {{ discProfile.secondary }}
                                </v-chip>
                              </div>
                            </div>
                          </template>
                        </div>
                      </div>

                      <!-- Contact Info -->
                      <div class="summary-item">
                        <div class="summary-label">Contact:</div>
                        <div class="summary-value">
                          {{ form.name }} ({{ form.email }})
                        </div>
                      </div>
                    </div>

                    <v-alert
                      color="primary"
                      variant="tonal"
                      class="mt-6"
                      border="start"
                      density="comfortable"
                    >
                      Click Complete to submit your responses and receive your
                      personalized action plan.
                    </v-alert>
                  </div>
                </transition>
              </v-window-item>

              <!-- Navigation -->
              <div class="navigation-buttons d-flex gap-4 mt-8">
                <v-btn
                  v-if="isExpanded && currentStep > 1"
                  variant="outlined"
                  size="large"
                  @click="previousStep"
                  :disabled="loading"
                  class="back-button"
                >
                  <v-icon start>mdi-arrow-left</v-icon>
                  Back
                </v-btn>
                <v-spacer />
                <v-btn
                  color="primary"
                  size="large"
                  @click="handleContinue"
                  :loading="loading"
                  :disabled="!canProgress"
                  class="next-button"
                  v-if="shouldShowContinueButton"
                >
                  {{ continueButtonText }}
                  <v-icon
                    end
                    v-if="currentStep !== totalSteps"
                    >mdi-arrow-right</v-icon
                  >
                </v-btn>
              </div>
            </v-window>
          </v-card>
        </div>
      </v-card>
    </v-dialog>

    <!-- Success Dialog -->
    <v-dialog
      v-model="showSuccess"
      persistent
      :max-width="$vuetify.display.smAndDown ? '100%' : '600'"
      :fullscreen="$vuetify.display.smAndDown"
      class="success-dialog-wrapper"
    >
      <v-card
        class="success-dialog"
        elevation="0"
        rounded="lg"
      >
        <!-- Header -->
        <v-toolbar
          color="primary"
          class="success-header"
          :density="$vuetify.display.smAndDown ? 'compact' : undefined"
        >
          <v-toolbar-title 
            class="text-h6 text-md-h5 font-weight-bold text-white"
          >
            Your Personal Champion Has Arrived! ✨
          </v-toolbar-title>
        </v-toolbar>

        <div class="success-content pa-4 pa-sm-6">
          <p class="text-body-2 text-md-body-1 mb-4 mb-sm-6">
            Guess what? You just took the first step that most entrepreneurs
            never take – investing in yourself. That deserves celebration.
          </p>
          <p class="text-body-2 text-md-body-1 mb-4 mb-sm-6">
            Your personalized daily doses of motivation are about to hit your
            inbox. These aren't generic pep talks – they're tailored messages
            designed specifically for your entrepreneurial journey.
          </p>
          <p class="text-body-2 text-md-body-1 mb-4 mb-sm-6">
            First message incoming... get ready to be inspired!
          </p>
          <p class="text-body-2 text-md-body-1 mb-4 mb-sm-6">
            Rooting for your success,<br />
            Team ActionMo.de
          </p>

          <!-- Summary Section -->
          <div class="summary-container">
            <h3 class="text-subtitle-1 text-md-h6 font-weight-medium mb-3 mb-sm-4">
              Your Profile Summary
            </h3>
            <div class="summary-list">
              <div
                v-for="(item, index) in formattedSummary"
                :key="index"
                class="summary-item"
              >
                <div class="summary-label text-caption text-medium-emphasis">
                  {{ item.label }}
                </div>
                <div class="summary-value text-body-2 text-md-body-1">
                  {{ item.value }}
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex justify-end mt-6 mt-sm-8">
            <v-btn
              color="primary"
              :size="$vuetify.display.smAndDown ? 'large' : 'x-large'"
              @click="handleSuccessClose"
              :block="$vuetify.display.smAndDown"
            >
              Done
              <v-icon end>mdi-check</v-icon>
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.dialog-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.dialog-content {
  flex: 1;
  overflow-y: auto;
  background: #f8fafc;
  padding: 24px 16px;
}

@media (min-width: 600px) {
  .dialog-content {
    padding: 32px 24px;
  }
}

.question-card {
  max-width: 600px;
  background: white;
  border-radius: 24px;
}

.email-composer-header {
  border-bottom: none !important;
}

.progress-bar {
  margin: 0;
  position: relative;
  top: -1px; /* Adjust if needed to remove any gap */
}

.onboarding-form--expanded {
  animation: none;
}

/* Add any other existing styles you had before */

.success-header {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}

.summary-container {
  background: #f8fafc;
  border-radius: 16px;
  padding: 24px;
}

.summary-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.summary-label {
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

.summary-value {
  font-weight: 400;
}

@media (max-width: 600px) {
  .summary-container {
    padding: 16px;
    border-radius: 12px;
  }

  .summary-list {
    gap: 16px;
  }
}

.success-dialog {
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08) !important;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
}

.success-header {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}

.success-content {
  flex: 1;
  overflow-y: auto;
}

.summary-container {
  background: #f8fafc;
  border-radius: 12px;
  padding: 16px;
  margin-top: 16px;
}

@media (min-width: 600px) {
  .summary-container {
    border-radius: 16px;
    padding: 24px;
    margin-top: 24px;
  }
}

.summary-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (min-width: 600px) {
  .summary-list {
    gap: 20px;
  }
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

@media (min-width: 600px) {
  .summary-item {
    gap: 4px;
  }
}

.summary-label {
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

.summary-value {
  font-weight: 400;
}

/* Add styles for fullscreen mobile dialog */
@media (max-width: 599px) {
  .success-dialog-wrapper :deep(.v-overlay__content) {
    align-items: stretch;
  }
  
  .success-dialog {
    border-radius: 0;
    border: none;
  }
}
</style>

<script setup lang="ts">
import type { DISCResult } from './DISCProfileForm.vue';

// Define the form interface
interface OnboardingForm {
  mainChallenge: string;
  mainChallengeOther: string;
  businessStage: string;
  businessType: string;
  businessTypeOther: string;
  discProfile: string;
  discPrimary: string;
  discSecondary: string;
  discQuestions: Record<string, any>;
  goal: string;
  goalOther: string;
  goalMeaning: string;
  name: string;
  email: string;
}

const currentStep = ref(1);
const totalSteps = computed(() => {
  return form.value.discProfile === 'yes' ? 8 : 12;
});
const loading = ref(false);

const progress = computed(() => (currentStep.value / totalSteps.value) * 100);
const isLastStep = computed(() => currentStep.value === totalSteps.value);

// Initialize form with all fields
const form = ref<OnboardingForm>({
  mainChallenge: '',
  mainChallengeOther: '',
  businessStage: '',
  businessType: '',
  businessTypeOther: '',
  discProfile: '',
  discPrimary: '',
  discSecondary: '',
  discQuestions: {},
  goal: '',
  goalOther: '',
  goalMeaning: '',
  name: '',
  email: '',
});

// Options data
const challengeOptions = [
  { label: 'Not sure where to start', value: 'not_sure' },
  { label: 'Struggling to find clients', value: 'finding_clients' },
  { label: "Can't stay consistent/motivated", value: 'consistency' },
  { label: 'Overwhelmed with too much to do', value: 'overwhelmed' },
  { label: 'Not making enough money', value: 'revenue' },
  { label: 'Other', value: 'other' },
];

// Add other options arrays...

// Add business stage options
const businessStageOptions = [
  { label: 'Just starting out (idea phase)', value: 'idea_phase' },
  { label: 'Getting first clients', value: 'first_clients' },
  { label: 'Making some money but want more', value: 'growth_phase' },
  { label: 'Ready to scale up', value: 'scaling' },
];

// Add business type options
const businessTypeOptions = [
  { label: 'Service-based', value: 'service' },
  { label: 'Digital products/courses', value: 'digital_products' },
  { label: 'E-commerce', value: 'ecommerce' },
  { label: 'Coaching/consulting', value: 'coaching' },
  { label: 'Software/tech', value: 'software' },
  { label: 'Other', value: 'other' },
];

// Add these new option arrays
const discKnowledgeOptions = [
  {
    label: 'Yes - I know my DISC profile',
    value: 'yes',
  },
  {
    label: 'No - What is DISC?',
    value: 'no',
  },
  {
    label: `Not sure - I've heard of it but don't remember mine`,
    value: 'not_sure',
  },
];

const discStyleOptions = [
  { label: 'D (Direct/Decisive)', value: 'D' },
  { label: 'I (Influencing/Interactive)', value: 'I' },
  { label: 'S (Steady/Supportive)', value: 'S' },
  { label: 'C (Cautious/Calculating)', value: 'C' },
];

const goalOptions = [
  { label: 'Launch something new', value: 'launch' },
  { label: 'Hit my first $10k month', value: '10k_month' },
  { label: 'Build a reliable system', value: 'build_system' },
  { label: 'Create a team', value: 'create_team' },
  { label: 'Other', value: 'other' },
];

// Add DISC question options
const discQ1Options = [
  { label: 'Make quick, decisive choices', value: 'D' },
  { label: 'Consider how others feel about it', value: 'I' },
  { label: 'Take time to analyze all options', value: 'C' },
  { label: 'Seek consensus and harmony', value: 'S' },
];

const discQ2Options = [
  { label: 'Take charge and direct others', value: 'D' },
  { label: 'Engage and energize the group', value: 'I' },
  { label: 'Support and maintain harmony', value: 'S' },
  { label: 'Focus on details and accuracy', value: 'C' },
];

const discQ3Options = [
  { label: 'Jump in and get started quickly', value: 'D' },
  { label: 'Brainstorm ideas with others', value: 'I' },
  { label: 'Create a detailed plan first', value: 'C' },
  { label: 'Ensure everyone is on board', value: 'S' },
];

const discQ4Options = [
  { label: 'Take control of the situation', value: 'D' },
  { label: 'Stay optimistic and adaptable', value: 'I' },
  { label: 'Maintain calm and steady progress', value: 'S' },
  { label: 'Focus on facts and solutions', value: 'C' },
];

const discQ5Options = [
  { label: 'Offers challenges and results', value: 'D' },
  { label: 'Is social and collaborative', value: 'I' },
  { label: 'Is stable and supportive', value: 'S' },
  { label: 'Values accuracy and quality', value: 'C' },
];

const timePreferenceOptions = [
  'Morning (9am - 12pm)',
  'Afternoon (12pm - 5pm)',
  'Evening (5pm - 8pm)',
];

const canProgress = computed(() => {
  switch (currentStep.value) {
    case 1:
      return (
        !!form.value.mainChallenge &&
        (form.value.mainChallenge !== 'other' ||
          !!form.value.mainChallengeOther)
      );
    case 2:
      return !!form.value.businessStage;
    case 3:
      return (
        !!form.value.businessType &&
        (form.value.businessType !== 'other' || !!form.value.businessTypeOther)
      );
    case 4:
      return (
        !!form.value.goal &&
        (form.value.goal !== 'other' || !!form.value.goalOther)
      );
    case 5:
      return !!form.value.goalMeaning;
    case 6:
      return !!form.value.name && !!form.value.email;
    case 7:
      if (form.value.discProfile === 'yes') {
        return !!form.value.discPrimary && !!form.value.discSecondary;
      }
      return !!form.value.discProfile;
    case 8:
    case 9:
    case 10:
    case 11:
      if (form.value.discProfile === 'yes') {
        return true; // Skip DISC assessment questions if they know their profile
      }
      return !!form.value.discQuestions[`q${currentStep.value - 7}`];
    default:
      return true;
  }
});

const isExpanded = ref(false);

const handleOptionSelect = () => {
  // Handle any radio button selection updates here if needed
};

const handleContinue = () => {
  if (currentStep.value === 1 && !isExpanded.value) {
    isExpanded.value = true;
    currentStep.value++;
  } else if (currentStep.value === 7 && form.value.discProfile === 'yes') {
    // If they know their DISC profile and have selected both primary and secondary
    if (form.value.discPrimary && form.value.discSecondary) {
      // Submit directly instead of going to summary
      handleSubmit();
    }
  } else if (currentStep.value === totalSteps.value) {
    if (!loading.value) {
      handleSubmit();
    }
  } else {
    nextStep();
  }
};

const handleClose = () => {
  // Show confirmation dialog if form has been started
  if (currentStep.value > 2) {
    // You might want to add a confirmation dialog here
    if (
      confirm('Are you sure you want to close? Your progress will be lost.')
    ) {
      resetForm();
    }
  } else {
    resetForm();
  }
};

const nextStep = () => {
  try {
    console.log('Starting nextStep with form data:', { ...form.value });
    console.log('Current step:', currentStep.value);

    // Store current form data
    const currentFormData = { ...form.value };

    if (currentStep.value === 7) {
      if (form.value.discProfile === 'yes') {
        if (form.value.discPrimary && form.value.discSecondary) {
          // Submit directly instead of going to summary
          handleSubmit();
          return;
        }
      } else {
        console.log('Starting DISC assessment questions');
        currentStep.value++;
      }
    } else if (currentStep.value >= 8 && currentStep.value <= 11) {
      // If we're in DISC assessment questions
      const currentQuestionIndex = currentStep.value - 8;
      console.log('Processing DISC question', currentQuestionIndex + 1);
      console.log('Current answers:', form.value.discQuestions);

      if (form.value.discQuestions[`q${currentQuestionIndex + 1}`]) {
        if (currentStep.value === 11) {
          const result = calculateDiscProfile(form.value.discQuestions);
          form.value = {
            ...currentFormData,
            discPrimary: result.primary,
            discSecondary: result.secondary,
          };
          // Go to summary step only for assessment path
          currentStep.value = totalSteps.value;
          return;
        } else {
          currentStep.value++;
        }
      }
    } else {
      currentStep.value++;
    }

    // Restore form data after step change
    form.value = { ...currentFormData, ...form.value };

  } catch (error) {
    console.error('Error in nextStep:', error);
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const showSuccess = ref(false);

const handleSubmit = async () => {
  try {
    loading.value = true;
    const submissionData = { ...form.value };
    console.log('Submitting form data:', submissionData);

    await submitToServer(submissionData);
    console.log('Form submitted successfully');

    showSuccess.value = true;
  } catch (error) {
    console.error('Error submitting form:', error);
  } finally {
    loading.value = false;
  }
};

// Add this near the top of the script, with other refs
const isResetting = ref(false);

const handleSuccessClose = async () => {
  console.log('Starting handleSuccessClose');
  
  // Set isResetting flag (don't create a new ref)
  isResetting.value = true;
  
  // First close the success dialog
  showSuccess.value = false;
  
  // Wait for the success dialog animation to complete
  await nextTick();
  
  // Reset form data first
  form.value = {
    mainChallenge: '',
    mainChallengeOther: '',
    businessStage: '',
    businessType: '',
    businessTypeOther: '',
    discProfile: '',
    discPrimary: '',
    discSecondary: '',
    discQuestions: {},
    goal: '',
    goalOther: '',
    goalMeaning: '',
    name: '',
    email: '',
  };
  
  // Reset step counter to 1
  currentStep.value = 1;
  
  // Close the expanded dialog view
  isExpanded.value = false;
  
  // Wait for all state changes to complete
  await nextTick();
  
  // Re-enable auto-advance
  isResetting.value = false;
  
  // Optional: Scroll to top of page
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Add watchers to track state changes
watch(isExpanded, (newVal, oldVal) => {
  console.log('isExpanded changed:', { from: oldVal, to: newVal });
});

watch(showSuccess, (newVal, oldVal) => {
  console.log('showSuccess changed:', { from: oldVal, to: newVal });
});

watch(currentStep, (newVal, oldVal) => {
  console.log('currentStep changed:', { from: oldVal, to: newVal });
});

watch(form, (newVal, oldVal) => {
  console.log('form data changed:', { 
    newData: { ...newVal },
    oldData: { ...oldVal }
  });
}, { deep: true });

// Placeholder for actual server submission
const submitToServer = async (data: OnboardingForm) => {
  // Replace with actual API call
  console.log('Submitting to server:', data);
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

// Update the DISC assessment questions array with all 10 questions
const discAssessmentQuestions = [
  {
    question: 'When tackling a new business challenge, you typically:',
    options: [
      { label: 'Take charge and make quick decisions', value: 'D' },
      { label: 'Get others excited and involved in solutions', value: 'I' },
      { label: 'Take time to analyze all options carefully', value: 'C' },
      { label: 'Work steadily and maintain harmony', value: 'S' },
    ],
  },
  {
    question: 'Your preferred way of getting things done is:',
    options: [
      { label: 'Taking control and pushing for results', value: 'D' },
      { label: 'Inspiring others and making it fun', value: 'I' },
      { label: 'Following established processes precisely', value: 'C' },
      { label: 'Being consistent and supporting the team', value: 'S' },
    ],
  },
  {
    question: 'Under pressure, you typically:',
    options: [
      { label: 'Become more direct and take charge', value: 'D' },
      { label: 'Talk things through with others', value: 'I' },
      { label: 'Focus harder on getting details right', value: 'C' },
      { label: 'Maintain calm and seek harmony', value: 'S' },
    ],
  },
  {
    question: 'Your communication style could be described as:',
    options: [
      { label: 'Brief, direct, and focused on results', value: 'D' },
      { label: 'Energetic, optimistic, and persuasive', value: 'I' },
      { label: 'Precise, systematic, and logical', value: 'C' },
      { label: 'Diplomatic, steady, and supportive', value: 'S' },
    ],
  },
  {
    question: 'When starting a new project:',
    options: [
      { label: 'Focus on the goal and push forward', value: 'D' },
      { label: 'Generate excitement and possibilities', value: 'I' },
      { label: 'Create detailed plans and systems', value: 'C' },
      { label: 'Establish a steady, comfortable pace', value: 'S' },
    ],
  },
];

// Add DISC profile calculation
const calculateDiscProfile = (answers: Record<string, string>) => {
  const counts = {
    D: 0,
    I: 0,
    S: 0,
    C: 0,
  };

  // Count responses
  Object.values(answers).forEach((answer) => {
    counts[answer as keyof typeof counts]++;
  });

  // Sort by count to get primary and secondary
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return {
    primary: sorted[0][0],
    secondary: sorted[1][0],
    scores: counts,
  };
};

// Add computed property for DISC profile
const discProfile = computed(() => {
  if (form.value.discProfile === 'yes') {
    return {
      primary: form.value.discPrimary,
      secondary: form.value.discSecondary,
    };
  }
  // For assessment path, calculate from questions if we have answers
  if (Object.keys(form.value.discQuestions).length > 0) {
    const result = calculateDiscProfile(form.value.discQuestions);
    return {
      primary: result.primary,
      secondary: result.secondary,
    };
  }
  return {
    primary: '',
    secondary: '',
  };
});

const handleDISCComplete = (result: DISCResult) => {
  if (result.type === 'known') {
    form.value.discProfile = 'yes';
    form.value.discPrimary = result.profile.primary;
    form.value.discSecondary = result.profile.secondary;
  } else {
    form.value = {
      ...form.value,
      discProfile: 'assessment',
      discQuestions: result.answers || {},
      discPrimary: result.profile.primary,
      discSecondary: result.profile.secondary,
    };
  }
  currentStep.value = totalSteps.value;
};

// Add watch to monitor form changes
watch(
  form,
  (newValue) => {
    console.log('Form data changed:', { ...newValue });
  },
  { deep: true }
);

// Add watch to monitor step changes
watch(currentStep, (newValue, oldValue) => {
  console.log(`Step changed from ${oldValue} to ${newValue}`);
  console.log('Current form data:', { ...form.value });
});

// Add watch for form values to handle auto-advance
const handleAutoAdvance = () => {
  try {
    if (isResetting?.value) {
      console.log('Skipping auto-advance - reset in progress');
      return;
    }
    
    console.log('Auto-advance check:', {
      currentStep: currentStep.value,
      isExpanded: isExpanded.value,
      canProgress: canProgress.value
    });
    
    if (!isExpanded.value && currentStep.value === 1) {
      isExpanded.value = true;
      currentStep.value++;
    } else if (canProgress.value) {
      // Don't auto-advance on DISC profile selection if they chose 'yes'
      if (currentStep.value === 7 && form.value.discProfile === 'yes') {
        console.log('Skipping auto-advance for DISC profile "yes" selection');
        return;
      }
      // Don't auto-advance on the final step
      if (currentStep.value < totalSteps.value) {
        nextStep();
      }
    }
  } catch (error) {
    console.error('Error in handleAutoAdvance:', error);
  }
};

// Watch for changes in form values
watch(
  () => form.value.mainChallenge,
  () => handleAutoAdvance()
);
watch(
  () => form.value.businessStage,
  () => handleAutoAdvance()
);
watch(
  () => form.value.businessType,
  () => handleAutoAdvance()
);
watch(
  () => form.value.goal,
  () => handleAutoAdvance()
);
watch(
  () => form.value.discProfile,
  (newValue, oldValue) => {
    try {
      console.log('DISC profile changed:', { from: oldValue, to: newValue });
      
      // Create a new form object to avoid mutation issues
      const updatedForm = { ...form.value };
      
      // Reset DISC-related fields when changing profile knowledge
      if (newValue !== 'yes') {
        updatedForm.discPrimary = '';
        updatedForm.discSecondary = '';
      }
      if (newValue !== 'no' && newValue !== 'not_sure') {
        updatedForm.discQuestions = {};
      }
      
      // Update the form with the new values
      form.value = updatedForm;
      
      // Only auto-advance if not changing to 'yes'
      if (newValue !== 'yes') {
        handleAutoAdvance();
      }
    } catch (error) {
      console.error('Error in DISC profile watcher:', error);
    }
  }
);
watch(
  () => form.value.discPrimary,
  () => {
    if (form.value.discSecondary) handleAutoAdvance();
  }
);
watch(
  () => form.value.discSecondary,
  () => {
    if (form.value.discPrimary) handleAutoAdvance();
  }
);
watch(
  () => form.value.discQuestions,
  (newVal) => {
    // Check if we're on a DISC assessment question
    if (currentStep.value >= 8 && currentStep.value <= 11) {
      const currentQuestionIndex = currentStep.value - 8;
      if (newVal[`q${currentQuestionIndex + 1}`]) {
        handleAutoAdvance();
      }
    }
  },
  { deep: true }
);

// Update computed property for continue button visibility
const shouldShowContinueButton = computed(() => {
  // Always show the button
  return true;
});

// Update the navigation buttons to only show for text inputs and summary

// Update the button text in the template
const continueButtonText = computed(() => {
  if (currentStep.value === totalSteps.value) {
    return 'Submit';
  }
  return 'Continue';
});

// Add a computed property for the formatted summary
const formattedSummary = computed(() => {
  const summary = [];

  // Main Challenge
  const challengeLabel = challengeOptions.find(
    (o) => o.value === form.value.mainChallenge
  )?.label;
  summary.push({
    label: 'Main Challenge',
    value:
      form.value.mainChallenge === 'other'
        ? `${challengeLabel} - ${form.value.mainChallengeOther}`
        : challengeLabel,
  });

  // Business Stage
  summary.push({
    label: 'Business Stage',
    value: businessStageOptions.find(
      (o) => o.value === form.value.businessStage
    )?.label,
  });

  // Business Type
  const businessTypeLabel = businessTypeOptions.find(
    (o) => o.value === form.value.businessType
  )?.label;
  summary.push({
    label: 'Business Type',
    value:
      form.value.businessType === 'other'
        ? `${businessTypeLabel} - ${form.value.businessTypeOther}`
        : businessTypeLabel,
  });

  // Goal
  const goalLabel = goalOptions.find((o) => o.value === form.value.goal)?.label;
  summary.push({
    label: '12-Month Goal',
    value:
      form.value.goal === 'other'
        ? `${goalLabel} - ${form.value.goalOther}`
        : goalLabel,
  });

  // Goal Meaning
  if (form.value.goalMeaning) {
    summary.push({
      label: 'Goal Impact',
      value: form.value.goalMeaning,
    });
  }

  // DISC Profile
  const discSummary = {
    label: 'DISC Profile',
    value: '',
  };

  if (form.value.discProfile === 'yes') {
    discSummary.value = `Primary: ${form.value.discPrimary}, Secondary: ${form.value.discSecondary}`;
  } else if (discProfile.value.primary && discProfile.value.secondary) {
    discSummary.value = `Based on your answers - Primary: ${discProfile.value.primary}, Secondary: ${discProfile.value.secondary}`;
  }
  summary.push(discSummary);

  return summary;
});

// Add a reset function
const resetForm = () => {
  isResetting.value = true;
  
  isExpanded.value = false;
  currentStep.value = 1;
  form.value = {
    mainChallenge: '',
    mainChallengeOther: '',
    businessStage: '',
    businessType: '',
    businessTypeOther: '',
    discProfile: '',
    discPrimary: '',
    discSecondary: '',
    discQuestions: {},
    goal: '',
    goalOther: '',
    goalMeaning: '',
    name: '',
    email: '',
  };
  
  nextTick(() => {
    isResetting.value = false;
  });
};
</script>
