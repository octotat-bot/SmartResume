import aiService from '../services/aiService.js';
import Resume from '../models/Resume.js';
import Application from '../models/Application.js';

/**
 * AI Controller - Handles all AI-powered features
 */

/**
 * Enhance a bullet point
 * POST /api/ai/enhance-bullet
 */
export const enhanceBulletPoint = async (req, res) => {
    try {
        const { bulletPoint, context } = req.body;

        if (!bulletPoint) {
            return res.status(400).json({
                success: false,
                message: 'Bullet point is required'
            });
        }

        if (!aiService.isAvailable()) {
            return res.status(503).json({
                success: false,
                message: 'AI service is not available. Please configure GEMINI_API_KEY.'
            });
        }

        const enhanced = await aiService.enhanceBulletPoint(bulletPoint, context || {});

        res.json({
            success: true,
            data: {
                original: bulletPoint,
                enhanced: enhanced
            }
        });
    } catch (error) {
        console.error('Enhance bullet point error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to enhance bullet point'
        });
    }
};

/**
 * Generate professional summary
 * POST /api/ai/generate-summary
 */
export const generateSummary = async (req, res) => {
    try {
        const { resumeId } = req.body;

        if (!resumeId) {
            return res.status(400).json({
                success: false,
                message: 'Resume ID is required'
            });
        }

        if (!aiService.isAvailable()) {
            return res.status(503).json({
                success: false,
                message: 'AI service is not available'
            });
        }

        const resume = await Resume.findById(resumeId);
        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        // Check if user owns this resume
        if (resume.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        const summary = await aiService.generateSummary(resume);

        res.json({
            success: true,
            data: { summary }
        });
    } catch (error) {
        console.error('Generate summary error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate summary'
        });
    }
};

/**
 * Analyze resume for ATS compatibility
 * POST /api/ai/analyze-ats
 */
export const analyzeATS = async (req, res) => {
    try {
        const { resumeId, jobDescription } = req.body;

        if (!resumeId) {
            return res.status(400).json({
                success: false,
                message: 'Resume ID is required'
            });
        }

        if (!aiService.isAvailable()) {
            return res.status(503).json({
                success: false,
                message: 'AI service is not available'
            });
        }

        const resume = await Resume.findById(resumeId);
        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        if (resume.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        const analysis = await aiService.analyzeATS(resume, jobDescription || '');

        res.json({
            success: true,
            data: analysis
        });
    } catch (error) {
        console.error('ATS analysis error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to analyze resume'
        });
    }
};

/**
 * Generate cover letter
 * POST /api/ai/generate-cover-letter
 */
export const generateCoverLetter = async (req, res) => {
    try {
        const { resumeId, applicationId, jobDescription } = req.body;

        if (!resumeId) {
            return res.status(400).json({
                success: false,
                message: 'Resume ID is required'
            });
        }

        if (!aiService.isAvailable()) {
            return res.status(503).json({
                success: false,
                message: 'AI service is not available'
            });
        }

        const resume = await Resume.findById(resumeId);
        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        if (resume.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        let jobData = {};

        if (applicationId) {
            const application = await Application.findById(applicationId);
            if (application && application.userId.toString() === req.user._id.toString()) {
                jobData = {
                    company: application.company,
                    position: application.position,
                    jobDescription: jobDescription || application.notes || ''
                };
            }
        } else {
            jobData = req.body.jobData || {};
        }

        const coverLetter = await aiService.generateCoverLetter(resume, jobData);

        res.json({
            success: true,
            data: { coverLetter }
        });
    } catch (error) {
        console.error('Generate cover letter error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate cover letter'
        });
    }
};

/**
 * Parse job posting from URL or text
 * POST /api/ai/parse-job
 */
export const parseJobPosting = async (req, res) => {
    try {
        const { jobText, url } = req.body;

        if (!jobText && !url) {
            return res.status(400).json({
                success: false,
                message: 'Job text or URL is required'
            });
        }

        if (!aiService.isAvailable()) {
            return res.status(503).json({
                success: false,
                message: 'AI service is not available'
            });
        }

        // If URL is provided, you might want to fetch the content
        // For now, we'll just use the jobText
        const textToParse = jobText || `Job URL: ${url}`;

        const parsedData = await aiService.parseJobPosting(textToParse);

        if (!parsedData) {
            return res.status(400).json({
                success: false,
                message: 'Failed to parse job posting'
            });
        }

        res.json({
            success: true,
            data: parsedData
        });
    } catch (error) {
        console.error('Parse job posting error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to parse job posting'
        });
    }
};

