  import type { HttpContext } from '@adonisjs/core/http'

  export default class ContaController {

    async show({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized({ message: 'Usuário não autenticado' })
    }

    const conta = await user.related('currentAccounts').query().first()
    return response.ok({ conta })
  }

  }
