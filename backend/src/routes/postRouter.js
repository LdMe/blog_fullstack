
import {Router} from 'express';
import {getPosts,getPost,createPost,answerPost,deletePost} from '../controllers/postController.js';

const router = Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', createPost);
router.post('/:id', answerPost);
router.delete('/:id', deletePost);

export default router;
