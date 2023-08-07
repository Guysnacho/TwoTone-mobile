export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      comment: {
        Row: {
          content: string
          created_at: string
          dislikes: number
          id: string
          likes: number
          review_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          dislikes?: number
          id?: string
          likes?: number
          review_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          dislikes?: number
          id?: string
          likes?: number
          review_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comment_review_id_fkey"
            columns: ["review_id"]
            referencedRelation: "review"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      like_dislike: {
        Row: {
          content_id: string | null
          content_type: number | null
          created_at: string
          id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content_id?: string | null
          content_type?: number | null
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content_id?: string | null
          content_type?: number | null
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "like_dislike_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      review: {
        Row: {
          content: string
          created_at: string
          dislikes: number
          id: string
          likes: number
          song_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          dislikes?: number
          id?: string
          likes?: number
          song_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          dislikes?: number
          id?: string
          likes?: number
          song_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "review_song_id_fkey"
            columns: ["song_id"]
            referencedRelation: "song"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      song: {
        Row: {
          album: string
          artists: string | null
          created_at: string
          dislikes: number
          id: string
          likes: number
          release_year: number
          title: string
          updated_at: string
        }
        Insert: {
          album: string
          artists?: string | null
          created_at?: string
          dislikes?: number
          id?: string
          likes?: number
          release_year: number
          title: string
          updated_at?: string
        }
        Update: {
          album?: string
          artists?: string | null
          created_at?: string
          dislikes?: number
          id?: string
          likes?: number
          release_year?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      sotd: {
        Row: {
          content: string
          created_at: string
          dislikes: number
          id: string
          likes: number
          song_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          dislikes?: number
          id?: string
          likes?: number
          song_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          dislikes?: number
          id?: string
          likes?: number
          song_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sotd_song_id_fkey"
            columns: ["song_id"]
            referencedRelation: "song"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sotd_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      type_lookup: {
        Row: {
          content_type: number
          created_at: string
          id: number
          type_description: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content_type: number
          created_at?: string
          id?: number
          type_description: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content_type?: number
          created_at?: string
          id?: number
          type_description?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "type_lookup_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_roles: {
        Row: {
          id: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: number
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: number
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
      app_role: "STOCK" | "CURATOR" | "ADMIN"
      user_status: "ONLINE" | "OFFLINE" | "LISTENING"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
