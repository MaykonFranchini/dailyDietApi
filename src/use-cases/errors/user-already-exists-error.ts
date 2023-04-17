export class UserAlreadyexistsError extends Error {
  constructor() {
    super('This email has alredy been taken.')
  }
}
