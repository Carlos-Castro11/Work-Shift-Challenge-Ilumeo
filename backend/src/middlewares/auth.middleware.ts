import type { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string
  }
}

export const authMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token não fornecido.' })
    return
  }

  const token = authHeader.split(' ')[1]
  const secret = process.env.JWT_SECRET

  if (!secret) {
    console.error('JWT_SECRET não definido no .env')
    res.status(500).json({ error: 'Erro interno no servidor.' })
    return
  }

  try {
    const payload = jwt.verify(token, secret) as { userId: string }
    req.userId = payload.userId
    next()
  } catch {
    res.status(401).json({ error: 'Token inválido.' })
  }
}
