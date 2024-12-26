import { Router } from 'express';

import { identifyUser, signIn, signUp } from '../controllers/auth/auth-controller';
import { auth } from '../middlewares/auth-middleware';

const authRouter = Router();

authRouter.post('/sign-in', signIn);
authRouter.post('/sign-up', signUp);
authRouter.get('/identify', auth, identifyUser);

export default authRouter;
