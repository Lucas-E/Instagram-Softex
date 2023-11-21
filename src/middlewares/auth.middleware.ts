// src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserRequest } from '../interfaces/UserRequest';



export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');

    // Adiciona o usuário decodificado à requisição para ser utilizado nas rotas protegidas
    (req as UserRequest).user = decoded;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token de autenticação inválido' });
  }
};
