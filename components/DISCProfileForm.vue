<template>
  <div class="disc-profile-form">
    <!-- DISC Knowledge Question -->
    <div v-if="!showAssessment && !showProfileSelection">
      <h2 class="text-h5 font-weight-bold mb-4">
        Do you know your DISC profile?
      </h2>
      <v-radio-group
        v-model="discKnowledge"
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
    </div>

    <!-- Profile Selection (if they know their DISC) -->
    <v-expand-transition>
      <div v-if="showProfileSelection">
        <h2 class="text-h5 font-weight-bold mb-4">
          What's your DISC profile?
        </h2>

        <!-- Primary Style -->
        <div class="mb-6">
          <div class="text-subtitle-1 mb-2">Primary Style</div>
          <v-radio-group
            v-model="selectedProfile.primary"
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
          <div class="text-subtitle-1 mb-2">Secondary Style</div>
          <v-radio-group
            v-model="selectedProfile.secondary"
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

    <!-- Assessment Questions (if they don't know their DISC) -->
    <v-window
      v-if="showAssessment"
      v-model="currentQuestion"
    >
      <v-window-item
        v-for="(q, index) in discAssessmentQuestions"
        :key="index"
        :value="index"
      >
        <div class="assessment-question">
          <h2 class="text-h5 font-weight-bold mb-4">
            {{ q.question }}
          </h2>
          <v-radio-group
            v-model="assessmentAnswers[`q${index + 1}`]"
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
      </v-window-item>
    </v-window>

    <!-- Navigation -->
    <div class="d-flex justify-space-between align-center mt-8">
      <v-btn
        v-if="showAssessment && currentQuestion > 0"
        variant="outlined"
        @click="previousQuestion"
      >
        <v-icon start>mdi-arrow-left</v-icon>
        Back
      </v-btn>
      <v-spacer v-else />
      <v-btn
        color="primary"
        :disabled="!canContinue"
        @click="handleContinue"
      >
        {{ continueButtonText }}
        <v-icon end v-if="!isComplete">mdi-arrow-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface DISCProfile {
  primary: string;
  secondary: string;
  scores?: Record<string, number>;
}

export interface DISCResult {
  type: 'known' | 'assessment';
  profile: DISCProfile;
  answers?: Record<string, string>;
}

export interface DISCQuestion {
  question: string;
  options: Array<{
    label: string;
    value: 'D' | 'I' | 'S' | 'C';
  }>;
}

const emit = defineEmits<{
  complete: [result: DISCResult]
}>();

const discKnowledge = ref('');
const currentQuestion = ref(0);
const selectedProfile = ref({
  primary: '',
  secondary: '',
});
const assessmentAnswers = ref<Record<string, string>>({});

// Computed properties
const showProfileSelection = computed(() => discKnowledge.value === 'yes');
const showAssessment = computed(() => 
  discKnowledge.value === 'no' || discKnowledge.value === 'not_sure'
);
const isComplete = computed(() => {
  if (showProfileSelection.value) {
    return selectedProfile.value.primary && selectedProfile.value.secondary;
  }
  if (showAssessment.value) {
    return currentQuestion.value === discAssessmentQuestions.length - 1 && 
           assessmentAnswers.value[`q${currentQuestion.value + 1}`];
  }
  return false;
});

const canContinue = computed(() => {
  if (!discKnowledge.value) return false;
  if (showProfileSelection.value) {
    return selectedProfile.value.primary && selectedProfile.value.secondary;
  }
  if (showAssessment.value) {
    return !!assessmentAnswers.value[`q${currentQuestion.value + 1}`];
  }
  return true;
});

const continueButtonText = computed(() => {
  if (!discKnowledge.value) return 'Continue';
  if (isComplete.value) return 'Complete';
  return 'Continue';
});

// Methods
const handleContinue = () => {
  if (!discKnowledge.value) {
    // First question answered
    return;
  }
  
  if (showAssessment.value) {
    if (currentQuestion.value < discAssessmentQuestions.length - 1) {
      currentQuestion.value++;
    } else if (assessmentAnswers.value[`q${currentQuestion.value + 1}`]) {
      const result = calculateDiscProfile(assessmentAnswers.value);
      emit('complete', {
        type: 'assessment',
        profile: result,
        answers: assessmentAnswers.value
      });
    }
  } else if (showProfileSelection.value && selectedProfile.value.primary && selectedProfile.value.secondary) {
    emit('complete', {
      type: 'known',
      profile: selectedProfile.value
    });
  }
};

const previousQuestion = () => {
  if (currentQuestion.value > 0) {
    currentQuestion.value--;
  }
};

// Your existing options and questions data...
const discKnowledgeOptions = [
  { label: 'Yes - I know my DISC profile', value: 'yes' },
  { label: 'No - What is DISC?', value: 'no' },
  { label: "Not sure - I've heard of it but don't remember mine", value: 'not_sure' },
];

const discStyleOptions = [
  { label: 'D (Direct/Decisive)', value: 'D' },
  { label: 'I (Influencing/Interactive)', value: 'I' },
  { label: 'S (Steady/Supportive)', value: 'S' },
  { label: 'C (Cautious/Calculating)', value: 'C' },
];

// Add the assessment questions
const discAssessmentQuestions: DISCQuestion[] = [
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

// Your existing calculation logic...
const calculateDiscProfile = (answers: Record<string, string>): DISCProfile => {
  const counts = {
    D: 0,
    I: 0,
    S: 0,
    C: 0,
  };

  Object.values(answers).forEach((answer) => {
    counts[answer as keyof typeof counts]++;
  });

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return {
    primary: sorted[0][0],
    secondary: sorted[1][0],
    scores: counts,
  };
};
</script>

<style scoped>
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

.assessment-question {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 