// app/controllers/investment_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import { invest, withdraw } from '../services/investment_service.js'
import Investment from '#models/investment'
import CurrentAccount from '#models/currentaccount'

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

  // app/controllers/investment_controller.ts
async index({ auth, response }: HttpContext) {
  try {
    const user = await auth.getUserOrFail()

    // Busca a conta corrente associada ao usuário
    const account = await CurrentAccount.query().where('user_id', user.id).first()
    if (!account) {
      return response.status(404).json({
        status: 'error',
        message: 'Conta não encontrada.',
      })
    }

    // Busca o investimento referente à conta do usuário
    const investment = await Investment.query()
      .where('numero_conta', account.numero_conta)
      .select('numero_conta', 'value')
      .first()

    if (!investment) {
      return response.status(200).json({
        status: 'success',
        message: 'Nenhum investimento encontrado.',
        value: 0,
      })
    }

    return response.status(200).json({
      status: 'success',
      numero_conta: investment.numero_conta,
      value: investment.value,
    })
  } catch (error) {
    return response.status(500).json({
      status: 'error',
      message: 'Erro ao buscar investimento.',
      error: error.message,
    })
  }
}

}
