import {Router} from 'express';

import postRouter from './postRouter.js';
import authRouter from './authRouter.js';
import userRouter from './userRouter.js';
import chatRouter from './chatRouter.js';

const router = Router();

router.use('/posts', postRouter);

router.use('/', authRouter);

router.use('/users', userRouter);

router.use('/chats', chatRouter);

export default router;