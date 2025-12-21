import express from 'express';
import Application from '../models/Application.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get all applications for user
router.get('/', protect, async (req, res) => {
    try {
        const { status, priority, search, sortBy = '-applicationDate' } = req.query;

        const query = { userId: req.user._id };

        if (status) query.status = status;
        if (priority) query.priority = priority;
        if (search) {
            query.$or = [
                { company: { $regex: search, $options: 'i' } },
                { position: { $regex: search, $options: 'i' } }
            ];
        }

        const applications = await Application.find(query)
            .sort(sortBy)
            .populate('resumeId', 'metadata.targetRole');

        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get application statistics
router.get('/stats', protect, async (req, res) => {
    try {
        const stats = await Application.aggregate([
            { $match: { userId: req.user._id } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const total = await Application.countDocuments({ userId: req.user._id });

        const statusCounts = {
            saved: 0,
            wishlist: 0,
            applied: 0,
            interview: 0,
            offer: 0,
            rejected: 0,
            accepted: 0,
            withdrawn: 0
        };

        stats.forEach(stat => {
            statusCounts[stat._id] = stat.count;
        });

        // Calculate success rate
        const successRate = total > 0
            ? ((statusCounts.offer + statusCounts.accepted) / total * 100).toFixed(1)
            : 0;

        res.json({
            total,
            statusCounts,
            successRate,
            activeApplications: statusCounts.applied + statusCounts.interview
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single application
router.get('/:id', protect, async (req, res) => {
    try {
        const application = await Application.findOne({
            _id: req.params.id,
            userId: req.user._id
        }).populate('resumeId');

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create application
router.post('/', protect, async (req, res) => {
    try {
        const application = new Application({
            ...req.body,
            userId: req.user._id,
            activities: [{
                type: 'note_added',
                description: `Added ${req.body.position} at ${req.body.company}`,
                date: new Date()
            }]
        });

        await application.save();
        res.status(201).json(application);
    } catch (error) {
        console.error('Error creating application:', error);
        res.status(400).json({ message: error.message });
    }
});

// Update application
router.put('/:id', protect, async (req, res) => {
    try {
        const application = await Application.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        const oldStatus = application.status;

        Object.assign(application, req.body);

        // Add activity if status changed
        if (req.body.status && req.body.status !== oldStatus) {
            application.activities.push({
                type: 'status_changed',
                description: `Status changed from ${oldStatus} to ${req.body.status}`,
                date: new Date()
            });
        }

        await application.save();
        res.json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Add activity to application
router.post('/:id/activity', protect, async (req, res) => {
    try {
        const application = await Application.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        application.activities.push({
            ...req.body,
            date: new Date()
        });

        await application.save();
        res.json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete application
router.delete('/:id', protect, async (req, res) => {
    try {
        const application = await Application.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.json({ message: 'Application deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
