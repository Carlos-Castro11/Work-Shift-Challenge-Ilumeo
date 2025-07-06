import { Router } from 'express'
import { authMiddleware } from '@/middlewares/auth.middleware'
import { UserController } from './controller/user.controller'
import { userRepository } from './repository/user.repository'
import { UserService } from './service'

const userRoutes = Router()

const userService = new UserService(userRepository)
const userController = new UserController(userService)

userRoutes.post('/login', userController.login.bind(userController))
userRoutes.post('/', userController.create.bind(userController))
userRoutes.get('/me', authMiddleware, userController.getMe.bind(userController))

export { userRoutes }
