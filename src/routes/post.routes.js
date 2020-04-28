import { Router } from 'express';

import PostController from '../controllers/post.controller';

import auth from '../middlewares/auth';

const routes = Router();

routes.post('/', auth, PostController.createPost);
routes.get('/', auth, PostController.getAllPosts);
routes.get('/:id', auth, PostController.getPost);
routes.delete('/:id', auth, PostController.deletePost);

routes.put('/:id/likes', auth, PostController.createLike);
routes.delete('/:id/likes', auth, PostController.deleteLike);

routes.post('/:id/comments', auth, PostController.createComment);
routes.delete('/:id/comments/:commentId', auth, PostController.deleteComment);

export default routes;
