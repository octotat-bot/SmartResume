import Job from '../models/Job.js';

// CREATE - Create new job
export const createJob = async (req, res) => {
    try {
        const job = await Job.create({
            ...req.body,
            userId: req.user._id
        });

        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ - Get all jobs with pagination, search, sort, filter
export const getJobs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Build query
        let query = { userId: req.user._id };

        // Search
        if (req.query.search) {
            query.$text = { $search: req.query.search };
        }

        // Filter by status
        if (req.query.status && req.query.status !== 'all') {
            query.status = req.query.status;
        }

        // Filter by priority
        if (req.query.priority) {
            query.priority = req.query.priority;
        }

        // Filter by archived status
        if (req.query.isArchived !== undefined) {
            query.isArchived = req.query.isArchived === 'true';
        } else {
            query.isArchived = false; // Default: show only active jobs
        }

        // Filter by tags
        if (req.query.tags) {
            const tags = req.query.tags.split(',');
            query.tags = { $in: tags };
        }

        // Sort
        let sort = { appliedDate: -1 }; // Default: newest first
        if (req.query.sortBy) {
            const sortField = req.query.sortBy;
            const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
            sort = { [sortField]: sortOrder };
        }

        const jobs = await Job.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .populate('resumeUsed', 'title');

        const total = await Job.countDocuments(query);

        res.json({
            jobs,
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

// READ - Get single job by ID
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findOne({
            _id: req.params.id,
            userId: req.user._id
        }).populate('resumeUsed');

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE - Update job
export const updateJob = async (req, res) => {
    try {
        const job = await Job.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        Object.keys(req.body).forEach(key => {
            if (key !== 'userId' && key !== '_id') {
                job[key] = req.body[key];
            }
        });

        await job.save();

        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE - Delete job
export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        await Job.deleteOne({ _id: job._id });

        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get job statistics
export const getJobStats = async (req, res) => {
    try {
        const userId = req.user._id;

        const stats = await Job.aggregate([
            { $match: { userId, isArchived: false } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const total = await Job.countDocuments({ userId, isArchived: false });

        const statusCounts = {
            Applied: 0,
            Interview: 0,
            Offer: 0,
            Rejected: 0
        };

        stats.forEach(stat => {
            statusCounts[stat._id] = stat.count;
        });

        res.json({
            total,
            byStatus: statusCounts
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
