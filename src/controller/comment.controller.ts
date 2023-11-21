// src/controllers/CommentController.ts

import { Request, Response, Router } from 'express';
import CommentService from '../service/comment.service';
import { UserRequest } from '../interfaces/UserRequest';

class CommentController {
  private commentService: CommentService;

  constructor() {
    this.commentService = new CommentService();
  }

  createComment = async (req: UserRequest, res: Response) => {
    const { user } = req;
    const postId = parseInt(req.params.postId, 10);
    const { description } = req.body;

    try {
      if (!description) {
        throw new Error('Por favor, forneça uma descrição para o comentário.');
      }

      const comment = await this.commentService.createComment(user.id, postId, description);
      return res.json({ message: 'Comentário criado com sucesso', comment });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Erro ao criar o comentário' });
    }
  };

  getCommentsByPost = async (req: Request, res: Response) => {
    const postId = parseInt(req.params.postId, 10);

    try {
      const comments = await this.commentService.getCommentsByPost(postId);
      return res.json({ comments });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao obter os comentários' });
    }
  };

  updateComment = async (req: UserRequest, res: Response) => {
    const { user } = req;
    const commentId = parseInt(req.params.commentId, 10);
    const { description } = req.body;

    try {
      if (!description) {
        throw new Error('Por favor, forneça uma nova descrição para o comentário.');
      }

      const updatedComment = await this.commentService.updateComment(user.id, commentId, description);
      return res.json({ message: 'Comentário atualizado com sucesso', comment: updatedComment });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Erro ao atualizar o comentário' });
    }
  };

  deleteComment = async (req: UserRequest, res: Response) => {
    const { user } = req;
    const commentId = parseInt(req.params.commentId, 10);

    try {
      await this.commentService.deleteComment(user.id, commentId);
      return res.json({ message: 'Comentário excluído com sucesso' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Erro ao excluir o comentário' });
    }
  };
}

export const commentController = new CommentController();