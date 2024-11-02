import { Router } from 'express';
import { getJobById, getJobsByFilters } from 'src/controllers/job-controller';

const jobRouter = Router();

jobRouter.get('', getJobsByFilters);
jobRouter.get('/:id', getJobById);

export default jobRouter;
