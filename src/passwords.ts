import bcrypt from 'bcrypt'

export const hash = async (password: string, saltRounds: number = 10) => {
  return bcrypt.hash(password, saltRounds)
}

export const compare = async (plainText: string, hashedText: string) => {
  return bcrypt.compare(plainText, hashedText)
}
