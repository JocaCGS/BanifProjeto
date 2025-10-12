import User from '#models/user'
import CurrentAccount from '#models/currentaccount'
import Statement from '#models/statement'

interface TransferParams {
  auth: any     // tipagem genérica, porque IOC não está funcionando
  input: number
  cpf_receiver: string
  password: string
}


export async function transfer({ auth, input, cpf_receiver, password }: TransferParams) {
  // Usuário autenticado
  const sender = auth.getUserOrFail()

  // Verificar senha do remetente
  const isPasswordValid = await sender.verifyPassword(password)
  if (!isPasswordValid) {
    return { status: 'error', message: 'Credenciais incorretas.' }
  }

  // Obter contas
  const senderAccount = await CurrentAccount.query().where('usuario_id', sender.id).first()
  if (!senderAccount) return { status: 'error', message: 'Conta remetente não encontrada.' }

  const receiverUser = await User.query().where('cpf', cpf_receiver).first()
  if (!receiverUser) return { status: 'error', message: 'Destinatário inexistente.' }

  const receiverAccount = await CurrentAccount.query().where('usuario_id', receiverUser.id).first()
  if (!receiverAccount) return { status: 'error', message: 'Conta destinatário não encontrada.' }

  // 4️⃣ Verificar saldo
  if (senderAccount.saldo < input) {
    return { status: 'error', message: 'Saldo insuficiente.' }
  }
  // Guardar valores antigos
  const oldSenderSaldo = senderAccount.saldo
  const oldReceiverSaldo = receiverAccount.saldo

  // 5️⃣ Atualizar saldos e criar extrato com rollback manual
  try {

    // Atualizar saldos
    senderAccount.saldo -= input
    receiverAccount.saldo += input

    await senderAccount.save()
    await receiverAccount.save()

    // Criar extrato
    await Statement.create({
      senderName: sender.fullName,
      receiverName: receiverUser.fullName,
      senderCpf: sender.cpf,
      receiverCpf: receiverUser.cpf,
      value: input,
    })

  } catch (error) {
    // Se algo falhar, reverte os saldos
    senderAccount.saldo = oldSenderSaldo
    receiverAccount.saldo = oldReceiverSaldo

    await senderAccount.save()
    await receiverAccount.save()

    return { status: 'error', message: 'Erro na transferência, saldos revertidos.' }
  }

  return { status: 'success', message: 'Transferência realizada com sucesso.' }
}
