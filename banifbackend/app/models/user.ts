import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

import Perm from '#models/perm'
import Address from '#models/address'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import CurrentAccount from './currentaccount.js'


export default class User extends BaseModel {
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
  static async verifyPassword(email: string, plainPassword: string) {
    const user = await User.query().where('email', email).first()

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    if (user.password.trim() !== plainPassword.trim()) {
      throw new Error('Senha incorreta')
    }

    return user
  }
    

  public async checkPassword(){
    return await this.password
  }

  // Relacionamentos
  @belongsTo(() => Perm, { foreignKey: 'perm_id' })
  declare perm: BelongsTo<typeof Perm>

  @belongsTo(() => Address, { foreignKey: 'address_id' })
  declare address: BelongsTo<typeof Address>

  
  @hasMany(() => CurrentAccount, {foreignKey: 'user_id'})
  declare currentAccounts: HasMany<typeof CurrentAccount>

}
