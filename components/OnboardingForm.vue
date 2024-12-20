<template>
  <div class="onboarding-form">
    <!-- Progress Bar -->
    <div class="progress-wrapper mb-8">
      <div
        class="d-flex align-center justify-space-between text-medium-emphasis mb-2"
      >
        <span>Question {{ currentStep }} of {{ totalSteps }}</span>
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

    <!-- Question Container -->
    <v-card class="question-card pa-4 pa-sm-6 pa-md-8">
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
                What's the main thing holding you back in your business right
                now?
              </h2>
              <v-radio-group
                v-model="form.mainChallenge"
                class="option-group"
                @update:model-value="handleOptionSelect"
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
                @update:model-value="handleOptionSelect"
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
                @update:model-value="handleOptionSelect"
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

        <!-- Step 4: DISC Profile -->
        <v-window-item :value="4">
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
                @update:model-value="handleOptionSelect"
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
                      @update:model-value="handleOptionSelect"
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
                    <div class="text-subtitle-1 mb-2">Secondary Style</div>
                    <v-radio-group
                      v-model="form.discSecondary"
                      class="option-group"
                      @update:model-value="handleOptionSelect"
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

        <!-- Step 5: Goals & Vision -->
        <v-window-item :value="5">
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
                @update:model-value="handleOptionSelect"
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

              <div class="mt-8">
                <h3 class="text-h6 font-weight-medium mb-4">
                  What would achieving this goal mean for you?
                </h3>
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
            </div>
          </transition>
        </v-window-item>

        <!-- DISC Assessment Questions -->
        <v-window-item
          v-for="(q, index) in discAssessmentQuestions"
          :key="index"
          :value="index + 6"
          v-if="form.discProfile !== 'yes'"
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
                @update:model-value="handleOptionSelect"
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

        <!-- Add before the final contact step -->
        <v-window-item :value="form.discProfile === 'yes' ? 6 : 16">
          <transition
            name="fade-slide"
            mode="out-in"
          >
            <div class="question-content">
              <h2 class="text-h5 font-weight-bold mb-4">
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

                <!-- DISC Profile -->
                <div class="summary-item">
                  <div class="summary-label">DISC Profile:</div>
                  <div class="summary-value">
                    <template v-if="form.discProfile === 'yes'">
                      Primary: {{ form.discPrimary }}, Secondary:
                      {{ form.discSecondary }}
                    </template>
                    <template v-else>
                      <div class="disc-profile-result">
                        <div class="mb-2">Based on your answers:</div>
                        <div class="d-flex align-center gap-2">
                          <v-chip
                            color="primary"
                            size="small"
                          >
                            Primary: {{ discProfile.primary }}
                          </v-chip>
                          <v-chip
                            color="secondary"
                            size="small"
                          >
                            Secondary: {{ discProfile.secondary }}
                          </v-chip>
                        </div>
                        <div class="text-caption mt-2">
                          This reflects your natural working style
                        </div>
                      </div>
                    </template>
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
                Great! Now let's get your contact details to create your
                personalized action plan.
              </v-alert>
            </div>
          </transition>
        </v-window-item>

        <!-- Final Contact Step -->
        <v-window-item :value="form.discProfile === 'yes' ? 7 : 17">
          <transition
            name="fade-slide"
            mode="out-in"
          >
            <div class="question-content">
              <h2 class="text-h5 font-weight-bold mb-6">
                Great insights! Let's create your personalized action plan.
              </h2>

              <div class="d-flex flex-column gap-4">
                <v-text-field
                  v-model="form.name"
                  placeholder="First Name"
                  variant="outlined"
                  hide-details
                  required
                />

                <v-text-field
                  v-model="form.email"
                  placeholder="Email Address"
                  variant="outlined"
                  hide-details
                  required
                />
              </div>
            </div>
          </transition>
        </v-window-item>

        <!-- Navigation -->
        <div class="navigation-buttons d-flex gap-4">
          <v-btn
            v-if="currentStep > 1"
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
            @click="nextStep"
            :loading="loading"
            :disabled="!canProgress"
            class="next-button"
          >
            {{ isLastStep ? 'Complete' : 'Continue' }}
            <v-icon
              end
              v-if="!isLastStep"
              >mdi-arrow-right</v-icon
            >
          </v-btn>
        </div>
      </v-window>
    </v-card>
  </div>
