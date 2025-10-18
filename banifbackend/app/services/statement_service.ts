// statement_service.ts
import Statement from '#models/statement'

export default class StatementService {
  public async listStatementByCpf(cpf: string) {
    return Statement.query().where('senderCpf', cpf).orWhere('receiverCpf', cpf)
  }

  public async listStatement(cpf: string) {
    return Statement.query().where('senderCpf', cpf).orWhere('receiverCpf', cpf)
  }
}
