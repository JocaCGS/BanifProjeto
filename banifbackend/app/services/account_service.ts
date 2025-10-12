import User from '#models/user'
import Account from '#models/currentaccount'

export default class AccountService {
  /**
   * Retorna os dados da conta de um usuário
   */
  public async getConta(user: User) {
    // Aqui você pode pegar os dados do banco ou montar o objeto
    const conta = {
      numeroConta: (user as any).contaNumero || '0000-0',
      numeroAgencia: (user as any).contaAgencia || '0001',
      saldo: (user as any).saldo || 0,
    }

    return conta
  }

  public async getAccountById(id: number) {
      return Account.findOrFail(id)
    }
}
