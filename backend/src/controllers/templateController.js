import Template from '../models/Template.js';

// CREATE - Create new template
export const createTemplate = async (req, res) => {
    try {
        const template = await Template.create({
            ...req.body,
            createdBy: req.user._id
        });

        res.status(201).json(template);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ - Get all templates with pagination, search, sort, filter
export const getTemplates = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        // Build query
        let query = { isPublic: true };

        // Search
        if (req.query.search) {
            query.$text = { $search: req.query.search };
        }

        // Filter by category
        if (req.query.category && req.query.category !== 'all') {
            query.category = req.query.category;
        }

        // Filter by premium status
        if (req.query.isPremium !== undefined) {
            query.isPremium = req.query.isPremium === 'true';
        }

        // Filter by tags
        if (req.query.tags) {
            const tags = req.query.tags.split(',');
            query.tags = { $in: tags };
        }

        // Sort
        let sort = { usageCount: -1 }; // Default: most popular
        if (req.query.sortBy) {
            const sortField = req.query.sortBy;
            const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
            sort = { [sortField]: sortOrder };
        }

        const templates = await Template.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit);

        const total = await Template.countDocuments(query);

        res.json({
            templates,
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

// READ - Get single template by ID
export const getTemplateById = async (req, res) => {
    try {
        const template = await Template.findById(req.params.id);

        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }

        // Increment usage count
        template.usageCount += 1;
        await template.save();

        res.json(template);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE - Update template
export const updateTemplate = async (req, res) => {
    try {
        const template = await Template.findById(req.params.id);

        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }

        // Only creator can update (or admin in future)
        if (template.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this template' });
        }

        Object.keys(req.body).forEach(key => {
            if (key !== 'createdBy' && key !== '_id') {
                template[key] = req.body[key];
            }
        });

        await template.save();

        res.json(template);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE - Delete template
export const deleteTemplate = async (req, res) => {
    try {
        const template = await Template.findById(req.params.id);

        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }

        // Only creator can delete (or admin in future)
        if (template.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this template' });
        }

        await Template.deleteOne({ _id: template._id });

        res.json({ message: 'Template deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get template categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Template.distinct('category');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
