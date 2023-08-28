
import {Router} from 'express';
import {getPosts,getPost,createPost,replyPost} from '../controllers/postController.js';

const router = Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', createPost);
router.post('/:id', replyPost);

export default router;
