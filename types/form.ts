// Basic form types
export interface FormOption {
  label: string
  value: string
}

export interface FormField {
  id: string
  type: string
  placeholder: string
  autocomplete?: string
  required: boolean
}

export interface OtherField {
  id: string
  placeholder: string
  rows: number
}

// Question types
export type FormQuestionType = 'radio' | 'textarea' | 'contact' | 'disc'

export interface BaseFormQuestion {
  id: string
  title: string
  type: FormQuestionType
  options?: FormOption[]
  otherField?: OtherField
  placeholder?: string
  rows?: number
  fields?: FormField[]
  required: boolean
}

// Alias for BaseFormQuestion to maintain backward compatibility
export type FormQuestion = BaseFormQuestion

export interface DISCQuestion {
  id: string
  question: string
  options: FormOption[]
}

// DISC Assessment types
export interface DISCAssessment {
  questions: DISCQuestion[]
  styles: FormOption[]
}

// Form configuration types
export interface FormConfig {
  questions: Record<string, BaseFormQuestion>
  flow: string[]
  discAssessment: DISCAssessment
}

// Form data types
export type FormFields = 
  | 'mainChallenge'
  | 'mainChallengeOther'
  | 'businessStage'
  | 'businessType'
  | 'businessTypeOther'
  | 'goal'
  | 'goalOther'
  | 'goalMeaning'
  | 'name'
  | 'email'
  | 'discProfile'
  | 'discPrimary'
  | 'discSecondary'

export interface FormData {
  [key: string]: string | Record<string, string>
  mainChallenge: string
  mainChallengeOther: string
  businessStage: string
  businessType: string
  businessTypeOther: string
  goal: string
  goalOther: string
  goalMeaning: string
  name: string
  email: string
  discProfile: string
  discPrimary: string
  discSecondary: string
  discQuestions: Record<string, string>
}

// Union type for questions
export type Question = BaseFormQuestion | DISCQuestion

// Type guards
export function isFormQuestion(question: Question | null): question is BaseFormQuestion {
  return question !== null && 'title' in question
}

export function isDISCQuestion(question: Question | null): question is DISCQuestion {
  return question !== null && 'question' in question
} 