/**
 * Generate interview preparation material
 * POST /api/ai/interview-prep
 */
export const generateInterviewPrep = async (req, res) => {
    try {
        const { resumeId, applicationId } = req.body;

        if (!resumeId || !applicationId) {
            return res.status(400).json({
                success: false,
                message: 'Resume ID and Application ID are required'
            });
        }

        if (!aiService.isAvailable()) {
            return res.status(503).json({
                success: false,
                message: 'AI service is not available'
            });
        }

        const resume = await Resume.findById(resumeId);
        const application = await Application.findById(applicationId);

        if (!resume || !application) {
            return res.status(404).json({
                success: false,
                message: 'Resume or Application not found'
            });
        }

        if (resume.userId.toString() !== req.user._id.toString() ||
            application.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        const jobData = {
            company: application.company,
            position: application.position,
            jobDescription: application.notes || ''
        };

        const interviewPrep = await aiService.generateInterviewPrep(resume, jobData);

        res.json({
            success: true,
            data: interviewPrep
        });
    } catch (error) {
        console.error('Generate interview prep error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate interview preparation'
        });
    }
};

/**
 * AI Chat assistant
 * POST /api/ai/chat
 */
export const chat = async (req, res) => {
    try {
        const { message, resumeId, conversationHistory } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: 'Message is required'
            });
        }

        if (!aiService.isAvailable()) {
            return res.status(503).json({
                success: false,
                message: 'AI service is not available'
            });
        }

        let context = { conversationHistory };

        // If resumeId is provided, add resume context
        if (resumeId) {
            const resume = await Resume.findById(resumeId);
            if (resume && resume.userId.toString() === req.user._id.toString()) {
                context.resumeData = resume;
            }
        }

        const response = await aiService.chat(message, context);

        res.json({
            success: true,
            data: {
                message: response,
                timestamp: new Date()
            }
        });
    } catch (error) {
        console.error('AI chat error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to process chat message'
        });
    }
};

/**
 * Suggest skills based on job description
 * POST /api/ai/suggest-skills
 */
export const suggestSkills = async (req, res) => {
    try {
        const { jobDescription, resumeId } = req.body;

        if (!jobDescription) {
            return res.status(400).json({
                success: false,
                message: 'Job description is required'
            });
        }

        if (!aiService.isAvailable()) {
            return res.status(503).json({
                success: false,
                message: 'AI service is not available'
            });
        }

        let currentSkills = [];

        if (resumeId) {
            const resume = await Resume.findById(resumeId);
            if (resume && resume.userId.toString() === req.user._id.toString()) {
                currentSkills = [
                    ...(resume.skills?.technical || []),
                    ...(resume.skills?.tools || [])
                ];
            }
        }

        const suggestedSkills = await aiService.suggestSkills(jobDescription, currentSkills);

        res.json({
            success: true,
            data: { skills: suggestedSkills }
        });
    } catch (error) {
        console.error('Suggest skills error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to suggest skills'
        });
    }
};

/**
 * Optimize resume for specific role
 * POST /api/ai/optimize-resume
 */
export const optimizeResume = async (req, res) => {
    try {
        const { resumeId, targetRole, jobDescription } = req.body;

        if (!resumeId || !targetRole) {
            return res.status(400).json({
                success: false,
                message: 'Resume ID and target role are required'
            });
        }

        if (!aiService.isAvailable()) {
            return res.status(503).json({
                success: false,
                message: 'AI service is not available'
            });
        }

        const resume = await Resume.findById(resumeId);
        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        if (resume.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        const optimization = await aiService.optimizeForRole(
            resume,
            targetRole,
            jobDescription || ''
        );

        res.json({
            success: true,
            data: optimization
        });
    } catch (error) {
        console.error('Optimize resume error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to optimize resume'
        });
    }
};

/**
 * Check AI service status
 * GET /api/ai/status
 */
export const getAIStatus = async (req, res) => {
    try {
        const isAvailable = aiService.isAvailable();

        res.json({
            success: true,
            data: {
                available: isAvailable,
                message: isAvailable
                    ? 'AI service is operational'
                    : 'AI service is not configured. Please add GEMINI_API_KEY to environment variables.'
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to check AI status'
        });
    }
};
