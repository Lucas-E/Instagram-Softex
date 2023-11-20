import { User } from "../entity/User";
import AppDataSource from "../data-source";
import { IUser } from "../dtos/IUser";
import bcrypt from "bcrypt";

class UserService {
	private userRepository;
	constructor() {
		this.userRepository = AppDataSource.getRepository(User);
	}
	public async createNewUser(data: IUser) {
		try {
			const foundUser = await this.userRepository.findOne({
				where: {
					email: data.email,
				},
			});
			if (foundUser) {
				throw new Error("User already Exists");
			}
			const user: User = new User();
			user.username = data.username;
			user.email = data.email;
			user.bio = data.bio;

			const hashedPassword = await bcrypt.hash(data.password, 10);
			user.password = hashedPassword;

			await this.userRepository.save(user);
			return user;
		} catch (error) {
			console.log(error);
		}
	}
	public async getById(id: number) {
		try {
			const foundUser = await this.userRepository.findOne({
				where: {
					id: id,
				},
			});
			if (foundUser) {
				return foundUser;
			}
			throw new Error("User not found by id");
		} catch (error) {
			console.log(error);
		}
	}
    public async getByEmail(email: string) {
		try {
			const foundUser = await this.userRepository.findOne({
				where: {
					email: email,
				},
			});
			if (foundUser) {
				return foundUser;
			}
			throw new Error("User not found by id");
		} catch (error) {
			console.log(error);
		}
	}
	public async updateUser(user: IUser) {
		try {
			const foundUser = await this.userRepository.findOne({
				where: {
					email: user.email,
				},
			});
			if (!foundUser) {
				throw new Error("Usuário não encontrado");
			}
			foundUser.username = user.username;
			foundUser.bio = user.bio;
			await this.userRepository.save(foundUser);
            return foundUser
		} catch (error) {
			console.log(error);
		}
	}
	public async deleteUser(user: IUser) {
		try {
			const foundUser = await this.userRepository.findOne({
				where: {
					id: user.id,
				},
			});
			if (!foundUser) {
				throw new Error("Usuário não encontrado");
			}
            await this.userRepository.softDelete(foundUser);
            return true
		} catch (error) {
			console.log(error);
		}
	}
}

export const userService = new UserService();
