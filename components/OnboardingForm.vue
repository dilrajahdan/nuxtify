<template>
  <div class="onboarding-form">
    <!-- Initial Question -->
    <v-card 
      class="question-card pa-6"
      v-if="currentStep === 1"
    >
      <h2 class="text-h5 font-weight-bold mb-4">
        What's the main thing holding you back in your business right now?
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
    </v-card>

    <!-- Full Screen Dialog -->
    <v-dialog
      v-model="showFormDialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
      class="form-dialog"
    >
      <v-card>
        <!-- Dialog Header -->
        <v-toolbar
          color="white"
          density="comfortable"
        >
          <v-btn
            icon
            variant="text"
            @click="handleDialogClose"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          
          <v-toolbar-title class="text-subtitle-1 text-md-h6 font-weight-medium">
            Unlock The Next Level of Your Journey
          </v-toolbar-title>
        </v-toolbar>

        <!-- Progress Bar -->
        <div class="progress-wrapper">
          <div class="progress-container">
            <div class="d-flex align-center justify-space-between text-medium-emphasis mb-2">
              <span>{{ Math.round(progress) }}% Complete</span>
            </div>
            <v-progress-linear
              v-model="progress"
              color="primary"
              height="8"
              rounded
              class="progress-bar"
            >
              <template v-slot:default="{ value }">
                <div
                  class="progress-overlay"
                  :style="{ width: `${value}%` }"
                />
              </template>
            </v-progress-linear>
          </div>
        </div>

        <!-- Form Content -->
        <div class="form-content pa-4 pa-sm-6">
          <v-window
            v-model="currentStep"
            class="fill-height"
          >
            <!-- Rest of your window items here, starting from step 2 -->
            <!-- ... -->
          </v-window>
        </div>
      </v-card>
    </v-dialog>

    <!-- Success Dialog - keep as is -->
    <v-dialog
      v-model="showSuccess"
      persistent
      max-width="600"
    >
      <v-card class="pa-6">
        <v-card-title class="text-h5 font-weight-bold mb-4">
          Thank You!
        </v-card-title>
        <v-card-text>
          <p class="text-body-1 mb-6">
            Your responses have been submitted successfully. We'll send your personalized action plan to your email shortly.
          </p>
          
          <!-- Summary Section -->
          <div class="summary-container">
            <h3 class="text-h6 font-weight-medium mb-4">Your Profile Summary</h3>
            <div class="summary-list">
              <div 
                v-for="(item, index) in formattedSummary" 
                :key="index"
                class="summary-item"
              >
                <div class="summary-label">{{ item.label }}:</div>
                <div class="summary-value">{{ item.value }}</div>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            @click="handleSuccessClose"
          >
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

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
  return form.value.discProfile === 'yes' ? 7 : 11;
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
      return !!form.value.goal &&
        (form.value.goal !== 'other' || !!form.value.goalOther);
    case 5:
      return !!form.value.name && !!form.value.email;
    case 6:
      if (form.value.discProfile === 'yes') {
        return !!form.value.discPrimary && !!form.value.discSecondary;
      }
      return !!form.value.discProfile;
    case 7:
    case 8:
    case 9:
    case 10:
      return !!form.value.discQuestions[`q${currentStep.value - 6}`];
    default:
      return true;
  }
});

const isExpanded = ref(false);

const handleOptionSelect = () => {
  // Handle any radio button selection updates here if needed
};

const showFormDialog = ref(false);

