import express from 'express';
import generateInfo from './generateInfo.js';

const router = express.Router();
router.post('/generateInfo', generateInfo);

export default router;
