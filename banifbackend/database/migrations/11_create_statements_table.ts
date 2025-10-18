import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateStatementsTable extends BaseSchema {
  protected tableName = 'statements'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('sender_name').nullable()
      table.string('receiver_name').nullable()

      table.string('sender_cpf', 14).notNullable()
      table.string('receiver_cpf', 14).notNullable()

      table.decimal('value', 15, 2).notNullable()

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
