// types/database.ts

// Base types for common fields
interface BaseModel {
    id: string
    created_at: string
    updated_at: string
  }
  
  // Main entity types
  export interface Coach extends BaseModel {
    user_id: string
    email: string
    name: string
    subdomain: string | null
    is_active: boolean
  }
  
  export interface DiscProfile extends BaseModel {
    primary_type: 'D' | 'I' | 'S' | 'C'
    secondary_type: 'D' | 'I' | 'S' | 'C' | null
    communication_style: string | null
    motivation_drivers: string | null
  }
  
  export interface Client extends BaseModel {
    coach_id: string
    disc_profile_id: string | null
    first_name: string
    last_name: string
    email: string
    url_slug: string | null
    current_situation: string | null
    business_stage: string | null
    goals_summary: string | null
    is_test: boolean
  }
  
  export interface Goal extends BaseModel {
    client_id: string
    description: string
    timeframe: string
    priority: 1 | 2 | 3 | 4 | 5
    status: 'active' | 'completed' | 'cancelled' | 'on_hold'
    target_date: string | null
  }
  
  export interface PainPoint extends BaseModel {
    client_id: string
    description: string
    severity: number // 1-10
    attempted_solutions: string | null
    resolved: boolean
  }
  
  export interface Note extends BaseModel {
    client_id: string
    content: string
    type: 'general' | 'meeting' | 'follow_up' | 'milestone'
    important: boolean
    follow_up_date: string | null
  }
  
  export interface Email extends BaseModel {
    client_id: string
    parent_email_id: string | null
    direction: 'outbound' | 'inbound'
    subject: string
    content: string
    has_video: boolean
    status: 'draft' | 'pending' | 'approved' | 'sent' | 'replied'
    sent_at: string | null
    replied_at: string | null
  }
  
  export interface EmailDraft extends BaseModel {
    email_id: string
    generated_content: string
    context_used: string | null
    generation_params: Record<string, any> | null // JSONB type
    status: 'pending' | 'approved' | 'rejected'
    feedback: string | null
    version: number
    is_final: boolean
    approved_by: string | null // coach_id
    generated_at: string
    reviewed_at: string | null
  }
  
  export interface VideoMessage extends BaseModel {
    email_id: string
    bucket_url: string
    duration_seconds: number | null
    thumbnail_url: string | null
    viewed_at: string | null
  }
  
  // Database schema type that includes all tables
  export interface Database {
    public: {
      Tables: {
        coaches: {
          Row: Coach
          Insert: Omit<Coach, 'id' | 'created_at' | 'updated_at'>
          Update: Partial<Omit<Coach, 'id' | 'created_at' | 'updated_at'>>
        }
        disc_profiles: {
          Row: DiscProfile
          Insert: Omit<DiscProfile, 'id' | 'created_at' | 'updated_at'>
          Update: Partial<Omit<DiscProfile, 'id' | 'created_at' | 'updated_at'>>
        }
        clients: {
          Row: Client
          Insert: Omit<Client, 'id' | 'created_at' | 'updated_at'>
          Update: Partial<Omit<Client, 'id' | 'created_at' | 'updated_at'>>
        }
        goals: {
          Row: Goal
          Insert: Omit<Goal, 'id' | 'created_at' | 'updated_at'>
          Update: Partial<Omit<Goal, 'id' | 'created_at' | 'updated_at'>>
        }
        pain_points: {
          Row: PainPoint
          Insert: Omit<PainPoint, 'id' | 'created_at' | 'updated_at'>
          Update: Partial<Omit<PainPoint, 'id' | 'created_at' | 'updated_at'>>
        }
        notes: {
          Row: Note
          Insert: Omit<Note, 'id' | 'created_at' | 'updated_at'>
          Update: Partial<Omit<Note, 'id' | 'created_at' | 'updated_at'>>
        }
        emails: {
          Row: Email
          Insert: Omit<Email, 'id' | 'created_at' | 'updated_at'>
          Update: Partial<Omit<Email, 'id' | 'created_at' | 'updated_at'>>
        }
        email_drafts: {
          Row: EmailDraft
          Insert: Omit<EmailDraft, 'id' | 'created_at' | 'updated_at'>
          Update: Partial<Omit<EmailDraft, 'id' | 'created_at' | 'updated_at'>>
        }
        video_messages: {
          Row: VideoMessage
          Insert: Omit<VideoMessage, 'id' | 'created_at' | 'updated_at'>
          Update: Partial<Omit<VideoMessage, 'id' | 'created_at' | 'updated_at'>>
        }
      }
      Views: {
        [_ in never]: never
      }
      Functions: {
        [_ in never]: never
      }
      Enums: {
        [_ in never]: never
      }
    }
  }