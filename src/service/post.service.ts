// src/services/PostService.ts

import AppDataSource from "../data-source";
import { Post } from "../entity/Post";
import { User } from "../entity/User";

class PostService {
	private postRepository = AppDataSource.getRepository(Post);
	private userRepository = AppDataSource.getRepository(User);

	public async createPost(
		userId: number,
		image: string,
		description: string
	): Promise<Post> {
		const user = await this.userRepository.findOne({
			where: {
				id: userId,
			},
		});

		if (!user) {
			throw new Error("Usuário não encontrado");
		}

		const newPost = this.postRepository.create({
			image,
			description,
			user,
		});

		const savedPost = await this.postRepository.save(newPost);

		return savedPost;
	}

	public async getPosts(): Promise<Post[]> {
		const posts = await this.postRepository.find();
		return posts;
	}

	public async getPostById(postId: number): Promise<Post | null> {
		const post = await this.postRepository.findOne({
			where: {
				id: postId,
			},
		});
		return post;
	}

	public async updatePost(
		userId: number,
		postId: number,
		description: string
	): Promise<Post | undefined> {
		const post = await this.postRepository.findOne({
			where: {
				id: postId,
			},
			relations: ["user"],
		});

		if (!post) {
			throw new Error("Post não encontrado");
		}

		if (post.user.id !== userId) {
			throw new Error(
				"Usuário não tem permissão para atualizar este post"
			);
		}

		post.description = description;

		const updatedPost = await this.postRepository.save(post);

		return updatedPost;
	}

	public async deletePost(userId: number, postId: number): Promise<void> {
		const post = await this.postRepository.findOne({
			where: {
				id: postId,
			},
			relations: ["user"],
		});

		if (!post) {
			throw new Error("Post não encontrado");
		}

		if (post.user.id !== userId) {
			throw new Error("Usuário não tem permissão para excluir este post");
		}

		await this.postRepository.remove(post);
	}
}

export default PostService;
