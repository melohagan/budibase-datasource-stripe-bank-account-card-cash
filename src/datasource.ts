import { IntegrationBase } from "@budibase/types"
import Stripe from "stripe"

class CustomIntegration implements IntegrationBase {
  private readonly stripe: Stripe

  constructor(config: { apiKey: string; }) {
    this.stripe = new Stripe(config.apiKey, {
      apiVersion: '2022-08-01'
    })
  }

  async create(query: { customer: string; source: string; }) {
    return await this.stripe.customers.createSource(query.customer, { source: query.source })
  }

  async read(query: { customer: string; id: string;  }) {
    return await this.stripe.customers.retrieveSource(query.customer, query.id)
  }

  async update(query: { customer: string; id: string; body: string}) {
    return await this.stripe.customers.updateSource(query.customer, query.id, JSON.parse(query.body))
  }

  async list(query: { customer: string; limit: number; endingBefore: string; startingAfter: string; object: string; }) {
    return await this.stripe.customers.listSources(query.customer, {
      object: query.object,
      ending_before: query.endingBefore,
      starting_after: query.startingAfter,
      limit: query.limit
    })
  }

  async delete(query: { customer: string; id: string; }) {
    return await this.stripe.customers.deleteSource(query.customer, query.id)
  }

  async verify(query: { customer: string; id: string; }) {
    return await this.stripe.customers.verifySource(query.customer, query.id)
  }

  async retrieveCashBalance(query: { customer: string; }) {
    return await this.stripe.customers.retrieveCashBalance(query.customer)
  }

  async listCashBalanceTransactions(query: { customer: string; transactionId: string; limit: number; endingBefore: string; startingAfter: string;  }) {
    if (query.transactionId) {
      return await this.stripe.customers.retrieveCashBalanceTransaction(query.customer, query.transactionId)
    }
    return await this.stripe.customers.listCashBalanceTransactions(query.customer, {
      ending_before: query.endingBefore,
      starting_after: query.startingAfter,
      limit: query.limit
    })
  }
}

export default CustomIntegration