import type { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import type { CreateUserDTO } from '@/types/dtos/createUser.dto'
import type { IUserRepository } from '../repository/user.repository'

export async function createUser(
  data: CreateUserDTO,
  userRepository: IUserRepository,
): Promise<User> {
  const existingUser = await userRepository.findByEmail(data.email)

  if (existingUser) {
    throw new Error('E-mail já cadastrado.')
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  const created = await userRepository.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  })

  return created
}
