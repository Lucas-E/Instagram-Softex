// src/services/CommentService.ts

import AppDataSource from "../data-source";
import { Comment } from "../entity/Comment";
import { User } from "../entity/User";
import { Post } from "../entity/Post";

class CommentService {
	private commentRepository = AppDataSource.getRepository(Comment);

	public async createComment(
		userId: number,
		postId: number,
		description: string
	): Promise<Comment> {
		const user = await AppDataSource.getRepository(User).findOneBy({
			id: userId,
		});
		const post = await AppDataSource.getRepository(Post).findOneBy({
			id: postId,
		});

		if (!user || !post) {
			throw new Error("Usuário ou post não encontrado");
		}

		const newComment = this.commentRepository.create({
			user,
			post,
			description,
		});

		const savedComment = await this.commentRepository.save(newComment);

		return savedComment;
	}

	public async getCommentsByPost(postId: number): Promise<Comment[]> {
		const comments = await this.commentRepository.find({
			where: { post: { id: postId } },
		});
		return comments;
	}

	public async updateComment(
		userId: number,
		commentId: number,
		description: string
	): Promise<Comment | undefined> {
		try {
			const comment = await this.commentRepository.findOne({
				where: {
					id: commentId,
				},
				relations: ["user"],
			});

			if (!comment) {
				throw new Error("Comentário não encontrado");
			}

			if (comment.user.id !== userId) {
				throw new Error(
					"Usuário não tem permissão para atualizar este comentário"
				);
			}

			comment.description = description;

			const updatedComment = await this.commentRepository.save(comment);

			return updatedComment;
		} catch (error) {
			throw error;
		}
	}

	public async deleteComment(
		userId: number,
		commentId: number
	): Promise<void> {
		const comment = await this.commentRepository.findOne({
			where: {
				id: commentId,
			},
			relations: ["user", "post"],
		});

		if (!comment) {
			throw new Error("Comentário não encontrado");
		}

		// Permite que o criador do post ou o criador do comentário excluam o comentário
		if (comment.user.id !== userId && comment.post.user.id !== userId) {
			throw new Error(
				"Usuário não tem permissão para excluir este comentário"
			);
		}

		await this.commentRepository.remove(comment);
	}
}

export default CommentService;
