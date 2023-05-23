import express from 'express';
// import { getLogger } from '@/utils/loggers';
const router = express.Router();
// const logger = getLogger('INDEX_ROUTE');
import person from "./person"
router.use('/',person );

export default router;