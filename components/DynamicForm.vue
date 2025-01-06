<template>
  <div class="dynamic-form">
    <v-card class="pa-4">
      <v-progress-linear
        v-model="progress"
        color="primary"
        height="8"
        rounded
      />

      <!-- Success Dialog -->
      <v-dialog
        v-model="showSuccess"
        persistent
        max-width="400"
      >
        <v-card>
          <v-card-text class="text-center pa-6">
            <v-icon
              color="success"
              size="64"
              class="mb-4"
            >
              mdi-check-circle
            </v-icon>
            <h3 class="text-h5 mb-2">Thank You!</h3>
            <p class="text-body-1">Your responses have been submitted successfully. We'll be in touch soon!</p>
          </v-card-text>
          <v-card-actions class="pa-6 pt-0">
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

      <div class="mt-4">
        <v-card-title class="text-h6">
          {{ currentStep === totalSteps ? 'Summary' : getQuestionTitle(currentQuestion) }}
        </v-card-title>

        <v-card-text>
          <!-- Summary Step -->
          <div v-if="currentStep === totalSteps">
            <div class="summary-section">
              <h3 class="text-h6 mb-4">Summary of Your Responses</h3>
              
              <!-- Main Challenge -->
              <div v-if="form.mainChallenge" class="mb-3">
                <div class="font-weight-medium">Main Challenge:</div>
                <div>{{ form.mainChallenge === 'other' ? form.mainChallengeOther : form.mainChallenge }}</div>
              </div>

              <!-- Business Stage -->
              <div v-if="form.businessStage" class="mb-3">
                <div class="font-weight-medium">Business Stage:</div>
                <div>{{ form.businessStage }}</div>
              </div>

              <!-- Business Type -->
              <div v-if="form.businessType" class="mb-3">
                <div class="font-weight-medium">Business Type:</div>
                <div>{{ form.businessType === 'other' ? form.businessTypeOther : form.businessType }}</div>
              </div>

              <!-- Goal -->
              <div v-if="form.goal" class="mb-3">
                <div class="font-weight-medium">Goal:</div>
                <div>{{ form.goal === 'other' ? form.goalOther : form.goal }}</div>
              </div>

              <!-- Goal Meaning -->
              <div v-if="form.goalMeaning" class="mb-3">
                <div class="font-weight-medium">Goal Meaning:</div>
                <div>{{ form.goalMeaning }}</div>
              </div>

              <!-- Contact Info -->
              <div v-if="form.name || form.email" class="mb-3">
                <div class="font-weight-medium">Contact Information:</div>
                <div v-if="form.name">Name: {{ form.name }}</div>
                <div v-if="form.email">Email: {{ form.email }}</div>
              </div>

              <!-- DISC Profile -->
              <div v-if="form.discProfile" class="mb-3">
                <div class="font-weight-medium">DISC Profile:</div>
                <template v-if="form.discProfile === 'yes'">
                  <div>Primary Style: {{ form.discPrimary }}</div>
                  <div>Secondary Style: {{ form.discSecondary }}</div>
                </template>
                <template v-else>
                  <div>Based on your assessment:</div>
                  <div>Primary Style: {{ form.discPrimary }}</div>
                  <div>Secondary Style: {{ form.discSecondary }}</div>
                </template>
              </div>
            </div>
          </div>

          <!-- Regular Questions -->
          <template v-else>
            <div v-if="getQuestionType(currentQuestion) === 'contact' && isFormQuestion(currentQuestion)">
              <v-text-field
                v-for="field in currentQuestion.fields"
                :key="field.id"
                v-model="form[field.id]"
                :label="field.placeholder"
                :type="field.type"
                :autocomplete="field.autocomplete"
                variant="outlined"
                density="comfortable"
                class="mb-4"
                :required="field.required"
              />
            </div>

            <template v-else-if="isNonNullString(safeQuestionId) && !isDISCQuestion(currentQuestion)">
              <div v-if="getQuestionType(currentQuestion) === 'radio'">
                <v-radio-group
                  :model-value="getFormValue(safeQuestionId)"
                  @update:model-value="handleOptionUpdate"
                >
                  <v-radio
                    v-for="option in getQuestionOptions(currentQuestion)"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </v-radio-group>

                <v-text-field
                  v-if="getFormValue(safeQuestionId) === 'other'"
                  :model-value="getFormValue(`${safeQuestionId}Other`)"
                  @update:model-value="handleOtherFieldUpdate"
                  label="Please specify"
                  variant="outlined"
                  density="comfortable"
                />
              </div>

              <div v-else-if="getQuestionType(currentQuestion) === 'textarea'">
                <v-textarea
                  :model-value="getFormValue(safeQuestionId)"
                  @update:model-value="handleTextareaUpdate"
                  :placeholder="getQuestionPlaceholder(currentQuestion)"
                  :rows="getQuestionRows(currentQuestion)"
                  auto-grow
                  variant="outlined"
                  class="mt-2"
                  hide-details
                />
              </div>
            </template>

            <div v-if="getQuestionType(currentQuestion) === 'disc'">
              <!-- Primary Style -->
              <div class="mb-6">
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
              <div v-if="form.discPrimary">
                <div class="text-subtitle-1 mb-2">Secondary Style</div>
                <v-radio-group
                  v-model="form.discSecondary"
                  class="option-group"
                >
                  <v-radio
                    v-for="option in discStyleOptions.filter(o => o.value !== form.discPrimary)"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                    color="primary"
                    class="option-item mb-2"
                  />
                </v-radio-group>
              </div>
            </div>

            <!-- DISC Assessment Questions -->
            <div v-else-if="isDISCQuestion(currentQuestion)">
              <div class="assessment-question">
                <v-radio-group
                  v-model="form.discQuestions[currentQuestion.id]"
                  class="option-group"
                  mandatory
                  :name="currentQuestion.id"
                  @update:model-value="value => {
                    if (currentQuestion && typeof value === 'string') {
                      handleOptionSelect(currentQuestion.id, value)
                    }
                  }"
                >
                  <v-radio
                    v-for="option in currentQuestion.options"
                    :key="`${currentQuestion.id}-${option.value}`"
                    :value="option.value"
                    :label="option.label"
                    color="primary"
                    class="option-item mb-2"
                  />
                </v-radio-group>
              </div>
            </div>
          </template>

          <!-- Debug info -->
          <div v-if="runtimeConfig.public.debug" class="debug-info mt-4 text-caption">
            <div>Current Step: {{ currentStep }}</div>
            <div>Total Steps: {{ totalSteps }}</div>
            <div>Question Type: {{ currentStep === totalSteps ? 'summary' : getQuestionType(currentQuestion) }}</div>
            <div>Question ID: {{ safeQuestionId }}</div>
            <div>Question Title: {{ currentStep === totalSteps ? 'Summary' : getQuestionTitle(currentQuestion) }}</div>
            <div>Current Question: {{ JSON.stringify(currentQuestion, null, 2) }}</div>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn
            v-if="currentStep > 1"
            variant="text"
            @click="previousStep"
          >
            Back
          </v-btn>
          <v-spacer />
          <v-btn
            v-if="shouldShowContinueButton"
            color="primary"
            :disabled="!canProgress"
            @click="nextStep"
          >
            {{ continueButtonText }}
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { FormOption, FormData } from '~/types/form'

