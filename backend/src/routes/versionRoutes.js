import express from 'express';
import {
    createVersion,
    getVersions,
    getVersionById,
    restoreVersion,
    deleteVersion
} from '../controllers/versionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/resume/:resumeId')
    .get(getVersions)
    .post(createVersion);

router.route('/:id')
    .get(getVersionById)
    .delete(deleteVersion);

router.put('/:id/restore', restoreVersion);

export default router;
