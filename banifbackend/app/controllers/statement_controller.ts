import type { HttpContext } from '@adonisjs/core/http'
import UserPolicy from '#policies/user_policy'
import StatementService from '#services/statement_service'

export default class StatementController {
  private statementService = new StatementService()

  async index({ request, response, auth, bouncer }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()

      if (await (bouncer as any).with(UserPolicy).denies('list')) {
        return response.forbidden({ message: 'Você não tem permissão para listar usuarios' })
      }

      const cpfSelecionado = request.input('cpf') // pega CPF enviado pelo frontend
      if (!cpfSelecionado) {
        return response.badRequest({ message: 'CPF do usuário é necessário' })
      }

      const cpf = request.input('cpf') // vem do frontend

      const statement = await this.statementService.listStatementByCpf(cpf)


      return response.status(200).json({ message: 'OK', data: statement })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR', error: error.message })
    }
  } 

  async show({ params, response, auth, bouncer }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()

      const statement = await this.statementService.listStatement(user.cpf)

      console.log('Extrato retornado no controller:', statement)
      
      return response.status(200).json({ message: 'OK', data: statement })
     } catch (error) {
      return response.status(500).json({ message: 'ERROR', error: error.message })
    }

}
}