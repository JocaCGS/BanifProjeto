import vine from '@vinejs/vine'

/**
 * Validator para registro de usuário
 **/
export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(2).maxLength(100),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(8).maxLength(32),
    cpf: vine
      .string()
      .regex(/^\d{11}$/) // apenas números e 11 dígitos
      .unique(async (db, value) => {
        const user = await db.from('users').where('cpf', value).first()
        return !user
      }),

    address: vine.number()
  })
)

/**
 * Validator para login de usuário
 */
export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string(),
  })
)
