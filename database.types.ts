export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
          business_stage: string | null
          coach_id: string
          created_at: string | null
          current_situation: string | null
          disc_profile_id: string | null
          email: string
          first_name: string
          goals_summary: string | null
          id: string
          is_test: boolean | null
          last_name: string
          updated_at: string | null
          url_slug: string | null
        }
        Insert: {
          business_stage?: string | null
          coach_id: string
          created_at?: string | null
          current_situation?: string | null
          disc_profile_id?: string | null
          email: string
          first_name: string
          goals_summary?: string | null
          id?: string
          is_test?: boolean | null
          last_name: string
          updated_at?: string | null
          url_slug?: string | null
        }
        Update: {
          business_stage?: string | null
          coach_id?: string
          created_at?: string | null
          current_situation?: string | null
          disc_profile_id?: string | null
          email?: string
          first_name?: string
          goals_summary?: string | null
          id?: string
          is_test?: boolean | null
          last_name?: string
          updated_at?: string | null
          url_slug?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_coach_id_fkey"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "coaches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clients_disc_profile_id_fkey"
            columns: ["disc_profile_id"]
            isOneToOne: false
            referencedRelation: "disc_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      coaches: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_active: boolean | null
          name: string
          subdomain: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          name: string
          subdomain?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          name?: string
          subdomain?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      disc_profiles: {
        Row: {
          communication_style: string | null
          created_at: string | null
          id: string
          motivation_drivers: string | null
          primary_type: string
          secondary_type: string | null
          updated_at: string | null
        }
        Insert: {
          communication_style?: string | null
          created_at?: string | null
          id?: string
          motivation_drivers?: string | null
          primary_type: string
          secondary_type?: string | null
          updated_at?: string | null
        }
        Update: {
          communication_style?: string | null
          created_at?: string | null
          id?: string
          motivation_drivers?: string | null
          primary_type?: string
          secondary_type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      email_drafts: {
        Row: {
          approved_by: string | null
          context_used: string | null
          created_at: string | null
          email_id: string
          feedback: string | null
          generated_at: string
          generated_content: string
          generation_params: Json | null
          id: string
          is_final: boolean | null
          reviewed_at: string | null
          status: string
          updated_at: string | null
          version: number
        }
        Insert: {
          approved_by?: string | null
          context_used?: string | null
          created_at?: string | null
          email_id: string
          feedback?: string | null
          generated_at: string
          generated_content: string
          generation_params?: Json | null
          id?: string
          is_final?: boolean | null
          reviewed_at?: string | null
          status: string
          updated_at?: string | null
          version: number
        }
        Update: {
          approved_by?: string | null
          context_used?: string | null
          created_at?: string | null
          email_id?: string
          feedback?: string | null
          generated_at?: string
          generated_content?: string
          generation_params?: Json | null
          id?: string
          is_final?: boolean | null
          reviewed_at?: string | null
          status?: string
          updated_at?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "email_drafts_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "coaches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_drafts_email_id_fkey"
            columns: ["email_id"]
            isOneToOne: false
            referencedRelation: "emails"
            referencedColumns: ["id"]
          },
        ]
      }
      emails: {
        Row: {
          client_id: string
          content: string
          created_at: string | null
          direction: string
          has_video: boolean | null
          id: string
          parent_email_id: string | null
          replied_at: string | null
          sent_at: string | null
          status: string
          subject: string
          updated_at: string | null
        }
        Insert: {
          client_id: string
          content: string
          created_at?: string | null
          direction: string
          has_video?: boolean | null
          id?: string
          parent_email_id?: string | null
          replied_at?: string | null
          sent_at?: string | null
          status: string
          subject: string
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          content?: string
          created_at?: string | null
          direction?: string
          has_video?: boolean | null
          id?: string
          parent_email_id?: string | null
          replied_at?: string | null
          sent_at?: string | null
          status?: string
          subject?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emails_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emails_parent_email_id_fkey"
            columns: ["parent_email_id"]
            isOneToOne: false
            referencedRelation: "emails"
            referencedColumns: ["id"]
          },
        ]
      }
      goals: {
        Row: {
          client_id: string
          created_at: string | null
          description: string
          id: string
          priority: number | null
          status: string | null
          target_date: string | null
          timeframe: string
          updated_at: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          description: string
          id?: string
          priority?: number | null
          status?: string | null
          target_date?: string | null
          timeframe: string
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          description?: string
          id?: string
          priority?: number | null
          status?: string | null
          target_date?: string | null
          timeframe?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "goals_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          client_id: string
          content: string
          created_at: string | null
          follow_up_date: string | null
          id: string
          important: boolean | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          client_id: string
          content: string
          created_at?: string | null
          follow_up_date?: string | null
          id?: string
          important?: boolean | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          content?: string
          created_at?: string | null
          follow_up_date?: string | null
          id?: string
          important?: boolean | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notes_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      pain_points: {
        Row: {
          attempted_solutions: string | null
          client_id: string
          created_at: string | null
          description: string
          id: string
          resolved: boolean | null
          severity: number | null
          updated_at: string | null
        }
        Insert: {
          attempted_solutions?: string | null
          client_id: string
          created_at?: string | null
          description: string
          id?: string
          resolved?: boolean | null
          severity?: number | null
          updated_at?: string | null
        }
        Update: {
          attempted_solutions?: string | null
          client_id?: string
          created_at?: string | null
          description?: string
          id?: string
          resolved?: boolean | null
          severity?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pain_points_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      video_messages: {
        Row: {
          bucket_url: string
          created_at: string | null
          duration_seconds: number | null
          email_id: string
          id: string
          thumbnail_url: string | null
          updated_at: string | null
          viewed_at: string | null
        }
        Insert: {
          bucket_url: string
          created_at?: string | null
          duration_seconds?: number | null
          email_id: string
          id?: string
          thumbnail_url?: string | null
          updated_at?: string | null
          viewed_at?: string | null
        }
        Update: {
          bucket_url?: string
          created_at?: string | null
          duration_seconds?: number | null
          email_id?: string
          id?: string
          thumbnail_url?: string | null
          updated_at?: string | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_messages_email_id_fkey"
            columns: ["email_id"]
            isOneToOne: false
            referencedRelation: "emails"
            referencedColumns: ["id"]
          },
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
