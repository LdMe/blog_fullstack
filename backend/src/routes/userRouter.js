import {Router} from 'express';
import {getUsersRoute,getUserRoute} from '../controllers/user/userRouterController.js';

const router = Router();

router.get('/', getUsersRoute);
router.get('/:username', getUserRoute);



export default router;