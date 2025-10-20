import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Investments extends BaseSchema {
  protected tableName = 'investments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.decimal('value', 15, 2).notNullable()
      table.string('numero_conta', 20).notNullable()

      // 🔗 Cria relação com a tabela currentaccounts
      table
        .foreign('numero_conta')
        .references('numero_conta')
        .inTable('currentaccounts')
        .onDelete('CASCADE') // se a conta for apagada, apaga os investimentos dela

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
