import vine from '@vinejs/vine'

// Valida a criação dos alunos (create)
export const createUsers = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(4),
    address_id: vine.number().positive().withoutDecimals(),
  })
)
// Valida a atualização dos alunos (update)
export const updateUsers = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(4).optional(),
    address_id: vine.number().positive().withoutDecimals().optional(),
  })
)
