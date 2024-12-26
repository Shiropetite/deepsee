import { Router } from 'express';

import { getJobById, getJobsByFilters } from '../controllers/job/job-controller';

const jobRouter = Router();

jobRouter.get('', getJobsByFilters);
jobRouter.get('/:id', getJobById);

export default jobRouter;
