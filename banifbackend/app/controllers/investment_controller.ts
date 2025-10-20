// app/controllers/investment_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import { invest, withdraw } from '../services/investment_service.js'
import Investment from '#models/investment'

export default class InvestmentController {
  /**
   * Adiciona dinheiro em um investimento
   */
  async store({ request, auth, response }: HttpContext) {
    try {
      const { value, password } = request.only(['value', 'password'])

      const result = await invest({
        auth,
        amount: value,
        password,
      })

      return response.status(result.status === 'success' ? 200 : 400).json(result)
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: 'Erro interno ao processar investimento.',
        error: error.message,
      })
    }
  }

  /**
   * Retira dinheiro do investimento
   */
  async withdraw({ request, auth, response }: HttpContext) {
    try {
      const { value, password } = request.only(['value', 'password'])

      const result = await withdraw({
        auth,
        amount: value,
        password,
      })

      return response.status(result.status === 'success' ? 200 : 400).json(result)
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: 'Erro interno ao processar saque de investimento.',
        error: error.message,
      })
    }
  }

  async index({ response }: HttpContext) {
    try {
      const investments = await Investment.query().select('numero_conta', 'value')
      return response.status(200).json(investments)
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: 'Erro ao buscar investimentos.',
        error: error.message,
      })
    }
  }
}
