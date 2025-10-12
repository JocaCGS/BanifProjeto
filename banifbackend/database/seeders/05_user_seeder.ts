import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      // {
      //   fullName: 'Joaquim Colini',
      //   email: 'joca@cgs.com',
      //   password: '1234@5678', // para testes, ou use Hash.make('1234@5678')
      //   perm_id: 1,
      //   cpf: '12345678901', // CPF fictício válido
      //   address_id: 1,      // Deve existir na tabela addresses
      // },
      // {
      //   fullName: 'JocADM',
      //   email: 'joca@adm.com',
      //   password: '1234@5678',
      //   perm_id: 2,
      //   cpf: '98765432100',
      //   address_id: 2,
      // },
      {
        fullName: 'Teste',
        email: 'te@te.com',
        password: '123456', // para testes, ou use Hash.make('1234@5678')
        perm_id: 1,
        cpf: '32145678901', // CPF fictício válido
        address_id: 1,      // Deve existir na tabela addresses
      }
    ])
  }
}
