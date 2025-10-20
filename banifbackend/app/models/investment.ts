import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import CurrentAccount from './currentaccount.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'


export default class Investment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare value: number

  @column()
  declare numero_conta: string
  
  @belongsTo(() => CurrentAccount, { foreignKey: 'numero_conta' })
  declare numeroConta: BelongsTo<typeof CurrentAccount>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
