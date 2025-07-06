import type { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { IUserRepository } from '../repository/user.repository'
import { login } from '../service/login'

describe('login', () => {
  let userRepository: IUserRepository

  const mockUser: User = {
    id: 'user-123',
    name: 'Carlos',
    email: 'carlos@example.com',
    password: bcrypt.hashSync('123456', 10),
    createdAt: new Date(),
  }

  beforeEach(() => {
    userRepository = {
      findByEmail: vi.fn(),
      create: vi.fn(),
      findById: vi.fn(),
    }
  })

  it('deve logar com credenciais válidas e retornar um token JWT', async () => {
    vi.mocked(userRepository.findByEmail).mockResolvedValueOnce(mockUser)

    const result = await login('carlos@example.com', '123456', userRepository)

    expect(result).toHaveProperty('token')

    const decoded = jwt.decode(result.token) as { userId: string }
    expect(decoded.userId).toBe(mockUser.id)
  })

  it('deve lançar erro se o e-mail não for encontrado', async () => {
    vi.mocked(userRepository.findByEmail).mockResolvedValueOnce(null)

    await expect(
      login('naoexiste@example.com', '123456', userRepository),
    ).rejects.toThrow('Credenciais inválidas.')
  })

  it('deve lançar erro se a senha estiver incorreta', async () => {
    const userComSenhaErrada: User = {
      ...mockUser,
      password: bcrypt.hashSync('senhaErrada', 10),
    }

    vi.mocked(userRepository.findByEmail).mockResolvedValueOnce(
      userComSenhaErrada,
    )

    await expect(
      login('carlos@example.com', '123456', userRepository),
    ).rejects.toThrow('Credenciais inválidas.')
  })
})
