import type { RequestHandler } from 'express'
import { createUserSchema } from '@/types/dtos/createUser.dto'
import type { UserService } from '../service'

export class UserController {
  constructor(private readonly userService: UserService) {}

  create: RequestHandler = async (req, res) => {
    const validation = createUserSchema.safeParse(req.body)

    if (!validation.success) {
      res.status(400).json({ error: validation.error.format() })
      return
    }

    try {
      const user = await this.userService.create(validation.data)
      res.status(201).json(user)
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  }

  login: RequestHandler = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ error: 'Email e senha são obrigatórios.' })
      return
    }

    try {
      const result = await this.userService.login(email, password)
      res.status(200).json(result)
    } catch (error) {
      res.status(401).json({ error: (error as Error).message })
    }
  }

  getMe: RequestHandler = async (req, res) => {
    const userId = req.userId

    if (!userId) {
      res.status(401).json({ error: 'Token inválido ou ausente.' })
      return
    }

    try {
      const user = await this.userService.getMe(userId)
      res.json(user)
    } catch (error) {
      res.status(404).json({ error: (error as Error).message })
    }
  }
}
