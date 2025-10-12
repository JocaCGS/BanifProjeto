import type { HttpContext } from '@adonisjs/core/http'
import AccountService from '#services/account_service'
import AccountPolicy from '#policies/account_policy'

export default class ContaController {
  private contaService = new AccountService()

  async show({ params, response, auth, bouncer }: HttpContext) {
      try {
        if (await (bouncer as any).with(AccountPolicy).denies('show')) {
          return response.forbidden({ message: 'Você não tem permissão para mostrar usuários' })
        }
  
        const conta = await this.contaService.getAccountById(params.id)
        await conta.load('usuario')
  
        return response.status(200).json({ message: 'OK', data: conta })
      } catch (error) {
        return response.status(500).json({ message: 'ERROR', error: error.message })
      }
    }
}