const handleContinue = () => {
  if (currentStep.value === 1 && !isExpanded.value) {
    showFormDialog.value = true;
  } else if (currentStep.value === 6 && form.value.discProfile === 'yes') {
    if (form.value.discPrimary && form.value.discSecondary) {
      if (!loading.value) {
        handleSubmit();
      }
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
  isExpanded.value = false;
  currentStep.value = 1;
  // Optionally reset form data
  // form.value = { ... initial form state ... };
};

const nextStep = () => {
  console.log('Starting nextStep with form data:', { ...form.value });
  console.log('Current step:', currentStep.value);

  // Store current form data
  const currentFormData = { ...form.value };

  if (currentStep.value === 6) {
    if (form.value.discProfile === 'yes') {
      // Don't advance to summary page, let handleContinue handle submission
      return;
    } else {
      console.log('Starting DISC assessment questions');
      currentStep.value++;
    }
  } else if (currentStep.value >= 7 && currentStep.value <= 10) {
    // If we're in DISC assessment questions
    const currentQuestionIndex = currentStep.value - 7;
    console.log('Processing DISC question', currentQuestionIndex + 1);
    console.log('Current answers:', form.value.discQuestions);

    if (form.value.discQuestions[`q${currentQuestionIndex + 1}`]) {
      if (currentStep.value === 10) {
        // If it's the last question, calculate profile and submit
        console.log('Last DISC question answered, calculating profile');
        const result = calculateDiscProfile(form.value.discQuestions);
        console.log('Calculated DISC profile:', result);

        // Update DISC-related fields while preserving other data
        form.value = {
          ...currentFormData,
          discPrimary: result.primary,
          discSecondary: result.secondary
        };

        console.log('Form data after DISC calculation:', { ...form.value });
        // Submit the form instead of going to summary
        handleSubmit();
      } else {
        currentStep.value++;
      }
    }
  } else {
    currentStep.value++;
  }

  // Restore form data after step change
  form.value = { ...currentFormData, ...form.value };

  console.log('Ending nextStep with form data:', { ...form.value });
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

const handleSuccessClose = () => {
  // Reset form and navigation
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
  currentStep.value = 1;
  isExpanded.value = false;
  showSuccess.value = false;
};

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
watch(form, (newValue) => {
  console.log('Form data changed:', { ...newValue });
}, { deep: true });

// Add watch to monitor step changes
watch(currentStep, (newValue, oldValue) => {
  console.log(`Step changed from ${oldValue} to ${newValue}`);
  console.log('Current form data:', { ...form.value });
});

// Add watch for form values to handle auto-advance
const handleAutoAdvance = () => {
  if (!isExpanded.value && currentStep.value === 1) {
    // First step: expand and go to next step
    isExpanded.value = true;
    currentStep.value++;
  } else if (canProgress.value && currentStep.value < totalSteps.value - 1) {
    // Auto advance for radio selections, but stop before summary page
    nextStep();
  }
};

// Watch for changes in form values
watch(() => form.value.mainChallenge, () => handleAutoAdvance());
watch(() => form.value.businessStage, () => handleAutoAdvance());
watch(() => form.value.businessType, () => handleAutoAdvance());
watch(() => form.value.goal, () => handleAutoAdvance());
watch(() => form.value.discProfile, () => handleAutoAdvance());
watch(() => form.value.discPrimary, () => {
  if (form.value.discSecondary) handleAutoAdvance();
});
watch(() => form.value.discSecondary, () => {
  if (form.value.discPrimary) handleAutoAdvance();
});
watch(() => form.value.discQuestions, () => handleAutoAdvance(), { deep: true });

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
  const challengeLabel = challengeOptions.find(o => o.value === form.value.mainChallenge)?.label;
  summary.push({
    label: 'Main Challenge',
    value: form.value.mainChallenge === 'other' 
      ? `${challengeLabel} - ${form.value.mainChallengeOther}`
      : challengeLabel
  });

  // Business Stage
  summary.push({
    label: 'Business Stage',
    value: businessStageOptions.find(o => o.value === form.value.businessStage)?.label
  });

  // Business Type
  const businessTypeLabel = businessTypeOptions.find(o => o.value === form.value.businessType)?.label;
  summary.push({
    label: 'Business Type',
    value: form.value.businessType === 'other'
      ? `${businessTypeLabel} - ${form.value.businessTypeOther}`
      : businessTypeLabel
  });

  // Goal
  const goalLabel = goalOptions.find(o => o.value === form.value.goal)?.label;
  summary.push({
    label: '12-Month Goal',
    value: form.value.goal === 'other'
      ? `${goalLabel} - ${form.value.goalOther}`
      : goalLabel
  });

  // Goal Meaning
  if (form.value.goalMeaning) {
    summary.push({
      label: 'Goal Impact',
      value: form.value.goalMeaning
    });
  }

  // DISC Profile
  const discSummary = {
    label: 'DISC Profile',
    value: ''
  };

  if (form.value.discProfile === 'yes') {
    discSummary.value = `Primary: ${form.value.discPrimary}, Secondary: ${form.value.discSecondary}`;
  } else if (discProfile.value.primary && discProfile.value.secondary) {
    discSummary.value = `Based on your answers - Primary: ${discProfile.value.primary}, Secondary: ${discProfile.value.secondary}`;
  }
  summary.push(discSummary);

  return summary;
});

// Add method to handle dialog close
const handleDialogClose = () => {
  showFormDialog.value = false;
  currentStep.value = 1;
  // Reset form data to initial state
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
};

// Update the success dialog template
</script>

<style scoped>
.onboarding-form {
  max-width: 600px;
  margin: 0 auto;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.onboarding-form--expanded {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: none;
  margin: 0;
  background: white;
  z-index: 100;
  padding: 0;
  overflow-y: auto;
}

/* Add responsive padding for expanded state */
@media (min-width: 600px) {
  .onboarding-form--expanded {
    padding: 0;
  }
}

/* Modify the question card styles when expanded */
.onboarding-form--expanded .question-card {
  max-width: 600px;
  margin: 24px auto;
  height: auto;
  min-height: calc(100vh - 96px);
}

/* Add animation for the expansion */
.onboarding-form--expanded {
  animation: expandForm 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes expandForm {
  from {
    transform: scale(1);
    opacity: 0.8;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.question-card {
  border-radius: 24px;
  background: white;
}

.question-content {
  min-height: 260px;
}

.option-group {
  margin-top: 8px;
}

.option-item {
  position: relative;
  transition: all 0.2s ease;
  padding: 4px 16px;
  border-radius: 12px;
  margin-bottom: 4px !important;
}

.option-item:hover {
  transform: translateX(8px);
  background: var(--v-primary-lighten-4);
}

.option-item:active {
  transform: translateX(4px);
}

/* Add transitions */
:deep(.v-window__container) {
  transition: all 0.3s ease;
}

:deep(.v-window-item) {
  transition: opacity 0.3s ease;
}

/* Form field styling */
:deep(.v-field) {
  border-radius: 16px !important;
  background: #f8fafc !important;
}

@media (max-width: 600px) {
  .question-card {
    border-radius: 16px;
  }

  .navigation-buttons {
    flex-direction: column;
    gap: 12px !important;
  }
}

/* Enhanced transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Progress bar animation */
.progress-bar {
  position: relative;
  overflow: hidden;
  background: var(--v-primary-lighten-3);
}

.progress-overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: var(--v-primary-base);
  transition: width 0.3s ease;
}

/* Other input animation */
.other-input {
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Button animations */
.next-button,
.back-button {
  transition: all 0.2s ease;
}

.next-button:hover {
  transform: translateX(4px);
}

.back-button:hover {
  transform: translateX(-4px);
}

.meaning-input {
  background: var(--v-primary-lighten-4);
  border-radius: 16px;
}

.meaning-input:deep(.v-field) {
  background: white !important;
}

/* Add new summary styles */
.summary-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: var(--v-primary-lighten-4);
  padding: 16px;
  border-radius: 12px;
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.summary-label {
  font-size: 0.875rem;
  color: var(--v-medium-emphasis);
  font-weight: 500;
}

.summary-value {
  font-size: 1rem;
  font-weight: 500;
}

@media (min-width: 600px) {
  .summary-item {
    flex-direction: row;
    gap: 12px;
  }

  .summary-label {
    min-width: 140px;
  }
}

.disc-profile-result {
  background: var(--v-primary-lighten-4);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--v-primary-lighten-1);
}

/* Update progress bar styles */
.progress-wrapper {
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.3s ease;
  width: 100%;
  padding: 16px 0;
  background: white;
  border-bottom: 1px solid var(--v-border-color);
}

.progress-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 24px;
}

.onboarding-form--expanded .progress-wrapper {
  opacity: 1;
  transform: translateY(0);
}

/* Update question card styles */
.question-card {
  border-radius: 24px;
  background: white;
  transition: all 0.3s ease;
  min-height: calc(100vh - 96px);
  margin: 24px auto;
  max-width: 600px;
}

@media (max-width: 600px) {
  .expanded-header-wrapper {
    margin: 0;
  }

  .expanded-header {
    padding: 0 16px;
  }

  .progress-container {
    padding: 0 16px;
  }
  
  .question-card {
    margin: 16px;
  }
}

/* Update header styles */
.expanded-header-wrapper {
  width: 100%;
  margin: 0;
  position: sticky;
  top: 0;
  z-index: 1;
  background: white;
}

.expanded-header {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px 24px;
}

:deep(.email-composer-header) {
  border-bottom: 1px solid var(--v-border-color);
  background: linear-gradient(to bottom, white, #f8fafc) !important;
  padding: 16px 24px !important;
  width: 100%;
}

:deep(.email-composer-header .v-toolbar-title) {
  color: var(--v-text-medium);
  font-size: 1rem;
}

/* Media query for larger screens */
@media (min-width: 960px) {
  :deep(.email-composer-header .v-toolbar-title) {
    font-size: 1.25rem;
  }
}

@media (max-width: 600px) {
  .expanded-header-wrapper {
    margin: 0;
  }

  .expanded-header {
    padding: 0 16px;
  }
}

:deep(.header-card) {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.summary-container {
  background: var(--v-surface-variant);
  border-radius: 12px;
  padding: 16px;
}

.summary-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

@media (min-width: 600px) {
  .summary-item {
    flex-direction: row;
    gap: 12px;
  }

  .summary-label {
    min-width: 140px;
    font-weight: 500;
  }
}

.summary-label {
  color: var(--v-medium-emphasis);
  font-size: 0.875rem;
}

.summary-value {
  font-size: 1rem;
  font-weight: 500;
}

/* Add these new styles */
.form-dialog {
  .v-card {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .form-content {
    flex: 1;
    overflow-y: auto;
    background: #f8fafc;
  }
}

/* Update dialog transition */
:deep(.dialog-bottom-transition-enter-active),
:deep(.dialog-bottom-transition-leave-active) {
  transition: transform 0.3s ease-in-out;
}

:deep(.dialog-bottom-transition-enter-from),
:deep(.dialog-bottom-transition-leave-to) {
  transform: translateY(100%);
}
</style>
