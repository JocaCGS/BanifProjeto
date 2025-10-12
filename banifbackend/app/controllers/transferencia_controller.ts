// TransferController.ts
import type { HttpContext } from '@adonisjs/core/http'
import { transfer } from '#services/transfer_service' // caminho do seu service de transferência

export default class TransferController {
  /**
   * Realiza uma transferência entre contas
   */
  async store({ request, auth, response }: HttpContext) {
    try {
      // Pega os dados do body
      const { cpf_receiver, value, password } = request.only([
        'cpf_receiver',
        'value',
        'password',
      ])

      // Chama a função de transferência
      const result = await transfer({
        auth,
        input: value,
        cpf_receiver,
        password,
      })

      // Retorna resposta
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
