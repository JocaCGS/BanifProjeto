// utils/auth_utils.ts
import User from '#models/user'

export async function verifyPassword(user: User, password: string): Promise<boolean> {
  if (!user || !user.password) return false

  // Apenas comparação direta (plaintext)
  const result = user.password === password

  // Debug: mostra o que está sendo comparado
  console.log('Comparando senha do usuário:', user.password, 'com fornecida:', password, '->', result)

  return result
}
