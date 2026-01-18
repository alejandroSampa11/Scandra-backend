import { Router } from 'express';
import { createDummyUser, createUser, getAllUsers } from '../controllers/user.controller';
import { validate } from '../middlewares/validate.middleware';
import { createUserSchema } from '../schemas/user.schema';

const router = Router();

router.post('/test/create-user', createDummyUser);
router.post('/', validate(createUserSchema), createUser);
router.get('/', getAllUsers);

export default router;