</template>

<script setup lang="ts">
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
  if (form.value.discProfile === 'yes') {
    return 7;
  }
  return 17;
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
      return !!form.value.discProfile;
    case 5:
      if (form.value.discProfile === 'yes') {
        return !!form.value.discPrimary && !!form.value.discSecondary;
      }
      return true;
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
      if (form.value.discProfile !== 'yes') {
        return !!form.value.discQuestions[`q${currentStep.value - 5}`];
      }
      return true;
    case 16:
      return true;
    case 17:
      return !!form.value.name && !!form.value.email;
    default:
      return true;
  }
});

const handleOptionSelect = () => {
  // Add micro-animation or feedback here
};

const nextStep = () => {
  if (currentStep.value === 4) {
    if (form.value.discProfile === 'yes') {
      currentStep.value = 5;
    } else {
      currentStep.value = 6;
    }
  } else if (currentStep.value === 5 && form.value.discProfile === 'yes') {
    currentStep.value = 15;
  } else if (
    currentStep.value >= 6 &&
    currentStep.value <= 14 &&
    form.value.discProfile !== 'yes'
  ) {
    currentStep.value++;
  } else if (currentStep.value === 15) {
    currentStep.value = 16;
  } else if (currentStep.value < totalSteps.value) {
    currentStep.value++;
  } else {
    handleSubmit();
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const handleSubmit = async () => {
  try {
    loading.value = true;
    // Submit form logic here
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset form after successful submission
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
  } catch (error) {
    console.error('Error submitting form:', error);
  } finally {
    loading.value = false;
  }
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
    question: 'In meetings or group situations, you tend to:',
    options: [
      { label: 'Drive the conversation and outcomes', value: 'D' },
      { label: 'Keep things upbeat and entertaining', value: 'I' },
      { label: 'Focus on accuracy and getting details right', value: 'C' },
      { label: 'Listen and ensure everyone is heard', value: 'S' },
    ],
  },
  {
    question: 'When explaining something to team members:',
    options: [
      { label: 'Get straight to the point and focus on results', value: 'D' },
      {
        label: 'Use stories and share experiences enthusiastically',
        value: 'I',
      },
      { label: 'Provide detailed, step-by-step instructions', value: 'C' },
      { label: "Take time to ensure everyone's understanding", value: 'S' },
    ],
  },
  {
    question: 'Your ideal work environment is:',
    options: [
      { label: 'Fast-paced with lots of autonomy', value: 'D' },
      { label: 'Social and collaborative with recognition', value: 'I' },
      { label: 'Structured with time to ensure quality', value: 'C' },
      { label: 'Stable and supportive with clear expectations', value: 'S' },
    ],
  },
  {
    question: 'When dealing with business setbacks:',
    options: [
      { label: 'Take immediate action to fix the situation', value: 'D' },
      { label: 'Stay optimistic and rally people together', value: 'I' },
      { label: 'Analyze what went wrong to prevent future issues', value: 'C' },
      { label: 'Remain patient and maintain steady progress', value: 'S' },
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
    question: 'When making important decisions:',
    options: [
      { label: 'Trust your gut and decide quickly', value: 'D' },
      { label: 'Discuss with others and consider possibilities', value: 'I' },
      { label: 'Research thoroughly and weigh all options', value: 'C' },
      { label: 'Consider the impact on everyone involved', value: 'S' },
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
  return calculateDiscProfile(form.value.discQuestions);
});
</script>

<style scoped>
.onboarding-form {
  max-width: 600px;
  margin: 0 auto;
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
</style>
