import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { CreateUserUseCase } from './create-user'
import { UserAlreadyexistsError } from './errors/user-already-exists-error'
import { compare } from 'bcryptjs'

let userRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create user use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(userRepository)
  })

  it('should be able to create a user', async () => {
    const { user } = await sut.execute({
      name: 'Tester',
      email: 'tester@test.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to create a user with email already taken', async () => {
    await sut.execute({
      name: 'Tester',
      email: 'tester@test.com',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Tester',
        email: 'tester@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyexistsError)
  })

  it('should hash password', async () => {
    const { user } = await sut.execute({
      name: 'Tester',
      email: 'tester@test.com',
      password: '123456',
    })

    const isPasswordMatch = await compare('123456', user.password_hash)

    expect(isPasswordMatch).toBe(true)
  })
})
