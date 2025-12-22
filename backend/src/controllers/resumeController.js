import Resume from '../models/Resume.js';
import Version from '../models/Version.js';

// CREATE - Create new resume
export const createResume = async (req, res) => {
    try {
        console.log('=== CREATE RESUME REQUEST ===');
        console.log('Raw body:', JSON.stringify(req.body, null, 2));

        // Clean up the data - remove undefined/null templateId
        const resumeData = { ...req.body };

        console.log('TemplateId before cleanup:', resumeData.templateId);

        // Remove invalid templateId values
        if (!resumeData.templateId ||
            resumeData.templateId === 'undefined' ||
            resumeData.templateId === 'null' ||
            resumeData.templateId === '') {
            console.log('Removing invalid templateId');
            delete resumeData.templateId;
        }

        console.log('Data after cleanup:', JSON.stringify(resumeData, null, 2));

        const resume = await Resume.create({
            ...resumeData,
            userId: req.user._id
        });

        // Create initial version
        await Version.create({
            resumeId: resume._id,
            versionNumber: 1,
            title: 'Initial Version',
            snapshot: resume.toObject(),
            createdBy: req.user._id
        });

        console.log('Resume created successfully:', resume._id);
        res.status(201).json(resume);
    } catch (error) {
        console.error('Create resume error:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ message: error.message });
    }
};

// READ - Get all resumes with pagination, search, sort, filter
export const getResumes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Search
        let query = { userId: req.user._id };
        if (req.query.search) {
            query.$text = { $search: req.query.search };
        }

        // Filter by active status
        if (req.query.isActive !== undefined) {
            query.isActive = req.query.isActive === 'true';
        }

        // Filter by target role
        if (req.query.targetRole) {
            query['metadata.targetRole'] = new RegExp(req.query.targetRole, 'i');
        }

        // Sort
        let sort = { lastModified: -1 }; // Default: newest first
        if (req.query.sortBy) {
            const sortField = req.query.sortBy;
            const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
            sort = { [sortField]: sortOrder };
        }

        const resumes = await Resume.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .populate('templateId', 'name thumbnail');

        const total = await Resume.countDocuments(query);

        res.json({
            resumes,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ - Get single resume by ID
export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id
        }).populate('templateId');

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE - Update resume
export const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // Clean up the data - remove undefined/null templateId
        const updateData = { ...req.body };
        if (!updateData.templateId || updateData.templateId === 'undefined') {
            delete updateData.templateId;
        }

        // Update fields
        Object.keys(updateData).forEach(key => {
            if (key !== 'userId' && key !== '_id' && key !== '__v' && key !== 'createdAt' && key !== 'updatedAt') {
                resume[key] = updateData[key];
            }
        });

        resume.lastModified = Date.now();
        await resume.save();

        // Create new version if significant changes
        if (req.body.createVersion) {
            const lastVersion = await Version.findOne({ resumeId: resume._id })
                .sort({ versionNumber: -1 });

            const versionNumber = lastVersion ? lastVersion.versionNumber + 1 : 1;

            await Version.create({
                resumeId: resume._id,
                versionNumber,
                title: req.body.versionTitle || `Version ${versionNumber}`,
                snapshot: resume.toObject(),
                changes: req.body.versionChanges || '',
                createdBy: req.user._id
            });
        }

        res.json(resume);
    } catch (error) {
        console.error('Update resume error:', error);
        res.status(500).json({ message: error.message });
    }
};

// DELETE - Delete resume
export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // Delete all versions
        await Version.deleteMany({ resumeId: resume._id });

        // Delete resume
        await Resume.deleteOne({ _id: resume._id });

        res.json({ message: 'Resume deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get resume statistics
export const getResumeStats = async (req, res) => {
    try {
        const totalResumes = await Resume.countDocuments({ userId: req.user._id });
        const activeResumes = await Resume.countDocuments({ userId: req.user._id, isActive: true });

        const recentResumes = await Resume.find({ userId: req.user._id })
            .sort({ lastModified: -1 })
            .limit(5)
            .select('title lastModified metadata.targetRole');

        res.json({
            total: totalResumes,
            active: activeResumes,
            recent: recentResumes
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DUPLICATE - Duplicate an existing resume
export const duplicateResume = async (req, res) => {
    try {
        const originalResume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!originalResume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // Create a copy of the resume
        const resumeData = originalResume.toObject();
        delete resumeData._id;
        delete resumeData.__v;
        delete resumeData.createdAt;
        delete resumeData.updatedAt;
        delete resumeData.lastModified;

        // Update title to indicate it's a copy
        resumeData.title = `${resumeData.title} (Copy)`;

        // Create the new resume
        const newResume = await Resume.create({
            ...resumeData,
            userId: req.user._id
        });

        // Create initial version for the duplicated resume
        await Version.create({
            resumeId: newResume._id,
            versionNumber: 1,
            title: 'Initial Version (Duplicated)',
            snapshot: newResume.toObject(),
            createdBy: req.user._id
        });

        res.status(201).json(newResume);
    } catch (error) {
        console.error('Duplicate resume error:', error);
        res.status(500).json({ message: error.message });
    }
};
