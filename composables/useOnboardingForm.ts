import { formConfig } from '~/config/form-config'
import { isFormQuestion, isDISCQuestion } from '~/types/form'
import type { 
  FormData, 
  DISCQuestion, 
  Question,
  BaseFormQuestion
} from '~/types/form'

export const useOnboardingForm = () => {
  const currentStep = ref(1)
  const isExpanded = ref(false)
  const showSuccess = ref(false)
  const loading = ref(false)
  const isResetting = ref(false)

  // Initialize form data
  const form = ref<FormData>({
    mainChallenge: '',
    mainChallengeOther: '',
    businessStage: '',
    businessType: '',
    businessTypeOther: '',
    goal: '',
    goalOther: '',
    goalMeaning: '',
    name: '',
    email: '',
    discProfile: '',
    discPrimary: '',
    discSecondary: '',
    discQuestions: {}
  })

  // Computed properties
  const totalSteps = computed(() => {
    // Base steps from the flow
    const baseSteps = formConfig.flow.length
    
    // Add DISC assessment questions if needed
    if (form.value.discProfile === 'no' || form.value.discProfile === 'not_sure') {
      return baseSteps + formConfig.discAssessment.questions.length + 1 // +1 for summary
    }
    
    // For known DISC profile, add summary step
    return baseSteps + 1 // +1 for summary
  })

  const progress = computed(() => (currentStep.value / totalSteps.value) * 100)
  
  const isLastStep = computed(() => currentStep.value === totalSteps.value)

  const currentQuestion = computed(() => {
    // Get the current question from the flow
    if (currentStep.value <= formConfig.flow.length) {
      const questionId = formConfig.flow[currentStep.value - 1]
      const question = formConfig.questions[questionId]
      
      // If we're on the DISC profile question and they've selected 'yes',
      // show the DISC selection form instead
      if (questionId === 'discProfile' && form.value.discProfile === 'yes') {
        return {
          id: 'discSelection',
          title: `What's your DISC profile?`,
          type: 'disc' as const,
          required: true,
          options: formConfig.discAssessment.styles // Use the styles from the config
        } as BaseFormQuestion
      }

      console.log('Current question from flow:', {
        step: currentStep.value,
        questionId,
        question
      })
      return question
    }

    // Handle DISC assessment questions
    if (form.value.discProfile === 'no' || form.value.discProfile === 'not_sure') {
      const questionIndex = currentStep.value - formConfig.flow.length - 1
      return formConfig.discAssessment.questions[questionIndex]
    }

    return null
  })

  const canProgress = computed(() => {
    const question = currentQuestion.value
    if (!question) return false

    if (isFormQuestion(question)) {
      // Handle contact info fields
      if (question.type === 'contact') {
        // Check if all required fields are filled
        return question.fields?.every(field => {
          if (field.required) {
            const value = form.value[field.id as keyof FormData]
            return !!value && typeof value === 'string' && value.trim() !== ''
          }
          return true
        }) ?? false
      }

      // Handle DISC profile selection
      if (question.type === 'disc') {
        return !!form.value.discPrimary && !!form.value.discSecondary
      }

      const value = form.value[question.id]
      if (!value) return false

      // Handle "other" fields
      if (value === 'other') {
        const otherValue = form.value[`${question.id}Other`]
        return !!otherValue
      }

      return true
    } else if (isDISCQuestion(question)) {
      return !!form.value.discQuestions[question.id]
    }

    return true
  })

  const shouldShowContinueButton = computed(() => true)

  const continueButtonText = computed(() => {
    if (currentStep.value === totalSteps.value) return 'Submit'
    return 'Continue'
  })

  // Methods
  const handleOptionSelect = (questionId: string, value: string) => {
    if (questionId in form.value) {
      (form.value as any)[questionId] = value
      
      // Clear "other" field when switching away from "other" option
      if (value !== 'other') {
        const otherField = `${questionId}Other`
        if (otherField in form.value) {
          (form.value as any)[otherField] = ''
        }
      }

      // Reset DISC profile selections when changing DISC profile answer
      if (questionId === 'discProfile') {
        form.value.discPrimary = ''
        form.value.discSecondary = ''
        form.value.discQuestions = {}
      }
    } else if (questionId.startsWith('disc')) {
      // Handle DISC assessment questions
      form.value.discQuestions[questionId] = value
    }

    handleAutoAdvance()
  }

  const handleAutoAdvance = () => {
    if (isResetting.value) return

    if (!isExpanded.value && currentStep.value === 1) {
      if (form.value.mainChallenge === 'other') {
        isExpanded.value = true
        return
      }
      isExpanded.value = true
      currentStep.value++
      return
    }

    if (canProgress.value) {
      // Don't auto-advance on DISC profile selection if they chose 'yes'
      if (currentStep.value === formConfig.flow.indexOf('discProfile') + 1 && form.value.discProfile === 'yes') {
        console.log('Preventing auto-advance for DISC profile selection')
        return
      }
      
      // Don't auto-advance on textarea questions or contact info
      const question = currentQuestion.value
      if (isFormQuestion(question)) {
        if (question.type === 'textarea' || question.type === 'contact' || question.type === 'disc') {
          console.log('Preventing auto-advance for:', question.type)
          return
        }
      }
      
      // Don't auto-advance on the final step
      if (currentStep.value < totalSteps.value) {
        nextStep()
      }
    }
  }

  const nextStep = () => {
    try {
      // Store current form data
      const currentFormData = { ...form.value }

      // Log current state before step change
      console.log('Before step change:', {
        currentStep: currentStep.value,
        question: currentQuestion.value,
        formData: { ...form.value }
      })

      // Handle DISC profile flow
      const discProfileStep = formConfig.flow.indexOf('discProfile') + 1
      if (currentStep.value === discProfileStep) {
        if (form.value.discProfile === 'yes') {
          // Only proceed if both primary and secondary are selected
          if (form.value.discPrimary && form.value.discSecondary) {
            // Go directly to the summary step
            currentStep.value = totalSteps.value
            return
          }
          // Otherwise stay on this step to let them select their DISC profile
          return
        } else {
          // Start DISC assessment questions
          currentStep.value++
        }
      } else if (currentStep.value > discProfileStep && form.value.discProfile !== 'yes') {
        // Handle DISC assessment questions
        const currentQuestionIndex = currentStep.value - (discProfileStep + 1)
        console.log('DISC Assessment:', {
          currentQuestionIndex,
          totalQuestions: formConfig.discAssessment.questions.length,
          currentAnswers: form.value.discQuestions
        })
        
        const currentDISCQuestion = formConfig.discAssessment.questions[currentQuestionIndex]
        
        if (currentDISCQuestion) {
          console.log('Current DISC Question:', {
            question: currentDISCQuestion,
            answer: form.value.discQuestions[currentDISCQuestion.id]
          })
          
          const answer = form.value.discQuestions[currentDISCQuestion.id]
          if (answer) {
            // Check if this is the last question
            if (currentQuestionIndex === formConfig.discAssessment.questions.length - 1) {
              console.log('Last DISC question answered, calculating profile')
              // Last question answered, calculate profile
              const result = calculateDiscProfile(form.value.discQuestions)
              // Update form state once
              form.value = {
                ...form.value,
                discPrimary: result.primary,
                discSecondary: result.secondary
              }
              console.log('Calculated DISC profile:', result)
              // Go to summary step first
              currentStep.value = totalSteps.value
              return
            }
            // Not the last question, move to next
            console.log('Moving to next DISC question')
            currentStep.value++
          }
        }
      } else if (currentStep.value === totalSteps.value) {
        // Handle submit from summary page
        handleSubmit()
        return
      } else {
        // Normal flow - increment if we haven't reached the total steps
        if (currentStep.value < totalSteps.value) {
          currentStep.value++
        }
      }

      // Log state after step change
      console.log('After step change:', {
        currentStep: currentStep.value,
        question: currentQuestion.value,
        formData: { ...form.value }
      })
    } catch (error) {
      console.error('Error in nextStep:', error)
    }
  }

  const previousStep = () => {
    if (currentStep.value > 1) {
      // Store current form data
      const currentFormData = { ...form.value }
      
      currentStep.value--
      
      // Don't restore form data when going back
      // form.value = { ...currentFormData }
    }
  }

  const calculateDiscProfile = (answers: Record<string, string>) => {
    const counts = {
      D: 0,
      I: 0,
      S: 0,
      C: 0
    }

    Object.values(answers).forEach((answer) => {
      if (answer in counts) {
        counts[answer as keyof typeof counts]++
      }
    })

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])

    return {
      primary: sorted[0][0],
      secondary: sorted[1][0],
      scores: counts
    }
  }

  const handleSubmit = async () => {
    try {
      loading.value = true
      console.log('Submitting form data:', { ...form.value })
      
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Show success state
      showSuccess.value = true
      
      // Reset form after successful submission
      setTimeout(() => {
        resetForm()
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 2000)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      loading.value = false
    }
  }

  const resetForm = () => {
    isResetting.value = true
    
    isExpanded.value = false
    currentStep.value = 1
    form.value = {
      mainChallenge: '',
      mainChallengeOther: '',
      businessStage: '',
      businessType: '',
      businessTypeOther: '',
      goal: '',
      goalOther: '',
      goalMeaning: '',
      name: '',
      email: '',
      discProfile: '',
      discPrimary: '',
      discSecondary: '',
      discQuestions: {}
    }
    
    nextTick(() => {
      isResetting.value = false
    })
  }

  const handleSuccessClose = async () => {
    showSuccess.value = false
    await nextTick()
    resetForm()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Add logging for form state changes
  watch(form, (newValue) => {
    console.log('Form state changed:', {
      currentStep: currentStep.value,
      formData: { ...newValue }
    })
  }, { deep: true })

  // Add logging for step changes
  watch(currentStep, (newValue, oldValue) => {
    console.log('Step changed:', {
      from: oldValue,
      to: newValue,
      totalSteps: totalSteps.value,
      currentQuestion: currentQuestion.value,
      questionId: currentQuestion.value?.id,
      questionTitle: currentQuestion.value ? (isFormQuestion(currentQuestion.value) ? currentQuestion.value.title : currentQuestion.value.question) : null,
      formFlow: formConfig.flow,
      flowLength: formConfig.flow.length
    })
  })

  return {
    // State
    form,
    currentStep,
    isExpanded,
    showSuccess,
    loading,
    
    // Computed
    totalSteps,
    progress,
    isLastStep,
    currentQuestion,
    canProgress,
    shouldShowContinueButton,
    continueButtonText,
    
    // Methods
    handleOptionSelect,
    handleAutoAdvance,
    nextStep,
    previousStep,
    handleSubmit,
    resetForm,
    handleSuccessClose,
    
    // Type Guards
    isFormQuestion,
    isDISCQuestion
  }
} 