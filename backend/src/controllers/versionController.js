import Version from '../models/Version.js';
import Resume from '../models/Resume.js';

// CREATE - Create new version
export const createVersion = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.resumeId,
            userId: req.user._id
        });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        const lastVersion = await Version.findOne({ resumeId: resume._id })
            .sort({ versionNumber: -1 });

        const versionNumber = lastVersion ? lastVersion.versionNumber + 1 : 1;

        const version = await Version.create({
            resumeId: resume._id,
            versionNumber,
            title: req.body.title || `Version ${versionNumber}`,
            snapshot: req.body.snapshot || resume.toObject(),
            changes: req.body.changes || '',
            createdBy: req.user._id
        });

        res.status(201).json(version);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ - Get all versions for a resume with pagination
export const getVersions = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const versions = await Version.find({ resumeId: req.params.resumeId })
            .sort({ versionNumber: -1 })
            .skip(skip)
            .limit(limit)
            .select('-snapshot'); // Exclude large snapshot data in list

        const total = await Version.countDocuments({ resumeId: req.params.resumeId });

        res.json({
            versions,
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

// READ - Get single version by ID
export const getVersionById = async (req, res) => {
    try {
        const version = await Version.findById(req.params.id);

        if (!version) {
            return res.status(404).json({ message: 'Version not found' });
        }

        // Verify user owns the resume
        const resume = await Resume.findOne({
            _id: version.resumeId,
            userId: req.user._id
        });

        if (!resume) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        res.json(version);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE - Restore version (update resume to this version's snapshot)
export const restoreVersion = async (req, res) => {
    try {
        const version = await Version.findById(req.params.id);

        if (!version) {
            return res.status(404).json({ message: 'Version not found' });
        }

        const resume = await Resume.findOne({
            _id: version.resumeId,
            userId: req.user._id
        });

        if (!resume) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // Save current state as new version before restoring
        const lastVersion = await Version.findOne({ resumeId: resume._id })
            .sort({ versionNumber: -1 });

        const newVersionNumber = lastVersion.versionNumber + 1;

        await Version.create({
            resumeId: resume._id,
            versionNumber: newVersionNumber,
            title: `Before restore to v${version.versionNumber}`,
            snapshot: resume.toObject(),
            changes: `Backup before restoring to version ${version.versionNumber}`,
            createdBy: req.user._id
        });

        // Restore the version
        const { _id, userId, createdAt, updatedAt, ...snapshotData } = version.snapshot;
        Object.keys(snapshotData).forEach(key => {
            resume[key] = snapshotData[key];
        });

        resume.lastModified = Date.now();
        await resume.save();

        res.json({ message: 'Version restored successfully', resume });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE - Delete version
export const deleteVersion = async (req, res) => {
    try {
        const version = await Version.findById(req.params.id);

        if (!version) {
            return res.status(404).json({ message: 'Version not found' });
        }

        // Verify user owns the resume
        const resume = await Resume.findOne({
            _id: version.resumeId,
            userId: req.user._id
        });

        if (!resume) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await Version.deleteOne({ _id: version._id });

        res.json({ message: 'Version deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
