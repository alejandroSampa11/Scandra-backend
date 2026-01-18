import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { createUserSchema, loginSchema } from '../schemas/user.schema';

const router = Router();

router.post('/register', validate(createUserSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;