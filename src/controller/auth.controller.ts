// src/controllers/AuthController.ts

import { Request, Response, Router } from 'express';
import AuthService from '../service/auth.service';
import { userService } from '../service/user.service';

class AuthController {
  private authService: AuthService;
  private userService;

  constructor() {
    this.authService = new AuthService();
    this.userService = userService
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Por favor, forneça todos os campos necessários.' });
    }

    try {
      const token = await this.authService.login(email, password);
      return res.json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao realizar o login' });
    }
  };
}

export const authController = new AuthController();

