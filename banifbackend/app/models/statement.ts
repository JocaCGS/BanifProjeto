import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class Statement extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare senderName: string | null
  
  @column()
  declare receiverName: string | null

  @column()
  declare senderCpf: string | null

  @column()
  declare receiverCpf: string | null

  @column()
  declare value: number

  // NOVA COLUNA PARA TIPOS DE TRANSAÇÃO (invest, withdraw, transfer, etc)
  @column()
  declare transactionType: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
