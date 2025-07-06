import type { User } from '@prisma/client'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { CreateUserDTO } from '@/types/dtos/createUser.dto'
import type { IUserRepository } from '../repository/user.repository'
import { createUser } from '../service/createUser'

describe('createUser', () => {
  let userRepository: IUserRepository

  beforeEach(() => {
    userRepository = {
      findByEmail: vi.fn(),
      create: vi.fn(),
      findById: vi.fn(),
    }
  })

  it('deve criar um usuário com sucesso', async () => {
    const data: CreateUserDTO = {
      name: 'Carlos',
      email: 'carlos@gmail.com',
      password: '123456',
    }

    const fakeUser: User = {
      id: 'abc123',
      ...data,
      password: 'hashed',
      createdAt: new Date(),
    }

    vi.mocked(userRepository.findByEmail).mockResolvedValue(null)
    vi.mocked(userRepository.create).mockResolvedValue(fakeUser)

    const created = await createUser(data, userRepository)

    expect(created).toEqual(fakeUser)
    expect(userRepository.findByEmail).toHaveBeenCalledWith(data.email)
    expect(userRepository.create).toHaveBeenCalled()
  })

  it('deve lançar erro se o e-mail já estiver cadastrado', async () => {
    vi.mocked(userRepository.findByEmail).mockResolvedValue({} as User)

    await expect(
      createUser(
        {
          name: 'Carlos',
          email: 'carlos@gmail.com',
          password: '123456',
        },
        userRepository,
      ),
    ).rejects.toThrow('E-mail já cadastrado.')
  })
})
