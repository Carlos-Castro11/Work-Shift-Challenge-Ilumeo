import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import type { IUserRepository } from '../repository/user.repository'

export async function login(
  email: string,
  password: string,
  userRepository: IUserRepository,
): Promise<{ token: string }> {
  const user = await userRepository.findByEmail(email)

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Credenciais inválidas.')
  }

  const secret = process.env.JWT_SECRET || 'default_secret'
  const expiresIn = (process.env.JWT_EXPIRES_IN ||
    '1h') as jwt.SignOptions['expiresIn']

  const token = jwt.sign({ userId: user.id }, secret, { expiresIn })

  return { token }
}
