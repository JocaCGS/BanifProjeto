import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Perm from '#models/perm'

export default class extends BaseSeeder {
  async run() {
    await Perm.createMany([
      {
        nome: 'Cliente',
      },
      {
        nome: 'Funcionário',
      },
    ])
  }
}
