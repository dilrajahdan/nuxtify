export interface FormOption {
  label: string
  value: string
}

export interface OtherField {
  id: string
  placeholder: string
  rows: number
}

export interface ContactField {
  id: string
  type: string
  placeholder: string
  autocomplete?: string
  required: boolean
}

export interface BaseQuestion {
  id: string
  options?: FormOption[]
}

export interface FormQuestion extends BaseQuestion {
  title: string
  type: 'radio' | 'textarea' | 'contact'
  otherField?: OtherField
  placeholder?: string
  rows?: number
  fields?: ContactField[]
  required: boolean
}

export interface DISCQuestion extends BaseQuestion {
  question: string
  options: FormOption[]
}

export interface DISCAssessment {
  questions: DISCQuestion[]
  styles: FormOption[]
}

export interface FormConfig {
  questions: Record<string, FormQuestion>
  flow: string[]
  discAssessment: DISCAssessment
}

// Define valid form field keys
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