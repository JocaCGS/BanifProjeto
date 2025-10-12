import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CurrentAccounts extends BaseSchema {
  protected tableName = 'currentaccounts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('numero_conta').notNullable().unique()
      table.string('numero_agencia').notNullable()
      table.decimal('saldo', 15, 2).defaultTo(0)

      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
