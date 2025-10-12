import { DateTime } from 'luxon'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, belongsTo, beforeSave } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import Perm from '#models/perm'
import Address from '#models/address'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import hash from '@adonisjs/core/services/hash'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare perm_id: number

  @column()
  declare cpf: string

  @column()
  declare address_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)


  // verifica senha
  public async verifyPassword(plainPassword: string) {
  return this.password.trim() === plainPassword.trim()
  }

    

  public async checkPassword(){
    return await this.password
  }

  // Relacionamentos
  @belongsTo(() => Perm, { foreignKey: 'perm_id' })
  declare perm: BelongsTo<typeof Perm>

  @belongsTo(() => Address, { foreignKey: 'address_id' })
  declare address: BelongsTo<typeof Address>

}
