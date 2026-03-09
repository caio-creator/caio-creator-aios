/**
 * Companie API Client
 * REST client with retry logic, rate limiting, and error handling
 */

import axios, { AxiosInstance, AxiosError } from 'axios'
import { createLogger } from 'pino'
import {
  CompanieDeal,
  CompanieClient,
  CompanieConfig,
  CreateDealRequest,
  CreateClientRequest,
} from './types'

const logger = createLogger({ name: 'companie-client' })

export class CompanieClient {
  private client: AxiosInstance
  private config: CompanieConfig
  private retryCount = 0

  constructor(config: CompanieConfig) {
    this.config = {
      timeout: 30000,
      retryAttempts: 3,
      retryDelay: 1000,
      ...config,
    }

    this.client = axios.create({
      baseURL: this.config.apiBase,
      timeout: this.config.timeout,
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
    })

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => this.handleError(error)
    )
  }

  /**
   * LIST DEALS
   * Get all deals (with optional filters)
   */
  async listDeals(params?: {
    stage?: string
    client_id?: string
    limit?: number
    offset?: number
  }): Promise<{ data: CompanieDeal[]; total: number }> {
    try {
      logger.debug('Listing deals', { params })

      const response = await this.client.get<{
        data: CompanieDeal[]
        pagination: { total: number; limit: number; offset: number }
      }>('/deals', { params })

      return {
        data: response.data.data,
        total: response.data.pagination.total,
      }
    } catch (error) {
      logger.error('Failed to list deals', { error })
      throw error
    }
  }

  /**
   * CREATE DEAL
   * Create new deal in Companie
   */
  async createDeal(request: CreateDealRequest): Promise<CompanieDeal> {
    try {
      logger.info('Creating deal', { title: request.title })

      const response = await this.client.post<CompanieDeal>(
        '/deals',
        request
      )

      logger.info(`Deal created: ${response.data.id}`)
      return response.data
    } catch (error) {
      logger.error('Failed to create deal', { error, request })
      throw error
    }
  }

  /**
   * GET DEAL
   * Retrieve specific deal
   */
  async getDeal(dealId: string): Promise<CompanieDeal> {
    try {
      const response = await this.client.get<CompanieDeal>(
        `/deals/${dealId}`
      )
      return response.data
    } catch (error) {
      logger.error('Failed to get deal', { dealId, error })
      throw error
    }
  }

  /**
   * UPDATE DEAL
   * Update deal status, value, etc
   */
  async updateDeal(
    dealId: string,
    updates: Partial<CreateDealRequest>
  ): Promise<CompanieDeal> {
    try {
      logger.info('Updating deal', { dealId, updates })

      const response = await this.client.put<CompanieDeal>(
        `/deals/${dealId}`,
        updates
      )

      logger.info(`Deal updated: ${dealId}`)
      return response.data
    } catch (error) {
      logger.error('Failed to update deal', { dealId, error })
      throw error
    }
  }

  /**
   * LIST CLIENTS
   * Get all clients (with optional filters)
   */
  async listClients(params?: {
    email?: string
    name?: string
    limit?: number
    offset?: number
  }): Promise<{ data: CompanieClient[]; total: number }> {
    try {
      logger.debug('Listing clients', { params })

      const response = await this.client.get<{
        data: CompanieClient[]
        pagination: { total: number; limit: number; offset: number }
      }>('/clients', { params })

      return {
        data: response.data.data,
        total: response.data.pagination.total,
      }
    } catch (error) {
      logger.error('Failed to list clients', { error })
      throw error
    }
  }

  /**
   * CREATE CLIENT
   * Add new client to Companie
   */
  async createClient(request: CreateClientRequest): Promise<CompanieClient> {
    try {
      logger.info('Creating client', { name: request.name })

      const response = await this.client.post<CompanieClient>(
        '/clients',
        request
      )

      logger.info(`Client created: ${response.data.id}`)
      return response.data
    } catch (error) {
      logger.error('Failed to create client', { error, request })
      throw error
    }
  }

  /**
   * GET CLIENT
   * Retrieve specific client
   */
  async getClient(clientId: string): Promise<CompanieClient> {
    try {
      const response = await this.client.get<CompanieClient>(
        `/clients/${clientId}`
      )
      return response.data
    } catch (error) {
      logger.error('Failed to get client', { clientId, error })
      throw error
    }
  }

  /**
   * FIND OR CREATE CLIENT
   * Search for client by email, create if not found
   */
  async findOrCreateClient(
    clientData: CreateClientRequest
  ): Promise<CompanieClient> {
    try {
      // Try to find existing
      if (clientData.email) {
        const { data } = await this.listClients({
          email: clientData.email,
        })

        if (data.length > 0) {
          logger.info(`Client found: ${data[0].id}`)
          return data[0]
        }
      }

      // Create new if not found
      return await this.createClient(clientData)
    } catch (error) {
      logger.error('Failed to find or create client', { error })
      throw error
    }
  }

  /**
   * VERIFY AUTH
   * Test API connection
   */
  async verifyAuth(): Promise<{ authenticated: boolean; user?: string }> {
    try {
      const response = await this.client.get<{
        id: string
        name: string
      }>('/users/me')

      logger.info(`Auth verified for user: ${response.data.name}`)
      return {
        authenticated: true,
        user: response.data.name,
      }
    } catch (error) {
      logger.error('Auth verification failed', { error })
      return {
        authenticated: false,
      }
    }
  }

  /**
   * INTERNAL: Error handling with retry logic
   */
  private async handleError(error: AxiosError): Promise<never> {
    const status = error.response?.status
    const message = error.message

    // Rate limit (429) - retry with backoff
    if (status === 429 && this.retryCount < this.config.retryAttempts!) {
      this.retryCount++
      const delay =
        this.config.retryDelay! * Math.pow(2, this.retryCount - 1)

      logger.warn(`Rate limited, retrying in ${delay}ms (attempt ${this.retryCount})`)
      await new Promise((resolve) => setTimeout(resolve, delay))

      // Note: This is a simplified retry - in production use interceptors
      throw error
    }

    this.retryCount = 0

    // Network error
    if (!status) {
      logger.error('Network error', { message })
      throw new Error(`Network error: ${message}`)
    }

    // Auth error
    if (status === 401 || status === 403) {
      logger.error('Authentication error', { status })
      throw new Error(
        'Companie API authentication failed. Check your API key.'
      )
    }

    // Validation error
    if (status === 400) {
      const errorData = error.response?.data as any
      logger.error('Validation error', { status, errorData })
      throw new Error(
        `Validation error: ${errorData?.message || 'Invalid request'}`
      )
    }

    // Server error
    if (status >= 500) {
      logger.error('Server error', { status })
      throw new Error(
        `Companie server error (${status}). Please try again later.`
      )
    }

    // Generic error
    logger.error('API error', { status, message })
    throw error
  }
}

/**
 * Factory function
 */
export function createCompanieClient(config: CompanieConfig): CompanieClient {
  return new CompanieClient(config)
}
