import type { User } from '@prisma/client'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { IUserRepository } from '../repository/user.repository'
import { getMe } from '../service/getMe'

describe('getMe', () => {
  let userRepository: IUserRepository

  beforeEach(() => {
    userRepository = {
      findByEmail: vi.fn(),
      create: vi.fn(),
      findById: vi.fn(),
    }
  })

  it('deve retornar o usuário sem a senha', async () => {
    const fakeUser: User = {
      id: 'abc123',
      name: 'Carlos',
      email: 'carlos@gmail.com',
      password: 'hashed_password',
      createdAt: new Date(),
    }

    vi.mocked(userRepository.findById).mockResolvedValue(fakeUser)

    const result = await getMe(fakeUser.id, userRepository)

    expect(result).toEqual({
      id: fakeUser.id,
      name: fakeUser.name,
      email: fakeUser.email,
      createdAt: fakeUser.createdAt,
    })

    expect(result).not.toHaveProperty('password')
  })

  it('deve lançar erro se o usuário não for encontrado', async () => {
    vi.mocked(userRepository.findById).mockResolvedValue(null)

    await expect(getMe('nao-existe', userRepository)).rejects.toThrow(
      'Usuário não encontrado.',
    )
  })
})
