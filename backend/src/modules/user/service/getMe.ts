import type { User } from '@prisma/client'
import type { IUserRepository } from '../repository/user.repository'

export async function getMe(
  userId: string,
  userRepository: IUserRepository,
): Promise<Omit<User, 'password'>> {
  const user = await userRepository.findById(userId)

  if (!user) {
    throw new Error('Usuário não encontrado.')
  }

  const { password, ...rest } = user
  return rest
}
