import CurrentAccount from '#models/currentaccount'
import type { HttpContext } from '@adonisjs/core/http'

export default class ContaController {
  async show({ auth, response }: HttpContext) {
  const user = auth.user
  if (!user) {
    return response.unauthorized({ message: 'Usuário não autenticado' })
  }

  const conta = await CurrentAccount.query()
    .where('user_id', user.id) // garante que só pega a conta do usuário logado
    .first()

  console.log(`User_Id: ${user.id} Conta retornada:`, conta)
  return response.ok({ conta })
}

}
