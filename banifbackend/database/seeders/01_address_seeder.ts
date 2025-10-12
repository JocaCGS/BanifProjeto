import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Address from '#models/address'

export default class AddressSeeder extends BaseSeeder {
  public async run() {
    await Address.createMany([
      { id: 1, cidade: 'Cidade X', estado: 'Estado X', rua: 'Rua A', numero_casa: '123' },
      { id: 2, cidade: 'Cidade Y', estado: 'Estado Y', rua: 'Rua B', numero_casa: '456' },
    ])
  }
}
