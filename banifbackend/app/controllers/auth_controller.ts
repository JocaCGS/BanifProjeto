import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import logger from '@adonisjs/core/services/logger'
import { permissions } from '../utils/permissoes.js'
import Address from '#models/address'
import CurrentAccount from '#models/currentaccount'
import { gerarNumeroConta } from '../utils/gerarnumconta.js'

export default class AuthController {
  /**
   * Registrar um novo usuário
   */
  async register({ request, response }: HttpContext) {
  try {
    // Validar payload do usuário, incluindo o address
    const payload = await request.validateUsing(registerValidator)

    // Criar endereço no banco
    const address = await Address.create(payload.address)

    // Criar usuário, vinculando o address_id
    const user = await User.create({
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
      cpf: payload.cpf,
      perm_id: 0, // ou outro papel padrão
      address_id: address.id, // vincula endereço criado
    })

    const conta_corrente = await CurrentAccount.create({
      user_id: user.id,
      numero_conta: gerarNumeroConta(),
      numero_agencia: '0001',
      saldo: 0
    })

    // Criar token de acesso
    const token = await User.accessTokens.create(user, ['*'], {
      name: 'Registration Token',
      expiresIn: '30 days',
    })

    return response.created({
      message: 'Usuário registrado com sucesso',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        perm_id: user.perm_id,
        cpf: user.cpf,
        address: {
          id: address.id,
          cidade: address.cidade,
          estado: address.estado,
          rua: address.rua,
          numero_casa: address.numero_casa,
        },
        conta_corrente: {
          numero_conta: conta_corrente.numero_conta,
          numero_agencia: conta_corrente.numero_agencia,
          saldo: conta_corrente.saldo
        },
        createdAt: user.createdAt,
      },
      token: {
        type: 'bearer',
        value: token.value!.release(),
        expiresAt: token.expiresAt,
      },
      permissions: { ...permissions[user.perm_id] },
    })
  } catch (error) {
    return response.badRequest({
      message: 'Erro ao registrar usuário',
      errors: error.messages || error.message,
    })
  }
}



  /**
   * Fazer login do usuário
   */
  async login({ request, response }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(loginValidator)

      logger.info(`${email} - ${password}`) // <-- tirar do log depois a senha

      const user = await User.verifyCredentials(email, password)


      // Criar token de acesso
      const token = await User.accessTokens.create(user, ['*'], {
        name: 'Login Token',
        expiresIn: '30 days',
      })

      logger.info(permissions[user.perm_id])
      return response.ok({
        message: 'Login realizado com sucesso',
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          perm_id: user.perm_id,
        },
        token: {
          type: 'bearer',
          value: token.value!.release(),
          expiresAt: token.expiresAt,
        },
        permissions: { ...permissions[user.perm_id] },
      })
    } catch (error) {
      return response.unauthorized({
        message: 'Credenciais inválidas',
      })
    }
  }

  /**
   * Fazer logout do usuário (invalidar token atual)
   */
  async logout({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const token = auth.user?.currentAccessToken

      if (token) {
        await User.accessTokens.delete(user, token.identifier)
      }

      return response.ok({
        message: 'Logout realizado com sucesso',
      })
    } catch (error) {
      return response.unauthorized({
        message: 'Token inválido',
      })
    }
  }

  /**
   * Obter informações do usuário autenticado
   */
  async me({ auth, response }: HttpContext) {
  try {
    // Garante que pegamos todos os dados do usuário do banco
    const user = await User.findOrFail(auth.user!.id)

    return response.ok({
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        perm_id: user.perm_id, // agora deve ser 2 para gerente
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    })
  } catch (error) {
    return response.unauthorized({
      message: 'Token inválido',
    })
  }
}


  /**
   * Listar todos os tokens do usuário autenticado
   */
  async tokens({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const tokens = await User.accessTokens.all(user)

      return response.ok({
        tokens: tokens.map(token => ({
          name: token.name,
          type: token.type,
          abilities: token.abilities,
          lastUsedAt: token.lastUsedAt,
          expiresAt: token.expiresAt,
          createdAt: token.createdAt,
        }))
      })
    } catch (error) {
      return response.unauthorized({
        message: 'Token inválido',
      })
    }
  }

  /**
   * Criar um novo token para o usuário autenticado
   */
  async createToken({ auth, request, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const { name, abilities, expiresIn } = request.only(['name', 'abilities', 'expiresIn'])

      const token = await User.accessTokens.create(user, abilities || ['*'], {
        name: name || 'API Token',
        expiresIn: expiresIn || '30 days',
      })

      return response.created({
        message: 'Token criado com sucesso',
        token: {
          type: 'bearer',
          value: token.value!.release(),
          name: token.name,
          abilities: token.abilities,
          expiresAt: token.expiresAt,
        },
      })
    } catch (error) {
      return response.badRequest({
        message: 'Erro ao criar token',
        error: error.message,
      })
    }
  }
}
