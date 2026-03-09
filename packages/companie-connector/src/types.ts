/**
 * Type definitions for Companie CRM API
 */

export interface CompanieDeal {
  id: string
  title: string
  stage: 'lead' | 'proposal' | 'negotiation' | 'won' | 'lost'
  value: number
  currency: string
  client_id: string
  owner_id?: string
  created_at: string
  updated_at?: string
  due_date?: string
  tags?: string[]
  description?: string
  metadata?: Record<string, any>
}

export interface CompanieClient {
  id: string
  name: string
  email?: string
  phone?: string
  address?: string
  industry?: string
  size?: string
  country?: string
  created_at: string
  metadata?: Record<string, any>
}

export interface CreateDealRequest {
  title: string
  stage: CompanieDeals['stage']
  value: number
  currency: string
  client_id: string
  owner_id?: string
  description?: string
  due_date?: string
  tags?: string[]
  metadata?: Record<string, any>
}

export interface CreateClientRequest {
  name: string
  email?: string
  phone?: string
  address?: string
  industry?: string
  size?: string
  country?: string
  metadata?: Record<string, any>
}

export interface CompanieConfig {
  apiKey: string
  apiBase: string
  timeout?: number
  retryAttempts?: number
  retryDelay?: number
}

// Export for reference
export type CompanieDeals = CompanieDeal