const discStyleOptions = [
  { label: 'D (Direct/Decisive)', value: 'D' },
  { label: 'I (Influencing/Interactive)', value: 'I' },
  { label: 'S (Steady/Supportive)', value: 'S' },
  { label: 'C (Cautious/Calculating)', value: 'C' }
]

interface FormField {
  id: string
  type: string
  placeholder: string
  autocomplete?: string
  required: boolean
}

interface BaseFormQuestion {
  id: string
  title: string
  type: string
  options?: FormOption[]
  otherField?: {
    id: string
    placeholder: string
    rows: number
  }
  placeholder?: string
  rows?: number
  fields?: FormField[]
  required: boolean
}

interface DISCQuestion {
  id: string
  question: string
  options: FormOption[]
}

type Question = BaseFormQuestion | DISCQuestion

const {
  form,
  currentStep,
  totalSteps,
  progress,
  currentQuestion,
  canProgress,
  shouldShowContinueButton,
  continueButtonText,
  handleOptionSelect,
  nextStep,
  previousStep,
  handleSubmit,
  isFormQuestion,
  isDISCQuestion,
  showSuccess,
  handleSuccessClose
} = useOnboardingForm()

const emit = defineEmits(['expand'])

const handleExpand = () => {
  emit('expand')
}

const getQuestionId = (question: Question | null): string => {
  if (!question) return ''
  return question.id
}

