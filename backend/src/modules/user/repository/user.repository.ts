import type { User } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>
  create(user: Omit<User, 'id' | 'createdAt'>): Promise<User>
  findById(id: string): Promise<User | null>
}

export const userRepository: IUserRepository = {
  findByEmail: async (email) => {
    return prisma.user.findUnique({ where: { email } })
  },

  create: async (data) => {
    return prisma.user.create({ data })
  },

  findById: async (id) => {
    return prisma.user.findUnique({ where: { id } })
  },
}
