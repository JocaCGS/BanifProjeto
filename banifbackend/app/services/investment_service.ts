import CurrentAccount from '#models/currentaccount'
import Investment from '#models/investment'
import Statement from '#models/statement'
import { verifyPassword } from '../utils/auth_utils.js'

interface InvestmentParams {
  auth: any
  amount: number
  password: string
}

/**
 * Função para investir (adicionar dinheiro)
 */
export async function invest({ auth, amount, password }: InvestmentParams) {
  const user = await auth.getUserOrFail()

  const isPasswordValid = await verifyPassword(user, password)
  if (!isPasswordValid) return { status: 'error', message: 'Senha incorreta.' }

  const account = await CurrentAccount.query().where('user_id', user.id).first()
  if (!account) return { status: 'error', message: 'Conta não encontrada.' }

  const valor = Number(amount)
  if (account.saldo < valor) return { status: 'error', message: 'Saldo insuficiente.' }

  try {
    // Diminui do saldo da conta
    account.saldo = Number(account.saldo) - valor
    await account.save()

    // Verifica se já existe investimento pra essa conta
    let investment = await Investment.query().where('numero_conta', account.numero_conta).first()

    if (investment) {
      // Atualiza o valor do investimento existente
      investment.value = Number(investment.value) + valor
      await investment.save()
    } else {
      // Cria um novo investimento
      investment = await Investment.create({
        numero_conta: account.numero_conta,
        value: valor,
      })
    }

    // Cria um registro no extrato (statement)
    await Statement.create({
      senderName: null,
      receiverName: user.name,
      senderCpf: null,
      receiverCpf: user.cpf,
      value: valor,
      transactionType: 'invest',
    })

    return { status: 'success', message: 'Investimento realizado com sucesso.', investment }
  } catch (error) {
    // Rollback básico
    account.saldo = Number(account.saldo) + valor
    await account.save()
    return { status: 'error', message: 'Erro ao realizar investimento.' }
  }
}

/**
 * Função para sacar (retirar dinheiro do investimento)
 */
export async function withdraw({ auth, amount, password }: InvestmentParams) {
  const user = await auth.getUserOrFail()

  const isPasswordValid = await verifyPassword(user, password)
  if (!isPasswordValid) return { status: 'error', message: 'Senha incorreta.' }

  const account = await CurrentAccount.query().where('user_id', user.id).first()
  if (!account) return { status: 'error', message: 'Conta não encontrada.' }

  const investment = await Investment.query().where('numero_conta', account.numero_conta).first()
  if (!investment) return { status: 'error', message: 'Nenhum investimento encontrado.' }

  const valor = Number(amount)
  if (Number(investment.value) < valor) return { status: 'error', message: 'Valor superior ao investido.' }

  try {
    // Diminui do investimento e devolve pro saldo
    investment.value = Number(investment.value) - valor
    await investment.save()

    account.saldo = Number(account.saldo) + valor
    await account.save()

    // Cria um registro no extrato (statement)
    await Statement.create({
      senderName: user.name,
      receiverName: null,
      senderCpf: user.cpf,
      receiverCpf: null,
      value: valor,
      transactionType: 'withdraw',
    })

    return { status: 'success', message: 'Saque de investimento realizado com sucesso.', investment }
  } catch (error) {
    return { status: 'error', message: 'Erro ao sacar do investimento.' }
  }
}
