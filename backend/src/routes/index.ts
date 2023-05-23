import express from 'express';
import { getLogger } from '@/utils/loggers';
import controller from "../../controller"
const router = express.Router();
const logger = getLogger('INDEX_ROUTE');

/* GET home page. */
router.use('/', controller);

export default router;
