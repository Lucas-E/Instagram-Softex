// src/services/AuthService.ts
import AppDataSource from "../data-source";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { User } from "../entity/User";
import "dotenv/config";

class AuthService {
	private userRepository = AppDataSource.getRepository(User);

	public async login(email: string, password: string): Promise<string> {
		try {
			const user = await this.userRepository.findOne({
				where: { email },
			});

			if (!user) {
				throw new Error("Usuário não encontrado");
			}

			const passwordMatch = await bcrypt.compare(password, user.password);

			if (!passwordMatch) {
				throw new Error("Credenciais inválidas");
			}

			// Antes de usar jwt.sign, verifique se JWT_SECRET está definido
			const jwtSecret = process.env.JWT_SECRET;

			if (!jwtSecret) {
				throw new Error(
					"A variável de ambiente JWT_SECRET não está definida."
				);
			}

			const token = jwt.sign({ userId: user.id }, jwtSecret, {
				expiresIn: "1h",
			});

			return token;
		} catch (error) {
			throw error;
		}
	}
}

export default AuthService;
