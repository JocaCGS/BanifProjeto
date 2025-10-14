import CurrentAccount from '#models/currentaccount'

export async function gerarNumeroContaUnico(): Promise<string> {
  let numeroConta: string
  let existe = true

  do {
    numeroConta = gerarNumeroConta()
    const contaExistente = await CurrentAccount.query()
      .where('numero_conta', numeroConta)
      .first()

    existe = !!contaExistente
  } while (existe)

  return numeroConta
}



export function gerarNumeroConta(): string {
  // Gera um número de 6 dígitos aleatório (100000 a 999999)
  const numero = Math.floor(100000 + Math.random() * 900000)

  // Gera um dígito verificador simples (0–9)
  const digito = Math.floor(Math.random() * 10)

  // Retorna no formato padrão de conta
  return `${numero}-${digito}`
}

