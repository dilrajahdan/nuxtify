export interface Lead {
  id: number
  name: string
  email: string
  avatar?: string
  discProfile: string
  goal: string
  goalStatus: 'active' | 'completed' | 'paused'
  tags: string[]
  lastContactDate: Date
  details: string
}

export interface Note {
  id: number
  content: string
  author: string
  createdAt: Date
}

export interface Email {
  id: number
  subject: string
  preview: string
  status: 'sent' | 'opened' | 'clicked'
  sentAt: Date
  body?: string
} 