import type { CreateUserDTO } from '@/types/dtos/createUser.dto'
import type { IUserRepository } from '../repository/user.repository'
import { create } from './create'
import { getMe } from './getMe'
import { login } from './login'

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  create = (data: CreateUserDTO) => create(data, this.userRepository)
  login = (email: string, password: string) =>
    login(email, password, this.userRepository)
  getMe = (id: string) => getMe(id, this.userRepository)
}
