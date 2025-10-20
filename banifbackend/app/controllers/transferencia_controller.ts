// TransferController.ts
import type { HttpContext } from '@adonisjs/core/http'
import { transfer } from '#services/transfer_service'
import { Result } from '@adonisjs/core/health'

export default class TransferController {
  /**
   * Realiza uma transferência entre contas
   */
  async store({ request, auth, response }: HttpContext) {
    try {
      // 1️⃣ Pega os dados do body
      const { receiver_account, receiver_agency, value, password } = request.only([
        'receiver_account',
        'receiver_agency',
        'value',
        'password',
      ])

      // 2️⃣ Chama a função de transferência
      const result = await transfer({
        auth,
        amount: value,
        receiver_account,
        receiver_agency,
        password,
      })

      console.log('Resultado da transferência:', result)

      // 3️⃣ Retorna resposta HTTP
      return response
        .status(result.status === 'success' ? 200 : 400)
        .json(result)

    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: 'Erro interno ao processar transferência.',
        error: error.message,
      })
    }
  }
}
