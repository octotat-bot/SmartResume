import express from 'express';
import { protect } from '../middleware/auth.js';
import {
    enhanceBulletPoint,
    generateSummary,
    analyzeATS,
    generateCoverLetter,
    parseJobPosting,
    generateInterviewPrep,
    chat,
    suggestSkills,
    optimizeResume,
    getAIStatus
} from '../controllers/aiController.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

/**
 * @route   GET /api/ai/status
 * @desc    Check if AI service is available
 * @access  Private
 */
router.get('/status', getAIStatus);

/**
 * @route   POST /api/ai/enhance-bullet
 * @desc    Enhance a resume bullet point
 * @access  Private
 */
router.post('/enhance-bullet', enhanceBulletPoint);

/**
 * @route   POST /api/ai/generate-summary
 * @desc    Generate professional summary for resume
 * @access  Private
 */
router.post('/generate-summary', generateSummary);

/**
 * @route   POST /api/ai/analyze-ats
 * @desc    Analyze resume for ATS compatibility
 * @access  Private
 */
router.post('/analyze-ats', analyzeATS);

/**
 * @route   POST /api/ai/generate-cover-letter
 * @desc    Generate cover letter
 * @access  Private
 */
router.post('/generate-cover-letter', generateCoverLetter);

/**
 * @route   POST /api/ai/parse-job
 * @desc    Parse job posting from text or URL
 * @access  Private
 */
router.post('/parse-job', parseJobPosting);

/**
 * @route   POST /api/ai/interview-prep
 * @desc    Generate interview preparation material
 * @access  Private
 */
router.post('/interview-prep', generateInterviewPrep);

/**
 * @route   POST /api/ai/chat
 * @desc    AI chat assistant
 * @access  Private
 */
router.post('/chat', chat);

/**
 * @route   POST /api/ai/suggest-skills
 * @desc    Suggest skills based on job description
 * @access  Private
 */
router.post('/suggest-skills', suggestSkills);

/**
 * @route   POST /api/ai/optimize-resume
 * @desc    Optimize resume for specific role
 * @access  Private
 */
router.post('/optimize-resume', optimizeResume);

export default router;
