import type { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { CreateUserDTO } from '@/types/dtos/createUser.dto'
import type { IUserRepository } from '../repository/user.repository'
import { UserService } from '../service'

describe('UserService - createUser', () => {
  let userService: UserService
  let userRepository: IUserRepository

  beforeEach(() => {
    userRepository = {
      findByEmail: vi.fn(),
      create: vi.fn(),
      findById: vi.fn(),
    }

    userService = new UserService(userRepository)
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

    const created = await userService.create(data)

    expect(created).toEqual(fakeUser)
    expect(userRepository.findByEmail).toHaveBeenCalledWith(data.email)
    expect(userRepository.create).toHaveBeenCalled()
  })

  it('deve lançar erro se o e-mail já estiver cadastrado', async () => {
    vi.mocked(userRepository.findByEmail).mockResolvedValue({} as User)

    await expect(
      userService.create({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123456',
      }),
    ).rejects.toThrow('E-mail já cadastrado.')
  })
})

describe('UserService - login', () => {
  let userService: UserService
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

    userService = new UserService(userRepository)
  })

  it('deve logar com credenciais válidas e retornar um token JWT', async () => {
    vi.mocked(userRepository.findByEmail).mockResolvedValueOnce(mockUser)

    const result = await userService.login('carlos@example.com', '123456')

    expect(result).toHaveProperty('token')

    const decoded = jwt.decode(result.token) as { userId: string }
    expect(decoded.userId).toBe(mockUser.id)
  })

  it('deve lançar erro se o e-mail não for encontrado', async () => {
    vi.mocked(userRepository.findByEmail).mockResolvedValueOnce(null)

    await expect(
      userService.login('naoexiste@example.com', '123456'),
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
      userService.login('carlos@example.com', '123456'),
    ).rejects.toThrow('Credenciais inválidas.')
  })

  describe('UserService - getMe', () => {
    let userService: UserService
    let userRepository: IUserRepository

    beforeEach(() => {
      userRepository = {
        findByEmail: vi.fn(),
        create: vi.fn(),
        findById: vi.fn(),
      }

      userService = new UserService(userRepository)
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

      const result = await userService.getMe(fakeUser.id)

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

      await expect(userService.getMe('nao-existe')).rejects.toThrow(
        'Usuário não encontrado.',
      )
    })
  })
})