const getQuestionTitle = (question: Question | null): string => {
  if (!question) return ''
  return 'title' in question ? question.title : question.question
}

const getQuestionType = (question: Question | null): string => {
  if (!question) return ''
  return 'type' in question ? question.type : 'radio'
}

const getQuestionOptions = (question: Question | null): FormOption[] => {
  if (!question) return []
  return question.options || []
}

const getCurrentQuestionId = computed<string | null>(() => {
  const question = currentQuestion.value
  if (!question) return null
  return question.id
})

const safeQuestionId = computed<string>(() => getCurrentQuestionId.value ?? '')

// Type guard for non-null string
const isNonNullString = (value: string | null): value is string => {
  return value !== null && value !== ''
}

const getFormValue = (key: string): string => {
  if (!key) return ''
  const value = form.value[key as keyof FormData]
  return typeof value === 'string' ? value : ''
}

const setFormValue = (key: string, value: string) => {
  if (!key) return
  if (key in form.value) {
    form.value[key as keyof FormData] = value
  }
}

const handleOptionUpdate = (value: string | null) => {
  if (!value) return
  const id = safeQuestionId.value
  if (isNonNullString(id)) {
    handleOptionSelect(id, value)
  }
}

const handleOtherFieldUpdate = (value: string | null) => {
  if (!value) return
  const id = safeQuestionId.value
  if (isNonNullString(id)) {
    setFormValue(`${id}Other`, value)
  }
}

const handleTextareaUpdate = (value: string | null) => {
  if (!value) return
  const id = safeQuestionId.value
  if (isNonNullString(id)) {
    setFormValue(id, value)
  }
}

const getQuestionPlaceholder = (question: Question | null): string => {
  if (!question) return ''
  return 'placeholder' in question ? question.placeholder || '' : ''
}

const getQuestionRows = (question: Question | null): number => {
  if (!question) return 3
  return 'rows' in question ? question.rows || 3 : 3
}

// Add watchers for debugging
watch(currentStep, (newValue) => {
  console.log('Current step changed:', newValue)
  console.log('Current question:', currentQuestion.value)
  console.log('Question title:', getQuestionTitle(currentQuestion.value))
  console.log('Question type:', getQuestionType(currentQuestion.value))
  console.log('DISC Primary:', form.value.discPrimary)
  console.log('DISC Secondary:', form.value.discSecondary)
})

watch(currentQuestion, (newValue) => {
  console.log('Current question changed:', newValue)
  console.log('Question title:', getQuestionTitle(newValue))
  console.log('Question type:', getQuestionType(newValue))
})

const runtimeConfig = useRuntimeConfig()

// Debug info computed
const debugInfo = computed(() => ({
  currentStep: currentStep.value,
  questionType: getQuestionType(currentQuestion.value),
  questionId: safeQuestionId.value,
  questionTitle: getQuestionTitle(currentQuestion.value)
}))
</script>

<style scoped>
.dynamic-form {
  max-width: 600px;
  margin: 0 auto;
}
</style> 