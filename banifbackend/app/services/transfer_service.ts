// transfer_service.ts
import User from '#models/user'
import CurrentAccount from '#models/currentaccount'
import Statement from '#models/statement'
import { verifyPassword } from '../utils/auth_utils.js'

interface TransferParams {
  auth: any
  amount: number
  receiver_account: string
  receiver_agency: string
  password: string
}

export async function transfer({ auth, amount, receiver_account, receiver_agency, password }: TransferParams) {
  // 1️⃣ Usuário autenticado (remetente)
  const sender = await auth.getUserOrFail()

  // 2️⃣ Verificar senha
  const isPasswordValid = await verifyPassword(sender, password)
  if (!isPasswordValid) {
    return { status: 'error', message: 'Credenciais incorretas.' }
  }

  // 3️⃣ Conta do remetente
  const senderAccount = await CurrentAccount.query().where('user_id', sender.id).first()
  if (!senderAccount) return { status: 'error', message: 'Conta remetente não encontrada.' }

  // 4️⃣ Conta do destinatário
  const receiverAccount = await CurrentAccount.query()
    .where('numero_conta', receiver_account)
    .andWhere('numero_agencia', receiver_agency)
    .first()
  if (!receiverAccount) return { status: 'error', message: 'Conta destinatário não encontrada.' }

  // 5️⃣ Usuário do destinatário para pegar CPF
  const receiverUser = await User.query().where('id', receiverAccount.user_id).first()
  if (!receiverUser) return { status: 'error', message: 'Usuário destinatário não encontrado.' }

  // 6️⃣ Verificar saldo do remetente
  const senderSaldo = Number(senderAccount.saldo)
  const valor = Number(amount)

  if (senderSaldo < valor) {
    return { status: 'error', message: `Saldo insuficiente. Saldo: ${senderSaldo}, Valor: ${valor}` }
  }


  // Guardar saldos antigos para rollback
  const oldSenderSaldo = senderAccount.saldo
  const oldReceiverSaldo = receiverAccount.saldo

  // 7️⃣ Atualizar saldos e criar extrato
  try {
    const senderSaldo = Number(senderAccount.saldo)
    const receiverSaldo = Number(receiverAccount.saldo)
    const valor = Number(amount)

    // Atualizar saldos
    senderAccount.saldo = senderSaldo - valor
    receiverAccount.saldo = receiverSaldo + valor

    await senderAccount.save()
    await receiverAccount.save()

    await Statement.create({
      senderName: sender.fullName || 'Remetente',
      receiverName: receiverUser.fullName || 'Destinatário',
      senderCpf: sender.cpf,
      receiverCpf: receiverUser.cpf,
      value: amount,
      transactionType: 'transfer', // ← aqui
    })

  } catch (error) {
    // Rollback manual
    senderAccount.saldo = oldSenderSaldo
    receiverAccount.saldo = oldReceiverSaldo
    await senderAccount.save()
    await receiverAccount.save()

    return { status: 'error', message: 'Erro na transferência, saldos revertidos.' }
  }
  return { status: 'success', message: 'Transferência realizada com sucesso.' }
}
