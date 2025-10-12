// UserController.ts
import type { HttpContext } from '@adonisjs/core/http'
import { createUsers, updateUsers } from '#validators/users'
import UserPolicy from '#policies/user_policy'
import UserService from '#services/user_service'

export default class UserController {
  private userService = new UserService()

  // Listar usuários
  async index({ response, auth, bouncer }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      if (await (bouncer as any).with(UserPolicy).denies('list')) {
        return response.forbidden({ message: 'Você não tem permissão para listar usuarios' })
      }

      const users = await this.userService.listUsers()
      return response.status(200).json({ message: 'OK', data: users })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR', error: error.message })
    }
  }

  // Formulário de criação
  async create({ response, auth, bouncer }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      if (await (bouncer as any).with(UserPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para criar usuários' })
      }

      const addresses = await this.userService.getAddresses()
      return response.status(200).json({ message: 'OK', data: addresses })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR', error: error.message })
    }
  }

  // Criar usuário
  async store({ request, response, auth, bouncer }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      if (await (bouncer as any).with(UserPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para criar usuários' })
      }

      const payload = await request.validateUsing(createUsers)
      const { newUser, conta_corrente } = await this.userService.createUser(payload)

      return response.status(201).json({
        message: 'Usuário criado com sucesso',
        data: {
          id: newUser.id,
          fullName: newUser.fullName,
          address_id: newUser.address_id,
          conta_corrente: {
            numero_conta: conta_corrente.numero_conta,
            numero_agencia: conta_corrente.numero_agencia,
            saldo: conta_corrente.saldo,
          },
        },
      })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR', error: error.message })
    }
  }

  // Mostrar usuario
  async show({ params, response, auth, bouncer }: HttpContext) {
    try {
      if (await (bouncer as any).with(UserPolicy).denies('show')) {
        return response.forbidden({ message: 'Você não tem permissão para mostrar usuários' })
      }

      const user = await this.userService.getUserById(params.id)
      await user.load('address')
      await user.load('perm')

      return response.status(200).json({ message: 'OK', data: user })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR', error: error.message })
    }
  }

  // Editar usuário (retorna dados do usuário + endereços disponíveis)
  async edit({ params, response, auth, bouncer }: HttpContext) {
    try {
      if (await (bouncer as any).with(UserPolicy).denies('edit')) {
        return response.forbidden({ message: 'Você não tem permissão para editar usuários' })
      }

      const user = await this.userService.getUserById(params.id)
      const addresses = await this.userService.getAddresses()

      return response.status(200).json({
        message: 'OK',
        data: {
          user,
          addresses,
        },
      })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR', error: error.message })
    }
  }

  // Atualizar usuário
  async update({ params, request, response, auth, bouncer }: HttpContext) {
    try {
      if (await (bouncer as any).with(UserPolicy).denies('update')) {
        return response.forbidden({ message: 'Você não tem permissão para atualizar usuários' })
      }

      const payload = await request.validateUsing(updateUsers)
      const updatedUser = await this.userService.updateUser(params.id, payload)

      return response.status(200).json({
        message: 'Usuário atualizado com sucesso',
        data: updatedUser,
      })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR', error: error.message })
    }
  }

  // Deletar usuário
  async destroy({ params, response, auth, bouncer }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      if (await (bouncer as any).with(UserPolicy).denies('delete')) {
        return response.forbidden({ message: 'Você não tem permissão para remover usuário' })
      }

      await this.userService.deleteUser(params.id)
      return response.status(200).json({ message: 'OK' })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR', error: error.message })
    }
  }
}
