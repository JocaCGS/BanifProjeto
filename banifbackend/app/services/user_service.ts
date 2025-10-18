// start/services/user_service.ts
import User from '#models/user'
import Address from '#models/address'
import CurrentAccount from '#models/currentaccount'
import { gerarNumeroConta } from '../utils/gerarnumconta.js'

export default class UserService {
  // Listar todos os usuários com endereço

  //ta programado esperando uma conta mas tipo eu nao programei assim entao vai ser assim meesmo XDD
  public async listUsers() {
    // Buscar todos os usuários
    const users = await User.query().preload('currentAccounts')

     return users.map(user => {
      return {
        id: user.id,
        fullName: user.fullName,
        cpf: user.cpf,
        saldo: user.currentAccounts[0]?.saldo || 0
      }
    })
  }

// aqui a funcao pra caso queira mais contas rsrsrsrsr
  // public async listUsers() {
  //   // Buscar todos os usuários
  //   const users = await User.query().preload('currentAccounts')

  //    return users.map(user => {
  //     const saldoTotal = user.currentAccounts.reduce(
  //       (acc, conta) => acc + (conta.saldo || 0),
  //       0
  //     )

  //     return {
  //       id: user.id,
  //       fullName: user.fullName,
  //       cpf: user.cpf,
  //       saldo: saldoTotal,
  //     }
  //   })
  // }

  // Trazer todos os endereços disponíveis
  public async getAddresses() {
    const addresses = await Address.all()
    return addresses.map(addr => ({
      id: addr.id,
      cidade: addr.cidade,
      estado: addr.estado,
      rua: addr.rua,
      numero_casa: addr.numero_casa,
    }))
  }

  // Criar usuário + conta corrente
  public async createUser(payload: any) {
    const newUser = await User.create({
      fullName: payload.nome,
      address_id: payload.address_id,
      perm_id: 0,
    })

    const conta_corrente = await CurrentAccount.create({
      user_id: newUser.id,
      numero_conta: gerarNumeroConta(),
      numero_agencia: '0001',
      saldo: 0,
    })

    return { newUser, conta_corrente }
  }

  // Buscar usuário por id
  public async getUserById(id: number) {
    return User.findOrFail(id)
  }

  // Atualizar usuário
  public async updateUser(id: number, payload: any) {
    const user = await User.findOrFail(id)
    await user.merge(payload).save()
    return user
  }

  // Deletar usuário
  public async deleteUser(id: number) {
    const user = await User.findOrFail(id)
    await user.delete()
  }
}
