import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['modern', 'classic', 'minimal', 'creative', 'professional', 'technical'],
        default: 'modern'
    },
    thumbnail: {
        type: String,
        default: ''
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    usageCount: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    styles: {
        colors: {
            primary: String,
            secondary: String,
            text: String,
            background: String
        },
        fonts: {
            heading: String,
            body: String
        },
        layout: {
            type: String,
            columns: Number
        }
    },
    sections: [{
        name: String,
        order: Number,
        visible: Boolean
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for search and filtering
templateSchema.index({ name: 'text', description: 'text', tags: 'text' });
templateSchema.index({ category: 1, isPremium: 1, isPublic: 1 });

export default mongoose.model('Template', templateSchema);
