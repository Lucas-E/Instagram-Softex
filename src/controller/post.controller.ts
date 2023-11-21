// src/controllers/PostController.ts

import { Request, Response, Router } from 'express';
import PostService from '../service/post.service';
import { UserRequest } from '../interfaces/UserRequest';
import { authMiddleware } from '../middlewares/auth.middleware';

class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  createPost = async (req: UserRequest, res: Response) => {
    const { user } = req['user'] as UserRequest; // Assume que o middleware de autenticação adicionou 'user' à requisição
    const { image, description } = req.body;

    try {
      if (!image || !description) {
        throw new Error('Por favor, forneça uma imagem e uma descrição para o post.');
      }

      const post = await this.postService.createPost(user.id, image, description);
      return res.json({ message: 'Post criado com sucesso', post });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Erro ao criar o post' });
    }
  };

  updatePost = async (req: UserRequest, res: Response) => {
    const { userId } = req['user'];
    const postId = parseInt(req.params.id, 10);
    const { description } = req.body;

    try {
      if (!description) {
        throw new Error('Por favor, forneça uma nova descrição para o post.');
      }

      const updatedPost = await this.postService.updatePost(userId, postId, description);
      return res.json({ message: 'Post atualizado com sucesso', post: updatedPost });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Erro ao atualizar o post' });
    }
  };

  deletePost = async (req: UserRequest, res: Response) => {
    const { userId } = req['user'];
    const postId = parseInt(req.params.id, 10);

    try {
      await this.postService.deletePost(userId, postId);
      return res.json({ message: 'Post excluído com sucesso' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Erro ao excluir o post' });
    }
  };
}

export const postController = new PostController();
