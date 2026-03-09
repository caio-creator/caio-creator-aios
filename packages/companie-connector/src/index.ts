/**
 * @aios/companie-connector
 * Companie CRM API Client
 *
 * Usage:
 * const { createCompanieClient } = require('@aios/companie-connector')
 * const companie = createCompanieClient({
 *   apiKey: process.env.COMPANIE_API_KEY,
 *   apiBase: 'https://api.companie.app/v1'
 * })
 *
 * const deal = await companie.createDeal({
 *   title: 'New Proposal',
 *   stage: 'proposal',
 *   value: 25000,
 *   currency: 'BRL',
 *   client_id: 'client_123'
 * })
 */

export {
  CompanieDeal,
  CompanieClient,
  CompanieConfig,
  CreateDealRequest,
  CreateClientRequest,
} from './types'

export { CompanieClient, createCompanieClient } from './client'
