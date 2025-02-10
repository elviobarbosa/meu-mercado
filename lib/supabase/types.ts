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
      profiles: {
        Row: {
          id: string
          updated_at: string
          username: string | null
          full_name: string | null
        }
        Insert: {
          id: string
          updated_at?: string
          username?: string | null
          full_name?: string | null
        }
        Update: {
          id?: string
          updated_at?: string
          username?: string | null
          full_name?: string | null
        }
      }
      supermarkets: {
        Row: {
          id: string
          name: string
          address: string
          latitude: number | null
          longitude: number | null
          created_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          name: string
          address: string
          latitude?: number | null
          longitude?: number | null
          created_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          name?: string
          address?: string
          latitude?: number | null
          longitude?: number | null
          created_at?: string
          created_by?: string | null
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
          is_default: boolean
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
          is_default?: boolean
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
          is_default?: boolean
        }
      }
      shopping_lists: {
        Row: {
          id: string
          name: string
          user_id: string
          supermarket_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          user_id: string
          supermarket_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          user_id?: string
          supermarket_id?: string | null
          created_at?: string
        }
      }
      shopping_list_items: {
        Row: {
          id: string
          shopping_list_id: string
          product_id: string
          price: number | null
          min_quantity: number
          max_quantity: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          shopping_list_id: string
          product_id: string
          price?: number | null
          min_quantity?: number
          max_quantity?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          shopping_list_id?: string
          product_id?: string
          price?: number | null
          min_quantity?: number
          max_quantity?: number | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Functions: {
      get_lowest_prices: {
        Args: {
          product_id: string
        }
        Returns: {
          supermarket_name: string
          price: number
          price_date: string
        }[]
      }
    }
  }
}