import { Router } from 'express';

import {
    deleteJobToFavorite,
    getBoard,
    getJobById,
    getJobsByFilters,
    postJobToFavorite,
} from '../controllers/job/job-controller';
import { auth, identify } from '../middlewares/auth-middleware';

const jobRouter = Router();

jobRouter.get('/board', auth, getBoard);
jobRouter.get('/:id', identify, getJobById);
jobRouter.get('', identify, getJobsByFilters);
jobRouter.post('/favorite', auth, postJobToFavorite);
jobRouter.delete('/favorite/:jobId', auth, deleteJobToFavorite);

export default jobRouter;
