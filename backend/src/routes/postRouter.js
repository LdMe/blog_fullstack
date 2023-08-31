
import {Router} from 'express';
import {getPosts,getPost,createPost,answerPost,deletePost} from '../controllers/postController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', createPost);
router.post('/:id',authMiddleware, answerPost);
router.delete('/:id',authMiddleware, deletePost);

export default router;