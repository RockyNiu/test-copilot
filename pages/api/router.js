import express from 'express';
import generateInfo from './generateInfo.js';

const router = express.Router();
router.post('/generateinfo', generateInfo);

export default router;
