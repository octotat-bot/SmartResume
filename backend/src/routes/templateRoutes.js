import express from 'express';
import {
    createTemplate,
    getTemplates,
    getTemplateById,
    updateTemplate,
    deleteTemplate,
    getCategories
} from '../controllers/templateController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTemplates);
router.get('/categories', getCategories);
router.get('/:id', getTemplateById);

// Protected routes
router.post('/', protect, createTemplate);
router.put('/:id', protect, updateTemplate);
router.delete('/:id', protect, deleteTemplate);

export default router;
