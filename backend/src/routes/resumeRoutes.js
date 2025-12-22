import express from 'express';
import {
    createResume,
    getResumes,
    getResumeById,
    updateResume,
    deleteResume,
    getResumeStats,
    duplicateResume
} from '../controllers/resumeController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All routes require authentication

router.route('/')
    .get(getResumes)
    .post(createResume);

router.get('/stats', getResumeStats);

router.post('/:id/duplicate', duplicateResume);

router.route('/:id')
    .get(getResumeById)
    .put(updateResume)
    .delete(deleteResume);

export default router;
