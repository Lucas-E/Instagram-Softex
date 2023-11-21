import express, { Request, Response } from "express";
import { userService } from "../service/user.service";
import { IUser } from "../dtos/IUser";
import { UserRequest } from "../interfaces/UserRequest";

class UserController {
	public async createNewUser(req: Request, res: Response) {
		try {
			const userData = req.body;
			console.log(userData);

			if (!userData.username || !userData.password || !userData.email) {
				return res.status(400).json({ error: "Missing required data" });
			}

			const existingUser = await userService.getByEmail(userData.email);
			if (existingUser) {
				return res.status(409).json({ error: "User already exists" });
			}

			const newUser = await userService.createNewUser(userData);
			return res.status(201).json(newUser);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Internal Server Error" });
		}
	}

	public async getUserById(req: Request, res: Response) {
		try {
			const userId = parseInt(req.params.id, 10);

			if (isNaN(userId)) {
				return res.status(400).json({ error: "Invalid user ID" });
			}

			const user = await userService.getById(userId);

			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}

			return res.json(user);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Internal Server Error" });
		}
	}

	public async getUserByEmail(req: Request, res: Response) {
		try {
			const userEmail = req.params.email;

			if (!userEmail) {
				return res.status(400).json({ error: "Email is required" });
			}

			const user = await userService.getByEmail(userEmail);

			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}

			return res.json(user);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Internal Server Error" });
		}
	}

	public async updateUser(req: UserRequest, res: Response) {
		try {
			const userId = parseInt(req.params.id);
			const userData = req.body as IUser;

			if (isNaN(userId)) {
				return res.status(400).json({ error: "Invalid user ID" });
			}

			const existingUser = await userService.getById(userId);
			if (!existingUser) {
				return res.status(404).json({ error: "User not found" });
			}
			if (existingUser.id !== req.user.id) {
				return res.sendStatus(401);
			}
			const updatedUser = await userService.updateUser({
				...userData,
				id: userId,
			} as IUser);

			return res.json(updatedUser);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Internal Server Error" });
		}
	}

	public async deleteUser(req: UserRequest, res: Response) {
		try {
			const userId = parseInt(req.params.id, 10);
			if (userId !== req.user.id) {
				return res.sendStatus(401);
			}

			if (isNaN(userId)) {
				return res.status(400).json({ error: "Invalid user ID" });
			}

			const existingUser = await userService.getById(userId);
			if (!existingUser) {
				return res.status(404).json({ error: "User not found" });
			}

			await userService.deleteUser({ id: userId } as IUser);

			return res.json({ success: true });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Internal Server Error" });
		}
	}
}

export const userController = new UserController();
