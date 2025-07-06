import type { CreateUserDTO } from '@/types/dtos/createUser.dto'
import type { IUserRepository } from '../repository/user.repository'
import { createUser } from './createUser'
import { getMe } from './getMe'
import { login } from './login'

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  createUser = (data: CreateUserDTO) => createUser(data, this.userRepository)
  login = (email: string, password: string) =>
    login(email, password, this.userRepository)
  getMe = (id: string) => getMe(id, this.userRepository)
}
